'use strict';

(function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var similarListElement = document.querySelector('.map__pins');
  var similarPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


  var chooseRandomElement = function (arr) {
    var randomElement = arr[Math.floor(Math.random(1) * arr.length)];
    return randomElement;
  };

  var measureElement = function (element) {
    var elementSizes = {
      x: element.offsetWidth,
      y: element.offsetHeight
    };
    return elementSizes;
  };

  var renderTestPin = function (similarPin, similarListElement) {
    var pin = similarPin.cloneNode(true);
    pin.setAttribute('style', 'visibility: hidden;');
    similarListElement.appendChild(pin);
    var pinSizes = measureElement(pin);
    similarListElement.removeChild(pin);
    return pinSizes;
  };

  var createMock = function (similarPin, similarListElement) {
    var types = ['palace', 'flat', 'house', 'bungalo'];
    var announcement = [];
    var pinSizes = renderTestPin(similarPin, similarListElement);
    var mapX = measureElement(similarListElement).x;

    for (var i = 0; i < 8; i++) {
      announcement[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          type: chooseRandomElement(types)
        },
        location: {
          x: Math.floor(Math.random() * ((mapX - pinSizes.x) + pinSizes.x / 2)),
          y: Math.floor(Math.random() * 500 + 130 + pinSizes.y)
        }
      };
    }
    return announcement;
  };
  console.log(createMock);

  var fragment = document.createDocumentFragment();
  var renderPin = function (i) {
    var mock = createMock(similarPin, similarListElement);
    var pin = similarPin.cloneNode(true);
    pin.setAttribute('style', 'left: ' + mock[i].location.x + 'px; top: ' + mock[i].location.y + 'px;');
    pin.querySelector('img').setAttribute('src', mock[i].author.avatar);
    pin.querySelector('img').setAttribute('alt', mock[i].offer.type);

    fragment.appendChild(pin);
  };

  for (var i = 0; i < 8; i++) {
    renderPin(i);
  }

  similarListElement.appendChild(fragment);
})();
