'use strict';
(function () {
  var TimeOutMessage = {
    SUCCESS: 2000,
    ERROR: 3000
  };

  window.messages = {
    success: function () {
      var node = document.createElement('div');
      node.style = 'position: fixed; padding: 10px;' +
        'z-index: 100; top: 50%; left: 50%; transform: translate(-50%, -50%);' +
        'text-align: center; background-color: rgba(0, 191, 255, 0.5); ' +
        'color: white; font-size: 30px; font-weight: bold;';
      node.textContent = 'Данные успешно отправлены';
      document.body.insertAdjacentElement('afterbegin', node);
      setTimeout(function () {
        document.body.removeChild(node);
      }, TimeOutMessage.SUCCESS);
    },
    error: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'position: fixed; padding: 10px;' +
        'z-index: 100; top: 50%; left: 50%; transform: translate(-50%, -50%);' +
        'text-align: center; background-color: rgba(255, 99, 71, 0.8); ' +
        'color: white; font-size: 30px; font-weight: bold;';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
      setTimeout(function () {
        document.body.removeChild(node);
      }, TimeOutMessage.ERROR);
    }
  };
})();
