const OpenAI = require('openai');
const sharp = require('sharp');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Compress and resize image if needed
 * @param {Buffer} imageBuffer - Original image buffer
 * @returns {Promise<Buffer>} Processed image buffer
 */
async function processImage(imageBuffer) {
  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    
    console.log(`📊 Original image: ${metadata.width}x${metadata.height}, format: ${metadata.format}, size: ${imageBuffer.length} bytes`);
    
    // If image is larger than 2MB or dimensions are very large, compress it
    const maxSize = 2 * 1024 * 1024; // 2MB
    const maxDimension = 2048; // Max width or height
    
    let needsProcessing = imageBuffer.length > maxSize || 
                         metadata.width > maxDimension || 
                         metadata.height > maxDimension;
    
    if (needsProcessing) {
      console.log('🔧 Compressing image for optimal processing...');
      
      // Resize if dimensions are too large, maintaining aspect ratio
      let processedImage = image;
      if (metadata.width > maxDimension || metadata.height > maxDimension) {
        processedImage = processedImage.resize(maxDimension, maxDimension, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }
      
      // Convert to JPEG with good quality for OCR
      const compressedBuffer = await processedImage
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();
      
      console.log(`✅ Compressed to ${compressedBuffer.length} bytes (${((compressedBuffer.length / imageBuffer.length) * 100).toFixed(1)}% of original)`);
      
      return compressedBuffer;
    }
    
    // Convert to JPEG format for consistency
    const convertedBuffer = await image.jpeg({ quality: 95 }).toBuffer();
    return convertedBuffer;
    
  } catch (error) {
    console.error('⚠️  Image processing error, using original:', error.message);
    return imageBuffer;
  }
}

/**
 * Extract receipt data using OpenAI Vision API
 * @param {Buffer} imageBuffer - Image file buffer
 * @returns {Promise<Object>} Extracted receipt data
 */
async function extractReceiptData(imageBuffer) {
  try {
    // Process and compress image if needed
    const processedBuffer = await processImage(imageBuffer);
    
    // Convert buffer to base64
    const base64Image = processedBuffer.toString('base64');
    const mimeType = 'image/jpeg';

    // Construct the prompt for accurate extraction
    const prompt = `Analyze this receipt image and extract the following information. Return ONLY valid JSON with no additional text.

Extract these fields:
- merchant: The store or business name (string)
- amount: The total amount as a number (just the number, no currency symbol)
- date: The transaction date in YYYY-MM-DD format (string)

Rules:
- If you cannot find a field, use these defaults: merchant="Unknown Merchant", amount=0, date="${new Date().toISOString().split('T')[0]}"
- For amount, extract only the TOTAL or final amount paid
- For date, convert any date format to YYYY-MM-DD
- Return valid JSON only

Example response:
{
  "merchant": "Whole Foods Market",
  "amount": 45.67,
  "date": "2025-10-01"
}`;

    console.log('🤖 Calling OpenAI Vision API...');

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using gpt-4o-mini for cost-effectiveness and speed
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
                detail: 'auto' // Let OpenAI auto-adjust detail level based on image size
              }
            }
          ]
        }
      ],
      max_tokens: 300,
      temperature: 0.1, // Low temperature for consistent extraction
      timeout: 60000 // 60 second timeout for larger images
    });

    const content = response.choices[0].message.content.trim();
    console.log('📄 Raw OpenAI response:', content);

    // Parse JSON response
    let extractedData;
    try {
      // Remove markdown code blocks if present
      const jsonString = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      extractedData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Failed to parse receipt data. Please try again.');
    }

    // Validate and sanitize extracted data
    const validatedData = {
      merchant: extractedData.merchant || 'Unknown Merchant',
      amount: parseFloat(extractedData.amount) || 0,
      date: extractedData.date || new Date().toISOString().split('T')[0]
    };

    // Additional validation
    if (isNaN(validatedData.amount)) {
      validatedData.amount = 0;
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(validatedData.date)) {
      validatedData.date = new Date().toISOString().split('T')[0];
    }

    return validatedData;

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.code === 'invalid_api_key') {
      throw new Error('OpenAI API key is invalid or missing');
    }
    
    if (error.code === 'insufficient_quota') {
      throw new Error('OpenAI API quota exceeded');
    }
    
    throw new Error(error.message || 'Failed to extract receipt data');
  }
}

module.exports = {
  extractReceiptData
};


