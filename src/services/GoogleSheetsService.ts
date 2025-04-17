
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
  // Optional custom location fields
  customPickupLocation?: string;
  customDropoffLocation?: string;
}

export class GoogleSheetsService {
  private static webhookUrl: string | null = "https://script.google.com/macros/s/AKfycbwyL3Dnp9grtLfcfejpU1dBez1pGfvZVqu21TKUYfUuq6ZloFBfddCXPdxL9EyQBzW1/exec";
  private static spreadsheetUrl: string = "https://docs.google.com/spreadsheets/d/1UrcM2WzKwhnitsuC7wweYpW1qH02ro3eZ3dxOD_hvJg/edit?usp=sharing";
  private static sheetName: string = "lista de clientes"; // Updated default sheet name based on the error message

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

  // Save the sheet name to localStorage
  static saveSheetName(name: string): void {
    localStorage.setItem('google_sheets_sheet_name', name);
    this.sheetName = name;
  }

  // Get the sheet name from localStorage or use the default
  static getSheetName(): string {
    const name = localStorage.getItem('google_sheets_sheet_name');
    if (name) {
      this.sheetName = name;
      return name;
    }
    
    return this.sheetName; // Return the default sheet name
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

    // Format the data according to what the Apps Script expects
    const formattedData = {
      pickupLocation: bookingData.pickupLocation,
      customPickupLocation: bookingData.customPickupLocation || '',
      dropoffLocation: bookingData.dropoffLocation,
      customDropoffLocation: bookingData.customDropoffLocation || '',
      passengers: bookingData.passengers,
      // Extract date and time from the combined dateTime field
      date: bookingData.dateTime.split('T')[0],
      time: bookingData.dateTime.split('T')[1],
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      specialRequests: bookingData.specialRequests || 'None',
      submittedAt: bookingData.submittedAt,
      sheetName: this.getSheetName() // Send the sheet name to the Apps Script
    };

    try {
      console.log('Sending booking data to Google Sheets:', formattedData);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: JSON.stringify(formattedData),
        // No-cors mode is now optional, try first without it
      });

      try {
        // Try to parse the response as JSON first
        const resultText = await response.text();
        const result = JSON.parse(resultText);
        console.log('Google Sheets response:', result);

        if (result.result === "success") {
          return { 
            success: true, 
            message: 'Booking data saved to Google Sheets successfully. Check your email for confirmation.'
          };
        } else if (result.message && result.message.includes("Sheet")) {
          // Handle sheet name error specifically
          return { 
            success: false, 
            message: `Sheet configuration issue: ${result.message}. Your booking is still confirmed, but please update the sheet name in settings.`
          };
        } else {
          return { 
            success: false, 
            message: `Failed to save to Google Sheets: ${result.message || 'Unknown error'}. Your booking is still confirmed.`
          };
        }
      } catch (parseError) {
        // Fallback for when response is not valid JSON (common with no-cors)
        console.log('Response could not be parsed as JSON, assuming success');
        return { 
          success: true, 
          message: 'Booking data sent to Google Sheets. Check your email for confirmation.'
        };
      }
    } catch (error) {
      console.error('Error sending booking data to Google Sheets:', error);
      
      // If the initial request failed, try again with no-cors mode
      try {
        console.log('Retrying with no-cors mode...');
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          mode: 'no-cors',
          body: JSON.stringify(formattedData),
        });
        
        // Since no-cors doesn't provide a readable response, assume it worked
        return { 
          success: true, 
          message: 'Booking data sent to Google Sheets (no-cors fallback). Check your email for confirmation.'
        };
      } catch (fallbackError) {
        console.error('Error in no-cors fallback:', fallbackError);
        return { 
          success: false, 
          message: 'Failed to save to Google Sheets after multiple attempts. Your booking is still confirmed.'
        };
      }
    }
  }
}
