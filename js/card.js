'use strict';
(function () {
  window.map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  function createElement(element, parent, array) {
    for (var i = 0; i < array.length; i++) {
      element[i].className = 'feature feature--' + array[i];
      parent.appendChild(element[i]);
    }
  }

  function addCard(data) {
    var templateCardElement = window.templateElement.querySelector('.map__card').cloneNode(true);
    var featuresList = templateCardElement.querySelectorAll('ul:first-of-type li');
    var paragraphs = templateCardElement.querySelectorAll('p');
    templateCardElement.querySelector('.popup__avatar').src = data.author.avatar;
    templateCardElement.querySelector('h3').textContent = data.offer.title;
    templateCardElement.querySelector('small').textContent = data.offer.address;
    templateCardElement.querySelector('.popup__price').innerHTML = data.offer.price + '&#x20BD;/ночь';
    templateCardElement.querySelector('h4').textContent = data.offer.type;
    paragraphs[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей ';
    paragraphs[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    paragraphs[4].textContent = data.offer.description;
    templateCardElement.querySelector('.popup__pictures').querySelector('img').src = [];
    templateCardElement.querySelector('.popup__features').innerHTML = '';
    createElement(featuresList, templateCardElement.querySelector('.popup__features'), data.offer.features);
    return templateCardElement;
  }

  window.render = function (newData) {
    for (var j = 0; j < newData.length; j++) {
      window.map.insertBefore(addCard(newData[j]), mapFiltersContainer);
    }
  };
})();
