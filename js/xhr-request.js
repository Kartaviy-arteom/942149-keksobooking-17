'use strict';

(function () {
  var GetRequestParameter = {
    METHOD: 'GET',
    URL: 'https://js.dump.academy/keksobooking/dta',
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
        if (xhr.status === 200) {
          onSuccess(JSON.parse(xhr.responseText));

        } else {
          onError();
        }

      } catch (err) {
        console.log(err);
        onError();
      }
    });
  };

  var load = function (onSuccess, onError) {
    xhrRequest(GetRequestParameter, onSuccess, onError);
  };
  var upload = function ( data, onSuccess, onError) {
    xhrRequest(PostRequestParameter, onSuccess, onError, data);
  };

  window.xhrRequest = {
    load: load,
    upload: upload
  };

})();
