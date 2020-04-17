// Utility functions for google sheets documents

/**
 * Returns the emptied cell
 * @param {cell} cell
 */
function emptyCell(cell) {
  return cell.setFormula('');
}

/**
 * Provided a cell in a sheet, add to it a link to a provided URL
 * Does not apply any styles to the cell
 * @param {cell} cell
 * @param {String} url full href, e.g. https://drive.google.com
 * @param {String} [textContent] text inside the cell. Defaults to DOWNLOAD DOCUMENT
 */
function addLinkInCell(cell, url, textContent) {
  const cellValue = `=HYPERLINK("${url}"; "${textContent || 'DOWNLOAD DOCUMENT'}")`;
  cell.setFormula(cellValue);
}

function getFirstValueInNamedRange(namedRange) {
  return [namedRange.getName(), namedRange.getRange().getDisplayValues()[0][0]];
}

function getNamedRangesByRegexMatch(regexp, namedRanges) {
  return namedRanges.filter(namedRange => namedRange.getName().match(regexp));
}

function stringMatchesNamedRange(string, namedRanges) {
  return typeof namedRanges.find(namedRange => namedRange.getName() === string) !== 'undefined';
}

function getNamedRangesByExactMatches(namedRanges, ...namesToMatch) {
  const re = new RegExp(`${namesToMatch.join('|')}`);
  return namedRanges.filter(namedRange => namedRange.getName().match(re));
}

function getEditorName(editorEmail) {
  const NAMES = 'EDITORS_NAMES';
  const EMAILS = 'EDITORS_EMAILS';

  var editorNamesValues = SpreadsheetApp.getActiveSpreadsheet()
    .getRangeByName(NAMES)
    .getValues();
  var editorEmailValues = SpreadsheetApp.getActiveSpreadsheet()
    .getRangeByName(EMAILS)
    .getValues();

  var index = 0;

  while (true) {
    if (!editorEmailValues[index][0]) {
      return '';
    }
    if (editorEmailValues[index][0] === editorEmail) {
      return editorNamesValues[index][0];
    }
    index++;
  }
}

/**
 *
 * @param {[namedRange]} namedRanges Array with all named ranges. Passed as argument to avoid fetching named ranges multiple times, an operation which takes a few tenths of a second
 * @param {String} rangeName
 * @return Range matching the input rangeName
 */
function getRangeByName(namedRanges, rangeName) {
  const matchingRanges = getNamedRangesByExactMatches(namedRanges, rangeName);
  if (matchingRanges.length === 0) {
    throw new Error('Function getRangeByName: range name not found.');
  }
  return getNamedRangesByExactMatches(namedRanges, rangeName)[0].getRange();
}

function getCellDownload({ namedRanges, sheet }) {
  const DOWNLOAD_SLIDES = 'DOWNLOAD_SLIDES';
  const DEFAULT_DOWNLOAD_SLIDES = 'A1';

  return stringMatchesNamedRange(DOWNLOAD_SLIDES, namedRanges)
    ? getRangeByName(namedRanges, DOWNLOAD_SLIDES)
    : sheet.getRange(DEFAULT_DOWNLOAD_SLIDES);
}

function getCell({ sheetName, cellA1Notation }) {
  return SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(sheetName)
    .getRange(cellA1Notation)
    .getCell(1, 1);
}

function logToCell({ cell, prefix = '', msg, printLogs = true }) {
  if (typeof cell === 'undefined' || !printLogs) return;
  if (prefix === '') {
    cell.setValue(`${msg.toUpperCase()}`);
    return;
  }
  cell.setValue(`${prefix.toUpperCase()}: ${msg.toUpperCase()}`);
}
