function SheetToCsv()
{
    var ssID = SpreadsheetApp.getActiveSpreadsheet().getId();
    var sheet_Name = "#SHEET NAME#"
    var timeZone = Session.getScriptTimeZone();
    var date = Utilities.formatDate(new Date(), timeZone, "MM-dd-yyyy | HH:mm:ss");
  
    var requestData = {"method": "GET", "headers":{"Authorization":"Bearer "+ScriptApp.getOAuthToken()}};
  
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet_Name)
      var sheetNameId = sheet.getSheetId().toString();
  
      params= ssID+"/export?gid="+ sheetNameId +"&format=csv"
      var url = "https://docs.google.com/spreadsheets/d/"+ params
      var result = UrlFetchApp.fetch(url, requestData);  

    var fileName = sheet_Name + " - " + date +".csv"
    var dir = DriveApp.getFolderById("#FOLDER_ID#");
    var file = dir.createFile(fileName, result, MimeType.PLAIN_TEXT);
  
}
