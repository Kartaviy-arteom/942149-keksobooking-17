'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');
  var mainPinPreview = document.querySelector('.map__pin--main img');
  var photoPreviewContainer = document.querySelector('.ad-form__photo');
  var photoChooser = document.querySelector('#images');

  var getAvatarPreviews = function () {
    return [preview, mainPinPreview];
  };

  var createImage = function() {
    var newImage = document.createElement("img");
    newImage.setAttribute('width', '70');
    newImage.setAttribute('height', '70');

    photoPreviewContainer.appendChild(newImage);
    return [newImage];
  };

  var addPreview = function(fileChooser, callback) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var previews = callback ();
          previews.forEach(function(element) {
            element.src = reader.result;
          });
        });

        reader.readAsDataURL(file);
      }
    });
  };

  addPreview(avatarFileChooser, getAvatarPreviews);
  addPreview(photoChooser, createImage);
})();
