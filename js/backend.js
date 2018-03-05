'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_STATUS = 200;
  var REQUEST_DURATION = 10000;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case SUCCESS_STATUS:
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

      xhr.timeout = REQUEST_DURATION;
      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    send: function (data, onLoad, reset, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case SUCCESS_STATUS:
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

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
