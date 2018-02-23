'use strict';
(function () {
  function getRandomNumber(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function getRandomArray(inputArray) {
    var randomOfferFeatures = [];
    for (var i = 0; i < inputArray.length; i++) {
      if (getRandomNumber(2, inputArray.length + 1) % 2 !== 0) {
        randomOfferFeatures.push(inputArray[i]);
      }
    }
    return randomOfferFeatures;
  }

  function compareRandom() {
    return Math.random() - 0.5;
  }

  var offerTitle = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  offerTitle.sort(compareRandom);

  var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerType = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  /* Основной массив */
  window.advertisementArray = [];
  var maxLength = 8;
  for (var i = 0; i < maxLength; i++) {

    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(150, 500);

    var advertisement = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: offerTitle[i], // не должно повторяться
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 10000000),
        type: offerType[Object.keys(offerType)[getRandomNumber(0, Object.keys(offerType).length - 1)]], // может повторяться
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 6),
        checkin: getRandomNumber(12, 14) + ':00',
        checkout: getRandomNumber(12, 14) + ':00',
        features: getRandomArray(offerFeatures),
        description: '',
        photos: photos.sort(compareRandom)
      },

      location: {
        x: locationX,
        y: locationY
      }
    };
    window.advertisementArray.push(advertisement);
  }
})();

