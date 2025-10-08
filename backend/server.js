require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const extractRoute = require('./routes/extract');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Configure CORS based on environment
const corsOptions = {
  origin: process.env.CORS_ORIGIN || (
    process.env.NODE_ENV === 'production' 
      ? true  // Allow same-origin requests in production
      : 'http://localhost:3000'  // Allow React dev server in development
  ),
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// API Routes
app.use('/api', extractRoute);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../frontend/build');
  const fs = require('fs');
  
  // Check if build folder exists
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
    console.log('✅ Serving frontend from:', buildPath);
  } else {
    console.error('⚠️ Frontend build folder not found at:', buildPath);
    app.get('*', (req, res) => {
      res.status(503).json({
        success: false,
        error: 'Frontend build not found',
        message: 'The frontend has not been built. Run "npm run build" from the project root.',
        buildPath: buildPath
      });
    });
  }
} else {
  console.log('⚠️ NODE_ENV is not "production" - frontend will not be served');
  console.log('💡 Set NODE_ENV=production in Railway environment variables');
  
  // Provide helpful error message for root route
  app.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Expense Tracker API is running',
      environment: process.env.NODE_ENV || 'development',
      note: 'Frontend is only served when NODE_ENV=production',
      endpoints: {
        health: '/api/health',
        extract: '/api/extract (POST)'
      },
      setup: {
        step1: 'Set NODE_ENV=production in Railway environment variables',
        step2: 'Ensure frontend build folder exists',
        step3: 'Redeploy the application'
      }
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Expense Tracker Server Started');
  console.log('='.repeat(50));
  console.log(`📍 Port: ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Configured ✅' : 'Missing ❌'}`);
  
  const corsOrigin = process.env.CORS_ORIGIN || (
    process.env.NODE_ENV === 'production' ? 'same-origin' : 'http://localhost:3000'
  );
  console.log(`🌐 CORS Origin: ${corsOrigin}`);
  
  const buildPath = path.join(__dirname, '../frontend/build');
  const fs = require('fs');
  const buildExists = fs.existsSync(buildPath);
  console.log(`📦 Frontend Build: ${buildExists ? 'Found ✅' : 'Missing ❌'}`);
  
  if (process.env.NODE_ENV === 'production') {
    if (buildExists) {
      console.log(`✅ Serving frontend from: ${buildPath}`);
    } else {
      console.log(`⚠️  WARNING: Production mode but build folder missing!`);
      console.log(`   Expected at: ${buildPath}`);
      console.log(`   Run: npm run build`);
    }
  } else {
    console.log(`⚠️  Frontend will NOT be served (NODE_ENV !== 'production')`);
    console.log(`   Set NODE_ENV=production to serve frontend`);
  }
  
  console.log('='.repeat(50) + '\n');
});


