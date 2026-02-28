const yearSpan = document.querySelector("[data-year]");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
// Cursor Glow Effect
document.addEventListener('DOMContentLoaded', () => {
    let cursorGlow = document.getElementById('cursor-glow');

    // Create the glow element if it doesn't exist
    if (!cursorGlow) {
        cursorGlow = document.createElement('div');
        cursorGlow.id = 'cursor-glow';
        // Ensure styles are applied even if not in CSS (fallback)
        cursorGlow.style.position = 'fixed';
        cursorGlow.style.pointerEvents = 'none';
        cursorGlow.style.zIndex = '9999';
        document.body.appendChild(cursorGlow);
    }

    let isMouseActive = false;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let idleTimer;

    // Mouse Interaction
    document.addEventListener('mousemove', (e) => {
        isMouseActive = true;
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Reset to auto-mode if mouse stops for 5 seconds
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            isMouseActive = false;
        }, 5000);
    });

    // Animate Glow
    function animateGlow() {
        if (isMouseActive) {
            // Follow mouse
            cursorGlow.style.background = `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(181, 69, 24, 0.15), transparent 40%)`;
        } else {
            // Auto-animate (Floating Orb) for touch/idle
            const time = Date.now() * 0.001;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Lissajous curve movement
            const x = centerX + Math.sin(time * 0.7) * (centerX * 0.5);
            const y = centerY + Math.cos(time * 0.5) * (centerY * 0.5);

            cursorGlow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(181, 69, 24, 0.15), transparent 40%)`;
        }
        requestAnimationFrame(animateGlow);
    }

    // Start animation loop
    animateGlow();

    // --- Extra Ambient Orbs (Purple & Green) ---
    class MysticOrb {
        constructor(color, size, speedMult, phaseX, phaseY) {
            this.element = document.createElement('div');
            this.element.style.position = 'fixed';
            this.element.style.top = '0';
            this.element.style.left = '0';
            this.element.style.width = '100vw';
            this.element.style.height = '100vh';
            this.element.style.pointerEvents = 'none';
            this.element.style.zIndex = '9990';
            this.element.style.transition = 'opacity 2s ease-in-out';
            this.element.style.opacity = '0'; // Start hidden
            this.element.style.mixBlendMode = 'screen'; // Add blend mode for glow effect

            this.color = color;
            this.size = size;
            this.speedMult = speedMult;
            this.phaseX = phaseX;
            this.phaseY = phaseY;
            this.visible = false;

            document.body.appendChild(this.element);
            this.scheduleToggle();
        }

        scheduleToggle() {
            // Random time between 3s and 8s to toggle visibility
            const delay = Math.random() * 5000 + 3000;
            setTimeout(() => {
                this.visible = !this.visible;
                this.element.style.opacity = this.visible ? '1' : '0';
                this.scheduleToggle();
            }, delay);
        }

        update(time) {
            // Optimization: If opacity is 0 (and transition done), technically we could skip, 
            // but we need to keep moving so it appears in a new spot when it fades in.

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Orbits differ based on phase and speed
            const x = centerX + Math.sin(time * this.speedMult + this.phaseX) * (centerX * 0.8);
            const y = centerY + Math.cos(time * (this.speedMult * 0.7) + this.phaseY) * (centerY * 0.8);

            this.element.style.background = `radial-gradient(circle ${this.size}px at ${x}px ${y}px, ${this.color}, transparent 70%)`;
        }
    }

    const orbs = [
        // Purple Orb
        // Brighter alpha (0.6), smaller size (150px)
        new MysticOrb('rgba(157, 78, 221, 0.6)', 150, 0.4, 0, 2),
        // Green Orb
        // Brighter alpha (0.6), smaller size (150px)
        new MysticOrb('rgba(46, 204, 113, 0.6)', 150, 0.25, 4, 1)
    ];

    function animateOrbs() {
        const time = Date.now() * 0.001;
        orbs.forEach(orb => orb.update(time));
        requestAnimationFrame(animateOrbs);
    }

    animateOrbs();
});
