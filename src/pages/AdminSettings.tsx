
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import GoogleSheetConfig from '@/components/GoogleSheetConfig';

const AdminSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Admin Settings | Málaga Driver Hub</title>
        <meta name="description" content="Admin settings for Málaga Driver Hub" />
      </Helmet>
      
      <header className="bg-primary py-4">
        <div className="container px-4 mx-auto">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-primary-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>
      
      <main className="flex-1 bg-accent py-10">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Admin Settings</h1>
            <p className="text-muted-foreground mb-8">
              Configure integrations and preferences for your booking system
            </p>
            
            <div className="glass-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Integrations</h2>
              
              <div className="space-y-6">
                <div className="flex flex-col gap-6 p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Google Sheet Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect to Google Sheets to store booking data directly
                    </p>
                  </div>
                  <GoogleSheetConfig />
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Google Apps Script Template</h3>
                  <p className="text-sm mb-4">
                    Copy this script into Google Apps Script to process form submissions:
                  </p>
                  <div className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
                    <pre className="whitespace-pre-wrap">
{`function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0]; // Use first sheet
    
    // Check if we need to add headers (if sheet is empty)
    if (sheet.getLastRow() === 0) {
      const headers = Object.keys(data);
      sheet.appendRow(headers);
    }
    
    // Create an array of values in the same order as headers
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const rowData = headers.map(header => data[header] || '');
    
    // Append the data
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data successfully recorded'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow cross-origin requests
function doOptions(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600'
  };
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}`}
                    </pre>
                  </div>
                  <div className="mt-4 text-sm">
                    <p className="font-medium">Setup Instructions:</p>
                    <ol className="list-decimal list-inside space-y-1 mt-2">
                      <li>In Google Sheets, go to "Extensions" &gt; "Apps Script"</li>
                      <li>Copy and paste the above code</li>
                      <li>Click "Deploy" &gt; "New deployment"</li>
                      <li>Select "Web app" as the type</li>
                      <li>Set "Execute as" to "Me" and "Who has access" to "Anyone"</li>
                      <li>Click "Deploy" and copy the Web App URL</li>
                      <li>Paste the URL in the Web App URL field above</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-background py-4 border-t">
        <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Málaga Driver Hub | Admin Portal
        </div>
      </footer>
    </div>
  );
};

export default AdminSettings;
