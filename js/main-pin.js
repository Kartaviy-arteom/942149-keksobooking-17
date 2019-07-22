'use strict';

(function (deps) {
  var GAP_PIN_Y = 53;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinSizes = deps.measureElement(mainPin);
  var startMainPinCoord = deps.getElementСoordinate(mainPin, mainPinSizes);
  console.log(startMainPinCoord);

  var restrictMovement = function () {
    var rectangle = {
      bottom: 630,
      top: 130,
      left: 0,
      right: map.offsetWidth - mainPin.offsetWidth
    };

    if (parseInt(mainPin.style.top, 10) > rectangle.bottom) {
      mainPin.style.top = rectangle.bottom + 'px';
    }
    if (parseInt(mainPin.style.top, 10) < rectangle.top) {
      mainPin.style.top = rectangle.top + 'px';
    }
    if (parseInt(mainPin.style.left, 10) < rectangle.left) {
      mainPin.style.left = rectangle.left;
    }
    if (parseInt(mainPin.style.left, 10) > rectangle.right) {
      mainPin.style.left = rectangle.right + 'px';
    }
  };

  var initMainPinMovement = function(toggle, activationFunction, someFunction) {
    mainPin.addEventListener('mousedown', function (evt, toggle) {
      var startСoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt, toggle) {
        moveEvt.preventDefault();

        var shift = {
          x: startСoordinates.x - moveEvt.clientX,
          y: startСoordinates.y - moveEvt.clientY
        };

        startСoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
         if (!toggle) {
          activationFunction();
          toggle = true;
        }
        restrictMovement();
        someFunction();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        someFunction();
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  };

  var getСurrentPinCoordinate = function () {
    var mainСurrentPinCoordinate = {
      left: Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2),
      top: mainPin.offsetTop + GAP_PIN_Y
    };
    return mainСurrentPinCoordinate;
  };

  var returnMainPin = function () {
    mainPin.setAttribute('style', 'left: ' + Math.ceil(startMainPinCoord.left - mainPinSizes.x / 2) + 'px; top: ' + Math.ceil(startMainPinCoord.top - mainPinSizes.y / 2) + 'px;');
  };

  window.mainPin = {
    startMainPinCoord: startMainPinCoord,
    initMainPinMovement: initMainPinMovement,
    getСurrentPinCoordinate: getСurrentPinCoordinate,
    returnMainPin: returnMainPin
  };
})({
  measureElement: window.utils.measureElement,
  getElementСoordinate: window.utils.getElementСoordinate,

});
