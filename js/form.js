'use strict';
(function (deps) {
  var PRICE_HOUSE_PLACEHOLDER = 5000;
  var ORIGINAL_BORDER_STYLE = '1px solid #d9d9d3';
  var INVALID_BORDER_STYLE = '2px solid red';
  var form = document.querySelector('.ad-form');
  var houseType = form.querySelector('#type');
  var priceHouse = form.querySelector('#price');
  var checkInTime = form.querySelector('#timein');
  var checkOutTime = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var formButtons = form.querySelectorAll('button');
  var descriptionField = form.querySelector('#description');
  var addressField = form.querySelector('#address');
  var titleField = form.querySelector('#title');
  var submitBtn = form.querySelector('.ad-form__submit');

  var onHouseTypeChange = function () {
    var houseToMinPrice = {
      'Бунгало': '0',
      'Квартира': '1000',
      'Дом': '5000',
      'Дворец': '10000'
    };
    var houseTypeIndex = houseType.options.selectedIndex;
    priceHouse.setAttribute('min', houseToMinPrice[houseType.options[houseTypeIndex].text]);
    priceHouse.setAttribute('placeholder', houseToMinPrice[houseType.options[houseTypeIndex].text]);
  };

  var onCheckInTimeChange = function () {
    checkOutTime.options.selectedIndex = checkInTime.options.selectedIndex;
  };

  var onCheckOutTimeChange = function () {
    checkInTime.options.selectedIndex = checkOutTime.options.selectedIndex;
  };

  var changeCapacity = function () {
    var roomToPlaces = {
      '1 комната': 'для 1 гостя',
      '2 комнаты': 'для 2 гостей, для 1 гостя',
      '3 комнаты': 'для 3 гостей, для 2 гостей, для 1 гостя',
      '100 комнат': 'не для гостей'
    };
    var roomNumberIndex = roomNumber.options.selectedIndex;
    var capacityVariants = roomToPlaces[roomNumber.options[roomNumberIndex].text].split(', ');
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].setAttribute('disabled', 'disabled');
      for (var j = 0; j < capacityVariants.length; j++) {
        if (capacity.options[i].text === capacityVariants[j]) {
          capacity.options[i].removeAttribute('disabled', 'disabled');
          capacity.options[i].selected = true;
        }
      }
    }
  };

  var insertCoordinate = function (coordinate) {
    addressField.value = coordinate.left + ', ' + coordinate.top;
  };

  insertCoordinate(deps.startMainPinCoord);

  var checkValidity = function (formElement, validBorderDesign, invalidBorderDesign) {
    formElement.validity.valid ? formElement.style.border = validBorderDesign : formElement.style.border = invalidBorderDesign;
  };
  var onSubmitBtnClick = function () {
    checkValidity (titleField, ORIGINAL_BORDER_STYLE, INVALID_BORDER_STYLE);
    checkValidity (priceHouse, ORIGINAL_BORDER_STYLE, INVALID_BORDER_STYLE);
  };

  var addValidation = function () {
    changeCapacity();
    checkInTime.addEventListener('change', onCheckInTimeChange);
    checkOutTime.addEventListener('change', onCheckOutTimeChange);
    houseType.addEventListener('change', onHouseTypeChange);
    roomNumber.addEventListener('change', changeCapacity);
    submitBtn.addEventListener('click', onSubmitBtnClick);
  };

  var removeValidation = function () {
    checkInTime.removeEventListener('change', onCheckInTimeChange);
    checkOutTime.removeEventListener('change', onCheckOutTimeChange);
    houseType.removeEventListener('change', onHouseTypeChange);
    roomNumber.removeEventListener('change', changeCapacity);
    submitBtn.removeEventListener('click', onSubmitBtnClick);
  };

  var deactivateForm = function () {
    deps.disableElements(formInputs);
    deps.disableElements(formSelects);
    deps.disableElements(formButtons);
    deps.disableElements([descriptionField]);
    if (!form.classList.contains('ad-form--disabled')) {
      form.classList.add('ad-form--disabled');
    };
    removeValidation();
    featuresList.removeEventListener('keydown', onFeaturesListKeydown);
  };

  var activateForm = function () {
    form.classList.remove('ad-form--disabled');
    deps.activationElements(formInputs);
    deps.activationElements(formSelects);
    deps.activationElements(formButtons);
    deps.activationElements([descriptionField]);
    addValidation();
    featuresList.addEventListener('keydown', onFeaturesListKeydown);
  };

  var featuresList = form.querySelector('.features');
  var onFeaturesListKeydown = function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      evt.target.checked ? evt.target.checked = false : evt.target.checked = true;
    };
  };

  window.form = {
    activateForm: activateForm,
    deactivateForm: deactivateForm,
    insertCoordinate: insertCoordinate
  };
})({
  disableElements: window.utils.disableElements,
  activationElements: window.utils.activationElements,
  startMainPinCoord: window.mainPin.startMainPinCoord
});
