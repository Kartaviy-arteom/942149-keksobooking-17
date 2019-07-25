'use strict';

(function (deps) {
  var similarCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var card = similarCard.cloneNode(true);
  var similarHousePhoto = card.querySelector('.popup__photos img');
  var cardProperties = {
    avatar: card.querySelector('.popup__avatar'),
    cardTitle: card.querySelector('.popup__title'),
    address: card.querySelector('.popup__text--address'),
    price: card.querySelector('.popup__text--price'),
    type: card.querySelector('.popup__type'),
    cardCapacity: card.querySelector('.popup__text--capacity'),
    time: card.querySelector('.popup__text--time'),
    featuresList: card.querySelector('.popup__features'),
    description: card.querySelector('.popup__description'),
    housePhotoList: card.querySelector('.popup__photos'),
  };

  var renderCard = function (advert) {
    var houseToAnotherHouse = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };
    var room = (advert.offer.rooms === 1) ? ' комната для ' : ' комнаты для ';
    var guest = (advert.offer.guests === 1) ? ' гостя' : ' гостей';

    cardProperties.avatar.setAttribute('src', advert.author.avatar);
    cardProperties.cardTitle.textContent = advert.offer.title;
    cardProperties.address.textContent = advert.offer.address;
    cardProperties.price.textContent = advert.offer.price + '₽/ночь';
    cardProperties.type.textContent = houseToAnotherHouse[advert.offer.type];


    cardProperties.cardCapacity.textContent = advert.offer.rooms + room + advert.offer.guests + guest;
    cardProperties.time.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

    var offerFeatures = (advert.offer.features).map(function (element) {
      return 'popup__feature popup__feature--' + element;
    });
    Array.from(cardProperties.featuresList.children).forEach(function (element) {
      if (offerFeatures.indexOf(element.className) === -1) {
        element.setAttribute('style', 'display: none;');
      } else {
        element.removeAttribute('style', 'display: none;');
      }
    });

    cardProperties.description.textContent = advert.offer.description;

    deps.deleteChildren(cardProperties.housePhotoList, 'popup__photo');
    advert.offer.photos.forEach(function (element) {
      var housePhoto = similarHousePhoto.cloneNode();
      housePhoto.setAttribute('src', element);
      cardProperties.housePhotoList.appendChild(housePhoto);
    });

    return card;
  };

  window.card = {
    renderCard: renderCard
  };

})({
  deleteChildren: window.utils.deleteChildren
});
