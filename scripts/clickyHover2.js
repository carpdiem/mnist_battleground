
document.addEventListener("DOMContentLoaded", function() {
    const clickyLinks = document.querySelectorAll('.clickyHover');
    const originalDisplay = new Map();

    clickyLinks.forEach(link => {
        function showImage(link) {
            const parentDiv = link.closest('div');
            const objects = parentDiv.querySelectorAll('object');
            const links = parentDiv.querySelectorAll('.clickyHover');
            const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const targetobject = parentDiv.querySelector(`#${link.id}_${colorScheme}`);

            objects.forEach(object => object.style.display = 'none'); 
            if (targetobject) {
                targetobject.style.display = 'block';
                originalDisplay.set(link, {object: targetobject, display: 'block'});
            }

            links.forEach(lk => lk.style.textDecoration = 'none');
            link.style.textDecoration = 'underline'; 
        }

        if ('ontouchstart' in window || navigator.maxTouchPoints) { // Check for touch device
            link.addEventListener('touchstart', function(event) {
                event.preventDefault(); // Prevent touch from triggering click event
                showImage(this);
            });
        } else {
            link.addEventListener('mouseenter', function() {
                const parentDiv = this.closest('div');
                const objects = parentDiv.querySelectorAll('object');
                const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const targetobject = parentDiv.querySelector(`#${this.id}_${colorScheme}`);

                objects.forEach(object => {
                    if (getComputedStyle(object).display !== 'none') {
                        originalDisplay.set(this, {object: object, display: object.style.display});
                    }
                    object.style.display = 'none'; 
                });

                if (targetobject) {
                    targetobject.style.display = 'block';
                }
            });

            link.addEventListener('mouseleave', function() {
                if (!originalDisplay.has(this)) return; 
                const parentDiv = this.closest('div');
                const objects = parentDiv.querySelectorAll('object');

                objects.forEach(object => object.style.display = 'none'); 

                const { object, display } = originalDisplay.get(this);
                object.style.display = display;
                originalDisplay.delete(this); 
            });

            link.addEventListener('click', function() {
                showImage(this);
            });
        }
    });
});
