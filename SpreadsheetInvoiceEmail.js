// Global Variables for email copy and alias
    var email = "invoice@stevenkaci.com"; // email of the person you want to send the invoice
    var copy = "copy@stevenkaci.com";
    var alias = "contact@stevenkaci.com"; // email used to send the invoice or reminder

// Adding Menu Invoice to send the PDF file automatically and kind reminder for unpaid invoices

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Invoice") 
    .addItem("Send Invoice PDF","EmailPDF")
    .addSeparator()
    .addItem("Unpaid Invoice Email","EmailUnpaidInvoice")
    .addToUi();
}
// Other Global Variables for both function

    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var ssID = ss.getId();
    var sheetgId = ss.getActiveSheet().getSheetId();
    var sheetName = ss.getName();
    var token = ScriptApp.getOAuthToken();
    var details = ss.getRange("B12").getValue();
// Code for Send Invoice Email aka the Function Email PDF

   function EmailPDF() {
     
// Subject & Body of the mail >> Email PDF
     
    var subject1 = sheetName +" - Invoice " + ss.getSheetName() + " - Steven Kaci";
    var body1 = "Hello, " + SpreadsheetApp.getActiveSpreadsheet().getName() +", "
        + "<p>Hope you're doing well. "
        + "<p>Please find attached your invoice number <b>" + ss.getSheetName() + "</b> for: <b>"+ details +"</b>. "
        + "<p>Let me know if you have any quetions. "
        + "<p>Best regards, "
        + "<p>********"
        + "<p><p><b>Steven Kaci</b>";
    var url = "https://docs.google.com/spreadsheets/d/"+ssID+"/export?" + "format=xlsx" + "&gid="+sheetgId+ "&portrait=true" + '&size=A4' + "&exportFormat=pdf";
    var result = UrlFetchApp.fetch(url, { headers: { 'Authorization': 'Bearer ' +  token
} });
     
     var contents = result.getContent();
     
  GmailApp.sendEmail(email,subject1,body1,{htmlBody: body1, cc: copy, from: alias, attachments:[{fileName:ss.getSheetName()+".pdf", content:contents, mimeType:"application//pdf"}]});
  }
// Subject & Body of the mail >> Unpaid Invoice

function EmailUnpaidInvoice() {
    var subject2 = sheetName +" - Unpaid Invoice " + ss.getSheetName() + " - Streamroot SAS";
    var body2 = "Hello, " + SpreadsheetApp.getActiveSpreadsheet().getName() +", "
        + "<p>Hope you're doing well. "
        + "<p>I allow myself to contact you, because unless we are mistaken, we have not yet received the invoice payment. <b>" +ss.getSheetName() + "</b> corresponsant à votre « "+ details +" ». "
        + "<p>>Let me know if you have any quetions. "
        + "<p>Best regards,"
        + "<p>********"
        + "<p><p><b>Steven Kaci</b>";

    var url = "https://docs.google.com/spreadsheets/d/"+ssID+"/export?" + "format=xlsx" + "&gid="+sheetgId+ "&portrait=true" + '&size=A4' + "&exportFormat=pdf";
    var result = UrlFetchApp.fetch(url, { headers: {  'Authorization': 'Bearer ' +  token
}
});
  
    var contents = result.getContent();
  
  GmailApp.sendEmail(email,subject2,body2,{htmlBody: body2, cc: copy, from: alias, attachments:[{fileName:ss.getSheetName()+".pdf", content:contents, mimeType:"application//pdf"}]});
  }
