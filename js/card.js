'use strict';

 (function () {
    var similarCard = document.querySelector('#card')
      .content
      .querySelector('.map__card');

    var renderCard = function (advert) {
      var card = similarCard.cloneNode(true);
      var avatar = card.querySelector('.popup__avatar');
      var cardTitle = card.querySelector('.popup__title');
      var address = card.querySelector('.popup__text--address');
      var price = card.querySelector('.popup__text--price');
      var type = card.querySelector('.popup__type');
      var cardCapacity = card.querySelector('.popup__text--capacity');
      var time = card.querySelector('.popup__text--time');

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
      time.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + 'advert.offer.checkout';
    };

 })();
