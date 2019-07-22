'use strict';

(function (deps) {

  var KeyCode = {
    ESC: 27
  };
  var filtersForm = document.querySelector('.map__filters');
  var main = document.querySelector('main');

  var similarListElement = document.querySelector('.map__pins');

  var repeatLoad = function () {
    load(success, deps.showErrorPopup);
  };

  var success = function (adverts) {
    adverts.filter(function (advert) {
      return advert.offer;
    });
    var data = adverts.slice();
    deps.insertItems(data.slice(0, 5), deps.renderPin, similarListElement);

    var map = document.querySelector('.map__pins');


    var addHandler = function (pinData) {
      var pins = map.querySelectorAll('.map__pin');
      pins.forEach(function(element) {
        var onPinClick = function () {
          deps.insertItems([pinData[element.id.slice(5)]], deps.renderCard, map);

          var card = map.querySelector('.map__card ');
          var cardCloseButtom = card.querySelector('.popup__close');
          var onCardCloseButtomClick = function () {
            closePopup();
          };
          var onDocumentEscPress = function (evtPress) {
            if (evtPress.keyCode === KeyCode.ESC) {
              closePopup();
            }
          };
          var closePopup = function () {
            card.remove();
            document.removeEventListener('keydown', onDocumentEscPress);
            cardCloseButtom.removeEventListener('click', onCardCloseButtomClick);
          };
          document.addEventListener('keydown', onDocumentEscPress);
          cardCloseButtom.addEventListener('click', onCardCloseButtomClick);
        };
        if (element.className !== 'map__pin map__pin--main') {
          element.addEventListener('click', onPinClick);
        }
      });
    };

    addHandler(data);

    var lastTimeout;
    filtersForm.addEventListener('change', function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        deps.deleteChildren(similarListElement, 'map__pin', 'map__pin--main');
        var copyData = adverts.slice();
        var newData = deps.filterAds(copyData).slice(0, 5);
        deps.insertItems(newData, deps.renderPin, similarListElement);
        addHandler(newData);
      }, 500);
    });
  };

  window.advert = {
    success: success,
  };

})({
  insertItems: window.utils.insertItems,
  renderPin: window.utils.renderPin,
  deleteChildren: window.utils.deleteChildren,
  filterAds: window.filters.filterAds,
  renderCard: window.card.renderCard,
  showErrorPopup: window.utils.showErrorPopup
});

