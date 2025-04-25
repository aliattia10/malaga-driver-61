
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ZapierConfig = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [testData, setTestData] = useState({ success: false, message: '' });
  const [isTesting, setIsTesting] = useState(false);
  
  // Load webhook URL from localStorage on component mount
  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem('zapier_webhook_url');
    if (savedWebhookUrl) {
      setWebhookUrl(savedWebhookUrl);
    }
  }, []);
  
  const handleSave = () => {
    setIsSaving(true);
    
    try {
      // Validate the URL
      if (webhookUrl && !webhookUrl.startsWith('https://hooks.zapier.com/')) {
        toast({
          title: "Invalid Webhook URL",
          description: "Please enter a valid Zapier webhook URL",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      // Save to localStorage
      localStorage.setItem('zapier_webhook_url', webhookUrl);
      
      toast({
        title: "Settings Saved",
        description: "Your Zapier webhook URL has been saved successfully"
      });
    } catch (error) {
      console.error("Error saving webhook URL:", error);
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
    localStorage.removeItem('zapier_webhook_url');
    setWebhookUrl('');
    setTestData({ success: false, message: '' });
    toast({
      title: "Settings Cleared",
      description: "Your Zapier webhook URL has been cleared"
    });
  };
  
  const handleTest = async () => {
    if (!webhookUrl) {
      toast({
        title: "No Webhook URL",
        description: "Please enter and save a webhook URL first",
        variant: "destructive"
      });
      return;
    }
    
    setIsTesting(true);
    setTestData({ success: false, message: '' });
    
    try {
      // Send a test payload to the webhook
      const testPayload = {
        test: true,
        timestamp: new Date().toISOString(),
        message: "This is a test submission from Málaga Driver Hub"
      };
      
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Required for cross-origin requests to Zapier
        body: JSON.stringify(testPayload),
      });
      
      // Since we're using no-cors, we won't get a proper response status
      setTestData({ 
        success: true, 
        message: "Test submission sent successfully! Check your Zapier account to confirm it was received." 
      });
      
    } catch (error) {
      console.error("Error testing webhook:", error);
      setTestData({ 
        success: false, 
        message: "Failed to send test submission. Please verify your webhook URL and try again." 
      });
    } finally {
      setIsTesting(false);
    }
  };
  
  return (
    <div className="flex flex-col gap-4 w-full md:w-auto">
      <div className="space-y-2">
        <Input
          type="text"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          placeholder="https://hooks.zapier.com/hooks/catch/..."
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
          disabled={isTesting || !webhookUrl}
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
          disabled={isSaving || isTesting || !webhookUrl}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ZapierConfig;
