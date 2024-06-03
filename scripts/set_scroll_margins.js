
window.addEventListener('DOMContentLoaded', () => { // Wait for page to load
  const navbar = document.querySelector('.navbar');
  const navTargets = document.querySelectorAll('.navTarget'); 

  function adjustScrollMargin() {
    const navbarHeight = navbar.offsetHeight;

    navTargets.forEach(target => {
      target.style.scrollMarginTop = `${navbarHeight}px`;
    });
  }

  // Initial adjustment on page load
  adjustScrollMargin();

  // Adjust on window resize (for responsiveness)
  window.addEventListener('resize', adjustScrollMargin);
});
