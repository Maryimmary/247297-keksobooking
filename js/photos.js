'use strict';

(function () {
  // Аватар
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview img');
  // Фотографии
  var photoChooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.form__photo-container');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  });


  photoChooser.addEventListener('change', function () {
    var files = photoChooser.files;
    var reader = new FileReader();
    reader.addEventListener('load', function () {

    });
    reader.readAsDataURL(files);
  });
})();
