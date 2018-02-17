'use strict';
window.showCard = function (event) {
  window.mapPin = document.querySelectorAll('.map .map__pin:not(.map__pin--main)');
  window.popup = document.querySelectorAll('.map__card');
  var target = event.target;
  if (target.className === 'map__pin') {
    target.classList.add('map__pin--active');
  } else if (target.parentNode.className === 'map__pin') {
    target.parentNode.classList.add('map__pin--active');
  }
  for (var i = 0; i < window.popup.length; i++) {
    if (window.mapPin[i].classList.contains('map__pin--active')) {
      window.popup[i].style.display = 'block';
    }
  }
  for (var j = 0; j < window.mapPin.length; j++) {
    if (window.mapPin[j].classList.contains('map__pin--active') && window.mapPin[j] !== target && window.mapPin[j].firstChild !== target) {
      window.mapPin[j].classList.remove('map__pin--active');
      window.popup[j].style.display = 'none';
    }
  }
};

