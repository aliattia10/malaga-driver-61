
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const GoogleSheetConfig = () => {
  const { toast } = useToast();
  const [sheetUrl, setSheetUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [testData, setTestData] = useState({ success: false, message: '' });
  const [isTesting, setIsTesting] = useState(false);
  
  // Load sheet URL from localStorage on component mount
  useEffect(() => {
    const savedSheetUrl = localStorage.getItem('google_sheet_url');
    if (savedSheetUrl) {
      setSheetUrl(savedSheetUrl);
    }
  }, []);
  
  const handleSave = () => {
    setIsSaving(true);
    
    try {
      // Validate the URL
      if (sheetUrl && !sheetUrl.includes('docs.google.com/spreadsheets')) {
        toast({
          title: "Invalid Sheet URL",
          description: "Please enter a valid Google Sheets URL",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      // Save to localStorage
      localStorage.setItem('google_sheet_url', sheetUrl);
      
      toast({
        title: "Settings Saved",
        description: "Your Google Sheet URL has been saved successfully"
      });
    } catch (error) {
      console.error("Error saving sheet URL:", error);
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
    setSheetUrl('');
    setTestData({ success: false, message: '' });
    toast({
      title: "Settings Cleared",
      description: "Your Google Sheet URL has been cleared"
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
      message: "The Google Sheet has been opened in a new tab. Note: For security reasons, data will be viewable but writes require proper configuration." 
    });
    
    setIsTesting(false);
  };
  
  return (
    <div className="flex flex-col gap-4 w-full md:w-auto">
      <div className="space-y-2">
        <Input
          type="text"
          value={sheetUrl}
          onChange={(e) => setSheetUrl(e.target.value)}
          placeholder="https://docs.google.com/spreadsheets/d/..."
          className="min-w-[300px]"
        />
      </div>
      
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
          disabled={isSaving || isTesting || !sheetUrl}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default GoogleSheetConfig;
