'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__container');
  window.mainPin = document.querySelector('.map__pin--main');

  function successHandler(newData) {
    for (var i = 0; i < newData.length; i++) {
      map.insertBefore(window.addCard(newData[i]), map.children[map.children.length - 1]);
      mapPinsContainer.appendChild(window.addPin(newData[i]));
    }
  }
  window.load(successHandler, window.errorHandler);

  var mapPin = mapPinsContainer.getElementsByTagName('button');
  var popup = map.getElementsByTagName('article');

  var noticeForm = document.querySelector('.notice__form');
  var noticeFormElement = document.querySelectorAll('.notice__form fieldset');

  // Клик на главную кнопку
  function onButtonClick() {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    Array.from(noticeFormElement).forEach(function (it) {
      it.disabled = false;
      return it;
    });
    for (var i = 0; i < Math.min(popup.length, 5); i++) {
      mapPin[i].style.display = 'block';
    }
  }
  // Нажатие на ESC при открытом объявлении
  function onPopupEscPress(event) {
    if (event.keyCode === ESC_KEYCODE) {
      for (var i = 0; i < popup.length; i++) {
        if (mapPin[i].classList.contains('map__pin--active')) {
          mapPin[i].classList.remove('map__pin--active');
          popup[i].style.display = 'none';
        }
      }
    }
  }

  // Показ/скрытие карточки объявления
  function showCard(event) {
    var target = event.target;
    if (target.className === 'map__pin') {
      target.classList.add('map__pin--active');
    } else if (target.parentNode.className === 'map__pin') {
      target.parentNode.classList.add('map__pin--active');
    }
    for (var i = 0; i < popup.length; i++) {
      if (mapPin[i].classList.contains('map__pin--active')) {
        popup[i].style.display = 'block';
      } else if (target === popup[i].children[1]) {
        popup[i].style.display = 'none';
        mapPin[i].classList.remove('map__pin--active');
      }
    }
    for (var j = 0; j < popup.length; j++) {
      if (mapPin[j].classList.contains('map__pin--active') && mapPin[j] !== target && mapPin[j].firstChild !== target) {
        mapPin[j].classList.remove('map__pin--active');
        popup[j].style.display = 'none';
      }
    }
  }

  map.addEventListener('click', showCard);
  document.addEventListener('keydown', onPopupEscPress);
  window.mainPin.addEventListener('mouseup', onButtonClick);

  /* Управление фильтрами

  var filterForm = document.querySelector('.map__filters');
  // var selectFeatures = filterForm.querySelectorAll('.map__filter');

  var housingFeatures = document.querySelector('#housing-features');
  var housingFeaturesCheckbox = housingFeatures.querySelectorAll('input');

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  function setHousingPriceValue(object) { // Функция приведения цен к общему значению
    var price = object.offer.price;
    if (housingPrice.value === 'middle' && price === Math.max(10000, Math.min(price, 50000))) {
      return true;
    } else if (housingPrice.value === 'low' && price === Math.min(price, 10000)) {
      return true;
    } else if (housingPrice.value === 'high' && price === Math.max(price, 50000)) {
      return true;
    } else if (housingPrice.value === 'any') {
      return true;
    } return false;
  }

  var checkedFeatures = Array.from(housingFeaturesCheckbox).filter(function (item) { // Создание массива из input checkbox
    return item.checked;
  }).map(function (item) {
    return item.value;
  });

  function getDifferenceElement(array) { // Сравнение массива input checkbox и массива объектов с сервера
    var differenceElem = checkedFeatures.filter(function (item) {
      return !array.includes(item);
    });
    return differenceElem.length;
  }

  var pinsData = [];

  function filterData(object, element) {
    if (object.offer.type === housingType.value || housingType.value === 'any' &&
        object.offer.rooms === housingRooms.value || housingRooms.value === 'any' &&
        object.offer.guests === housingGuests.value || housingGuests.value === 'any' &&
        setHousingPriceValue(object) === true && getDifferenceElement(object.offer.features) === 0) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }
  filterForm.addEventListener('change', function () {
    for (var i = 0; i < pinsData.length; i++) {
      filterData(pinsData[i], window.mapPins[i]);
    }
  });
*/
})();
