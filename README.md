# 💰 Expense Tracker

AI-powered expense tracker that extracts data from receipt images using OpenAI's Vision API.

## Features

- 📸 **Upload receipts** via drag-and-drop or file picker
- 🤖 **AI extraction** of merchant, amount, and date using GPT-4 Vision
- 💾 **Local storage** - no database required
- 📱 **Responsive design** - works on mobile, tablet, and desktop
- ⚡ **Fast processing** - see results in under 10 seconds

## Tech Stack

**Backend:**
- Node.js + Express
- OpenAI Vision API (gpt-4o-mini)
- Multer for file uploads

**Frontend:**
- React
- localStorage for data persistence
- Modern, clean CSS

## Quick Start

### Prerequisites

- Node.js 16+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
cd "Expense Tracker"
```

2. Install all dependencies:
```bash
npm run install-all
```

3. Set up environment variables:

Create `backend/.env`:
```bash
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=5242880
```

Create `frontend/.env`:
```bash
REACT_APP_API_URL=http://localhost:3001
```

### Development

Run backend and frontend in separate terminals:

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

The app will open at `http://localhost:3000`

### Production Build

Build the frontend:
```bash
npm run build
```

Start the production server:
```bash
NODE_ENV=production npm start
```

## Project Structure

```
/expense-tracker
  /backend
    server.js           # Express server
    /routes
      extract.js        # Receipt extraction endpoint
    /utils
      openai.js         # OpenAI API integration
    
  /frontend
    /src
      App.js            # Main app component
      /components
        Header.js       # App header
        UploadZone.js   # Drag-drop upload area
        ExpenseList.js  # List of expenses
        ExpenseItem.js  # Individual expense card
        EmptyState.js   # Empty state message
        Toast.js        # Success/error notifications
      /utils
        api.js          # API calls
        storage.js      # localStorage helpers
        formatters.js   # Date/currency formatting
```

## API Endpoints

### `POST /api/extract`
Upload receipt image and extract expense data.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` file (JPG, PNG, HEIC, max 5MB)

**Response:**
```json
{
  "success": true,
  "data": {
    "merchant": "Whole Foods",
    "amount": 45.67,
    "date": "2025-10-01"
  }
}
```

### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-03T12:00:00Z",
  "environment": "development"
}
```

## Deployment (Railway)

1. Push your code to GitHub

2. Create new project on [Railway](https://railway.app)

3. Connect your GitHub repository

4. Add environment variables in Railway dashboard:
   - `OPENAI_API_KEY`
   - `NODE_ENV=production`
   - `PORT` (Railway sets this automatically)

5. Railway will automatically:
   - Run `npm run install-all && npm run build`
   - Start server with `npm start`
   - Deploy to production URL

## Usage

1. **Upload a receipt:**
   - Drag and drop an image, or click to browse
   - Supports JPG, PNG, HEIC (max 5MB)

2. **Review extracted data:**
   - AI extracts merchant name, amount, and date
   - Processing takes 5-10 seconds

3. **Manage expenses:**
   - View all expenses in a list
   - Click × to delete an expense
   - Data persists in browser localStorage

## Tips for Best Results

- Use clear, well-lit photos of receipts
- Ensure total amount is visible
- Keep receipt flat and in focus
- Works best with printed receipts

## Limitations

- No user authentication (localStorage is per-browser)
- Storage limited by browser quota (~5-10MB)
- No receipt image storage (images are processed and discarded)
- No expense editing (delete and re-upload instead)

## Future Enhancements

See `scope.md` for potential features:
- Edit expenses
- Categories
- Date filters
- Spending analytics
- Export to CSV
- Receipt image storage
- Cloud database

## Troubleshooting

**"OpenAI API key is invalid or missing"**
- Check that `OPENAI_API_KEY` is set in `backend/.env`
- Verify the key is valid on OpenAI dashboard

**"File too large"**
- Maximum file size is 5MB
- Compress image before uploading

**"Failed to process receipt"**
- Ensure receipt image is clear and readable
- Try a different photo angle
- Check backend logs for errors

**Storage quota exceeded:**
- Delete old expenses
- Clear browser cache
- localStorage limit is ~5-10MB per domain

## License

MIT

## Support

For issues or questions, see the documentation files:
- `scope.md` - Full project scope
- `mvp.md` - MVP specification
- `design.md` - UI/UX design guide


