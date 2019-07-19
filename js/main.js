'use strict';

(function (deps) {
  var map = document.querySelector('.map');

  var form = document.querySelector('.ad-form');
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var mapFilters = map.querySelector('.map__filters');
  var mapInputs = mapFilters.querySelectorAll('input');
  var mapSelects = mapFilters.querySelectorAll('select');
  var descriptionField = form.querySelector('#description');
  var buttomSubmit = form.querySelector('.ad-form__submit');
  var similarListElement = document.querySelector('.map__pins');

  window.main = {
    variables: {
      form: form,
      map: map
    },
  };

  var deactivatePage = function () {
    deps.deactivateForm();
    deps.disableElements(mapInputs);
    deps.disableElements(mapSelects);
    if (!map.classList.contains('map--faded')) {map.classList.add('map--faded')};

  };
  deactivatePage();

  var mainPin = map.querySelector('.map__pin--main');
  var activeMap = function () {  // наименование деактивация карты? Нужно ли разбить на две функции?
    deps.activateForm();
    deps.activationElements(mapInputs);
    deps.activationElements(mapSelects);
    map.classList.remove('map--faded');
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


  form.addEventListener('submit', function (evt) {  //РАБОТАЕТ ПРИ НЕАКТИВНОЙ КАРТЕ!!! Перенести в функцию активации карты
    evt.preventDefault();
    buttomSubmit.setAttribute('disabled', 'disabled');
    deps.uploadForm(new FormData(form), function () {
      var similarSuccessPopup = document.querySelector('#success')
      .content
      .querySelector('.success');
      var successPopup = similarSuccessPopup.cloneNode(true);
      map.appendChild(successPopup);
      var closeSuccessPopup = function () { // временный код
        successPopup.remove();
        document.removeEventListener('keydown', onDocumentEscPress); // keydown на документе
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
/////////
      resetForm();
       returnMainPin(mainPinCoordinate, mainPinSizes);
      insertCoordinate(mainPinCoordinate);
      deps.deleteChildren(similarListElement, 'map__pin', 'map__pin--main');
      deactivatePage();
      activated = false;
      var card = map.querySelector('.map__card ');// Поиск элемента, нужен ли?
      if (card) {card.remove();}; // убираю ошибку когда карты нет
    }, deps.error); // убирать buttomSubmit.removeAttribute('disabled', 'disabled'); при неудачном исходе тоже
    //

  });

  //возращение главного пина ... используется совместно с insertCoordinate(mainPinCoordinate);
  var returnMainPin = function (startCoords, pinSizes) {
    mainPin.setAttribute('style', 'left: ' + Math.ceil(startCoords.left - pinSizes.x / 2) + 'px; top: ' + Math.ceil(startCoords.top - pinSizes.y / 2) + 'px;');
  };

})({
  disableElements: window.utils.disableElements,
  activationElements: window.utils.activationElements,
  load: window.advert.load,
  measureElement: window.utils.measureElement,
  getElementСoordinate: window.utils.getElementСoordinate,
  success: window.advert.success,
  keyCode: window.advert.keyCode,
  error: window.advert.error,
  uploadForm: window.uploadForm,
  deleteChildren: window.utils.deleteChildren,
  deactivateForm: window.form.deactivateForm,
  activateForm: window.form.activateForm

});
