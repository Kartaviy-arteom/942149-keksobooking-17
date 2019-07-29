'use strict';

(function () {
  var SUCCESSFUL_RESPONSE = 200;
  var GetRequestParameter = {
    METHOD: 'GET',
    URL: 'https://js.dump.academy/keksobooking/data',
  };

  var PostRequestParameter = {
    METHOD: 'POST',
    URL: 'https://js.dump.academy/keksobooking'
  };
  var xhrRequest = function (requestParameter, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(requestParameter.METHOD, requestParameter.URL);
    xhr.send(data);
    xhr.addEventListener('load', function () {

      try {
        if (xhr.status === SUCCESSFUL_RESPONSE) {
          onSuccess(JSON.parse(xhr.responseText));

        } else {
          onError();
        }

      } catch (err) {
        onError();
      }
    });
  };

  var load = function (onSuccess, onError) {
    xhrRequest(GetRequestParameter, onSuccess, onError);
  };
  var upload = function (data, onSuccess, onError) {
    xhrRequest(PostRequestParameter, onSuccess, onError, data);
  };

  window.xhrRequest = {
    load: load,
    upload: upload
  };

})();
