// Utility functions for google documents

/**
 * Move a file from its current location to a target folder
 *
 * @param sourceFileId { String }
 * @param targetFolderId { String }
 */
function moveFileById(sourceFileId, targetFolderId) {
  var file = DriveApp.getFileById(sourceFileId);

  file
    .getParents()
    .next()
    .removeFile(file);
  DriveApp.getFolderById(targetFolderId).addFile(file);
}

/**
 * Provided a file id, create and return the PDF version of the file
 *
 * @param sourceFileId { String }
 *
 * return PDF file
 */
function saveAsPdfById(sourceFileId) {
  var driveSourceFile = DriveApp.getFileById(sourceFileId);

  return DriveApp.createFile(driveSourceFile.getAs('application/pdf'));
}

/**
 * Provided a file id, remove the file
 *
 * @param fileId { String }
 */
function removeFileById(fileId) {
  var file = DriveApp.getFileById(fileId);

  file
    .getParents()
    .next()
    .removeFile(file);
}

/**
 * @param url { String } URL of the form https://docs.google.com/spreadsheets/d/179rba3_kgZLp_16iJRcMCd7j53-u6LuG9oHFp304uDQ/edit#gid=165078932
 */
function getIdFromUrl(url) {
  return url.split('/')[5];
}

/**
 * Returns the google id of the copy
 * @param {String} googleId id of a file in google drive
 */
function copyFileById(googleId) {
  return DriveApp.getFileById(googleId)
    .makeCopy()
    .getId();
}
