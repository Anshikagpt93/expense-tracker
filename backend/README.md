# Backend API

Express server with OpenAI Vision API integration for receipt extraction.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
OPENAI_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

3. Run development server:
```bash
npm run dev
```

## Endpoints

- `POST /api/extract` - Upload and extract receipt data
- `GET /api/health` - Health check

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origin (default: http://localhost:3000)
- `MAX_FILE_SIZE` - Max upload size in bytes (default: 5242880 = 5MB)


