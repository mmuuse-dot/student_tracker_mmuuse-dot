# Student Finance Tracker

A web-based application for students to track their expenses, manage budgets, and analyze spending trends. Built with HTML, CSS, and JavaScript, featuring modular architecture, validation, and accessibility-focused design.



Live website: http://127.0.0.1:5500/index.html
Demo Video Link: https://www.loom.com/share/faba81897cef426fb129d4cd3c8e09ea
---     


## 🎯 Chosen Theme

Student Finance Tracker – Manage personal budgets, add transactions, track spending, and visualize trends.

---

## ⚡ Features

- Add, edit, and delete transactions  
- Sort transactions by Description, Amount, Category, or Date  
- Regex-based search with case toggle and accessible highlighting  
- Track total transactions, total spent, top category (most frequent), and weekly trends  
- Manage budget caps with alerts when exceeding limit  
- Currency conversion between USD, EUR, and RWF  
- Import and export transactions as JSON  
- Modular code structure (validators.js, ui.js, state.js, storage.js, search.js)  
- Fully responsive and accessible design with keyboard navigation  

---

## 🧩 Regex Catalog

| Field | Rule | Expression | Example (Valid) | Example (Invalid) |
|------|------|------------|------------------|-------------------|
| Description | No leading/trailing spaces | `/^\S(?:.*\S)?$/` | "Morning coffee" | " Coffee" |
| Amount | Number, max 2 decimals | `/^\d+(\.\d{1,2})?$/` | "25", "25.50" | "25.555", "abc" |
| Date | YYYY-MM-DD, not future | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d...` | "2025-06-01" | "2026-99-99" |
| Category | Letters, spaces, hyphens only | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | "Food-Dining" | "Food123" |
| Duplicate Words | Case-sensitive duplicate check | `/\b(\w+)\b\s+\b\1\b/` | "books books" | "Books books" |

Search supports regex input with case-sensitive toggle and highlighted matches in the table.

---

## ⌨️ Keyboard Map

| Key / Shortcut | Action |
|------|--------|
| Tab | Navigate through inputs, buttons, links |
| Shift + Tab | Navigate backward |
| Enter | Activate buttons or sort columns |
| Skip Link | Jump to main content |
| Arrow Keys | Navigate table rows |
| Space | Activate buttons |

---

## 🔄 Import & Export Feature

### Export
- Exports all transactions as JSON
- Includes optional fields like id, createdAt, updatedAt

### Import Rules
- Must be valid JSON
- Required: description, amount, category, date  
- Optional: id, createdAt, updatedAt  
- No extra keys allowed  
- Invalid data will stop import and show error details  

Field rules:
- description: trimmed automatically  
- amount: number > 0, max 2 decimals  
- category: letters, spaces, hyphens only  
- date: YYYY-MM-DD, not future  

---

## ♿ Accessibility Notes

- ARIA labels and roles used throughout  
- aria-live used for error messages and updates  
- Skip links for navigation  
- Visible focus indicators  
- WCAG AA color contrast compliance  
- Semantic HTML structure  

---

## 🧪 Running Tests

Automated validation tests run in `tests.html`.

### How it works
- Open `tests.html` in a browser  
- Tests run automatically from `scripts/tests.js`  
- Validators tested:
  - validateDescription()
  - validateAmount()
  - validateDate()
  - validateCategory()
  - validateTransaction()

Results:
- PASSED → validation works correctly  
- FAILED → validation mismatch  

### Adding new tests
You can add tests inside `tests.js` using the same pattern as existing ones.

---

## 🚀 How to Run

-git clone https://github.com/mmuuse-dot/student_tracker_mmuuse-dot.git
- Open `index.html` in a browser  
- Navigate using the menu or skip link  
- Add, edit, sort, and search transactions  
- Import/export data using JSON  
- Check console for debugging if needed  

---

## 📂 File Structure
/
├─ index.html



├─ styles/



│  └─ main.css


├─ scripts/




│  ├─ main.js


│  ├─ validators.js



│  ├─ ui.js


│  ├─ state.js



│  ├─ storage.js


│  ├─ search.js



│  └─ tests.js


├─ tests.html


├─ seed.json


├─ wireframe.png



└─ README.md

                                                                                  AUTHOR
                                                                                  MUSE EID

