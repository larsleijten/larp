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

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            const x = e.clientX;
            const y = e.clientY;

            // Apply the gradient centered on cursor position
            cursorGlow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(181, 69, 24, 0.15), transparent 40%)`;
        });
    });
});
