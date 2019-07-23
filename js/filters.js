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

  // выбор по enter отписка (для доступности), удалять ли этот обработчик при деактивации страницы? Когда подписываться
  var housingFeaturesField = filtersForm.querySelector('#housing-features');
  housingFeaturesField.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      evt.target.checked ? evt.target.checked = false : evt.target.checked = true;
    };
  });
  //

  window.filters = {
    filterAds: filterAds
  };
})({
  isItTrueChoice: window.utils.isItTrueChoice,
  isContain: window.utils.isContain
});
