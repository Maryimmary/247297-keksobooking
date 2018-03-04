'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.notice__preview');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.slice(fileName.indexOf('.') + 1) === it;
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.querySelector('img').src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
