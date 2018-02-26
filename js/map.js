'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var MAX_ITEM_COUNT = 5;
  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__container');
  window.mainPin = document.querySelector('.map__pin--main');
  var arrayItem = [];

  function successHandler(newData) {
    for (var i = 0; i < newData.length; i++) {
      arrayItem.push(newData[i]);
    }
  }

  function renderData() {
    for (var i = 0; i < Math.min(arrayItem.length, MAX_ITEM_COUNT); i++) {
      map.insertBefore(window.addCard(arrayItem[i]), map.children[map.children.length - 1]);
      mapPinsContainer.appendChild(window.addPin(arrayItem[i]));
    }
  }

  var mapPin = mapPinsContainer.getElementsByTagName('button');
  var popup = map.getElementsByTagName('article');

  var noticeForm = document.querySelector('.notice__form');
  var noticeFormElement = document.querySelectorAll('.notice__form fieldset');

  // Клик на главную кнопку
  function onButtonClick() {
    renderData();
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    Array.from(noticeFormElement).forEach(function (it) {
      it.disabled = false;
      return it;
    });
  }

  // Нажатие на ESC при открытом объявлении
  function onPopupEscPress(event) {
    if (event.keyCode === ESC_KEYCODE) {
      for (var i = 0; i < popup.length; i++) {
        if (mapPin[i].classList.contains('map__pin--active')) {
          closeCard(i);
        }
      }
    }
  }

  function closeCard(index) {
    mapPin[index].classList.remove('map__pin--active');
    popup[index].style.display = 'none';
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function showCard(index) {
    mapPin[index].classList.add('map__pin--active');
    popup[index].style.display = 'block';
    document.addEventListener('keydown', onPopupEscPress);
  }

  // Показ/скрытие карточки объявления
  function cardToggler(event) {
    var target = event.target;
    for (var i = 0; i < mapPin.length; i++) {
      if (target === mapPin[i] || target === mapPin[i].firstChild && mapPin[i].className === 'map__pin') {
        showCard(i);
      } else if (target === popup[i].children[1]) {
        closeCard(i);
      } else if (mapPin[i].className !== ('map__pin') && mapPin[i] !== target && mapPin[i].firstChild !== target) {
        closeCard(i);
      }
    }
  }

  map.addEventListener('click', cardToggler);
  window.mainPin.addEventListener('mouseup', onButtonClick);

  // Управление фильтрами

  var filterForm = document.querySelector('.map__filters');

  var housingFeatures = document.querySelector('#housing-features'); // Список удобств
  var housingFeaturesCheckbox = housingFeatures.querySelectorAll('input'); // Чекбоксы удобств

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

  var checkedFeaturesArray = [];

  function getCheckedValue() {
    Array.from(housingFeaturesCheckbox).filter(function (item) {
      return item.checked;
    }).map(function (item) {
      checkedFeaturesArray.push(item.value);
      return checkedFeaturesArray;
    });
  }

  function getDifferenceElement(arrayData, arrayChecked) { // Сравнение массива input checkbox и массива объектов с сервера
    var differenceElem = arrayChecked.filter(function (item) {
      return !arrayData.includes(item);
    });
    return differenceElem.length;
  }

  housingFeatures.addEventListener('change', getCheckedValue);

  function filterData(object, element) {
    if ((object.offer.type === housingType.value || housingType.value === 'any') &&
      (object.offer.rooms.toString() === housingRooms.value || housingRooms.value === 'any') &&
      (object.offer.guests.toString() === housingGuests.value || housingGuests.value === 'any') &&
      (setHousingPriceValue(object) === true) &&
      (getDifferenceElement(object.offer.features, checkedFeaturesArray) === 0)) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }

  filterForm.addEventListener('change', function (evt) {
    var target = evt.target;
    for (var i = 0; i < filterForm.children.length; i++) {
      if (target === filterForm.children[i] || target.tagName === 'INPUT') {
        for (var j = 0; j < arrayItem.length; j++) {
          filterData(arrayItem[j], mapPin[j]);
        }
      }
    }
  });
  window.load(successHandler, window.errorHandler);
})();
