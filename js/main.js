'use strict';

(function (deps) {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var buttomSubmit = form.querySelector('.ad-form__submit');
  var similarListElement = document.querySelector('.map__pins');
  var resetBtn = form.querySelector('.ad-form__reset');
  var isActivated = false;

  var insertCurentMainPinCoord = function () {
    deps.insertCoordinate(deps.getСurrentPinCoordinate());
  };

  var onMainPinMove = function () {
    if (!isActivated) {
      activePage();
      isActivated = true;
    }
    insertCurentMainPinCoord();
  };

  var deactivatePage = function () {
    deps.deactivateForm ();
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded')
    };
    deps.deactivateFilters();
    resetBtn.removeEventListener('click', onResetBtnClick);
    deps.activateMainPin(onMainPinMove);
  };
  deactivatePage();

  var onLoadSuccess = function (data) {
    deps.activateFilters();
    deps.initPins(data);
  };
  var onLoadError = function () {
    deps.showErrorPopup(onLoadErrorBtnClick);
  };
  var onLoadErrorBtnClick = function (evt) {
    evt.preventDefault();
    deps.load(onLoadSuccess, onLoadError);
  };

  var activePage = function () {
    deps.activateForm();
    map.classList.remove('map--faded');
    deps.load(onLoadSuccess, onLoadError);
    resetBtn.addEventListener('click', onResetBtnClick);
  };


  deps.initMainPinMovement(onMainPinMove);

  var resetPage = function () {
    deactivatePage();
    deps.returnMainPin();
    deps.insertCoordinate(deps.startMainPinCoord);
    deps.deleteChildren(similarListElement, 'map__pin', 'map__pin map__pin--main');
    isActivated = false;
    var card = map.querySelector('.map__card ');
    if (card) {
      card.remove();
    };
  };
  var onUploadSuccess = function () {
    deps.showSuccessPopup();
    resetPage();
  };

  var onUploadRepeatBtnClick = function (evt) {
    evt.preventDefault();
    deps.upload(new FormData(form), onUploadSuccess, onUploadError);
  };
  var onUploadError = function () {
    deps.showErrorPopup(onUploadRepeatBtnClick);
    buttomSubmit.removeAttribute('disabled', 'disabled');
  };
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    buttomSubmit.setAttribute('disabled', 'disabled');
    deps.upload(new FormData(form), onUploadSuccess, onUploadError);

  });

  var onResetBtnClick = function (evt) {
    evt.preventDefault();
    resetPage();
  };

})({
  load: window.xhrRequest.load,
  upload: window.xhrRequest.upload,
  initPins: window.advert.initPins,
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
  startMainPinCoord: window.mainPin.startMainPinCoord,
  deactivateFilters: window.filters.deactivateFilters,
  activateFilters: window.filters.activateFilters,
  activateMainPin: window.mainPin.activateMainPin
});
