
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleSheetsService } from '@/services/GoogleSheetsService';
import { useToast } from '@/components/ui/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { BookOpen, Check, AlertCircle, Link2, ExternalLink, FileSpreadsheet } from 'lucide-react';
import { Label } from '@/components/ui/label';

const GoogleSheetsConfig = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [sheetName, setSheetName] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const spreadsheetUrl = GoogleSheetsService.getSpreadsheetUrl();

  useEffect(() => {
    // Load saved values
    const savedUrl = GoogleSheetsService.getWebhookUrl();
    const savedSheetName = GoogleSheetsService.getSheetName();
    
    if (savedUrl) {
      setWebhookUrl(savedUrl);
      setIsConfigured(true);
    }
    
    if (savedSheetName) {
      setSheetName(savedSheetName);
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
    
    if (sheetName) {
      GoogleSheetsService.saveSheetName(sheetName);
    }
    
    setIsConfigured(true);
    
    toast({
      title: "Configuration Saved",
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
                  <Label htmlFor="spreadsheet-url">Connected Spreadsheet</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="spreadsheet-url"
                      value={spreadsheetUrl}
                      readOnly
                      className="w-full bg-muted"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a href={spreadsheetUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/your-webhook-id/exec"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sheet-name">Sheet Name</Label>
                  <Input
                    id="sheet-name"
                    value={sheetName}
                    onChange={(e) => setSheetName(e.target.value)}
                    placeholder="Lista de Clientes"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    <FileSpreadsheet className="h-3 w-3 inline mr-1" />
                    The exact name of the sheet tab in your Google Spreadsheet (default: "Lista de Clientes")
                  </p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 rounded-md p-3 text-sm">
                  <p className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>Sheet configuration issue: Sheet "lista de clientes" not found. Please check the SHEET_NAME variable.</span>
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
                  Save Configuration
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
