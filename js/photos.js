'use strict';

(function () {
  // Аватар
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview img');
  // Фотографии
  var photoChooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.form__photo-container');
  // Drag&Drop
  var dropZone = document.querySelectorAll('.drop-zone');

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
          var div = document.createElement('div');
          div.innerHTML = '<img src="' + picFile.result + '" title="' + picFile.name + '" style="width: 100%; height: auto">';
          div.classList.add('form__user-photo');
          div.style = 'height: 70px; width: 126px; overflow: hidden; border: solid 1px #c7c7c7; border-radius: 5px;';
          div.draggable = 'true';
          photoContainer.appendChild(div);
        });
        multiReader.readAsDataURL(file);
      }
    }
  });
})();
