const canvas = document.getElementById("flappy-canvas");
const ctx = canvas.getContext("2d");

// DOM Elements
const overlay = document.getElementById("game-overlay");
const overlayTitle = document.getElementById("overlay-title");
const highScoreDisplay = document.getElementById("high-score-display");
const startBtn = document.getElementById("start-btn");

// Images
const dragonImg = new Image();
dragonImg.src = "images/flappy_dragon_no_background.png";

const towerImg = new Image();
towerImg.src = "images/flappy_dragon_tower_no_background.png";

const swordImg = new Image();
swordImg.src = "images/flappy_dragon_sword_no_background.png";

let gameState = "START";
let highScore = localStorage.getItem("flappyHighScore") || 0;
let frames = 0;

highScoreDisplay.textContent = `High Score: ${highScore}`;

const game = {
    width: 640,
    height: 432,
    gravity: 0.25,
    lift: -5.5,
    speed: 3,
    gap: 130,
    pipes: [],
    score: 0,
    dragon: { x: 100, y: 180, width: 40, height: 30, velocity: 0, rotation: 0 },
};

canvas.width = game.width;
canvas.height = game.height;

// --- CORE FUNCTIONS ---

const resetGame = () => {
    // Reset to "PLAYING" state
    game.pipes = [];
    game.score = 0;
    game.dragon.y = game.height / 2;
    game.dragon.velocity = 0;
    game.dragon.rotation = 0;
    frames = 0;

    gameState = "PLAYING";
    overlay.style.display = "none";
};

const prepareGame = () => {
    // Show 'Ready' state instructions on overlay
    // Use overlay to show 'Get Ready' or 'Press Space' instead of hiding it immediately?
    // Actually, typical Flappy Bird:
    // 1. Title Screen (Start Button)
    // 2. Get Ready (Tap to Fly)
    // 3. Playing

    // My Implementation:
    // 1. Title Screen (Overlay with Start Button)
    // 2. Click Start -> Hides Overlay -> Enters 'START' state (Canvas draws "Press Space")
    // 3. Press Space -> Enters 'PLAYING' state

    // If I want to make it clearer, I can change the overlay text to "Press Space" and keep it visible?
    // But then I'd need to hide the button.
    // Let's stick to the hiding overlay logic as it matches the canvas drawing "Press Space".

    game.pipes = [];
    game.score = 0;
    game.dragon.y = game.height / 2;
    game.dragon.velocity = 0;
    game.dragon.rotation = 0;
    frames = 0;

    gameState = "START";
    overlay.style.display = "none";

    // Immediate draw to clear any Game Over residue
    drawSky();
    ctx.save();
    ctx.translate(game.dragon.x, game.dragon.y);
    ctx.drawImage(dragonImg, -24, -24, 48, 48);
    ctx.restore();

    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, game.width, game.height);

    ctx.fillStyle = "#ffd700";
    ctx.font = "30px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.fillText("Druk op SPATIE of KLIK om te vliegen", game.width / 2, game.height / 2);
};

const gameOver = () => {
    gameState = "GAMEOVER";
    if (game.score > highScore) {
        highScore = game.score;
        localStorage.setItem("flappyHighScore", highScore);
    }

    overlayTitle.textContent = "Verloren!";
    highScoreDisplay.textContent = `Score: ${game.score} | High Score: ${highScore}`;
    startBtn.textContent = "Opnieuw Spelen";
    overlay.style.display = "flex";
};

const spawnPipe = () => {
    const minHeight = 40;
    const maxHeight = game.height - game.gap - minHeight;
    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

    game.pipes.push({
        x: game.width,
        top: topHeight,
        width: 50,
        counted: false
    });
};

const update = () => {
    frames++;
    if (frames % 100 === 0) spawnPipe();

    // Physics
    game.dragon.velocity += game.gravity;
    game.dragon.y += game.dragon.velocity;

    // Rotation
    if (game.dragon.velocity < 0) {
        game.dragon.rotation = -25 * Math.PI / 180;
    } else if (game.dragon.velocity > 0) {
        game.dragon.rotation += 2 * Math.PI / 180;
        if (game.dragon.rotation > 70 * Math.PI / 180) game.dragon.rotation = 70 * Math.PI / 180;
    }

    // Pipes
    game.pipes.forEach((pipe) => { pipe.x -= game.speed; });
    if (game.pipes.length && game.pipes[0].x < -60) game.pipes.shift();

    // Score
    game.pipes.forEach((pipe) => {
        if (pipe.x + pipe.width < game.dragon.x && !pipe.counted) {
            pipe.counted = true;
            game.score++;
        }
    });

    // Collision
    if (game.dragon.y + 15 >= game.height || game.dragon.y - 15 <= 0) gameOver();

    game.pipes.forEach((pipe) => {
        if (game.dragon.x + 15 > pipe.x && game.dragon.x - 15 < pipe.x + pipe.width) {
            if ((game.dragon.y - 10 < pipe.top) || (game.dragon.y + 10 > pipe.top + game.gap)) {
                gameOver();
            }
        }
    });
};

const drawSky = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, game.height);
    gradient.addColorStop(0, "#2b1055");
    gradient.addColorStop(1, "#7597de");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, game.width, game.height);
};

const drawPipes = () => {
    game.pipes.forEach((pipe) => {
        // Top Pipe (Sword hanging down)
        // Original request: Handle at top (ceiling), Blade pointing down.
        // Image is likely upright (Handle top, Blade bottom).
        // If we draw it normally at (x, pipe.top - height), it would look correct.
        // The user says "turn around the sword".
        // Current code rotates it 180 degrees.
        // So I will remove rotation.

        ctx.save();
        // Draw centered on pipe
        const imgX = pipe.x - 5; // (Pipe width 50, Image width 60 -> Centered at -5)
        ctx.drawImage(swordImg, imgX, pipe.top - 400, 60, 400);
        ctx.restore();

        const towerY = pipe.top + game.gap;
        ctx.drawImage(towerImg, pipe.x - 10, towerY, pipe.width + 20, 500);
    });
};

const drawDragon = () => {
    ctx.save();
    ctx.translate(game.dragon.x, game.dragon.y);
    ctx.rotate(game.dragon.rotation);
    ctx.drawImage(dragonImg, -24, -24, 48, 48);
    ctx.restore();
};

const drawScore = () => {
    ctx.font = "bold 40px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffd700";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.strokeText(game.score, game.width / 2, 50);
    ctx.fillText(game.score, game.width / 2, 50);
};

const loop = () => {
    ctx.clearRect(0, 0, game.width, game.height);

    drawSky();
    drawPipes();
    drawDragon();
    drawScore();

    if (gameState === "PLAYING") {
        update();
    } else if (gameState === "START") {
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0, 0, game.width, game.height);

        ctx.fillStyle = "#ffd700";
        ctx.font = "30px 'Cinzel', serif";
        ctx.textAlign = "center";
        ctx.fillText("Druk op SPATIE of KLIK om te vliegen", game.width / 2, game.height / 2 + 60);
    }

    requestAnimationFrame(loop);
};

// --- INPUT HANDLING ---

const handleInput = (e) => {
    if (gameState === "START") {
        // Space or Click starts the game from the Ready screen for better UX
        if (e.code === "Space" || e.type === "mousedown" || e.type === "touchstart") {
            e.preventDefault();
            resetGame();
        }
    } else if (gameState === "PLAYING") {
        // Space, Click, or Touch flaps
        if (e.code === "Space" || e.type === "mousedown" || e.type === "touchstart") {
            e.preventDefault();
            game.dragon.velocity = game.lift;
        }
    }
};

window.addEventListener("keydown", handleInput);
// Use window for click/touch to ensure button doesn't conflict, 
// or bind to canvas if we want to contain it. 
// Canvas binding is safer to avoid scrolling issues on mobile everywhere.
canvas.addEventListener("mousedown", handleInput);
canvas.addEventListener("touchstart", handleInput, { passive: false });

startBtn.onclick = (e) => {
    e.stopPropagation(); // Prevent this click from triggering handleInput immediately
    prepareGame();
};

// Start Loop
// Don't hide overlay initially, let the user click Start
// We want the loop running to draw the background behind the overlay
requestAnimationFrame(loop);
