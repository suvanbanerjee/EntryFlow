const PASSWORD = 'yourSecurePassword'; // Set your password

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function validatePassword(inputPassword) {
  return inputPassword === PASSWORD;
}

function getCategories() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Categories');
  const categories = sheet.getRange(1, 1, sheet.getLastRow()).getValues().flat();
  return categories;
}

function checkPhoneNumber(phone) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Visitors');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == phone) {
      return {
        exists: true,
        name: data[i][1],
      };
    }
  }
  return { exists: false };
}

function saveFormData(formData) {
  const visitorSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Visitors');
  const visitSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Visits');
  
  const visitorId = formData.phone;
  let found = false;

  const visitorData = visitorSheet.getDataRange().getValues();
  for (let i = 1; i < visitorData.length; i++) {
    if (visitorData[i][0] == visitorId) {
      found = true;
      break;
    }
  }

  if (!found) {
    visitorSheet.appendRow([visitorId, formData.name, formData.email, formData.address]);
  }

  const visitId = "VISIT-" + new Date().getTime();
  const visitDateTime = new Date().toLocaleString();
  visitSheet.appendRow([visitId, visitorId, formData.category, visitDateTime]);

  return found ? "Visit recorded for existing user!" : "New user onboarded and visit recorded!";
}
