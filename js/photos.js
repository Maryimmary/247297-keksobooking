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
    var file = photoChooser.files;
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      for (var i = 0; i < file.length; i++) {
        var img = document.createElement('img');
        img[i].classList.add('form__user-photo');
        img[i].style = 'height: 70px; width: auto';
        img[i].file = file[i];
        photoContainer.appendChild(img[i]);
        img[i].src = reader.result;
        reader.readAsDataURL(file[i]);
      }
    });
  });
})();
