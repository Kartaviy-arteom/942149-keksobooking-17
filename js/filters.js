'use strict';

(function (deps) {
  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingPrice = filtersForm.querySelector('#housing-price');

  var filterAds = function (allAdvers) {
    return allAdvers.filter(function(item) {
      var isHouseType = deps.isItTrueChoice(item.offer.type, houseType);
      var isGuestNumber = deps.isItTrueChoice(item.offer.guests, housingGuests);
      var isRoomNumber = deps.isItTrueChoice(item.offer.rooms, housingRooms);

      var housingPriceType = '';
      var housingPriceType = '';
      if (item.offer.price < 10000) {
        housingPriceType = 'low';
      } else if (item.offer.price >= 10000 && item.offer.price < 50000) {
        housingPriceType = 'middle';
      } else if (item.offer.price >= 50000) {
        housingPriceType = 'high';
      };
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
