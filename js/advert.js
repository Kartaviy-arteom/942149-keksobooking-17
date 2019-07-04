'use strict';

(function (deps) {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var similarListElement = document.querySelector('.map__pins');
  var similarErrorPopup = document.querySelector('#error')
    .content
    .querySelector('.error');


  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
  };

  var repeatLoad = function () {
    load(success, error);
  };

  var success = function (adverts) {
    deps.insertItems(adverts, deps.renderPin, similarListElement);
  };


  var error = function () {
    var errorPopup = similarErrorPopup.cloneNode(true);
    map.appendChild(errorPopup);
    var errorButton = map.querySelector('.error__button');

    var closeError = function () {
      map.removeChild(errorPopup);
      document.removeEventListener('click', onDocumentEscOrEnterPress);
      setTimeout(repeatLoad, 3000);
    };

    var onDocumentEscOrEnterPress = function (evt) {
      if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === ESC_KEYCODE) {
        closeError();
      };
    };

    errorButton.addEventListener('click', closeError);

    document.addEventListener('keydown', onDocumentEscOrEnterPress);
  };

  window.advert = {
    load: load,
    success: success,
    error: error
  };

})({
  insertItems: window.utils.insertItems,
  renderPin: window.utils.renderPin,
});

