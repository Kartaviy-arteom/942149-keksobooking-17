'use strict';
(function (deps) {
  var PRICE_HOUSE_PLACEHOLDER = 5000;
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
  var resetBtn = form.querySelector('.ad-form__reset');

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

  var onResetBtnClick = function (evt) {
    evt.preventDefault();
    resetForm();
  };

  var resetForm = function () {
    var currentAddress = addressField.value;
    form.reset();
    addressField.value = currentAddress;
    priceHouse.setAttribute('placeholder', PRICE_HOUSE_PLACEHOLDER);
  };

  var addValidation = function () {
    changeCapacity();
    checkInTime.addEventListener('change', onCheckInTimeChange);
    checkOutTime.addEventListener('change', onCheckOutTimeChange);
    houseType.addEventListener('change', onHouseTypeChange);
    roomNumber.addEventListener('change', changeCapacity);
  };

  var removeValidation = function () {
    checkInTime.removeEventListener('change', onCheckInTimeChange);
    checkOutTime.removeEventListener('change', onCheckOutTimeChange);
    houseType.removeEventListener('change', onHouseTypeChange);
    roomNumber.removeEventListener('change', changeCapacity);
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
    resetBtn.removeEventListener('click', onResetBtnClick);
  };

  var activateForm = function () {
    form.classList.remove('ad-form--disabled');
    deps.activationElements(formInputs);
    deps.activationElements(formSelects);
    deps.activationElements(formButtons);
    deps.activationElements([descriptionField]);
    addValidation();
    resetBtn.addEventListener('click', onResetBtnClick);
  }

  window.form = {
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})({
  disableElements: window.utils.disableElements,
  activationElements: window.utils.activationElements
});
