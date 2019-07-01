'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var similarPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var getPinSize = function (childElement, parentElement) {
    var pin = childElement.cloneNode(true);
    pin.setAttribute('style', 'visibility: hidden;');
    parentElement.appendChild(pin);
    var pinSizes = window.utils.measureElement(pin);
    parentElement.removeChild(pin);
    return pinSizes;
  };

  var createMock = function (childElement, parentElement) {
    var types = ['palace', 'flat', 'house', 'bungalo'];
    var announcement = [];
    var mapX = window.utils.measureElement(parentElement).x;

    for (var i = 0; i < 8; i++) {
      announcement[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          type: window.utils.chooseRandomElement(types)
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

  window.mocks = {
    mock: mock,
    renderPin: renderPin
  };
})();
