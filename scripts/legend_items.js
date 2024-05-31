
document.addEventListener("DOMContentLoaded", function() {
    // Select all the legend items
    const legendItems = document.querySelectorAll('g.legend_item');

    // Function to move an element to the end of its parent to render it on top
    function moveToTop(element) {
        const parent = element.parentNode;
        parent.appendChild(element); // Moves the element to the end of its parent
    }

    // Add hover event listeners to legend items
    legendItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Get the ID of the legend item
            const id = this.getAttribute('id');
            
            // Find the corresponding plot line element with the same ID
            const correspondingPlotLine = document.querySelector(`g.plot_lines[id="${id}"]`);

            // Move the plot line to the top
            if (correspondingPlotLine) {
                moveToTop(correspondingPlotLine);
            }
        });
    });
});
