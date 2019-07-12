'use strict';

(function (deps) {

  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  var filtersForm = document.querySelector('.map__filters');
  var main = document.querySelector('main');

  var similarListElement = document.querySelector('.map__pins');
  var similarErrorPopup = document.querySelector('#error')
    .content
    .querySelector('.error');


  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
    xhr.addEventListener('load', function () {

      try {
        if (xhr.status === 200) {
        onSuccess(JSON.parse(xhr.responseText));

        } else {
        onError()};

      } catch (err) {
          alert('ALERT! RED CODE!');
        };
    });
  };

  var repeatLoad = function () {
    load(success, error);
  };

  var success = function (adverts) {
    adverts.filter(function(advert) {
      return advert.offer;
    });/**/
    var data = adverts.slice();
    deps.insertItems(data.slice(0, 5), deps.renderPin, similarListElement);
    deps.renderCard(data[0]);

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
      }, 500);
    });
  };


  var error = function () {
    var errorPopup = similarErrorPopup.cloneNode(true);

    main.appendChild(errorPopup);
    var errorButton = main.querySelector('.error__button');

    var closeError = function () {
      main.removeChild(errorPopup);
      document.removeEventListener('keydown', onDocumentEscPress);
      document.removeEventListener('click', onDocumentClick);
      setTimeout(repeatLoad, 3000);
    };

    var onDocumentEscPress = function (evt) {
      if (evt.keyCode === KeyCode.ESC) {

        closeError();
      }
    };


    var onDocumentClick = function () {
      closeError();
    };

    errorButton.addEventListener('click', closeError);

    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', onDocumentClick);

  };

  window.advert = {
    load: load,
    success: success,
    error: error,
    keyCode: KeyCode
  };

})({
  insertItems: window.utils.insertItems,
  renderPin: window.utils.renderPin,
  deleteChildren: window.utils.deleteChildren,
  isItTrueChoice: window.utils.isItTrueChoice,
  isContain: window.utils.isContain,
  filterAds: window.filters.filterAds,
  renderCard: window.card.renderCard
});

