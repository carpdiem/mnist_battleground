
document.addEventListener('DOMContentLoaded', () => {
  function setupLegendListeners(svgObject) {
    // Handle cases where the SVG hasn't fully loaded yet
    if (!svgObject.contentDocument) {
      svgObject.addEventListener('load', () => {
        setupLegendListeners(svgObject);
      });
      return;
    }

    // Prevent adding multiple event listeners to the same legend items
    const existingRects = svgObject.contentDocument.querySelectorAll('.legend_item rect');
    if (existingRects.length > 0) {
      return;
    }

    const legendItems = svgObject.contentDocument.querySelectorAll('.legend_item');

    legendItems.forEach(legendItem => {
      let rect = svgObject.contentDocument.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const bbox = legendItem.getBBox();
      rect.setAttribute('x', bbox.x);
      rect.setAttribute('y', bbox.y);
      rect.setAttribute('width', bbox.width);
      rect.setAttribute('height', bbox.height);
      rect.setAttribute('fill', 'transparent');
      rect.setAttribute('pointer-events', 'all');
      rect.style.cursor = 'pointer';

      const handleInteraction = () => {
        const legendItemId = legendItem.id;
        const plotLines = svgObject.contentDocument.querySelectorAll('.plot_line');
        const activePlotLine = svgObject.contentDocument.querySelector('.plot_line[style*="opacity: 1"]');
        const isCurrentlyActive = activePlotLine && activePlotLine.id === legendItemId;

        // Update opacities for all legend items
        legendItems.forEach(item => {
          item.style.opacity = isCurrentlyActive ? '1' : '0.5';
        });

        // If clicked on the active plot line, deactivate it
        if (isCurrentlyActive) {
          plotLines.forEach(plotLine => {
            plotLine.style.opacity = 1;
          });
          // Set the clicked legend item opacity back to 1
          legendItem.style.opacity = '1';
        } else {
          plotLines.forEach(plotLine => {
            if (plotLine.id === legendItemId) {
              plotLine.parentElement.appendChild(plotLine);
              plotLine.style.opacity = 1;
            } else {
              plotLine.style.opacity = 0.25;
            }
          });
          // Set the clicked legend item opacity to 1
          legendItem.style.opacity = '1';
        }
      };

      // Add event listeners for both 'click' and 'touchstart'
      rect.addEventListener('click', handleInteraction);
      rect.addEventListener('touchstart', handleInteraction);

      legendItem.appendChild(rect);
    });
  }

  // Observe for changes in the 'style' attribute of SVG objects
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const svgObject = mutation.target;
        if (getComputedStyle(svgObject).display !== 'none') {
          setupLegendListeners(svgObject);
        }
      }
    });
  });

  observer.observe(document.body, { attributes: true, subtree: true });

});

