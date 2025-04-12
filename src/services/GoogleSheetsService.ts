
// This service handles connecting to Google Sheets via a webhook
// For simplicity, we're using a webhook URL approach rather than direct API integration

export interface BookingData {
  pickupLocation: string;
  dropoffLocation: string;
  dateTime: string;
  passengers: string;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  submittedAt: string;
}

export class GoogleSheetsService {
  private static webhookUrl: string | null = "https://script.google.com/macros/s/AKfycbyiJhDNOPneIrll_uan3MTI6YC30jMGRz_aI_wagfAZ2Ju8vNOyZDgc8WICVqg4g39P/exec";
  private static spreadsheetUrl: string = "https://docs.google.com/spreadsheets/d/1enm43ab3pgahkPWeWRh1ZasfCm5EQ5zCuKvR5spdydA/edit?usp=sharing";

  // Get the spreadsheet URL
  static getSpreadsheetUrl(): string {
    return this.spreadsheetUrl;
  }

  // Save the webhook URL to localStorage
  static saveWebhookUrl(url: string): void {
    localStorage.setItem('google_sheets_webhook_url', url);
    this.webhookUrl = url;
  }

  // Get the webhook URL from localStorage or use the default
  static getWebhookUrl(): string | null {
    if (this.webhookUrl) return this.webhookUrl;
    
    const url = localStorage.getItem('google_sheets_webhook_url');
    if (url) {
      this.webhookUrl = url;
      return url;
    }
    
    return this.webhookUrl; // Return the default webhook URL
  }

  // Submit booking data to Google Sheets via the webhook
  static async submitBookingToSheet(bookingData: BookingData): Promise<{ success: boolean; message: string }> {
    const webhookUrl = this.getWebhookUrl();
    
    if (!webhookUrl) {
      console.error('Google Sheets webhook URL not configured');
      return { 
        success: false, 
        message: 'Google Sheets integration not configured. Your booking is still confirmed.'
      };
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Required for some webhook services
        body: JSON.stringify(bookingData),
      });

      // Since we're using no-cors, we can't reliably check the status
      // We'll assume it worked if no exception was thrown
      console.log('Booking data sent to Google Sheets');
      return { 
        success: true, 
        message: 'Booking data saved to Google Sheets successfully'
      };
    } catch (error) {
      console.error('Error sending booking data to Google Sheets:', error);
      return { 
        success: false, 
        message: 'Failed to save to Google Sheets. Your booking is still confirmed.'
      };
    }
  }
}
