'use strict';

(function (deps) {
  var Price = {
    MIDDLE: 10000,
    HIGH: 50000
  };
  var filtersForm = document.querySelector('.map__filters');
  var filtersFormInputs = filtersForm.querySelectorAll('input');
  var filtersFormSelects = filtersForm.querySelectorAll('select');
  var houseType = filtersForm.querySelector('#housing-type');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var getPriceType = function (price) {
    var priceType = '';
    if (price < Price.MIDDLE) {
      priceType = 'low';
    } else if (price >= Price.MIDDLE && price < Price.HIGH) {
      priceType = 'middle';
    } else if (price >= Price.HIGH) {
      priceType = 'high';
    }
    return priceType;
  };

  var filterAds = function (allAdvers) {
    return allAdvers.filter(function (item) {
      var isHouseType = deps.isItTrueChoice(item.offer.type, houseType);
      var isGuestNumber = deps.isItTrueChoice(item.offer.guests, housingGuests);
      var isRoomNumber = deps.isItTrueChoice(item.offer.rooms, housingRooms);

      var housingPriceType = getPriceType(item.offer.price);
      var isHousingPriceType = deps.isItTrueChoice(housingPriceType, housingPrice);

      var isFeature = function () {
        var houseFeatures = Array.from(filtersForm.querySelectorAll('.map__checkbox:checked'));
        var houseFeaturesValues = houseFeatures.map(function (element) {
          return element.value;
        });
        return deps.isContain(item.offer.features, houseFeaturesValues);
      };
      return (isHouseType && isGuestNumber && isRoomNumber && isHousingPriceType && isFeature());
    });
  };

  var housingFeaturesField = filtersForm.querySelector('#housing-features');
  var onHousingFeaturesFieldKeydown = function (evt) {
    if (evt.keyCode === 13) {
      if (evt.target.checked) {
        evt.target.checked = false;
      } else {
        evt.target.checked = true;
      }
    }
  };

  var deactivateFilters = function () {
    if (!filtersForm.classList.contains('ad-form--disabled')) {
      filtersForm.classList.add('ad-form--disabled');
    }
    deps.disableElements(filtersFormInputs);
    deps.disableElements(filtersFormSelects);
    housingFeaturesField.removeEventListener('keydown', onHousingFeaturesFieldKeydown);
  };

  var activateFilters = function () {
    filtersForm.classList.remove('ad-form--disabled');
    housingFeaturesField.addEventListener('keydown', onHousingFeaturesFieldKeydown);
    deps.activationElements(filtersFormInputs);
    deps.activationElements(filtersFormSelects);
  };

  window.filters = {
    filterAds: filterAds,
    deactivateFilters: deactivateFilters,
    activateFilters: activateFilters
  };
})({
  isItTrueChoice: window.utils.isItTrueChoice,
  isContain: window.utils.isContain,
  disableElements: window.utils.disableElements,
  activationElements: window.utils.activationElements
});
