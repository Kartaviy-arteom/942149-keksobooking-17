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
    deps.load(deps.success, deps.showErrorPopup);
  };

  var isActivated = false;

  var insertCurentMainPinCoord = function () {
    deps.insertCoordinate(deps.getСurrentPinCoordinate());
  };

  deps.initMainPinMovement(isActivated, activeMap, insertCurentMainPinCoord);
  console.log(isActivated);

  var onSuccess = function () { //наименование функции, глагол в функции?
    deps.showSuccessPopup();
    deps.deactivateForm();
    deps.returnMainPin();
    deps.insertCoordinate(deps.startMainPinCoord);
    deps.deleteChildren(similarListElement, 'map__pin', 'map__pin--main');
    deactivatePage();
    isActivated = false;
    var card = map.querySelector('.map__card ');
    if (card) {
      card.remove();
    };
  };

  var onError = function () { //наименование функции, глагол в функции?
    deps.showErrorPopup();
    buttomSubmit.removeAttribute('disabled', 'disabled');
  };
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    buttomSubmit.setAttribute('disabled', 'disabled');

    deps.upload(new FormData(form), onSuccess, onError);

  });

})({
  disableElements: window.utils.disableElements,
  activationElements: window.utils.activationElements,
  load: window.xhrRequest.load,
  upload: window.xhrRequest.upload,
  success: window.advert.success,
  keyCode: window.advert.keyCode,
  deleteChildren: window.utils.deleteChildren,
  deactivateForm: window.form.deactivateForm,
  activateForm: window.form.activateForm,
  initMainPinMovement: window.mainPin.initMainPinMovement,
  getСurrentPinCoordinate: window.mainPin.getСurrentPinCoordinate,
  insertCoordinate: window.form.insertCoordinate,
  returnMainPin: window.mainPin.returnMainPin,
  showErrorPopup: window.utils.showErrorPopup,
  showSuccessPopup: window.utils.showSuccessPopup,
  startMainPinCoord: window.mainPin.startMainPinCoord
});
