
import { Button } from '@/components/ui/button';
import GoogleSheetsConfig from '@/components/GoogleSheetsConfig';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Google Sheets</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect to Google Sheets to store booking data
                    </p>
                  </div>
                  <GoogleSheetsConfig />
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
