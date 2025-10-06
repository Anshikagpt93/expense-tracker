const express = require('express');
const multer = require('multer');
const { extractReceiptData } = require('../utils/openai');

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 6291456 // 6MB default
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and HEIC are allowed.'), false);
    }
  }
});

// POST /api/extract - Upload and extract receipt data
router.post('/extract', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }

    console.log(`📸 Processing receipt: ${req.file.originalname} (${req.file.size} bytes)`);

    // Extract data using OpenAI Vision API
    const extractedData = await extractReceiptData(req.file.buffer);

    console.log('✅ Extraction successful:', extractedData);

    res.json({
      success: true,
      data: extractedData
    });

  } catch (error) {
    console.error('❌ Extraction error:', error.message);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process receipt'
    });
  }
});

// Error handler for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 6MB.'
      });
    }
  }
  next(error);
});

module.exports = router;


