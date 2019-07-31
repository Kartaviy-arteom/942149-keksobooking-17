'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');
  var mainPinPreview = document.querySelector('.map__pin--main img');
  var photoPreviewContainer = document.querySelector('.ad-form__photo');
  var photoChooser = document.querySelector('#images');

  var avatarPreviews = [preview, mainPinPreview];


  var newImage = document.createElement("img");
  newImage.setAttribute('width', '70');
  newImage.setAttribute('height', '70');

  var insertImage = function () {
    photoPreviewContainer.appendChild(newImage);
  };

  var advertPhotoPreviews = [newImage];

  var addPreview = function(fileChooser, previews) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          previews.forEach(function(element) {
            element.src = reader.result;
          });
        });

        reader.readAsDataURL(file);
      }
    });
  };

  photoChooser.addEventListener('change', function () {
    insertImage();
  });

  addPreview(avatarFileChooser, avatarPreviews);
  addPreview(photoChooser, advertPhotoPreviews);
})();
