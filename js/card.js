'use strict';
(function () {
  function createFeatureElement(element, parent, array) {
    for (var i = 0; i < array.length; i++) {
      element[i].className = 'feature feature--' + array[i];
      parent.appendChild(element[i]);
    }
  }

  function translateToRus(object) {
    object = object.offer.type;
    var RusNames = {
      BUNGALO: 'Сарай',
      FLAT: 'Квартира',
      HOUSE: 'Дом'
    };
    for (var key in RusNames) {
      if (object === key.toLowerCase()) {
        object = RusNames[key];
      }
    }
    return object;
  }

  function createImgElement(array, parent) {
    for (var i = 0; i < array.length; i++) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.setAttribute('style', 'width: auto; height: 100px');
      li.appendChild(img).src = array[i];
      parent.appendChild(li);
    }
  }

  window.addCard = function (data) {
    var templateCardElement = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
    var featuresList = templateCardElement.querySelectorAll('ul:first-of-type li');
    var paragraphs = templateCardElement.querySelectorAll('p');
    templateCardElement.style.display = 'none';
    templateCardElement.querySelector('.popup__avatar').src = data.author.avatar;
    templateCardElement.querySelector('h3').textContent = data.offer.title;
    templateCardElement.querySelector('small').textContent = data.offer.address;
    templateCardElement.querySelector('.popup__price').innerHTML = data.offer.price + '&#x20BD;/ночь';
    templateCardElement.querySelector('h4').textContent = translateToRus(data);
    paragraphs[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей ';
    paragraphs[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    paragraphs[4].textContent = data.offer.description;
    templateCardElement.querySelector('.popup__pictures').innerHTML = '';
    createImgElement(data.offer.photos, templateCardElement.querySelector('.popup__pictures'));
    templateCardElement.querySelector('.popup__features').innerHTML = '';
    createFeatureElement(featuresList, templateCardElement.querySelector('.popup__features'), data.offer.features);
    return templateCardElement;
  };
})();
