
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const ZapierConfig = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
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
    toast({
      title: "Settings Cleared",
      description: "Your Zapier webhook URL has been cleared"
    });
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
      <div className="flex gap-2">
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
          variant="outline" 
          onClick={handleClear}
          disabled={isSaving || !webhookUrl}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ZapierConfig;
