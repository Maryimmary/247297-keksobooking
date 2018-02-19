'use strict';
(function () {
  window.addPin = function (data) {
    var templatePinElement = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
    templatePinElement.style.left = data.location.x + 'px';
    templatePinElement.style.top = data.location.y + 'px';
    templatePinElement.querySelector('img').src = data.author.avatar;
    return templatePinElement;
  };
})();
