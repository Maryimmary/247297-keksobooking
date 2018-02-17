'use strict';
(function () {
  
  var ESC_KEYCODE = 27;
  var mainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormElement = document.querySelectorAll('.notice__form fieldset');
  var address = document.querySelector('#address');

  // Клик на главную кнопку
  function onButtonClick() {
    window.map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    Array.from(noticeFormElement).forEach(function (it) {
      it.disabled = false;
      return it;
    });

    for (var i = 0; i < Math.min(window.mapPin.length, 5); i++) {
      window.mapPin[i].style.display = 'block';
    }
  }

  function closePopup(event) {
    var target = event.target;
    for (var i = 0; i < window.popup.length; i++) {
      if (target === window.popup[i].children[1]) {
        window.popup[i].style.display = 'none';
        window.mapPin[i].classList.remove('map__pin--active');
      }
    }
  }

  // Показ/скрытие карточки объявления
  function onPopupEscPress(event) {
    if (event.keyCode === ESC_KEYCODE) {
      for (var i = 0; i < window.mapPin.length; i++) {
        if (window.mapPin[i].classList.contains('map__pin--active')) {
          window.mapPin[i].classList.remove('map__pin--active');
          window.popup[i].style.display = 'none';
        }
      }
    }
  }

  window.mapPins.addEventListener('click', window.showCard);
  document.addEventListener('keydown', onPopupEscPress);
  mainPin.addEventListener('mouseup', onButtonClick);
  mainPin.addEventListener('click', onButtonClick);
  window.map.addEventListener('click', closePopup);

  // ПЕРЕНОС ГЛАВНОГО ПИНА
  var MAIN_PIN_LEFT_SHIFT = 31;
  var MAIN_PIN_TOP_SHIFT = 84;
  var MIN_TOP_OFFSET = 100;
  var MIN_BOTTOM_OFFSET = 500;

  address.value = 'x: ' + (mainPin.offsetLeft + MAIN_PIN_LEFT_SHIFT) + ', y: ' + (mainPin.offsetTop + MAIN_PIN_TOP_SHIFT);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var leftPosition = mainPin.offsetLeft - shift.x + MAIN_PIN_LEFT_SHIFT;
      var topPosition = mainPin.offsetTop - shift.y + MAIN_PIN_TOP_SHIFT;

      var currentY = Math.max(MIN_TOP_OFFSET, Math.min(MIN_BOTTOM_OFFSET, topPosition));
      address.value = 'x: ' + leftPosition + ', y: ' + currentY;

      mainPin.style.left = leftPosition - MAIN_PIN_LEFT_SHIFT + 'px';
      mainPin.style.top = currentY - MAIN_PIN_TOP_SHIFT + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  /* Управление фильтрами*/

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

  function successHandler(data) {
    pinsData = data;
    window.render(pinsData);
  }

  window.load(successHandler, window.errorHandler);

})();
