
/**
 * Submit form data to Google Sheets via a Google Apps Script web app
 */
export const submitToGoogleSheet = async (data: Record<string, any>): Promise<{ success: boolean; message: string }> => {
  try {
    const webAppUrl = localStorage.getItem('google_sheet_webapp_url');
    
    if (!webAppUrl) {
      console.log('Google Sheet Web App URL not found in local storage');
      return {
        success: false,
        message: 'Google Sheet Web App URL is not configured. Please configure it in the Admin Settings.'
      };
    }
    
    console.log('Submitting to Google Sheet Web App URL:', webAppUrl);
    
    // Make a POST request to the Google Apps Script web app
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // Use CORS mode
      body: JSON.stringify(data),
    });
    
    // Check if the response indicates success
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response not OK:', response.status, errorText);
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Submission result:', result);
    
    return {
      success: true,
      message: 'Your booking has been successfully submitted!'
    };
  } catch (error) {
    console.error('Error submitting to Google Sheet:', error);
    
    // Check for specific fetch errors
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return {
        success: false,
        message: 'Cannot connect to Google Sheets. Please ensure your Google Apps Script is properly deployed and the Web App URL is correct in the Admin Settings.'
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
