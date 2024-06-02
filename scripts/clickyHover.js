
document.addEventListener("DOMContentLoaded", function() {
    const clickyLinks = document.querySelectorAll('.clickyHover');
    const originalDisplay = new Map();  // Map to store original display states

    clickyLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const parentDiv = this.closest('div');
            const objects = parentDiv.querySelectorAll('object');
            const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const targetobject = parentDiv.querySelector(`#${this.id}_${colorScheme}`);

            // Store the currently displayed image and its display state
            objects.forEach(object => {
                if (getComputedStyle(object).display !== 'none') {
                    originalDisplay.set(this, {object: object, display: object.style.display});
                }
                object.style.display = 'none';  // Hide all images
            });

            // Show the correct image based on color scheme
            if (targetobject) {
                targetobject.style.display = 'block';
            }
        });

        link.addEventListener('mouseleave', function() {
            if (!originalDisplay.has(this)) return;  // Do nothing if no image was displayed originally
            const parentDiv = this.closest('div');
            const objects = parentDiv.querySelectorAll('object');

            // Hide all images first
            objects.forEach(object => object.style.display = 'none');

            // Restore the original image display state
            const { object, display } = originalDisplay.get(this);
            object.style.display = display;
            originalDisplay.delete(this);  // Clear the stored state after restoring
        });

        link.addEventListener('click', function() {
            const parentDiv = this.closest('div');
            const objects = parentDiv.querySelectorAll('object');
            const links = parentDiv.querySelectorAll('.clickyHover');
            const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const targetobject = parentDiv.querySelector(`#${this.id}_${colorScheme}`);

            // Hide all images and show the correct one
            objects.forEach(object => object.style.display = 'none');
            if (targetobject) {
                targetobject.style.display = 'block';
                originalDisplay.set(this, {object: targetobject, display: 'block'});  // Update the map to new state
            }

            // Handle the underlined style of the links
            links.forEach(lk => {
                lk.style.textDecoration = 'none';  // Remove underline from all links
            });
            this.style.textDecoration = 'underline';  // Underline the clicked link
        });
    });
});
