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

	var INVIEW = function INVIEW(elem, options) {
		options = options || {};

		// Default options:
		var threshold = options.threshold || 0.25;
		var offsetTop = options.offsetTop || 0;
		var offsetRight = options.offsetRight || 0;
		var offsetBottom = options.offsetBottom || 0;
		var offsetLeft = options.offsetLeft || 0;

		// Get offset position of an element in DOM:
		// @param {node} elem Element to check
		// @return {int} Top, left, width and height values in pixels
		var getElemOffset = function getElemOffset(elem) {

			// Width and height of element:
			var width = elem.offsetWidth;
			var height = elem.offsetHeight;

			// Default top and left position of element:
			var top = 0;
			var left = 0;

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
		var getPageOffset = function getPageOffset() {
			return {
				x: window.pageXOffset || document.documentElement.scrollLeft,
				y: window.pageYOffset || document.documentElement.scrollTop
			};
		};

		// Get viewport size:
		// @return {int} Width and height in pixels
		var getViewportSize = function getViewportSize() {
			var width = window.innerWidth || document.documentElement.clientWidth;
			var height = window.innerHeight || document.documentElement.clientHeight;

			return {
				width: width,
				height: height
			};
		};

		// Check if element is visible:
		// @param {node} elem Element to check
		var isVisible = function isVisible(elem) {

			// Get position data from element and containers:
			var elemOffset = getElemOffset(elem);
			var pageOffset = getPageOffset();
			var viewportSize = getViewportSize();

			// Determine element size:
			var elemWidth = elemOffset.width;
			var elemHeight = elemOffset.height;

			// Determine element position from rect points:
			var elemTop = elemOffset.top;
			var elemLeft = elemOffset.left;
			var elemBottom = elemTop + elemHeight;
			var elemRight = elemLeft + elemWidth;

			// Determine boundaries of element:
			// @return {bool} True if element is found within boundaries, otherwise false
			var checkBoundaries = function checkBoundaries() {

				// Determine element boundaries including custom threshold:
				var eTop = elemTop + elemHeight * threshold;
				var eRight = elemRight - elemWidth * threshold;
				var eBottom = elemBottom - elemHeight * threshold;
				var eLeft = elemLeft + elemWidth * threshold;

				// Determine container boundaries including custom offset:
				var cTop = pageOffset.y + offsetTop;
				var cRight = pageOffset.x - offsetRight + viewportSize.width;
				var cBottom = pageOffset.y - offsetBottom + viewportSize.height;
				var cLeft = pageOffset.x + offsetLeft;

				return eTop < cBottom && eBottom > cTop && eLeft < cRight && eRight > cLeft;
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