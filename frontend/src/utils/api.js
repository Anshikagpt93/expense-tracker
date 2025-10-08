// Determine API URL based on environment
// In production, use same origin (Railway serves both frontend and backend)
// In development, use localhost:3001
const API_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' ? 'http://localhost:3001' : '');

// Debug logging
console.log('🔧 API Configuration:', {
  hostname: window.location.hostname,
  API_URL: API_URL || '(same-origin)',
  env: process.env.REACT_APP_API_URL || 'not set'
});

/**
 * Extract receipt data from image
 * @param {File} imageFile - The receipt image file
 * @returns {Promise<Object>} Response with extracted data
 */
export async function extractReceipt(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const fullURL = `${API_URL}/api/extract`;
  console.log('🚀 Making request to:', fullURL);

  try {
    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout

    const response = await fetch(fullURL, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('✅ Response status:', response.status);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to process receipt');
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. The file might be too large or the server is busy.');
    }
    console.error('❌ API Error:', error);
    console.error('Failed URL:', fullURL);
    throw error;
  }
}

/**
 * Check API health
 * @returns {Promise<Object>} Health check response
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
}


