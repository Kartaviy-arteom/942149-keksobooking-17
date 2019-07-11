'use strict';

(function (deps) {
  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var getPriceType = function (price) {
    var priceType = '';
    if (price < 10000) {
      priceType = 'low';
    } else if (price >= 10000 && price < 50000) {
      priceType = 'middle';
    } else if (price >= 50000) {
      priceType = 'high';
    };
    return priceType;
  };

  var filterAds = function (allAdvers) {
    return allAdvers.filter(function(item) {
      var isHouseType = deps.isItTrueChoice(item.offer.type, houseType);
      var isGuestNumber = deps.isItTrueChoice(item.offer.guests, housingGuests);
      var isRoomNumber = deps.isItTrueChoice(item.offer.rooms, housingRooms);

      var housingPriceType = getPriceType(item.offer.price);
      var isHousingPriceType = deps.isItTrueChoice(housingPriceType, housingPrice);

      var isFeature = function () {
        var houseFeatures = Array.from(filtersForm.querySelectorAll('.map__checkbox:checked'));
        var houseFeaturesValues = [];
        houseFeatures.forEach(function (item) {
          houseFeaturesValues.push(item.value);
        });
        return deps.isContain(item.offer.features, houseFeaturesValues);
      };
      return (isHouseType && isGuestNumber && isRoomNumber && isHousingPriceType && isFeature());
    });
  };

  window.filters = {
    filterAds:  filterAds
  };
})({
  isItTrueChoice: window.utils.isItTrueChoice,
  isContain: window.utils.isContain
});
