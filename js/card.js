'use strict';

(function () {
  var similarCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map__pins');

  var renderCard = function (advert) {
    var fragment = document.createDocumentFragment();
    var card = similarCard.cloneNode(true);
    var avatar = card.querySelector('.popup__avatar');
    var cardTitle = card.querySelector('.popup__title');
    var address = card.querySelector('.popup__text--address');
    var price = card.querySelector('.popup__text--price');
    var type = card.querySelector('.popup__type');
    var cardCapacity = card.querySelector('.popup__text--capacity');
    var time = card.querySelector('.popup__text--time');
    var featuresList = card.querySelector('.popup__features');
    var description = card.querySelector('.popup__description');
    var similarHousePhoto = card.querySelector('.popup__photos img');
    var housePhotoList = card.querySelector('.popup__photos');

    var houseToAnotherHouse = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };

    avatar.setAttribute('src', advert.author.avatar);
    cardTitle.textContent = advert.offer.title;
    address.textContent = advert.offer.address;
    price.textContent = advert.offer.price + '₽/ночь';
    type.textContent = houseToAnotherHouse[advert.offer.type];
    cardCapacity.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей'; // если одна комната и один гость
    time.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

    var offerFeatures = (advert.offer.features).map(function (element) {
      return 'popup__feature popup__feature--' + element;
    });
    Array.from(featuresList.children).forEach(function(element) {
      if (offerFeatures.indexOf(element.className) === -1) {
        element.remove();
      }
    });

    description.textContent = advert.offer.description;

    advert.offer.photos.forEach(function (element) {
      var housePhoto = similarHousePhoto.cloneNode();
      housePhoto.setAttribute('src', element);
      housePhotoList.appendChild(housePhoto);
    });
    housePhotoList.children[0].remove ();

    fragment.appendChild(card);
    map.appendChild(fragment);
  };

  window.card = {
    renderCard: renderCard
  };

})();
