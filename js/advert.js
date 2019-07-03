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
    xhr.timeout = 30000;

    xhr.open('GET', 'https://js.dump.academy/keksobooking/daa');
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
  };


  var success = function (adverts) {
    deps.insertItems(adverts, deps.renderPin, similarListElement);
  };
  var error = function () {
    var errorPopup = similarErrorPopup.cloneNode(true);
    map.appendChild(errorPopup);
    var errorButton = map.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      map.removeChild(errorPopup);
      setTimeout(load(success, error), 100000);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === ESC_KEYCODE) {
        map.removeChild(errorPopup);
        setTimeout(load(success, error), 100000);
      }
    });

  };

  window.advert = {
    load: load,
    success: success,
    error: error
  }

})({
  insertItems: window.utils.insertItems,
  renderPin: window.utils.renderPin,
});

