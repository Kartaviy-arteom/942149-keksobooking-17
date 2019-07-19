'use strict';
(function (deps) {
  var form = document.querySelector('.ad-form');
  var houseType = form.querySelector('#type');
  var priceHouse = form.querySelector('#price');
  var checkInTime = form.querySelector('#timein');
  var checkOutTime = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

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

  changeCapacity();
  checkInTime.addEventListener('change', onCheckInTimeChange);
  checkOutTime.addEventListener('change', onCheckOutTimeChange);
  houseType.addEventListener('change', onHouseTypeChange);
  roomNumber.addEventListener('change', changeCapacity);

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
})({
  disableElements: window.utils.disableElements,
  activationElements: window.utils.activationElements
});
