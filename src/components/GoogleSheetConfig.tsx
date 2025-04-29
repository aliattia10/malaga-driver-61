
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Check, AlertTriangle } from 'lucide-react';
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
    if (!sheetUrl) {
      toast({
        title: "No Sheet URL",
        description: "Please enter and save a Google Sheet URL first",
        variant: "destructive"
      });
      return;
    }
    
    setIsTesting(true);
    
    // Open the sheet URL in a new tab for viewing
    window.open(sheetUrl, '_blank');
    
    setTestData({ 
      success: true, 
      message: "The Google Sheet has been opened in a new tab. Make sure to set up a Google Apps Script to receive data." 
    });
    
    setIsTesting(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-auto">
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
          <p className="text-xs text-muted-foreground">
            URL of your Google Apps Script web app (deployed as web app)
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
          disabled={isTesting || !sheetUrl}
        >
          {isTesting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testing
            </>
          ) : (
            'View Sheet'
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
          <li>Add a script to handle form submissions (see template in Admin docs)</li>
          <li>Deploy as web app (Execute as: Me, Who has access: Anyone)</li>
          <li>Copy the web app URL and paste it above</li>
        </ol>
      </div>
    </div>
  );
};

export default GoogleSheetConfig;
