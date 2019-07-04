'use strict';

(function (deps) {

  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };
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
        JSON.parse(xhr.responseText);
      } catch (err) {
        alert('ALERT! RED CODE!');
      };
      if (xhr.status === 200) {
        onSuccess(JSON.parse(xhr.responseText));

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
      };
    };


    var onDocumentClick  = function (evt) {
      closeError();
    };

    errorButton.addEventListener('click', closeError);

    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', onDocumentClick);

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

