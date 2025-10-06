const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Extract receipt data from image
 * @param {File} imageFile - The receipt image file
 * @returns {Promise<Object>} Response with extracted data
 */
export async function extractReceipt(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout

    const response = await fetch(`${API_URL}/api/extract`, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to process receipt');
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. The file might be too large or the server is busy.');
    }
    console.error('API Error:', error);
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


