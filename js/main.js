'use strict';

(function (deps) {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var buttomSubmit = form.querySelector('.ad-form__submit');
  var similarListElement = document.querySelector('.map__pins');

  var deactivatePage = function () {
    deps.deactivateForm();
    if (!map.classList.contains('map--faded')) {map.classList.add('map--faded')};

  };
  deactivatePage();


  var activeMap = function () {
    deps.activateForm();
    map.classList.remove('map--faded');
    deps.load(deps.success, deps.error);
  };

  var isActivated = false;

  var insertCurentMainPinCoord = function () {
    deps.insertCoordinate(deps.getСurrentPinCoordinate());
  };

  deps.initMainPinMovement(isActivated, activeMap, insertCurentMainPinCoord);


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
      deps.deactivateForm();
      deps.returnMainPin();
      insertCoordinate(mainPinCoordinate);
      deps.deleteChildren(similarListElement, 'map__pin', 'map__pin--main');
      deactivatePage();
      isActivated = false;
      var card = map.querySelector('.map__card ');// Поиск элемента, нужен ли?
      if (card) {card.remove();}; // убираю ошибку когда карты нет
    }, deps.error); // убирать buttomSubmit.removeAttribute('disabled', 'disabled'); при неудачном исходе тоже
    //

  });

  //возращение главного пина ... используется совместно с insertCoordinate(mainPinCoordinate);
  /*var returnMainPin = function (startCoords, pinSizes) {
    mainPin.setAttribute('style', 'left: ' + Math.ceil(startCoords.left - pinSizes.x / 2) + 'px; top: ' + Math.ceil(startCoords.top - pinSizes.y / 2) + 'px;');
  };*/

})({
  disableElements: window.utils.disableElements,
  activationElements: window.utils.activationElements,
  load: window.advert.load,
  measureElement: window.utils.measureElement,

  success: window.advert.success,
  keyCode: window.advert.keyCode,
  error: window.advert.error,
  uploadForm: window.uploadForm,
  deleteChildren: window.utils.deleteChildren,
  deactivateForm: window.form.deactivateForm,
  activateForm: window.form.activateForm,
  initMainPinMovement: window.mainPin.initMainPinMovement,
  getСurrentPinCoordinate: window.mainPin.getСurrentPinCoordinate,
  insertCoordinate: window.form.insertCoordinate,
  returnMainPin: window.mainPin.returnMainPin

});
