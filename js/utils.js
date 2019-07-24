'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  var main = document.querySelector('main');
  var similarListElement = document.querySelector('.map__pins');
  var similarPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var similarErrorPopup = document.querySelector('#error')
    .content
    .querySelector('.error');
  var similarSuccessPopup = document.querySelector('#success')
      .content
      .querySelector('.success');
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
      fragment.appendChild(renderItem(items[i], i));
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

  var renderPin = function (pinData, index) {
    var pin = similarPin.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.setAttribute('style', 'left: ' + (pinData.location.x - pinSizes.x / 2) + 'px; top: ' + (pinData.location.y - pinSizes.y) + 'px;');
    pinImage.setAttribute('src', pinData.author.avatar);
    pinImage.setAttribute('alt', pinData.offer.type);
    pin.id = 'house' + index;

    return pin;
  };

  var getPinSize = function (childElement, parentElement) {
    var pin = childElement.cloneNode(true);
    pin.setAttribute('style', 'visibility: hidden;');
    parentElement.appendChild(pin);
    var pinSizes = measureElement(pin);
    parentElement.removeChild(pin);
    return pinSizes;
  };

  var deleteChildren = function (parentElement, childClassName, exceptionClassName) {
    Array.from(parentElement.children).forEach(function (element) {
      if (element.className !== exceptionClassName && element.className === childClassName) {
        element.remove();
      }
    });
  };

  var isItTrueChoice = function (dataValue, selectList) {
    var selectedValue = selectList.options[selectList.options.selectedIndex].value;
    return Boolean(String(dataValue) === selectedValue || selectedValue === 'any');
  };

  var pinSizes = getPinSize(similarPin, similarListElement);

  var isContain = function (allegedParentArray, allegedChildArray) {
    for (var i = 0; i < allegedChildArray.length; i++) {
      if (allegedParentArray.indexOf(allegedChildArray[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var showPopup = function (similarPopup, callback) {
    var Popup = similarPopup.cloneNode(true);
    main.appendChild(Popup);

    var closePopup = function () {
      main.removeChild(Popup);
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onDocumentClick);
      callback();
    };

    var onDocumentKeydown = function (evt) {
      if (evt.keyCode === KeyCode.ESC) {
        closePopup();
      }
    };

    var onDocumentClick = function () {
      closePopup();
    };

    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  };

  var showErrorPopup = function (onErrorPopupBtnClick) {
    var onPopupClose = function () {
      ErrorPopupBtn.removeEventListener('click', onErrorPopupBtnClick)
    };
    showPopup(similarErrorPopup, onPopupClose);
    var ErrorPopupBtn = main.querySelector('.error__button');
    ErrorPopupBtn.addEventListener('click', onErrorPopupBtnClick);
  };
  var showSuccessPopup = function () {
    showPopup(similarSuccessPopup);
  };

  window.utils = {
    chooseRandomElement: chooseRandomElement,
    measureElement: measureElement,
    insertItems: insertItems,
    disableElements: disableElements,
    activationElements: activationElements,
    getElementСoordinate: getElementСoordinate,
    renderPin: renderPin,
    deleteChildren: deleteChildren,
    isItTrueChoice: isItTrueChoice,
    isContain: isContain,
    showErrorPopup: showErrorPopup,
    showSuccessPopup: showSuccessPopup
  };
})();
