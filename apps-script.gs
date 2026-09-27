const SHEET_NAME = 'RSVP';
const SPREADSHEET_ID = '1SEyUu2A6efpfToNXX-RsN0US7T3dkzfsqmuXAKy5usk';
const HEADERS = [
  'Fecha de envío',
  'Cantidad de invitados',
  'Nombre principal',
  'Asistencia principal',
  'Menú principal',
  'Detalle menú principal',
  'Nombre acompañante',
  'Asistencia acompañante',
  'Menú acompañante',
  'Detalle menú acompañante'
];

function doGet() {
  const spreadsheet = getSpreadsheet_();
  return ContentService.createTextOutput(`Conectado a: ${spreadsheet.getName()}`);
}

function doPost(event) {
  const spreadsheet = getSpreadsheet_();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  const data = event.parameter;
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.guestCount || '1',
    data.g1_name || '',
    data.g1_attending || '',
    data.g1_diet || '',
    data.g1_diet_details || '',
    data.g2_name || '',
    data.g2_attending || '',
    data.g2_diet || '',
    data.g2_diet_details || ''
  ]);

  return ContentService.createTextOutput('OK');
}

function getSpreadsheet_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}