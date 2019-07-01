'use strict';

(function () {
  var chooseRandomElement = function (arr) {
    var randomElement = arr[Math.floor(Math.random() * arr.length)];
    return randomElement;
  };

  var measureElement = function (element) {
    var elementSizes = {
      x: element.offsetWidth,
      y: element.offsetHeight
    };
    return elementSizes;
  };

  var insertItems = function (items, renderItem, target) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < items.length; i++) {
      fragment.appendChild(renderItem(items[i]));
    }
    target.appendChild(fragment);
  };

  var disableElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', 'disabled');
    }
  };

  var activationElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled', 'disabled');
    }
  };

  var getElementСoordinate = function (element, elementSizes) {
    var coordinate = {
      left: Math.floor(element.offsetLeft + elementSizes.x / 2),
      top: Math.floor(element.offsetTop + elementSizes.y / 2)
    };
    return coordinate;
  };

  window.utils = {
    chooseRandomElement: chooseRandomElement,
    measureElement: measureElement,
    insertItems: insertItems,
    disableElements: disableElements,
    activationElements: activationElements,
    getElementСoordinate: getElementСoordinate
  };
})();
