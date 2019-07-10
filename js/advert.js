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
    var housingRooms = filtersForm.querySelector('#housing-rooms');
    var housingPrice = filtersForm.querySelector('#housing-price');
    filtersForm.addEventListener('change', function () {
      deps.deleteChildren(similarListElement, 'map__pin', 'map__pin--main');

      var copyData = adverts.slice();
      var newData = copyData.filter(function(item) {
        var isHouseType = deps.isItTrueChoice(item.offer.type, houseType);
        var isGuestNumber = deps.isItTrueChoice(item.offer.guests, housingGuests);
        var isRoomNumber = deps.isItTrueChoice(item.offer.rooms, housingRooms);

        var housingPriceType = '';
        if (item.offer.price < 10000) {
          housingPriceType = 'low';
        } else if (item.offer.price >= 10000 && item.offer.price < 50000) {
          housingPriceType = 'middle';
        } else if (item.offer.price >= 50000) {
          housingPriceType = 'high';
        };
        var isHousingPriceType = deps.isItTrueChoice(housingPriceType, housingPrice);
        // features in house
        var houseFeatures = Array.from(filtersForm.querySelectorAll('.map__checkbox:checked'));
        var houseFeaturesValues = [];
        houseFeatures.forEach(function(item) {
          houseFeaturesValues.push(item.value);
        });
        var isContain = function (allegedParentArray, allegedChildArray) {
          for (var i = 0; i < allegedChildArray.length; i++) {
            if (allegedParentArray.indexOf(allegedChildArray[i]) === -1) return false;
          }
          return true;
        };
        var isFeature = isContain(item.offer.features, houseFeaturesValues);

        return (isHouseType && isGuestNumber && isRoomNumber && isHousingPriceType && isFeature);

      })
      .slice(0, 5);
      deps.insertItems(newData, deps.renderPin, similarListElement);
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
  isItTrueChoice: window.utils.isItTrueChoice
});

