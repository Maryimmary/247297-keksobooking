'use strict';
(function () {
  var MAIN_PIN_LEFT_SHIFT = 31;
  var MAIN_PIN_TOP_SHIFT = 84;
  var MIN_Y_POSITION = 150;
  var MAX_Y_POSITION = 500;
  var MIN_X_POSITION = 55;
  var MAX_X_POSITION = 1145;
  var address = document.querySelector('#address');
  address.value = 'x: ' + (window.mainPin.offsetLeft + MAIN_PIN_LEFT_SHIFT) + ', y: ' + (window.mainPin.offsetTop + MAIN_PIN_TOP_SHIFT);

  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var leftPosition = window.mainPin.offsetLeft - shift.x;
      var topPosition = window.mainPin.offsetTop - shift.y;

      var currentY = Math.max(MIN_Y_POSITION, Math.min(MAX_Y_POSITION, topPosition));
      var currentX = Math.max(MIN_X_POSITION, Math.min(MAX_X_POSITION, leftPosition));
      address.value = 'x: ' + (currentX + MAIN_PIN_LEFT_SHIFT) + ', y: ' + (currentY + MAIN_PIN_TOP_SHIFT);

      window.mainPin.style.left = currentX + 'px';
      window.mainPin.style.top = currentY + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
