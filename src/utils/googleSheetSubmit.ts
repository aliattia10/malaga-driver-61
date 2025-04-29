
/**
 * Submit form data to Google Sheets via a Google Apps Script web app
 */
export const submitToGoogleSheet = async (data: Record<string, any>): Promise<{ success: boolean; message: string }> => {
  try {
    const webAppUrl = localStorage.getItem('google_sheet_webapp_url');
    
    if (!webAppUrl) {
      throw new Error('Google Sheet Web App URL is not configured');
    }
    
    // Make a POST request to the Google Apps Script web app
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Check if the response indicates success
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit: ${errorText}`);
    }
    
    const result = await response.json();
    
    return {
      success: true,
      message: 'Your booking has been successfully submitted!'
    };
  } catch (error) {
    console.error('Error submitting to Google Sheet:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
