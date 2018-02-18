'use strict';
(function () {
  window.templateElement = document.querySelector('template').content;
  window.mapPins = document.querySelector('.map__pins');

  function addButton(data) {
    var templatePinElement = window.templateElement.querySelector('.map__pin').cloneNode(true);
    templatePinElement.style.left = data.location.x + 'px';
    templatePinElement.style.top = data.location.y + 'px';
    templatePinElement.querySelector('img').src = data.author.avatar;
    return templatePinElement;
  }

  window.render = function (newData) {
    for (var j = 0; j < newData.length; j++) {
      window.mapPins.appendChild(addButton(newData[j]));
    }
  };
})();
