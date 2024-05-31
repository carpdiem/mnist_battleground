
document.addEventListener("DOMContentLoaded", function() {
    const clickyLinks = document.querySelectorAll('.clickyHover');
    const originalDisplay = new Map();  // Map to store original display states

    clickyLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const parentDiv = this.closest('div');
            const imgs = parentDiv.querySelectorAll('img');
            const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const targetImg = parentDiv.querySelector(`#${this.id}_${colorScheme}`);

            // Store the currently displayed image and its display state
            imgs.forEach(img => {
                if (getComputedStyle(img).display !== 'none') {
                    originalDisplay.set(this, {img: img, display: img.style.display});
                }
                img.style.display = 'none';  // Hide all images
            });

            // Show the correct image based on color scheme
            if (targetImg) {
                targetImg.style.display = 'block';
            }
        });

        link.addEventListener('mouseleave', function() {
            if (!originalDisplay.has(this)) return;  // Do nothing if no image was displayed originally
            const parentDiv = this.closest('div');
            const imgs = parentDiv.querySelectorAll('img');

            // Hide all images first
            imgs.forEach(img => img.style.display = 'none');

            // Restore the original image display state
            const { img, display } = originalDisplay.get(this);
            img.style.display = display;
            originalDisplay.delete(this);  // Clear the stored state after restoring
        });

        link.addEventListener('click', function() {
            const parentDiv = this.closest('div');
            const imgs = parentDiv.querySelectorAll('img');
            const links = parentDiv.querySelectorAll('.clickyHover');
            const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const targetImg = parentDiv.querySelector(`#${this.id}_${colorScheme}`);

            // Hide all images and show the correct one
            imgs.forEach(img => img.style.display = 'none');
            if (targetImg) {
                targetImg.style.display = 'block';
                originalDisplay.set(this, {img: targetImg, display: 'block'});  // Update the map to new state
            }

            // Handle the underlined style of the links
            links.forEach(lk => {
                lk.style.textDecoration = 'none';  // Remove underline from all links
            });
            this.style.textDecoration = 'underline';  // Underline the clicked link
        });
    });
});
