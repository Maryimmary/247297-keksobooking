'use strict';

window.synchronizeFields = (function () {
  return function (firstField, secondField, firstArray, secondArray, callback) {
    firstField.addEventListener('change', function () {
      var valueField = secondArray[firstArray.indexOf(firstField.value)];
      if (typeof callback === 'function') {
        callback(secondField, valueField);
      }
    });
  };
})();
