'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var MAX_ITEM_COUNT = 5;
  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__container');
  window.mainPin = document.querySelector('.map__pin--main');
  var dataObjects = [];
  console.log(dataObjects);

  function successHandler(newData) {
    for (var i = 0; i < newData.length; i++) {
      dataObjects.push(newData[i]);
    }
  }

  function renderData() {
    for (var i = 0; i < Math.min(dataObjects.length, MAX_ITEM_COUNT); i++) {
      map.insertBefore(window.addCard(dataObjects[i]), map.lastElementChild); // or map.children[map.children.length - 1]
      mapPinsContainer.appendChild(window.addPin(dataObjects[i]));
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
  function toggleCard(event) {
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

  map.addEventListener('click', toggleCard);

  window.mainPin.addEventListener('mouseup', function () {
    if (dataObjects.length !== 0) {
      onButtonClick();
    } else {
      setTimeout(onButtonClick, 1000);
    }
  });

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
    checkedFeaturesArray = Array.from(housingFeaturesCheckbox).filter(function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });
    console.log(checkedFeaturesArray);
  }

  function getDifferenceElement(arrayData, arrayChecked) { // Сравнение массива input checkbox и массива объектов с сервера
    var differenceElem = arrayChecked.filter(function (item) {
      return !arrayData.includes(item);
    });
    return differenceElem.length;
  }

  housingFeatures.addEventListener('change', getCheckedValue);

  /*
  function renderData() {
    for (var i = 0; i < Math.min(dataObjects.length, MAX_ITEM_COUNT); i++) {
      map.insertBefore(window.addCard(dataObjects[i]), map.children[map.children.length - 1]);
      mapPinsContainer.appendChild(window.addPin(dataObjects[i]));
    }
  }
  */
  /*
    var updateWizards = function () {

      var sameCoatAndEyesWizards = wizards.filter(function (it) {
        return it.colorCoat === coatColor &&
          it.colorEyes === eyesColor;
      })

      var sameCoatWizards = wizards.filter(function (it) {
        return it.colorCoat === coatColor;
      });

      var sameEyesWizards = wizards.filter(function (it) {
        return it.colorEyes === eyesColor;
      });

      var filteredWizards = sameCoatAndEyesWizards;
      filteredWizards = filteredWizards.concat(sameCoatWizards);
      filteredWizards = filteredWizards.concat(sameEyesWizards);
      filteredWizards = filteredWizards.concat(wizards);

      var uniqueWizards = filteredWizards.filter(function (it, i) {
        return filteredWizards.indexOf(it) === i;
      });

      window.render(uniqueWizards);
    }
  */
  function filterData(object, element) {
    if ((object.offer.type === housingType.value || housingType.value === 'any') &&
      (object.offer.rooms.toString() === housingRooms.value || housingRooms.value === 'any') &&
      (object.offer.guests.toString() === housingGuests.value || housingGuests.value === 'any') &&
      (setHousingPriceValue(object) === true) &&
      (getDifferenceElement(object.offer.features, checkedFeaturesArray) === 0)) {
      renderData();
    } else {
      element.remove();
    }
  }

  filterForm.addEventListener('change', function () {
    for (var j = 0; j < Math.min(dataObjects.length, MAX_ITEM_COUNT); j++) {
      filterData(dataObjects[j], mapPin[j]);
    }
  });
  window.load(successHandler, window.errorHandler);
})();
