document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('floating-paths-container');
    if (!container) return;

    function createFloatingPaths(position) {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 696 316");
        svg.setAttribute("fill", "none");
        svg.style.position = "absolute";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.overflow = "visible"; // Allow paths to go outside slightly
        svg.style.pointerEvents = "none";

        // Add title
        const title = document.createElementNS(svgNS, "title");
        title.textContent = "Background Paths";
        svg.appendChild(title);

        const paths = Array.from({ length: 36 }, (_, i) => ({
            id: i,
            d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
                380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
                152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
                684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
            color: `rgba(15, 23, 42, ${0.1 + i * 0.03})`,
            width: 0.5 + i * 0.03,
        }));

        paths.forEach(pathData => {
            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", pathData.d);
            path.setAttribute("stroke", "currentColor"); // Use current color (black/slate-950)
            path.setAttribute("stroke-width", pathData.width);
            path.setAttribute("stroke-opacity", 0.1 + pathData.id * 0.03);
            path.style.color = "rgba(15, 23, 42, 1)"; // Base color (slate-950)

            // Critical: Set pathLength to 1 so CSS stroke-dasharray works with normalized values
            path.setAttribute("pathLength", "1");

            // We'll use CSS animation for this
            path.classList.add('floating-path');

            // Randomize duration
            const duration = 20 + Math.random() * 10;
            path.style.animationDuration = `${duration}s`;

            svg.appendChild(path);
        });

        return svg;
    }

    const svg1 = createFloatingPaths(1);
    const svg2 = createFloatingPaths(-1);

    container.appendChild(svg1);
    container.appendChild(svg2);
});
