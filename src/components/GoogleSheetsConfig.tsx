
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleSheetsService } from '@/services/GoogleSheetsService';
import { useToast } from '@/components/ui/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { BookOpen, Check, AlertCircle, Link2 } from 'lucide-react';

const GoogleSheetsConfig = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const savedUrl = GoogleSheetsService.getWebhookUrl();
    if (savedUrl) {
      setWebhookUrl(savedUrl);
      setIsConfigured(true);
    }
  }, []);

  const handleSaveWebhook = () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a valid webhook URL",
        variant: "destructive",
      });
      return;
    }

    GoogleSheetsService.saveWebhookUrl(webhookUrl);
    setIsConfigured(true);
    
    toast({
      title: "Webhook Saved",
      description: "Google Sheets integration has been configured",
      action: (
        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-white" />
        </div>
      ),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Link2 className="h-4 w-4" />
          {isConfigured ? "Google Sheets Configured" : "Configure Google Sheets"}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Google Sheets Integration</SheetTitle>
          <SheetDescription>
            Connect your booking form to Google Sheets to store all submissions
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Webhook Setup</CardTitle>
              <CardDescription>
                Enter your Google Sheets webhook URL to store form submissions automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="webhook-url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/your-webhook-id/exec"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span>This webhook URL should point to your Google Apps Script</span>
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  onClick={handleSaveWebhook}
                  className="w-full"
                >
                  Save Webhook Configuration
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a href="https://developers.google.com/apps-script/guides/web" target="_blank" rel="noopener noreferrer">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learn How
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default GoogleSheetsConfig;
