'use strict';
(function () {
  var CapacityToEnabledOptions = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var PriceData = {
    flat: {
      min: 1000,
      value: 1000
    },
    bungalo: {
      min: 0,
      value: 0
    },
    house: {
      min: 5000,
      value: 5000
    },
    palace: {
      min: 10000,
      value: 10000
    }
  };
  var inputAdvert = document.querySelectorAll('.notice input');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');
  var noticeForm = document.querySelector('.notice__form');
  var formSubmit = document.querySelector('.notice__form .form__submit');

  function onPriceFieldChange() { // Синхронизация  поля цены
    if (price.value === 0) {
      price.setCustomValidity('Минимальная цена - 0 рублей');
    } else if (price.value === 1000000) {
      price.setCustomValidity('Максимальная цена - 1 000 000 рублей');
    } else {
      price.setCustomValidity('');
    }
  }

  function onTypeFieldChange() {
    var index = type.selectedIndex;
    var valueType = type[index].value;
    price.min = PriceData[valueType].min;
    price.value = PriceData[valueType].value;
  }

  function enableOptions(selectElement, optionsArray, dataObject) {
    for (var i = 0; i < optionsArray.length; i++) {
      optionsArray[i].disabled = !dataObject[selectElement].includes(optionsArray[i].value);
    }
    return optionsArray[i];
  }

  function onRoomFildSelect() {
    var roomValue = roomNumber.value;
    capacity.value = roomValue.substr(-1);
    var capacityOptions = capacity.options;
    enableOptions(roomValue, capacityOptions, CapacityToEnabledOptions);
  }

  function checkValidity() {
    for (var i = 0; i < inputAdvert.length; i++) {
      if (!inputAdvert[i].validity.valid) {
        inputAdvert[i].style.border = '2px solid red';
      } else {
        inputAdvert[i].style.border = '2px solid transparent';
      }
    }
  }

  function synchronizeValues(element, value) {
    element.value = value;
  }

  window.synchronizeFields(checkIn, checkOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], synchronizeValues);
  window.synchronizeFields(checkOut, checkIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], synchronizeValues);

  type.addEventListener('change', onTypeFieldChange);
  roomNumber.addEventListener('input', onRoomFildSelect);
  price.addEventListener('change', onPriceFieldChange);
  formSubmit.addEventListener('click', checkValidity);
  noticeForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(noticeForm), window.messages.success, window.onFormReset, window.messages.error);
    evt.preventDefault();
  });
  noticeForm.addEventListener('reset', window.onFormReset);
})();
