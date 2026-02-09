const canvas = document.getElementById("flappy-canvas");
const ctx = canvas.getContext("2d");

const game = {
    width: 640,
    height: 360,
    gravity: 0.35,
    lift: -6.5,
    speed: 2.6,
    gap: 120,
    pipes: [],
    frame: 0,
    score: 0,
    isRunning: false,
    dragon: {
        x: 120,
        y: 180,
        radius: 14,
        velocity: 0,
    },
};

canvas.width = game.width;
canvas.height = game.height;

const resetGame = () => {
    game.pipes = [];
    game.frame = 0;
    game.score = 0;
    game.dragon.y = game.height / 2;
    game.dragon.velocity = 0;
    game.isRunning = true;
};

const spawnPipe = () => {
    const topHeight = 40 + Math.random() * (game.height - game.gap - 120);
    game.pipes.push({
        x: game.width + 20,
        top: topHeight,
    });
};

const update = () => {
    if (!game.isRunning) return;

    game.frame += 1;

    if (game.frame % 90 === 0) {
        spawnPipe();
    }

    game.dragon.velocity += game.gravity;
    game.dragon.y += game.dragon.velocity;

    game.pipes.forEach((pipe) => {
        pipe.x -= game.speed;
    });

    if (game.pipes.length && game.pipes[0].x < -60) {
        game.pipes.shift();
    }

    game.pipes.forEach((pipe) => {
        if (pipe.x + 40 < game.dragon.x && !pipe.counted) {
            pipe.counted = true;
            game.score += 1;
        }
    });

    if (game.dragon.y + game.dragon.radius > game.height || game.dragon.y - game.dragon.radius < 0) {
        game.isRunning = false;
    }

    game.pipes.forEach((pipe) => {
        const withinX = game.dragon.x + game.dragon.radius > pipe.x &&
            game.dragon.x - game.dragon.radius < pipe.x + 50;
        const hitsTop = game.dragon.y - game.dragon.radius < pipe.top;
        const hitsBottom = game.dragon.y + game.dragon.radius > pipe.top + game.gap;
        if (withinX && (hitsTop || hitsBottom)) {
            game.isRunning = false;
        }
    });
};

const drawSky = () => {
    ctx.fillStyle = "#8bd4ff";
    ctx.fillRect(0, 0, game.width, game.height);
};

const drawGround = () => {
    ctx.fillStyle = "#6a3f1e";
    ctx.fillRect(0, game.height - 40, game.width, 40);
    ctx.fillStyle = "#3f6c3f";
    ctx.fillRect(0, game.height - 55, game.width, 15);
};

const drawDragon = () => {
    ctx.fillStyle = "#b54a2a";
    ctx.beginPath();
    ctx.arc(game.dragon.x, game.dragon.y, game.dragon.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f6e6c4";
    ctx.beginPath();
    ctx.arc(game.dragon.x + 6, game.dragon.y - 4, 4, 0, Math.PI * 2);
    ctx.fill();
};

const drawPipes = () => {
    ctx.fillStyle = "#2c4a2e";
    game.pipes.forEach((pipe) => {
        ctx.fillRect(pipe.x, 0, 50, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + game.gap, 50, game.height - pipe.top - game.gap - 40);
    });
};

const drawHUD = () => {
    ctx.fillStyle = "#2b1d0f";
    ctx.font = "20px Cormorant Garamond";
    ctx.fillText(`Score: ${game.score}`, 16, 28);

    if (!game.isRunning) {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, game.width, game.height);
        ctx.fillStyle = "#f7f0d8";
        ctx.font = "26px Cormorant Garamond";
        ctx.fillText("Tik of druk op Spatie om te vliegen", 160, 170);
        ctx.font = "20px Cormorant Garamond";
        ctx.fillText("Druk op R om te herstarten", 230, 205);
    }
};

const render = () => {
    drawSky();
    drawPipes();
    drawGround();
    drawDragon();
    drawHUD();
};

const loop = () => {
    update();
    render();
    requestAnimationFrame(loop);
};

const flap = () => {
    if (!game.isRunning) {
        resetGame();
    }
    game.dragon.velocity = game.lift;
};

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        flap();
    }
    if (event.code === "KeyR") {
        resetGame();
    }
});

canvas.addEventListener("click", flap);

resetGame();
loop();
