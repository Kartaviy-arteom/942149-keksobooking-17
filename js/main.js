'use strict';

(function () {
  var map = document.querySelector('.map');

  var similarListElement = document.querySelector('.map__pins');
  var form = document.querySelector('.ad-form');
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var mapFilters = map.querySelector('.map__filters');
  var mapInputs = mapFilters.querySelectorAll('input');
  var mapSelects = mapFilters.querySelectorAll('select');
  var descriptionField = [form.querySelector('#description')];

  window.main = {
    variables: {
      form: form
    },
  }
;

  var deactivateMap = function() {
    window.utils.disableElements(formInputs);
    window.utils.disableElements(formSelects);
    window.utils.disableElements(mapInputs);
    window.utils.disableElements(mapSelects);
    window.utils.disableElements(descriptionField);
  }();

  var mainPin = map.querySelector('.map__pin--main');
  var activeMap = function () {
    window.utils.activationElements(formInputs);
    window.utils.activationElements(formSelects);
    window.utils.activationElements(mapInputs);
    window.utils.activationElements(mapSelects);
    window.utils.activationElements(descriptionField);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.utils.insertItems(window.mocks.mock, window.mocks.renderPin, similarListElement);
  };

  var mainPinSizes = window.utils.measureElement(mainPin);

  var mainPinCoordinate = window.utils.getElementСoordinate(mainPin, mainPinSizes);

  var addressField = document.getElementById('address');
  var insertCoordinate = function (coordinate) {
    addressField.value = coordinate.left + ', ' + coordinate.top;
  };
  insertCoordinate(mainPinCoordinate);

  var GAP_PIN_Y = 53;

  var activated = false;
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

  var getCoords = function () {
    var mainActivePinCoordinate = {
      left: Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2),
      top: mainPin.offsetTop + GAP_PIN_Y
    };
    return mainActivePinCoordinate;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    var startСoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (!activated) {
        activeMap();
        activated = true;
      }


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

      restrictMovement();
      insertCoordinate(getCoords());
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      insertCoordinate(getCoords());
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
