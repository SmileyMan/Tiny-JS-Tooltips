/*!
 * Tiny-JS-Tooltips
 * A very simple and lightweight tooltips system created with vanilla JavaScript
 *
 * @version v1.0
 * @author SmileyMan (Steve Miles)
 * @github https://github.com/SmileyMan/Tiny-JS-Tooltips
 * @original https://github.com/oscarcweb/CustomTooltips
 * @license MIT
 */
(function() {
  // Check if tooltip container exists, create if not
  let tooltip = document.getElementById("tiny-js-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "tiny-js-tooltip";
    document.body.appendChild(tooltip);
  }

  // Get document width and height
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

  // Position the tooltip
  const positionTooltip = (event) => {
    if (!event) return; // Check if event object exists

    const xoffset = -5;
    const yoffset = 20;

    let width = event.clientX + xoffset + window.scrollX;
    let height = event.clientY + yoffset + window.scrollY;

    if ((width + tooltip.offsetWidth) > getWidth()) {
      width = width - tooltip.offsetWidth;
      tooltip.classList.add("arrow-left");
    } else {
      tooltip.classList.remove("arrow-left");
    }

    if ((height + tooltip.offsetHeight) > getHeight()) {
      height = height - tooltip.offsetHeight;
    }

    tooltip.style.top = height + "px";
    tooltip.style.left = width + "px";
  };

  // Setup the tooltip
  const setupTooltip = (enabled, text = '') => {
    if (enabled) {
      positionTooltip(event);
      tooltip.innerHTML = text;
      tooltip.style.display = text ? "block" : "none"; // Hide tooltip if text is empty
    } else {
      tooltip.innerHTML = text;
      tooltip.style.display = "none";
    }
  };

  // Add tooltips to page elements
  document.querySelectorAll("[data-tooltip]").forEach(el => {
    const text = el.getAttribute("data-tooltip");

    // Show tooltip on hover
    el.addEventListener("pointerover", (event) => {
      if (event.pointerType === "mouse") {
        setupTooltip(true, text);
      }
    });

    // Update tooltip position on move
    el.addEventListener("pointermove", (event) => {
      if (event.pointerType === "mouse") {
        positionTooltip(event);
      }
    });

    // Hide tooltip on leave or click
    el.addEventListener("pointerleave", () => {
      setupTooltip(false);
    });

    el.addEventListener("pointerdown", () => {
      setupTooltip(false);
    });
  });
})();
