'use strict';
(function () {
  var inputAdvert = document.querySelectorAll('.notice input');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');
  var noticeForm = document.querySelector('.notice__form');
  var formSubmit = document.querySelector('.notice__form .form__submit');

  function checkPrice() { // Синхронизация  поля цены
    if (price.value === 0) {
      price.setCustomValidity('Минимальная цена - 0 рублей');
    } else if (price.value === 1000000) {
      price.setCustomValidity('Максимальная цена - 1 000 000 рублей');
    } else {
      price.setCustomValidity('');
    }
  }

  function synchronizeTypePrice() {
    var priceData = {
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
    var index = type.selectedIndex;
    var valueType = type[index].value;
    price.min = priceData[valueType].min;
    price.value = priceData[valueType].value;
  }

  function enabledOptions(selectElement, optionsArray, dataObject) {
    for (var i = 0; i < optionsArray.length; i++) {
      optionsArray[i].disabled = !dataObject[selectElement].includes(optionsArray[i].value);
    }
    return optionsArray[i];
  }

  function synchronizeRoomGuests() {
    var capacityToEnabledOptions = {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    };
    var roomValue = roomNumber.value;
    capacity.value = roomValue.substr(-1);
    var capacityOptions = capacity.options;
    enabledOptions(roomValue, capacityOptions, capacityToEnabledOptions);
  }

  function checkValidity() {
    for (var l = 0; l < inputAdvert.length; l++) {
      if (!inputAdvert[l].validity.valid) {
        inputAdvert[l].style.border = '2px solid red';
      }
    }
  }

  function syncValues(element, value) {
    element.value = value;
  }

  window.synchronizeFields(checkIn, checkOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(checkOut, checkIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

  type.addEventListener('change', synchronizeTypePrice);
  roomNumber.addEventListener('input', synchronizeRoomGuests);
  price.addEventListener('change', checkPrice);
  formSubmit.addEventListener('click', checkValidity);

  var successMessage = function () {
    var node = document.createElement('div');
    node.style = 'position: fixed; padding: 10px;' +
      'z-index: 100; top: 50%; left: 50%; transform: translate(-50%, -50%);' +
      'text-align: center; background-color: rgba(0, 191, 255, 0.5); ' +
      'color: white; font-size: 30px; font-weight: bold;';
    node.textContent = 'Данные успешно отправлены';
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      document.body.removeChild(node);
      noticeForm.reset();
    }, 2000);
  };

  var formSubmitContainer = noticeForm.querySelector('.form__element--submit');
  formSubmitContainer.addEventListener('click', window.returnInactive);

  noticeForm.addEventListener('submit', function (evt) {
    window.send(new FormData(noticeForm), successMessage, window.errorHandler);
    evt.preventDefault();
  });
})();
