'use strict';

(function () {
  var map = document.querySelector('.map');

  var similarListElement = document.querySelector('.map__pins');
  var similarPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


  var chooseRandomElement = function (arr) {
    var randomElement = arr[Math.floor(Math.random() * arr.length)];
    return randomElement;
  };

  var measureElement = function (element) {
    var elementSizes = {
      x: element.offsetWidth,
      y: element.offsetHeight
    };
    return elementSizes;
  };

  var getPinSize = function (childElement, parentElement) {
    var pin = childElement.cloneNode(true);
    pin.setAttribute('style', 'visibility: hidden;');
    parentElement.appendChild(pin);
    var pinSizes = measureElement(pin);
    parentElement.removeChild(pin);
    return pinSizes;
  };

  var createMock = function (childElement, parentElement) {
    var types = ['palace', 'flat', 'house', 'bungalo'];
    var announcement = [];
    var mapX = measureElement(parentElement).x;

    for (var i = 0; i < 8; i++) {
      announcement[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          type: chooseRandomElement(types)
        },
        location: {
          x: Math.floor(Math.random() * mapX),
          y: Math.floor(Math.random() * 500 + 130)
        }
      };
    }
    return announcement;
  };

  var mock = createMock(similarPin, similarListElement);
  var pinSizes = getPinSize(similarPin, similarListElement);

  var renderPin = function (pinData) {
    var pin = similarPin.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.setAttribute('style', 'left: ' + (pinData.location.x + pinSizes.x / 2) + 'px; top: ' + (pinData.location.y - pinSizes.y) + 'px;');
    pinImage.setAttribute('src', pinData.author.avatar);
    pinImage.setAttribute('alt', pinData.offer.type);

    return pin;
  };

  var insertItems = function (items, renderItem, target) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < items.length; i++) {
      fragment.appendChild(renderItem(items[i]));
    }
    target.appendChild(fragment);
  };


  // 4-1

  var form = document.querySelector('.ad-form');
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var mapFilters = map.querySelector('.map__filters');
  var mapInputs = mapFilters.querySelectorAll('input');
  var mapSelects = mapFilters.querySelectorAll('select');
  var descriptionField = [form.querySelector('#description')];

  var disableElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', 'disabled');
    }
  };

  var activationElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled', 'disabled');
    }
  };

  disableElements(formInputs);
  disableElements(formSelects);
  disableElements(mapInputs);
  disableElements(mapSelects);
  disableElements(descriptionField);

  var mainPin = map.querySelector('.map__pin--main');
  var activeMap = function () {
    activationElements(formInputs);
    activationElements(formSelects);
    activationElements(mapInputs);
    activationElements(mapSelects);
    activationElements(descriptionField);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    insertItems(mock, renderPin, similarListElement);
  };

  var mainPinSizes = measureElement(mainPin);
  var getElementСoordinate = function (element, elementSizes) {
    var coordinate = {
      left: Math.floor(element.offsetLeft + elementSizes.x / 2),
      top: Math.floor(element.offsetTop + elementSizes.y / 2)
    };
    return coordinate;
  };

  var mainPinCoordinate = getElementСoordinate(mainPin, mainPinSizes);

  var addressField = document.getElementById('address');
  var insertCoordinate = function (coordinate) {
    addressField.value = coordinate.left + ', ' + coordinate.top;
  };
  insertCoordinate(mainPinCoordinate);

  var GAP_PIN_Y = 53;

  // валидация формы
  var houseType = form.querySelector('#type'); // не понятно, как осуществить поиск по id внутри nodelist formSelects
  var priceHouse = form.querySelector('#price');

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

  // время заезда и выезда
  var checkInTime = form.querySelector('#timein');
  var checkOutTime = form.querySelector('#timeout');

  checkInTime.addEventListener('change', function () {
    checkOutTime.options.selectedIndex = checkInTime.options.selectedIndex;
  });
  checkOutTime.addEventListener('change', function () {
    checkInTime.options.selectedIndex = checkOutTime.options.selectedIndex;
  });

  // перемещение пина
  var activated = false;
  var restrictMovement = function () {
    var TOP_MAP_RANGE = 630; // Хотя по сути это нижний предел!?
    var BOTTOM_MAP_RANGE = 130;
    var LEFT_MAP_RANGE = 0;
    var rightMapRange = map.offsetWidth - mainPin.offsetWidth;

    if (parseInt(mainPin.style.top, 10) > TOP_MAP_RANGE) {
      mainPin.style.top = TOP_MAP_RANGE + 'px';
    }
    if (parseInt(mainPin.style.top, 10) < BOTTOM_MAP_RANGE) {
      mainPin.style.top = BOTTOM_MAP_RANGE + 'px';
    }
    if (parseInt(mainPin.style.left, 10) < LEFT_MAP_RANGE) {
      mainPin.style.left = LEFT_MAP_RANGE;
    }
    if (parseInt(mainPin.style.left, 10) > rightMapRange) {
      mainPin.style.left = rightMapRange + 'px';
    }
  };

  var getCoords = function () {
    var mainActivePinCoordinate = {
      left: mainPin.offsetLeft,
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

})();
