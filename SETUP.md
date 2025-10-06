# Setup Instructions

Follow these steps to get your Expense Tracker running locally.

## Prerequisites

- Node.js 16 or higher
- npm (comes with Node.js)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Quick Start (3 Steps)

### 1. Install Dependencies

```bash
npm run install-all
```

This installs dependencies for both backend and frontend.

### 2. Configure Environment Variables

**Backend Environment:**

Create `backend/.env` file:

```bash
OPENAI_API_KEY=sk-proj-your-actual-openai-key-here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=5242880
```

**Frontend Environment:**

Create `frontend/.env` file:

```bash
REACT_APP_API_URL=http://localhost:3001
```

### 3. Run the Application

Open **two terminal windows**:

**Terminal 1 - Start Backend:**
```bash
npm run dev:backend
```

You should see:
```
🚀 Server running on port 3001
📝 Environment: development
🔑 OpenAI API Key: Configured
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev:frontend
```

The app will automatically open at `http://localhost:3000`

## Verify It's Working

1. Open `http://localhost:3000` in your browser
2. You should see the "💰 EXPENSE TRACKER" header
3. Try uploading a receipt image
4. If successful, you'll see extracted merchant, amount, and date

## Troubleshooting

### Backend won't start

**Error: "OPENAI_API_KEY is missing"**
- Make sure you created `backend/.env`
- Verify your API key is correct
- No spaces or quotes around the key

**Error: "Port 3001 is already in use"**
```bash
# Find and kill the process using port 3001
lsof -ti:3001 | xargs kill -9
```

### Frontend won't connect to backend

**Error: "Failed to fetch"**
- Ensure backend is running on port 3001
- Check `frontend/.env` has correct API URL
- Verify no CORS errors in browser console

### Receipt processing fails

**"OpenAI API key is invalid"**
- Get a new API key from OpenAI dashboard
- Make sure key starts with `sk-proj-`
- Verify your OpenAI account has credits

**"Failed to process receipt"**
- Check image is clear and readable
- Ensure image is under 5MB
- Try JPG or PNG format
- Check backend terminal for detailed errors

## Testing with Sample Receipts

Don't have a receipt handy? Use these test images:
1. Take a photo of any receipt with your phone
2. Or use online sample receipt images
3. Make sure total, merchant, and date are visible

## Next Steps

Once it's working:
1. Test uploading several receipts
2. Verify expenses are saved (refresh page)
3. Try deleting expenses
4. Check mobile responsiveness

Ready to deploy? See `DEPLOYMENT.md` for Railway deployment guide.

## Development Tips

### Backend Development

Watch for changes:
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

Test the API directly:
```bash
# Health check
curl http://localhost:3001/api/health

# Test extraction (with a receipt image)
curl -X POST http://localhost:3001/api/extract \
  -F "image=@path/to/receipt.jpg"
```

### Frontend Development

The React dev server supports:
- ✅ Hot reloading - changes appear instantly
- ✅ Error overlay - see errors in browser
- ✅ DevTools - React DevTools extension works

### localStorage Inspection

View stored expenses in browser console:
```javascript
// View all expenses
JSON.parse(localStorage.getItem('expenses'))

// Clear all expenses
localStorage.removeItem('expenses')
```

## File Structure Reference

```
/expense-tracker
  package.json              ← Root config
  
  /backend
    server.js               ← Express server
    package.json            ← Backend dependencies
    .env                    ← Backend config (create this!)
    /routes
      extract.js            ← Receipt extraction endpoint
    /utils
      openai.js             ← OpenAI integration
  
  /frontend
    package.json            ← Frontend dependencies
    .env                    ← Frontend config (create this!)
    /src
      App.js                ← Main component
      /components           ← React components
      /utils                ← Helper functions
```

## Common Issues

### Port Already in Use

Kill all Node processes:
```bash
killall node
```

### npm install fails

Clear cache and retry:
```bash
npm cache clean --force
rm -rf backend/node_modules frontend/node_modules
npm run install-all
```

### Image upload fails

Check file size and type:
- Max size: 5MB
- Allowed: JPG, PNG, HEIC
- Compress large images before uploading

### Expenses disappear on refresh

This is expected if localStorage is disabled:
- Check browser settings allow localStorage
- Try a different browser
- Incognito/private mode may block localStorage

## Environment Variable Checklist

Backend `.env`:
- [ ] `OPENAI_API_KEY` - Your OpenAI key
- [ ] `PORT` - 3001 (default)
- [ ] `NODE_ENV` - development
- [ ] `CORS_ORIGIN` - http://localhost:3000
- [ ] `MAX_FILE_SIZE` - 5242880 (5MB)

Frontend `.env`:
- [ ] `REACT_APP_API_URL` - http://localhost:3001

## Getting Help

If you're still stuck:
1. Check backend terminal for errors
2. Check browser console (F12) for errors
3. Review `README.md` for detailed info
4. Check OpenAI dashboard for API issues

## Ready for Production?

See `DEPLOYMENT.md` for Railway deployment instructions.


