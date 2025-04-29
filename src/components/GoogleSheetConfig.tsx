
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Check, AlertTriangle, ExternalLink } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const GoogleSheetConfig = () => {
  const { toast } = useToast();
  const [sheetUrl, setSheetUrl] = useState('');
  const [webAppUrl, setWebAppUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [testData, setTestData] = useState({ success: false, message: '' });
  const [isTesting, setIsTesting] = useState(false);
  const [activeTab, setActiveTab] = useState('sheet');
  
  // Load URLs from localStorage on component mount
  useEffect(() => {
    const savedSheetUrl = localStorage.getItem('google_sheet_url');
    const savedWebAppUrl = localStorage.getItem('google_sheet_webapp_url');
    
    if (savedSheetUrl) {
      setSheetUrl(savedSheetUrl);
    }
    
    if (savedWebAppUrl) {
      setWebAppUrl(savedWebAppUrl);
    }
  }, []);
  
  const handleSave = () => {
    setIsSaving(true);
    
    try {
      // Validate the Sheet URL
      if (sheetUrl && !sheetUrl.includes('docs.google.com/spreadsheets')) {
        toast({
          title: "Invalid Sheet URL",
          description: "Please enter a valid Google Sheets URL",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      // Validate the Web App URL
      if (webAppUrl && !webAppUrl.startsWith('http')) {
        toast({
          title: "Invalid Web App URL",
          description: "Please enter a valid URL for your Google Apps Script web app",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      // Save to localStorage
      localStorage.setItem('google_sheet_url', sheetUrl);
      localStorage.setItem('google_sheet_webapp_url', webAppUrl);
      
      toast({
        title: "Settings Saved",
        description: "Your Google Sheet integration settings have been saved successfully"
      });
      
      // Reset test data since settings were changed
      setTestData({ success: false, message: '' });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleClear = () => {
    localStorage.removeItem('google_sheet_url');
    localStorage.removeItem('google_sheet_webapp_url');
    setSheetUrl('');
    setWebAppUrl('');
    setTestData({ success: false, message: '' });
    toast({
      title: "Settings Cleared",
      description: "Your Google Sheet integration settings have been cleared"
    });
  };
  
  const handleTest = () => {
    setIsTesting(true);
    setTestData({ success: false, message: '' });
    
    try {
      if (!webAppUrl) {
        setTestData({ 
          success: false, 
          message: "Please enter and save a Web App URL first" 
        });
        setIsTesting(false);
        return;
      }
      
      // Open the web app URL in a new tab just to test if it's accessible
      window.open(webAppUrl, '_blank');
      
      // If the sheet URL is available, open it in a new tab for viewing
      if (sheetUrl) {
        window.open(sheetUrl, '_blank');
      }
      
      setTestData({ 
        success: true, 
        message: "The Google Sheet and Web App URLs have been opened in new tabs. Make sure they are accessible." 
      });
    } catch (error) {
      console.error("Error testing connection:", error);
      setTestData({ 
        success: false, 
        message: error instanceof Error ? error.message : "An error occurred while testing the connection"
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex space-x-2 mb-2">
        <Button 
          variant={activeTab === 'sheet' ? "default" : "outline"} 
          onClick={() => setActiveTab('sheet')}
          size="sm"
        >
          Sheet URL
        </Button>
        <Button 
          variant={activeTab === 'webapp' ? "default" : "outline"} 
          onClick={() => setActiveTab('webapp')}
          size="sm"
        >
          Web App URL
        </Button>
      </div>

      {activeTab === 'sheet' ? (
        <div className="space-y-2">
          <Input
            type="text"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/..."
            className="min-w-[300px]"
          />
          <p className="text-xs text-muted-foreground">
            URL of your Google Sheet where data will be stored
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <Input
            type="text"
            value={webAppUrl}
            onChange={(e) => setWebAppUrl(e.target.value)}
            placeholder="https://script.google.com/macros/s/..."
            className="min-w-[300px]"
          />
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="text-destructive">*Required</span>: URL of your Google Apps Script web app
          </p>
        </div>
      )}
      
      {testData.message && (
        <Alert variant={testData.success ? "default" : "destructive"} className="mt-2">
          {testData.success ? (
            <Check className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <AlertTitle>
            {testData.success ? "Test Successful" : "Test Failed"}
          </AlertTitle>
          <AlertDescription>
            {testData.message}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex gap-2 flex-wrap">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving
            </>
          ) : (
            'Save Settings'
          )}
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleTest}
          disabled={isTesting || !webAppUrl}
        >
          {isTesting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testing
            </>
          ) : (
            'Test Connection'
          )}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleClear}
          disabled={isSaving || isTesting || (!sheetUrl && !webAppUrl)}
        >
          Clear
        </Button>
      </div>

      <div className="mt-4 p-4 border rounded-lg bg-muted/50">
        <h4 className="font-medium mb-2">Setup Instructions</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Create a Google Sheet with columns matching your form fields (name, email, etc.)</li>
          <li>From the sheet, go to Extensions &gt; Apps Script</li>
          <li>Add the Google Apps Script code from the template below</li>
          <li>Click Deploy &gt; New Deployment &gt; Select "Web app"</li>
          <li>Set "Execute as" to "Me" (your account)</li>
          <li><strong className="text-destructive">Important:</strong> Set "Who has access" to "Anyone"</li>
          <li>Click "Deploy" and authorize when prompted</li>
          <li>Copy the web app URL and paste it above in the "Web App URL" tab</li>
        </ol>
        
        <div className="mt-4 text-sm">
          <a 
            href="https://script.google.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
          >
            Go to Google Apps Script <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetConfig;
