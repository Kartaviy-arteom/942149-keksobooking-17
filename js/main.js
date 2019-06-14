'use strict';

(function () {
  var mapUnfaded = document.querySelector('.map');
  mapUnfaded.classList.remove('map--faded');

  var chooseRandomElement = function (arr) {
    var randomElement = arr[Math.round(Math.random(1) * (arr.length -1))];
    return randomElement;
  };

  var measureWidthMap = function (classNameMap) {
    var map = document.querySelector(classNameMap);
    return map.offsetWidth;
  };

  measureWidthMap('.map__pins');

  var createMock = function() {
    var types = ['palace', 'flat', 'house', 'bungalo'];
    var announcement = [];

    for (var i = 0; i < 8; i++) {
      announcement[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          type: chooseRandomElement(types)
        },
        location: {
          x: Math.round(Math.random() * measureWidthMap('.map__pins')),
          y: Math.round(Math.random() * 500 + 130)
        }
      }
    }
    return announcement;
  };

  var renderPin = function () {
    var mock = createMock();
    var similarListElement = document.querySelector('.map__pins');
    var similarPin = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

    for (var i = 0; i < mock.length; i++) {
      var pin = similarPin.cloneNode(true);
      pin.setAttribute('style','left: ' + mock[i].location.x + 'px; top: ' + mock[i].location.y + 'px;');
      pin.querySelector('img').setAttribute('src', mock[i].author.avatar);
      pin.querySelector('img').setAttribute('alt', mock[i].offer.type);

      similarListElement.appendChild(pin);
    }
  };
  renderPin();
})();
