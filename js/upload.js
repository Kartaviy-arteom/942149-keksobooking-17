'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.uploadForm = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function() {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
