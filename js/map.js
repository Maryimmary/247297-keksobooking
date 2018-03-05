'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var MAX_ITEM_COUNT = 5;
  var objects = [];

  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__container');
  var mapPin = mapPinsContainer.getElementsByTagName('button');
  var popup = map.getElementsByTagName('article');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormElement = document.querySelectorAll('.notice__form fieldset');

  window.globalProperies = {
    mainPin: document.querySelector('.map__pin--main'),
    onFormReset: function () {
      map.classList.add('map--faded');
      this.mainPin.style = 'left: 600px; top: 375px';
      for (var i = 0; i < mapPin.length; i++) {
        mapPin[i].style.display = 'none';
        popup[i].style.display = 'none';
      }
      noticeForm.reset();
      filterForm.reset();
      noticeForm.classList.add('notice__form--disabled');
      Array.from(noticeFormElement).forEach(function (it) {
        it.disabled = true;
      });
    }
  };

  function successHandler(data) {
    for (var i = 0; i < data.length; i++) {
      map.insertBefore(window.addCard(data[i]), map.lastElementChild);
      mapPinsContainer.appendChild(window.addPin(data[i]));
      objects.push(data[i]);
    }
  }

  window.backend.load(successHandler, window.messages.error);

  // Клик на главную кнопку
  function onButtonClick() {
    if (map.classList.contains('map--faded') && mapPin.length) {
      map.classList.remove('map--faded');
      for (var i = 0; i < Math.min(mapPin.length, MAX_ITEM_COUNT); i++) {
        if (checkCountPin() < MAX_ITEM_COUNT) {
          mapPin[i].style.display = 'block';
        } else {
          return;
        }
      }
    }
    noticeForm.classList.remove('notice__form--disabled');
    Array.from(noticeFormElement).forEach(function (it) {
      it.disabled = false;
    });
  }

  // Приведение элементов в исходное состояние при сбросе формы
  window.onFormReset = function () {
    map.classList.add('map--faded');
    window.globalProperies.mainPin.style = 'left: 600px; top: 375px';
    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].style.display = 'none';
      popup[i].style.display = 'none';
    }
    noticeForm.reset();
    filterForm.reset();
    noticeForm.classList.add('notice__form--disabled');
    Array.from(noticeFormElement).forEach(function (it) {
      it.disabled = true;
    });
  };

  // Функции, определющию поведение карточек
  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      for (var i = 0; i < popup.length; i++) {
        if (mapPin[i].className === 'map__pin map__pin--active') {
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
  function onCardToggle(event) {
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

  map.addEventListener('click', onCardToggle);
  window.globalProperies.mainPin.addEventListener('mouseup', onButtonClick);

  // Управление фильтрами отелей, загруженных с сервера
  var filterForm = document.querySelector('.map__filters');
  var housingFeatures = document.querySelector('#housing-features');
  var housingFeaturesCheckbox = housingFeatures.querySelectorAll('input');

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');

  function setHousingPriceValue(object) { // Функция приведения цен к общему значению
    var price = object;
    return housingPrice.value === 'middle' && price === Math.max(10000, Math.min(price, 50000)) ||
      housingPrice.value === 'low' && price === Math.min(price, 10000) ||
      housingPrice.value === 'high' && price === Math.max(price, 50000) ||
      housingPrice.value === 'any';
  }

  var checkedFeatures = [];

  function onFeaturesChange() { // Получить массив значений выбранных чекбоксов
    checkedFeatures = Array.from(housingFeaturesCheckbox).filter(function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });
  }

  housingFeatures.addEventListener('change', onFeaturesChange);

  function getDifferenceElement(arrayData, arrayChecked) { // Сравнение массива выбранных чекбоксов и массива значений объектов с сервера
    var differenceElements = arrayChecked.filter(function (item) {
      return !arrayData.includes(item);
    });
    return differenceElements.length;
  }

  function checkCountPin() { // Проверка количества отображаемых на странице отелей
    var excess = Array.from(mapPin).filter(function (item) {
      return item.style.display === 'block';
    });
    return excess.length;
  }

  function onFilterChange() { // Подбор удоблетворяющих требованиям отелей
    for (var i = 0; i < mapPin.length; i++) {
      if ((objects[i].offer.type === housingType.value || housingType.value === 'any') &&
        (objects[i].offer.rooms.toString() === housingRoom.value || housingRoom.value === 'any') &&
        (objects[i].offer.guests.toString() === housingGuest.value || housingGuest.value === 'any') &&
        (setHousingPriceValue(objects[i].offer.price)) &&
        (!getDifferenceElement(objects[i].offer.features, checkedFeatures))) {
        if (checkCountPin() < MAX_ITEM_COUNT) {
          mapPin[i].style.display = 'block';
        }
      } else {
        mapPin[i].style.display = 'none';
      }
    }
  }

  filterForm.addEventListener('change', window.debounce(onFilterChange));
})();
