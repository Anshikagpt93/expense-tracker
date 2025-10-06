# Expense Tracker - Project Scope

## Project Overview
An expense tracker application that allows users to upload receipt images and automatically extract expense data using OpenAI's Vision API. The app provides a simple, intuitive interface for managing expenses without the need for manual data entry.

## Tech Stack
- **Backend**: Node.js + Express
- **Frontend**: React
- **AI/ML**: OpenAI Vision API (GPT-4 Vision)
- **Storage**: localStorage (client-side)
- **Deployment**: Railway

## Core Features

### 1. Receipt Upload & Processing
- **Drag & Drop Interface**
  - Users can drag and drop receipt images into a designated upload zone
  - Alternative: Click to browse and select files
  - Support common image formats: JPG, JPEG, PNG, HEIC
  - Display preview of uploaded image before processing
  - Show loading state while processing

- **AI-Powered Data Extraction**
  - Send receipt image to OpenAI Vision API
  - Extract the following fields:
    - Merchant/vendor name
    - Total amount
    - Date of transaction
    - Currency (default to USD if not detected)
    - Category (optional: food, transport, utilities, etc.)
  - Display extracted data to user for review

### 2. Expense Management
- **View Expenses**
  - Display all expenses in a list/table format
  - Show: merchant name, amount, date, category
  - Sort by: date (newest first by default), amount, merchant
  - Filter by: date range, category, merchant

- **Edit Expenses**
  - Allow users to manually edit any extracted field
  - Edit directly inline or through a modal
  - Save changes to localStorage

- **Delete Expenses**
  - Delete individual expenses
  - Confirmation prompt before deletion

- **Expense Details**
  - Click on expense to view full details
  - Display original receipt image
  - Show all extracted metadata

### 3. Dashboard/Summary
- **Overview Statistics**
  - Total expenses (current month)
  - Total number of receipts
  - Spending by category (pie chart or bar graph)
  - Monthly spending trend

- **Quick Actions**
  - Quick access to upload new receipt
  - Clear all data option (with confirmation)

### 4. Data Persistence
- **localStorage Implementation**
  - Store expenses as JSON array in localStorage
  - Store receipt images as base64 encoded strings
  - Auto-save on every change
  - Handle storage quota limits gracefully

## API Endpoints

### Backend REST API

#### POST `/api/receipts/upload`
- **Purpose**: Upload and process receipt image
- **Request**: Multipart form data with image file
- **Response**: Extracted expense data
```json
{
  "success": true,
  "data": {
    "merchant": "Whole Foods Market",
    "amount": 45.67,
    "date": "2025-10-01",
    "currency": "USD",
    "category": "Groceries"
  },
  "imageUrl": "base64_encoded_string_or_url"
}
```

#### GET `/api/health`
- **Purpose**: Health check endpoint
- **Response**: Server status

## Data Models

### Expense Object
```javascript
{
  id: "unique_id_string",
  merchant: "string",
  amount: number,
  date: "YYYY-MM-DD",
  currency: "string (default: USD)",
  category: "string",
  imageData: "base64_encoded_string",
  createdAt: "ISO_timestamp",
  updatedAt: "ISO_timestamp"
}
```

## User Flow

### Primary Flow: Upload Receipt
1. User lands on homepage
2. User drags receipt image onto upload zone (or clicks to browse)
3. Image preview appears
4. User clicks "Process Receipt" button
5. Loading indicator shows while API processes
6. Extracted data appears in editable form
7. User reviews/edits data if needed
8. User clicks "Save Expense"
9. Expense appears in expense list
10. User can upload another receipt or view their expenses

### Secondary Flow: Manage Expenses
1. User views list of all expenses
2. User can:
   - Click on expense to see details and original receipt
   - Click edit icon to modify expense data
   - Click delete icon to remove expense
   - Use filters/sort to find specific expenses
3. Changes save automatically to localStorage

## UI/UX Requirements

### Design Principles
- Clean, modern interface
- Mobile-responsive design
- Intuitive drag-and-drop with clear visual feedback
- Loading states for all async operations
- Error states with helpful messages
- Success confirmations for user actions

### Key Pages/Views

1. **Home/Upload Page**
   - Large drag-drop zone
   - Recent expenses preview (3-5 items)
   - Quick stats summary

2. **Expenses Page**
   - Filterable/sortable table or card grid
   - Search functionality
   - Batch actions (future enhancement)

3. **Expense Detail Modal/Page**
   - Full expense information
   - Original receipt image display
   - Edit and delete actions

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Error Handling

### Client-Side
- Invalid file format error
- File size too large (limit: 10MB)
- localStorage quota exceeded
- Network connection errors

### Server-Side
- OpenAI API failures (with retry logic)
- Invalid image format
- API rate limiting
- Missing API key

## Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=production
CORS_ORIGIN=your_frontend_url
MAX_FILE_SIZE=10485760
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001
```

## OpenAI Vision API Integration

### Prompt Strategy
Send receipt image with prompt:
```
"Analyze this receipt image and extract the following information in JSON format:
- merchant: the name of the store/business
- amount: the total amount (numeric value only)
- date: the transaction date in YYYY-MM-DD format
- currency: the currency code (e.g., USD, EUR)
- category: categorize as one of: Food & Dining, Groceries, Transportation, Utilities, Shopping, Entertainment, Healthcare, Other

Respond only with valid JSON."
```

### Fallback Handling
- If API returns unclear data, allow manual entry
- Provide default values when extraction fails
- Show confidence indicators if available

## Security Considerations
- Validate file types on both client and server
- Sanitize file names
- Implement file size limits
- Rate limit API endpoints
- Secure API key storage (never expose to client)
- CORS configuration for production
- Input validation on all form fields

## Performance Considerations
- Compress images before sending to API (if >1MB)
- Lazy load receipt images in list view
- Pagination for large expense lists (100+ items)
- Debounce search/filter inputs
- Optimize localStorage reads/writes

## Deployment (Railway)

### Requirements
- Node.js environment
- Environment variables configured in Railway dashboard
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Port configuration from Railway

### Frontend Deployment Options
- Serve React app from Express (static files)
- Or: Deploy frontend separately (Vercel/Netlify) and configure CORS

## Future Enhancements (Out of Scope for MVP)
- User authentication
- Cloud storage for receipt images
- Export to CSV/PDF
- Receipt OCR quality indicators
- Multi-currency conversion
- Budget tracking and alerts
- Recurring expenses
- Mobile app
- Receipt email forwarding
- Integration with accounting software

## Success Criteria
- Users can upload a receipt and get extracted data in < 10 seconds
- Extraction accuracy > 80% for clear receipts
- App works on mobile, tablet, and desktop
- Data persists across browser sessions
- Clean, intuitive UI requiring no tutorial
- Successfully deployed and accessible via Railway URL

## Development Phases

### Phase 1: Backend Setup
- Express server setup
- OpenAI API integration
- Image upload endpoint
- Error handling

### Phase 2: Frontend Core
- React app scaffolding
- Upload UI component
- Expense list component
- localStorage integration

### Phase 3: Polish & Integration
- Connect frontend to backend
- Styling and responsive design
- Error handling and loading states
- Testing

### Phase 4: Deployment
- Railway configuration
- Environment setup
- Production testing
- Documentation

## Estimated Timeline
- Phase 1: 1-2 days
- Phase 2: 2-3 days
- Phase 3: 1-2 days
- Phase 4: 1 day
- **Total: ~5-8 days for MVP**

---

## Notes
- Keep it simple: focus on core functionality first
- Prioritize user experience over advanced features
- Ensure graceful degradation when API fails
- Make it easy to switch from localStorage to database later


