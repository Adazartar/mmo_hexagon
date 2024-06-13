document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');

    for(let j = 0; j < 25; j++) {
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            cell.className = 'hex';
            cell.style.left = `${i * 30}px`;
            cell.style.top = `${(i % 2) * 39 + 78 * j}px`;
            grid.appendChild(cell);
        }
    }

    const scrollSpeed = 10; // Pixels to scroll per tick
    const distance_threshold = 0.8;
    let mouseX = 0;
    let mouseY = 0;

    function updateMousePosition(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    function scrollOnBorder() {
        const { clientWidth, clientHeight } = document.documentElement;

        // Will go b/w -1 and 1 0 is when we don't want to move in a direction at all (in middle of axis)
        let xRelative = (mouseX - clientWidth / 2) / clientWidth * 2;
        let yRelative = (mouseY - clientHeight / 2) / clientHeight * 2;

        // Make unit vector
        let magnitude = Math.sqrt(xRelative * xRelative + yRelative * yRelative);
        let unit_x = xRelative / magnitude;
        let unit_y = yRelative / magnitude;


        if (Math.abs(xRelative) > distance_threshold || Math.abs(yRelative) > distance_threshold) {
            // At the threshold is 1x then 1 should be 2x 
            let larger = (Math.abs(xRelative) > Math.abs(yRelative) ? Math.abs(xRelative) : Math.abs(yRelative));
            let weighted_scroll = (1 + (larger - distance_threshold) / (1 - distance_threshold)) * scrollSpeed;
            window.scrollBy(unit_x * weighted_scroll, unit_y * weighted_scroll);
        }
    }

    document.addEventListener('mousemove', updateMousePosition);

    // Set up a timer to check the mouse position and scroll if necessary
    setInterval(scrollOnBorder, 20); // Adjust the interval as needed
});
