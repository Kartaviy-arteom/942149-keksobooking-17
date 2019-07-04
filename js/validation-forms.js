'use strict';
(function (deps) {
  var houseType = deps.form.querySelector('#type');
  var priceHouse = deps.form.querySelector('#price');

  houseType.addEventListener('change', function () {
    var houseTypeIndex = houseType.options.selectedIndex;
    if (houseType.options[houseTypeIndex].text === 'Бунгало') {
      priceHouse.setAttribute('min', '0');
      priceHouse.setAttribute('placeholder', '0');
    }
    if (houseType.options[houseTypeIndex].text === 'Квартира') {
      priceHouse.setAttribute('min', '1000');
      priceHouse.setAttribute('placeholder', '1000');
    }
    if (houseType.options[houseTypeIndex].text === 'Дом') {
      priceHouse.setAttribute('min', '5000');
      priceHouse.setAttribute('placeholder', '5000');
    }
    if (houseType.options[houseTypeIndex].text === 'Дворец') {
      priceHouse.setAttribute('min', '10000');
      priceHouse.setAttribute('placeholder', '10000');
    }
  });

  var checkInTime = window.main.variables.form.querySelector('#timein');
  var checkOutTime = window.main.variables.form.querySelector('#timeout');

  checkInTime.addEventListener('change', function () {
    checkOutTime.options.selectedIndex = checkInTime.options.selectedIndex;
  });
  checkOutTime.addEventListener('change', function () {
    checkInTime.options.selectedIndex = checkOutTime.options.selectedIndex;
  });

})({
  form: window.main.variables.form
});
