'use strict';

(function () {
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

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

  var similarListElement = document.querySelector('.map__pins');
  window.onSuccess = function (adverts) {
    window.utils.insertItems(adverts, window.utils.renderPin, similarListElement);
  };
  window.onError = function () {
    alert('red');
  };

})();

