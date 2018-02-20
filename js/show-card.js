'use strict';
window.showCard = function (event) {
  var target = event.target;
  if (target.className === 'map__pin') {
    target.classList.add('map__pin--active');
  } else if (target.parentNode.className === 'map__pin') {
    target.parentNode.classList.add('map__pin--active');
  }
  for (var i = 0; i < window.popup.length; i++) {
    if (mapPin[i].classList.contains('map__pin--active')) {
      popup[i].style.display = 'block';
    }
  }
  for (var j = 0; j < window.mapPin.length; j++) {
    if (mapPin[j].classList.contains('map__pin--active') && window.mapPin[j] !== target && window.mapPin[j].firstChild !== target) {
      mapPin[j].classList.remove('map__pin--active');
      popup[j].style.display = 'none';
    }
  }
};

