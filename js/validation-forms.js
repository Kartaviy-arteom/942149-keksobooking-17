'use strict';
(function (deps) {
  var houseType = deps.form.querySelector('#type');
  var priceHouse = deps.form.querySelector('#price');

  houseType.addEventListener('change', function () {
    var houseToMinPrice = {
      'Бунгало': '0',
      'Квартира': '1000',
      'Дом': '5000',
      'Дворец': '10000'
    };
    var houseTypeIndex = houseType.options.selectedIndex;

    priceHouse.setAttribute('min', houseToMinPrice[houseType.options[houseTypeIndex].text]);
    priceHouse.setAttribute('placeholder', houseToMinPrice[houseType.options[houseTypeIndex].text]);
  });

  var checkInTime = window.main.variables.form.querySelector('#timein');
  var checkOutTime = window.main.variables.form.querySelector('#timeout');

  checkInTime.addEventListener('change', function () {
    checkOutTime.options.selectedIndex = checkInTime.options.selectedIndex;
  });
  checkOutTime.addEventListener('change', function () {
    checkInTime.options.selectedIndex = checkOutTime.options.selectedIndex;
  });

  var changeCapacity = function () {
    var roomToPlaces = {
      '1 комната': 'для 1 гостя',
      '2 комнаты': 'для 2 гостей, для 1 гостя',
      '3 комнаты': 'для 3 гостей, для 2 гостей, для 1 гостя',
      '100 комнат': 'не для гостей'
    };
    var roomNumber = deps.form.querySelector('#room_number');
    var capacity = deps.form.querySelector('#capacity');
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

    roomNumber.addEventListener('change', changeCapacity);
  };

  changeCapacity();

  window.validationForms = {
    'changeCapacity': changeCapacity
  };

})({
  form: window.main.variables.form,
  disableElements: window.utils.disableElements,
  activationElements: window.utils.activationElements
});
