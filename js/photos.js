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

  photoChooser.addEventListener('change', function (event) {
    if (window.File && window.FileList && window.FileReader) {
      var files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var multiReader = new FileReader();
        multiReader.addEventListener('load', function (evt) {
          var picFile = evt.target;
          var img = document.createElement('img');
          img.classList.add('form__user-photo');
          img.style = 'height: 70px; width: auto';
          img.src = picFile.result;
          img.title = picFile.name;
          photoContainer.appendChild(img);
        });
        multiReader.readAsDataURL(file);
      }
    }
  });
})();
