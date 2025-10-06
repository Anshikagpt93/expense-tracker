# Expense Tracker - UI Design

## Design Philosophy
- **Clean & Minimal**: Focus on the core action (upload)
- **Clear Hierarchy**: Upload area dominates, list supports
- **Instant Feedback**: Visual states for every action
- **Mobile-First**: Works beautifully on all devices

---

## Color Palette

```
Primary:    #4F46E5  (Indigo - for buttons, accents)
Success:    #10B981  (Green - for confirmations)
Error:      #EF4444  (Red - for errors)
Background: #F9FAFB  (Light gray)
Card:       #FFFFFF  (White)
Text:       #111827  (Almost black)
Subtext:    #6B7280  (Medium gray)
Border:     #E5E7EB  (Light gray)
```

---

## Desktop Layout - Empty State

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    💰  EXPENSE TRACKER                                                 │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                                                                        │
│              ┌─────────────────────────────────────┐                  │
│              │                                     │                  │
│              │          📸  Upload Receipt         │                  │
│              │                                     │                  │
│              │     Drag and drop your receipt      │                  │
│              │              here                   │                  │
│              │                                     │                  │
│              │         ┌─────────────────┐         │                  │
│              │         │  Choose File    │         │                  │
│              │         └─────────────────┘         │                  │
│              │                                     │                  │
│              │   JPG, PNG, HEIC • Max 5MB         │                  │
│              │                                     │                  │
│              └─────────────────────────────────────┘                  │
│                                                                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    YOUR EXPENSES                                                       │
│                                                                        │
│    ┌──────────────────────────────────────────────────────────────┐   │
│    │                                                              │   │
│    │              📭  No expenses yet                             │   │
│    │                                                              │   │
│    │          Upload a receipt to get started!                   │   │
│    │                                                              │   │
│    └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Desktop Layout - File Selected / Ready to Process

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    💰  EXPENSE TRACKER                                                 │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│              ┌─────────────────────────────────────┐                  │
│              │  ┌─────────────────────────────┐   │                  │
│              │  │                             │   │                  │
│              │  │    [Receipt Image Preview]  │   │                  │
│              │  │         320 x 240           │   │                  │
│              │  │                             │   │                  │
│              │  └─────────────────────────────┘   │                  │
│              │                                     │                  │
│              │         receipt_2025.jpg            │                  │
│              │              245 KB                 │                  │
│              │                                     │                  │
│              │  ┌───────────────────────────────┐  │                  │
│              │  │    Process Receipt  🚀       │  │                  │
│              │  └───────────────────────────────┘  │                  │
│              │                                     │                  │
│              │  ┌───────────────────────────────┐  │                  │
│              │  │         Cancel                │  │                  │
│              │  └───────────────────────────────┘  │                  │
│              │                                     │                  │
│              └─────────────────────────────────────┘                  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    YOUR EXPENSES                                                       │
│                                                                        │
│    ┌──────────────────────────────────────────────────────────────┐   │
│    │                                                              │   │
│    │              📭  No expenses yet                             │   │
│    │                                                              │   │
│    │          Upload a receipt to get started!                   │   │
│    │                                                              │   │
│    └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Desktop Layout - Processing State

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    💰  EXPENSE TRACKER                                                 │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│              ┌─────────────────────────────────────┐                  │
│              │                                     │                  │
│              │          🔄  Processing...          │                  │
│              │                                     │                  │
│              │     ┌─────────────────────────┐     │                  │
│              │     │  ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░  │     │                  │
│              │     └─────────────────────────┘     │                  │
│              │                                     │                  │
│              │   Extracting expense details...     │                  │
│              │                                     │                  │
│              │        This takes 5-10 seconds      │                  │
│              │                                     │                  │
│              └─────────────────────────────────────┘                  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    YOUR EXPENSES                                                       │
│                                                                        │
│    ┌──────────────────────────────────────────────────────────────┐   │
│    │  Starbucks              $5.50              Oct 1, 2025    × │   │
│    └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Desktop Layout - With Expenses

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    💰  EXPENSE TRACKER                                                 │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│              ┌─────────────────────────────────────┐                  │
│              │                                     │                  │
│              │          📸  Upload Receipt         │                  │
│              │                                     │                  │
│              │     Drag and drop your receipt      │                  │
│              │              here                   │                  │
│              │                                     │                  │
│              │         ┌─────────────────┐         │                  │
│              │         │  Choose File    │         │                  │
│              │         └─────────────────┘         │                  │
│              │                                     │                  │
│              │   JPG, PNG, HEIC • Max 5MB         │                  │
│              │                                     │                  │
│              └─────────────────────────────────────┘                  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    YOUR EXPENSES                                      5 total expenses │
│                                                                        │
│    ┌──────────────────────────────────────────────────────────────┐   │
│    │  Whole Foods            $45.67             Oct 3, 2025    × │   │
│    └──────────────────────────────────────────────────────────────┘   │
│    ┌──────────────────────────────────────────────────────────────┐   │
│    │  Target                 $89.23             Oct 2, 2025    × │   │
│    └──────────────────────────────────────────────────────────────┘   │
│    ┌──────────────────────────────────────────────────────────────┐   │
│    │  Shell Gas Station      $52.00             Oct 2, 2025    × │   │
│    └──────────────────────────────────────────────────────────────┘   │
│    ┌──────────────────────────────────────────────────────────────┐   │
│    │  Starbucks              $5.50              Oct 1, 2025    × │   │
│    └──────────────────────────────────────────────────────────────┘   │
│    ┌──────────────────────────────────────────────────────────────┐   │
│    │  Amazon                 $127.99            Sep 30, 2025   × │   │
│    └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Desktop Layout - Success Message (After Upload)

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    💰  EXPENSE TRACKER                                                 │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  ✅  Expense saved successfully!                          [Dismiss]│  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│              ┌─────────────────────────────────────┐                  │
│              │                                     │                  │
│              │          📸  Upload Receipt         │                  │
│              │                                     │                  │
│              │     Drag and drop your receipt      │                  │
│              │              here                   │                  │
│              │                                     │                  │
│              │         ┌─────────────────┐         │                  │
│              │         │  Choose File    │         │                  │
│              │         └─────────────────┘         │                  │
│              │                                     │                  │
│              │   JPG, PNG, HEIC • Max 5MB         │                  │
│              │                                     │                  │
│              └─────────────────────────────────────┘                  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    YOUR EXPENSES                                      1 total expense  │
│                                                                        │
│    ┌──────────────────────────────────────────────────────────────┐   │
│    │  Whole Foods            $45.67             Oct 3, 2025    × │   │ ← NEW!
│    └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Desktop Layout - Error State

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    💰  EXPENSE TRACKER                                                 │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  ❌  Failed to process receipt. Please try again.        [Dismiss]│  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│              ┌─────────────────────────────────────┐                  │
│              │                                     │                  │
│              │          📸  Upload Receipt         │                  │
│              │                                     │                  │
│              │     Drag and drop your receipt      │                  │
│              │              here                   │                  │
│              │                                     │                  │
│              │         ┌─────────────────┐         │                  │
│              │         │  Choose File    │         │                  │
│              │         └─────────────────┘         │                  │
│              │                                     │                  │
│              │   JPG, PNG, HEIC • Max 5MB         │                  │
│              │                                     │                  │
│              └─────────────────────────────────────┘                  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    YOUR EXPENSES                                                       │
│                                                                        │
│    ┌──────────────────────────────────────────────────────────────┐   │
│    │                                                              │   │
│    │              📭  No expenses yet                             │   │
│    │                                                              │   │
│    │          Upload a receipt to get started!                   │   │
│    │                                                              │   │
│    └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Mobile Layout - Empty State

```
┌─────────────────────────────┐
│                             │
│   💰  EXPENSE TRACKER        │
│                             │
├─────────────────────────────┤
│                             │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │  📸  Upload Receipt │   │
│   │                     │   │
│   │   Drag & drop or    │   │
│   │   tap to upload     │   │
│   │                     │   │
│   │  ┌───────────────┐  │   │
│   │  │  Choose File  │  │   │
│   │  └───────────────┘  │   │
│   │                     │   │
│   │  JPG, PNG • 5MB    │   │
│   │                     │   │
│   └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│                             │
│   YOUR EXPENSES             │
│                             │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │   📭  No expenses   │   │
│   │                     │   │
│   │   Upload a receipt  │   │
│   │   to get started!   │   │
│   │                     │   │
│   └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

---

## Mobile Layout - With Expenses

```
┌─────────────────────────────┐
│                             │
│   💰  EXPENSE TRACKER        │
│                             │
├─────────────────────────────┤
│                             │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │  📸  Upload Receipt │   │
│   │                     │   │
│   │  ┌───────────────┐  │   │
│   │  │  Choose File  │  │   │
│   │  └───────────────┘  │   │
│   │                     │   │
│   └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│                             │
│   YOUR EXPENSES   3 total   │
│                             │
│   ┌─────────────────────┐   │
│   │ Whole Foods     × │   │
│   │ $45.67              │   │
│   │ Oct 3, 2025         │   │
│   └─────────────────────┘   │
│   ┌─────────────────────┐   │
│   │ Target          × │   │
│   │ $89.23              │   │
│   │ Oct 2, 2025         │   │
│   └─────────────────────┘   │
│   ┌─────────────────────┐   │
│   │ Starbucks       × │   │
│   │ $5.50               │   │
│   │ Oct 1, 2025         │   │
│   └─────────────────────┘   │
│                             │
│   ┌─────────────────────┐   │
│   │  Load More...       │   │
│   └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

---

## Component Breakdown

### 1. Header Component
```
┌────────────────────────────────────────┐
│                                        │
│    💰  EXPENSE TRACKER                 │
│                                        │
└────────────────────────────────────────┘

Purpose: App branding
Styling: Centered text, large heading
Height: 80px (desktop), 60px (mobile)
```

### 2. UploadZone Component
```
┌─────────────────────────────────────┐
│                                     │
│          📸  Upload Receipt         │
│                                     │
│     Drag and drop your receipt      │
│              here                   │
│                                     │
│         ┌─────────────────┐         │
│         │  Choose File    │         │
│         └─────────────────┘         │
│                                     │
│   JPG, PNG, HEIC • Max 5MB         │
│                                     │
└─────────────────────────────────────┘

States:
- Default (dashed border, hover effect)
- Drag Over (solid border, background change)
- File Selected (show preview + buttons)
- Processing (show spinner + progress)

Styling:
- Border: 2px dashed #E5E7EB
- Border Radius: 12px
- Padding: 48px
- Background: #FFFFFF
- Hover: border color → #4F46E5
```

### 3. ExpenseList Component
```
┌────────────────────────────────────────┐
│                                        │
│    YOUR EXPENSES        5 total        │
│                                        │
└────────────────────────────────────────┘
┌────────────────────────────────────────┐
│  Merchant         Amount    Date    × │
└────────────────────────────────────────┘

Purpose: Display all expenses
Layout: Stack of ExpenseItem cards
Empty State: Icon + message
```

### 4. ExpenseItem Component
```
┌──────────────────────────────────────────────────────────────┐
│  Whole Foods            $45.67             Oct 3, 2025    × │
└──────────────────────────────────────────────────────────────┘

Layout:
┌────────────────┬─────────────┬──────────────┬────┐
│  Merchant      │  Amount     │  Date        │  ×  │
│  (flex-grow)   │  (bold)     │  (gray)      │ btn │
└────────────────┴─────────────┴──────────────┴────┘

Styling:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 8px
- Padding: 16px 20px
- Margin Bottom: 12px
- Hover: shadow effect

Delete Button:
- Color: #6B7280 (hover: #EF4444)
- Size: 24px × 24px
- Icon: × or trash can
```

### 5. Toast/Alert Component
```
┌──────────────────────────────────────────────────────┐
│  ✅  Expense saved successfully!          [Dismiss] │
└──────────────────────────────────────────────────────┘

Types:
- Success (green background)
- Error (red background)
- Info (blue background)

Styling:
- Position: Fixed top, centered
- Width: 90% max 600px
- Padding: 16px 24px
- Border Radius: 8px
- Animation: Slide down from top
- Auto-dismiss: 3 seconds
```

---

## Spacing & Typography

### Desktop
```
Container Max Width: 1200px
Padding: 40px
Gap between sections: 40px

Heading (H1): 32px, bold, #111827
Heading (H2): 24px, semibold, #111827
Body Text: 16px, regular, #6B7280
Button Text: 16px, medium, #FFFFFF
Small Text: 14px, regular, #6B7280
```

### Mobile
```
Container Padding: 20px
Gap between sections: 24px

Heading (H1): 24px, bold, #111827
Heading (H2): 20px, semibold, #111827
Body Text: 14px, regular, #6B7280
Button Text: 14px, medium, #FFFFFF
Small Text: 12px, regular, #6B7280
```

---

## Interactive States

### Upload Zone
```
Default:
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│   Drag and drop here...     │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
Border: dashed, gray

Hover:
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│   Drag and drop here...     │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
Border: dashed, indigo
Cursor: pointer

Drag Over:
┌━━━━━━━━━━━━━━━━━━━━━━━━━━━━┐
│   Drop to upload! 🎯        │
└━━━━━━━━━━━━━━━━━━━━━━━━━━━━┘
Border: solid, indigo
Background: light indigo
```

### Buttons
```
Primary (Process Receipt):
┌─────────────────────────────┐
│   Process Receipt  🚀      │
└─────────────────────────────┘
Background: #4F46E5 → #4338CA (hover)
Text: white
Border Radius: 8px
Padding: 12px 24px

Secondary (Choose File):
┌─────────────────────────────┐
│      Choose File           │
└─────────────────────────────┘
Background: white
Border: 1px solid #E5E7EB
Text: #374151
Hover: border → #4F46E5

Danger (Delete ×):
× → ×
Color: #6B7280 → #EF4444
```

### Expense Item Hover
```
Default:
┌──────────────────────────────────────┐
│  Starbucks      $5.50      Oct 1  × │
└──────────────────────────────────────┘

Hover:
┌──────────────────────────────────────┐
│  Starbucks      $5.50      Oct 1  × │
└──────────────────────────────────────┘
Shadow: 0 4px 6px rgba(0,0,0,0.1)
Border color: #4F46E5
Cursor: pointer (on delete button only)
```

---

## Loading States

### Processing Animation
```
Frame 1:
🔄  Processing...
▓▓▓░░░░░░░░░░░░░░░  15%

Frame 2:
🔄  Processing...
▓▓▓▓▓▓▓░░░░░░░░░░░  35%

Frame 3:
🔄  Processing...
▓▓▓▓▓▓▓▓▓▓▓░░░░░░░  55%

Frame 4:
🔄  Processing...
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░  85%

Frame 5:
✅  Complete!
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100%
```

---

## Responsive Breakpoints

```
Mobile:     0px - 767px
Tablet:     768px - 1023px
Desktop:    1024px+

Behavior:
- Mobile: Single column, stacked layout
- Tablet: Same as mobile but more padding
- Desktop: Centered with max-width, generous spacing
```

---

## Accessibility Notes

```
✓ All interactive elements keyboard accessible
✓ Focus indicators on all buttons/inputs
✓ ARIA labels for icon buttons
✓ Alt text for images
✓ Color contrast ratio > 4.5:1
✓ Screen reader announcements for status changes
✓ Form labels properly associated
✓ Skip to content link (optional)

Focus Ring Example:
┌─────────────────────────────┐
│ ╔═══════════════════════╗  │
│ ║   Process Receipt  🚀 ║  │
│ ╚═══════════════════════╝  │
└─────────────────────────────┘
Blue outline: 2px solid #4F46E5
```

---

## Animation Guidelines

```
Transitions:
- All state changes: 200ms ease-in-out
- Hover effects: 150ms ease
- Page load: Fade in 300ms
- Toast messages: Slide down 250ms

Keyframes:
- Processing spinner: Rotate 360° in 1s
- Success checkmark: Scale from 0 to 1 in 300ms
- Error shake: Translate X ±10px 3 times in 400ms
- New item highlight: Background pulse 1s
```

---

## File Structure Reference

```
/src
  App.jsx                 ← Main container
  App.css                 ← Global styles
  
  /components
    Header.jsx            ← Logo + title
    UploadZone.jsx        ← Drag-drop area + file input
    ImagePreview.jsx      ← Shows selected image
    ProcessingState.jsx   ← Loading spinner + progress
    ExpenseList.jsx       ← Container for all expenses
    ExpenseItem.jsx       ← Single expense card
    Toast.jsx             ← Success/error messages
    EmptyState.jsx        ← "No expenses" message
  
  /utils
    api.js                ← Backend fetch calls
    storage.js            ← localStorage helpers
    formatters.js         ← Date/currency formatting
```

---

## Design Implementation Checklist

### Phase 1: Basic Layout
- [ ] Header with logo/title
- [ ] Upload zone with dashed border
- [ ] Empty state message
- [ ] Basic styling with CSS

### Phase 2: Upload Flow
- [ ] File input (hidden)
- [ ] Drag-and-drop handlers
- [ ] Image preview component
- [ ] Process button
- [ ] Loading spinner

### Phase 3: Expense Display
- [ ] Expense list container
- [ ] Expense item cards
- [ ] Delete button with icon
- [ ] Hover effects
- [ ] Empty state

### Phase 4: Feedback & Polish
- [ ] Toast notifications
- [ ] Error messages
- [ ] Success animations
- [ ] Responsive breakpoints
- [ ] Accessibility features

### Phase 5: Final Touches
- [ ] Loading states refinement
- [ ] Micro-animations
- [ ] Color scheme applied
- [ ] Typography finalized
- [ ] Cross-browser testing

---

## Example CSS Snippet (Reference)

```css
/* Upload Zone */
.upload-zone {
  border: 2px dashed #E5E7EB;
  border-radius: 12px;
  padding: 48px;
  text-align: center;
  background: #FFFFFF;
  transition: all 0.2s ease;
  cursor: pointer;
}

.upload-zone:hover {
  border-color: #4F46E5;
  background: #F9FAFB;
}

.upload-zone.drag-over {
  border: 2px solid #4F46E5;
  background: #EEF2FF;
}

/* Expense Item */
.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 0.15s ease;
}

.expense-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-color: #4F46E5;
}

/* Delete Button */
.delete-btn {
  color: #6B7280;
  transition: color 0.15s ease;
  cursor: pointer;
}

.delete-btn:hover {
  color: #EF4444;
}
```

---

## Summary

This design prioritizes:
1. **Upload-first**: Largest, most prominent element
2. **Clarity**: Clear hierarchy, obvious actions
3. **Simplicity**: Minimal UI, maximum impact
4. **Feedback**: Visual states for every interaction
5. **Responsive**: Works beautifully on all devices

The ASCII mockups show exact layouts, spacing, and component relationships. Use these as direct reference when building the React components.


