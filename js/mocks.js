'use strict';

(function (deps) {
  var similarListElement = document.querySelector('.map__pins');
  var similarPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var createMock = function (childElement, parentElement) {
    var types = ['palace', 'flat', 'house', 'bungalo'];
    var announcement = [];
    var mapX = deps.measureElement(parentElement).x;

    for (var i = 0; i < 8; i++) {
      announcement[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          type: deps.chooseRandomElement(types)
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

  window.mocks = {
    mock: mock,
  };
})({
  measureElement: window.utils.measureElement,
  chooseRandomElement: window.utils.chooseRandomElement
});
