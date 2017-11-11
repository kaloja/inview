/**
 * INVIEW
 * Determine if an element is in viewport.
 *
 * @param {node} elem Element to check against the viewport boundaries
 * @param {object} options Custom settings
 * @return {bool} True if element is found within boundaries, otherwise false
 */

(function (root) {

  'use strict';

  const INVIEW = (elem, options) => {
    options = options || {};

    // Default options:
    const threshold = options.threshold || 0.25;
    const offsetTop = options.offsetTop || 0;
    const offsetRight = options.offsetRight || 0;
    const offsetBottom = options.offsetBottom || 0;
    const offsetLeft = options.offsetLeft || 0;

    // Get offset position of an element in DOM:
    // @param {node} elem Element to check
    // @return {int} Top, left, width and height values in pixels
    const getElemOffset = (elem) => {

      // Width and height of element:
      const width = elem.offsetWidth;
      const height = elem.offsetHeight;

      // Default top and left position of element:
      let top = 0;
      let left = 0;

      // Get total distance of element to document top and left origin:
      do {
        top += elem.offsetTop;
        left += elem.offsetLeft;
      } while ((elem = elem.offsetParent) !== null);

      // Return dimensions and position:
      return {
        width: width,
        height: height,
        top: top,
        left: left
      };
    };

    // Get offset scroll position of page:
    // @return {int} X and Y scroll position values in pixels
    const getPageOffset = () => {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
      };
    };

    // Get viewport size:
    // @return {int} Width and height in pixels
    const getViewportSize = () => {
      const width = window.innerWidth || document.documentElement.clientWidth;
      const height = window.innerHeight || document.documentElement.clientHeight;

      return {
        width: width,
        height: height
      };
    };

    // Check if element is visible:
    // @param {node} elem Element to check
    const isVisible = (elem) => {

      // Get position data from element and containers:
      const elemOffset = getElemOffset(elem);
      const pageOffset = getPageOffset();
      const viewportSize = getViewportSize();

      // Determine element size:
      const elemWidth = elemOffset.width;
      const elemHeight = elemOffset.height;

      // Determine element position from rect points:
      const elemTop = elemOffset.top;
      const elemLeft = elemOffset.left;
      const elemBottom = elemTop + elemHeight;
      const elemRight = elemLeft + elemWidth;

      // Determine boundaries of element:
      // @return {bool} True if element is found within boundaries, otherwise false
      const checkBoundaries = () => {

        // Determine element boundaries including custom threshold:
        const eTop = elemTop + elemHeight * threshold;
        const eRight = elemRight - elemWidth * threshold;
        const eBottom = elemBottom - elemHeight * threshold;
        const eLeft = elemLeft + elemWidth * threshold;

        // Determine container boundaries including custom offset:
        const cTop = pageOffset.y + offsetTop;
        const cRight = pageOffset.x - offsetRight + viewportSize.width;
        const cBottom = pageOffset.y - offsetBottom + viewportSize.height;
        const cLeft = pageOffset.x + offsetLeft;

        return (eTop < cBottom && eBottom > cTop && eLeft < cRight && eRight > cLeft);
      };

      return checkBoundaries();
    };

    if (isVisible(elem)) {
      return true;
    } else {
      return false;
    }
  };

  root.inview = INVIEW;

})(window);
