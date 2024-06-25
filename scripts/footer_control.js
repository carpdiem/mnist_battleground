
document.addEventListener("DOMContentLoaded", function() {
    const closeButton = document.querySelector('.footerbar .close-button');
    const footerBar = document.querySelector('.footerbar');

    closeButton.addEventListener('click', function() {
        footerBar.style.display = 'none';
    });
});
