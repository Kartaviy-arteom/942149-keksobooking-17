'use strict';

(function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

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



  var renderPin = function (i, pinOffset, childElement, parentElement) {

    var mock = createMock(childElement, parentElement);
    var pin = similarPin.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.setAttribute('style', 'left: ' + (mock[i].location.x + pinOffset.x / 2) + 'px; top: ' + (mock[i].location.y - pinOffset.y) + 'px;');
    pinImage.setAttribute('src', mock[i].author.avatar);
    pinImage.setAttribute('alt', mock[i].offer.type);

    return pin;
  };

  var insertItems = function (renderItem, target, childElement, parentElement) {
    var pinOffset = getPinSize(childElement, parentElement);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 8; i++) {
      fragment.appendChild(renderItem(i, pinOffset, childElement, parentElement));
    }
    target.appendChild(fragment);
  };

  insertItems(renderPin, similarListElement, similarPin, similarListElement);
})();
