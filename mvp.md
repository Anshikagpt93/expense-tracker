# Expense Tracker - MVP Specification

## The Magic Moment 🎯
User drops a receipt image → sees merchant, amount, and date extracted in seconds → expense saved. That's it.

## MVP Scope: Single-Page Experience

### What We're Building
A single-page app where users can:
1. Upload a receipt image (drag-drop or click)
2. Watch AI extract the data in real-time
3. See their expenses in a simple list
4. Click to delete expenses they don't want

**That's the entire MVP.** No editing, no filters, no categories, no dashboard. Just the core magic.

---

## Backend: 2 Endpoints

### 1. `POST /api/extract`
**Purpose:** Upload receipt and extract data

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` file (JPG, PNG, max 5MB)

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

**Implementation:**
1. Receive image upload
2. Convert to base64
3. Send to OpenAI Vision API with prompt
4. Parse JSON response
5. Return extracted data

**OpenAI Prompt:**
```
Extract the following from this receipt:
- merchant: store/business name
- amount: total amount as a number
- date: date in YYYY-MM-DD format

Return only valid JSON with these three fields.
```

### 2. `GET /api/health`
**Purpose:** Health check for Railway deployment

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-03T12:00:00Z"
}
```

---

## Frontend: Single Page Component

### Layout
```
┌─────────────────────────────────────┐
│     EXPENSE TRACKER                  │
├─────────────────────────────────────┤
│                                      │
│   ┌───────────────────────────┐     │
│   │   Drag & Drop Receipt     │     │
│   │         Here              │     │
│   │      [or click]           │     │
│   └───────────────────────────┘     │
│                                      │
│   [Processing indicator if active]   │
│                                      │
├─────────────────────────────────────┤
│   YOUR EXPENSES                      │
├─────────────────────────────────────┤
│   Starbucks      $5.50    Oct 1  [×]│
│   Whole Foods   $45.67    Oct 1  [×]│
│   Shell Gas     $52.00    Sep 30 [×]│
│                                      │
└─────────────────────────────────────┘
```

### Components Breakdown

**1. UploadZone**
- Drag-and-drop area
- File input (hidden, triggered by click)
- Shows image preview after selection
- "Process Receipt" button
- Loading spinner during API call

**2. ExpenseList**
- Simple list/table of expenses
- Each row: merchant | amount | date | delete button
- Newest first
- Empty state: "No expenses yet. Upload a receipt to get started!"

**3. Single State Management**
```javascript
const [expenses, setExpenses] = useState([]) // loaded from localStorage
const [isProcessing, setIsProcessing] = useState(false)
```

---

## Data Model: One Object

```javascript
{
  id: "1696348800000", // timestamp
  merchant: "Starbucks",
  amount: 5.50,
  date: "2025-10-01",
  createdAt: "2025-10-03T12:00:00Z"
}
```

**localStorage key:** `expenses`
**localStorage value:** `JSON.stringify(expenses)`

---

## User Flow: 4 Steps

1. **Upload**
   - Drag image onto drop zone OR click to select
   - See image preview
   - Click "Process Receipt"

2. **Process**
   - Show loading spinner
   - Call `POST /api/extract`
   - Display extracted data in 3-5 seconds

3. **Save**
   - Auto-save to localStorage
   - Add to top of expense list
   - Clear upload zone

4. **Manage**
   - View all expenses
   - Click [×] to delete any expense

---

## Technical Implementation

### Backend Structure
```
/backend
  server.js           # Express app, CORS, routes
  /routes
    extract.js        # POST /api/extract endpoint
  /utils
    openai.js         # OpenAI Vision API client
  .env                # OPENAI_API_KEY, PORT
  package.json
```

### Frontend Structure
```
/frontend
  /src
    App.jsx           # Main component
    /components
      UploadZone.jsx  # Drag-drop & upload UI
      ExpenseList.jsx # List of expenses
    /utils
      api.js          # Fetch wrapper for backend
      storage.js      # localStorage helpers
    App.css           # Minimal, clean styles
  .env                # REACT_APP_API_URL
  package.json
```

### Key Libraries

**Backend:**
- `express` - web server
- `multer` - file upload handling
- `openai` - official OpenAI client
- `cors` - enable frontend requests
- `dotenv` - environment variables

**Frontend:**
- `react` - UI framework
- `react-dropzone` - drag-drop functionality (optional, can do vanilla)

---

## Error Handling: Keep It Simple

### Show Error Messages For:
- File too large (>5MB): "Image too large. Please use a smaller file."
- Invalid file type: "Please upload a JPG or PNG image."
- API failure: "Couldn't process receipt. Please try again."
- Network error: "Connection failed. Check your internet."

### Fallback Strategy:
- If OpenAI returns malformed data → show error, don't save
- If extraction succeeds but fields are missing → use defaults:
  - merchant: "Unknown Merchant"
  - amount: 0.00
  - date: today's date

---

## Environment Setup

### Backend `.env`
```
OPENAI_API_KEY=sk-proj-...
PORT=3001
NODE_ENV=production
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:3001
```

For Railway deployment, frontend will use Railway backend URL.

---

## Railway Deployment: Monorepo Approach

**Project Structure:**
```
/expense-tracker
  /backend        # Express API
  /frontend       # React app
  package.json    # Root package.json for Railway
```

**Root `package.json` scripts:**
```json
{
  "scripts": {
    "install-all": "cd backend && npm install && cd ../frontend && npm install",
    "build": "cd frontend && npm run build",
    "start": "cd backend && node server.js"
  }
}
```

**Railway Config:**
- Build Command: `npm run install-all && npm run build`
- Start Command: `npm start`
- Backend serves frontend's build folder as static files

---

## Performance Target

| Metric | Target |
|--------|--------|
| Image upload → Display results | < 10 seconds |
| OpenAI API response time | 3-7 seconds |
| UI response time | < 100ms |
| Max image size | 5MB |

---

## What We're NOT Building (Yet)

❌ Edit expenses  
❌ Categories or tags  
❌ Search or filters  
❌ Date range filtering  
❌ Spending analytics  
❌ Export data  
❌ Multiple views/pages  
❌ User accounts  
❌ Receipt image storage (just extract & discard)  
❌ Bulk operations  

**Why?** These add complexity. The MVP proves the core value: "AI extracts my receipt data instantly."

---

## Success Criteria

✅ User uploads receipt → sees extracted data in under 10 seconds  
✅ Extraction works for 80%+ of common receipts  
✅ Expenses persist in localStorage  
✅ App deployed and accessible on Railway  
✅ Works on mobile and desktop  
✅ UI feels fast and responsive  

---

## MVP Timeline

### Day 1: Backend
- [ ] Express server setup
- [ ] Multer file upload
- [ ] OpenAI Vision API integration
- [ ] Test with sample receipts

### Day 2: Frontend
- [ ] React app scaffold
- [ ] Upload component with drag-drop
- [ ] Expense list component
- [ ] localStorage integration
- [ ] Connect to backend API

### Day 3: Polish & Deploy
- [ ] Error handling
- [ ] Loading states
- [ ] Basic styling
- [ ] Mobile responsive
- [ ] Railway deployment
- [ ] Test end-to-end

**Total: 3 days from start to deployed MVP**

---

## The "Magic" Checklist

To make this feel delightful, focus on:

1. **Instant feedback**: Show upload progress immediately
2. **Visual polish**: Smooth transitions, clear loading states
3. **Speed**: Optimize image size before upload if >1MB
4. **Accuracy**: Good prompt engineering for OpenAI
5. **Simplicity**: Don't make user think about categories or fields

---

## API Call Example

```javascript
// Frontend: api.js
export async function extractReceipt(imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)
  
  const response = await fetch(`${API_URL}/api/extract`, {
    method: 'POST',
    body: formData,
  })
  
  if (!response.ok) throw new Error('Extraction failed')
  return response.json()
}
```

```javascript
// Backend: extract.js
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

router.post('/extract', upload.single('image'), async (req, res) => {
  try {
    const base64Image = req.file.buffer.toString('base64')
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: "Extract merchant, amount, and date from this receipt. Return only JSON." },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
        ]
      }],
      max_tokens: 300
    })
    
    const data = JSON.parse(response.choices[0].message.content)
    res.json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})
```

---

## Next Steps After MVP

Once MVP is live and validated:
1. Add edit functionality
2. Add categories (auto-suggested by AI)
3. Add basic filtering by month
4. Consider storing receipt images (base64 in localStorage or cloud)
5. Add simple spending summary

But for now: **Keep it simple. Ship fast. Validate the magic. 🚀**


