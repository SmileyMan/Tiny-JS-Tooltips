/*!
 * Tiny-JS-Tooltips
 * A very simple and lightweight tooltips system created with vanilla JavaScript
 *
 * @version v1.0
 * @author Steve Miles
 * @github https://github.com/SmileyMan/Tiny-JS-Tooltips
 * @orginal https://github.com/oscarcweb/CustomTooltips.
 * @license MIT
 */
(function() {

  /** Is the tooltip-js in the page? */
  !document.getElementById("tooltip-js") ? document.body.insertAdjacentHTML("beforeend", '<div id="tooltip-js"></div>') : null;

  const tooltip = document.getElementById("tooltip-js");

  const getWidth = () => {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  };

  const getHeight = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  };

  const positionTooltip = (tooltip) => {

    const xoffset = -5,
          yoffset = 20;

    let width = event.clientX + xoffset + window.scrollX,
        height = event.clientY + yoffset + window.scrollY;

    if ( ( width + tooltip.offsetWidth ) > getWidth() ) {
      width = width - tooltip.offsetWidth;
      tooltip.classList.add("arrow-left");
    }
    else {
      tooltip.classList.remove("arrow-left");
    }

    if ( ( height + tooltip.offsetHeight ) > getHeight() ) {
      height = height - tooltip.offsetHeight;
    }

    tooltip.style.top = height + "px";
    tooltip.style.left = width + "px";


  };

  const setupTooltip = (tooltip, enabled, text = '') => {

    if ( enabled ) {

      positionTooltip(tooltip);
      tooltip.innerHTML = text;
      tooltip.style.display = "block";
    
    } else {

      tooltip.innerHTML = text;
      tooltip.style.display = "none";

    }

  };


  // Add tooltips to page elements
  document.querySelectorAll( "[data-tooltip]" ).forEach( el => {

	  const text = el.getAttribute("data-tooltip");

    /** On hover show tooltip */
    el.addEventListener("pointerover", (event) => {

      if (event.pointerType = "mouse") {
        setupTooltip(tooltip, true, text);
      }

    });

    /** On move position tooltip */
    el.addEventListener("pointermove", (event) => {

      if (event.pointerType = "mouse") {
        positionTooltip(tooltip);
      }

    });

    /** On leave remove tooltip */
    el.addEventListener("pointerleave", () => {

      setupTooltip(tooltip, false);

    });

    /** On click remove tooltip */
    el.addEventListener("pointerdown", () => {

      setupTooltip(tooltip, false);

    });

  });

})()
