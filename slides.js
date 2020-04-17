// Utility functions for google slides documents

function getLinkFromGoogleId(googleId) {
  return 'https://drive.google.com/open?id=' + googleId;
}

/**
 * Given an array of shapes, substitute any occurrence of {{match}} by another String value defined in data object as match: value
 *
 * @param shapes {shape[]}
 * @param data {Object} Object of { match : 'value' } properties
 */
function replaceShapeMatches(shapes, data) {
  shapes.forEach(function(shape) {
    Object.keys(data).forEach(function(key) {
      shape.getText().replaceAllText('{{' + key + '}}', data[key]);
    });
  });
}

/**
 * Given a slide and a data object with { match: value } properties, substitute any occurrence of {{match}} by value
 *
 * @param slide {slide}
 * @param data {Object} Object of { match : 'value' } properties
 */
function replaceMatchesInSlide(slide, data) {
  const shapes = slide.getShapes();
  replaceShapeMatches(shapes, data);
}

/**
 * Given an array of images, substitute any image whose title matches given string by image provided by matching URL
 *
 * @param images {images[]}
 * @param data {Object} Object of { match : 'value' } properties
 * @param imageFolderId { String } Driver folder id where images are stored
 */
function replaceImageMatches(images, data, imageFolderId) {
  var keys = Object.keys(data);
  var imageFolder = DriveApp.getFolderById(imageFolderId);

  for (var i = 0; i < images.length; i++) {
    for (var j = 0; j < keys.length; j++) {
      if (images[i].getTitle() === keys[j]) {
        var driveImageBlob = imageFolder
          .getFilesByName(data[keys[j]])
          .next()
          .getBlob();

        images[i].replace(driveImageBlob);
      }
    }
  }
}

/**
 * Given a slide, substitute the source of any of its images whose title matches given string, by image provided by name.
 * E.g. Given slide with image with alt title "myImage" and data object { myImage: imageName }, image will be substituted by any image named imageName accessible in the Driver folder defined by imageFolderId
 *
 * @param slide {slide}
 * @param data {Object} Object of { title : URL } properties
 * @param imageFolderId { String } Driver folder id where images are stored
 */
function replaceImagesInSlide(slide, data, imageFolderId) {
  //  const keys = Object.keys(data);
  const images = slide.getImages();
  const imageFolder = DriveApp.getFolderById(imageFolderId);

  images.forEach(function(image) {
    const replacementValue = data[image.getTitle()];

    if (replacementValue) {
      const driveImages = imageFolder.getFilesByName(replacementValue);
      if (driveImages.hasNext()) {
        image.replace(driveImages.next().getBlob());
      }
    }
  });
}
