'use strict';
(function () {
  var Shift = {
    LEFT: 31,
    TOP: 84
  };

  var Position = {
    MIN_Y: 150,
    MAX_Y: 500,
    MIN_X: 55,
    MAX_X: 1145
  };

  var address = document.querySelector('#address');
  address.value = 'x: ' + (window.mainPin.offsetLeft + Shift.LEFT) + ', y: ' + (window.mainPin.offsetTop + Shift.TOP);

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

      var currentY = Math.max(Position.MIN_Y, Math.min(Position.MAX_Y, topPosition));
      var currentX = Math.max(Position.MIN_X, Math.min(Position.MAX_X, leftPosition));
      address.value = 'x: ' + (currentX + Shift.LEFT) + ', y: ' + (currentY + Shift.TOP);

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
