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
    var data = adverts.slice();
    deps.insertItems(data.slice(0, 5), deps.renderPin, similarListElement);

    //
    var filtersForm = document.querySelector('.map__filters');
    var houseType = filtersForm.querySelector('#housing-type');
    var housingGuests = filtersForm.querySelector('#housing-guests');
    filtersForm.addEventListener('change', function () {
      Array.from(similarListElement.children).forEach(function (element) {
        if (element.className !== 'map__pin--main' && element.className === 'map__pin') {
          element.remove();
        }
      });
      var copyData = adverts.slice();
      console.log(copyData);
      var newData = copyData.filter(function(item) {
        var isHouseType = Boolean(item.offer.type === houseType.options[houseType.options.selectedIndex].value || houseType.options[houseType.options.selectedIndex].value === 'any');
        var isGuestNumber = Boolean(String(item.offer.guests) === housingGuests.options[housingGuests.options.selectedIndex].value || housingGuests.options[housingGuests.options.selectedIndex].value === 'any');
        return (isHouseType && isGuestNumber);

      })
      .slice(0, 5);
      console.log(newData);
      deps.insertItems(newData, deps.renderPin, similarListElement); // Теряется 3 элемент при выводе бунгало!!!
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
});

