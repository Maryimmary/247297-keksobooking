'use strict';
(function () {
  window.backend = {
    URL: 'https://js.dump.academy/keksobooking',
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          default:
            onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;
      xhr.open('GET', this.URL + '/data');
      xhr.send();
    },
    send: function (data, onLoad, reset, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            reset();
            break;

          default:
            onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.open('POST', this.URL);
      xhr.send(data);
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'position: fixed; padding: 10px;' +
        'z-index: 100; top: 50%; left: 50%; transform: translate(-50%, -50%);' +
        'text-align: center; background-color: rgba(255, 99, 71, 0.5); ' +
        'color: white; font-size: 30px; font-weight: bold;';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
      setTimeout(function () {
        document.body.removeChild(node);
      }, 3000);
    }
  };
})();
