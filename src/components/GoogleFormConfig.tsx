
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const GoogleFormConfig = () => {
  const { toast } = useToast();
  const [formUrl, setFormUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [testData, setTestData] = useState({ success: false, message: '' });
  const [isTesting, setIsTesting] = useState(false);
  
  // Load form URL from localStorage on component mount
  useEffect(() => {
    const savedFormUrl = localStorage.getItem('google_form_url');
    if (savedFormUrl) {
      setFormUrl(savedFormUrl);
    }
  }, []);
  
  const handleSave = () => {
    setIsSaving(true);
    
    try {
      // Validate the URL
      if (formUrl && !formUrl.includes('docs.google.com/forms')) {
        toast({
          title: "Invalid Form URL",
          description: "Please enter a valid Google Form URL",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      // Save to localStorage
      localStorage.setItem('google_form_url', formUrl);
      
      toast({
        title: "Settings Saved",
        description: "Your Google Form URL has been saved successfully"
      });
    } catch (error) {
      console.error("Error saving form URL:", error);
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
    localStorage.removeItem('google_form_url');
    setFormUrl('');
    setTestData({ success: false, message: '' });
    toast({
      title: "Settings Cleared",
      description: "Your Google Form URL has been cleared"
    });
  };
  
  const handleTest = () => {
    if (!formUrl) {
      toast({
        title: "No Form URL",
        description: "Please enter and save a Google Form URL first",
        variant: "destructive"
      });
      return;
    }
    
    setIsTesting(true);
    
    // Open the form URL in a new tab for testing
    window.open(formUrl, '_blank');
    
    setTestData({ 
      success: true, 
      message: "The Google Form has been opened in a new tab for testing." 
    });
    
    setIsTesting(false);
  };
  
  return (
    <div className="flex flex-col gap-4 w-full md:w-auto">
      <div className="space-y-2">
        <Input
          type="text"
          value={formUrl}
          onChange={(e) => setFormUrl(e.target.value)}
          placeholder="https://docs.google.com/forms/d/e/..."
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
          disabled={isTesting || !formUrl}
        >
          {isTesting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testing
            </>
          ) : (
            'Test Form'
          )}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleClear}
          disabled={isSaving || isTesting || !formUrl}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default GoogleFormConfig;
