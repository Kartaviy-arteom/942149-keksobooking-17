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

  var disableElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', 'disabled');
    };
  };

  var activationElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled', 'disabled');
    };
  };

  disableElements(formInputs);
  disableElements(formSelects);
  disableElements(mapInputs);
  disableElements(mapSelects);

  var mainPin = map.querySelector('.map__pin--main');

  mainPin.addEventListener('click', function () {
    ActiveMap();
  });
  var ActiveMap = function () {
    activationElements(formInputs);
    activationElements(formSelects);
    activationElements(mapInputs);
    activationElements(mapSelects);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    insertItems(mock, renderPin, similarListElement);
    mainPin.addEventListener('mouseup', function(evt) {  // как то странно работает? изменение происходит при клике
      insertCoordinate(mainActivePinCoordinate);
    });
  };

  // опреление начальных координат
  // измеряем размер начальной метки Mainpinsize
  var mainPinSizes = measureElement(mainPin);
  var getСoordinateElement = function (element, elementSizes) {
    var coordinate = {
      left: Math.floor(element.offsetLeft + elementSizes.x / 2),
      top:  Math.floor(element.offsetTop + elementSizes.y /2)
    };
    return coordinate;
  };

  var mainPinCoordinate = getСoordinateElement(mainPin, mainPinSizes);

  var addressField = document.getElementById('address');  //не могу найти элемент при использовании записи form.getElementById('address');
  var insertCoordinate = function (coordinate) {
    addressField.value = coordinate.left + ', ' + coordinate.top;
  };
  insertCoordinate(mainPinCoordinate);

  // координаты активного пина
  // пасивного + смещение по вертикали
  var GAP_PIN_Y = 53;
  var mainActivePinCoordinate = {
    left: mainPinCoordinate.left,
    top: mainPinCoordinate.top + GAP_PIN_Y
  };

})();
