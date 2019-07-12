'use strict';

(function (deps) {
  var map = document.querySelector('.map');

  var form = document.querySelector('.ad-form');
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var mapFilters = map.querySelector('.map__filters');
  var mapInputs = mapFilters.querySelectorAll('input');
  var mapSelects = mapFilters.querySelectorAll('select');
  var descriptionField = [form.querySelector('#description')];
  var buttomSubmit = form.querySelector('.ad-form__submit');

  window.main = {
    variables: {
      form: form,
      map: map
    },
  };

  var deactivateMap = function () {
    deps.disableElements(formInputs);
    deps.disableElements(formSelects);
    deps.disableElements(mapInputs);
    deps.disableElements(mapSelects);
    deps.disableElements(descriptionField);
  };
  deactivateMap();

  var mainPin = map.querySelector('.map__pin--main');
  var activeMap = function () {
    deps.activationElements(formInputs);
    deps.activationElements(formSelects);
    deps.activationElements(mapInputs);
    deps.activationElements(mapSelects);
    deps.activationElements(descriptionField);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    deps.load(deps.success, deps.error);
  };

  var mainPinSizes = deps.measureElement(mainPin);

  var mainPinCoordinate = deps.getElementСoordinate(mainPin, mainPinSizes);

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


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    buttomSubmit.setAttribute('disabled', 'disabled');
    deps.uploadForm(new FormData(form), function () {
      var similarSuccessPopup = document.querySelector('#success')
      .content
      .querySelector('.success');
      var successPopup = similarSuccessPopup.cloneNode(true);
      map.appendChild(successPopup);
      var closeSuccessPopup = function () { // временный код
        map.removeChild(successPopup);
        document.removeEventListener('keydown', onDocumentEscPress);
        document.removeEventListener('click', onDocumentClick);
      };
      var onDocumentEscPress = function (evtPress) {
        if (evtPress.keyCode === deps.keyCode.ESC) {
          closeSuccessPopup();
        }
      };

      var onDocumentClick = function () {
        closeSuccessPopup();
      };

      document.addEventListener('keydown', onDocumentEscPress);
      document.addEventListener('click', onDocumentClick);
      buttomSubmit.removeAttribute('disabled', 'disabled');
    });
  });


})({
  disableElements: window.utils.disableElements,
  activationElements: window.utils.activationElements,
  load: window.advert.load,
  measureElement: window.utils.measureElement,
  getElementСoordinate: window.utils.getElementСoordinate,
  success: window.advert.success,
  keyCode: window.advert.keyCode,
  error: window.advert.error,
  uploadForm: window.uploadForm

});
