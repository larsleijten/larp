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
});
