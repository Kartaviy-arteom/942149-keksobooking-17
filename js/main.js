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

  var renderTestPin = function (childElement, parentElement) {
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
    var pinSizes = renderTestPin(childElement, parentElement);
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
          x: Math.floor(Math.random() * (mapX - pinSizes.x)),
          y: Math.floor(Math.random() * 500 + 130 + pinSizes.y)
        }
      };
    }
    return announcement;
  };

  var fragment = document.createDocumentFragment();
  var renderPin = function (i) {
    var mock = createMock(similarPin, similarListElement);
    var pin = similarPin.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.setAttribute('style', 'left: ' + mock[i].location.x + 'px; top: ' + mock[i].location.y + 'px;');
    pinImage.setAttribute('src', mock[i].author.avatar);
    pinImage.setAttribute('alt', mock[i].offer.type);

    fragment.appendChild(pin);
  };

  var insertItems = function (items, renderItem, target) {
    for (var i = 0; i < 8; i++) {
      renderPin(i);
    }
    target.appendChild(items);
  };

  insertItems(fragment, renderPin, similarListElement);
})();
