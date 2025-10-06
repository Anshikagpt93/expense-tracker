const STORAGE_KEY = 'expenses';

/**
 * Get all expenses from localStorage
 * @returns {Array} Array of expense objects
 */
export function getExpenses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
}

/**
 * Save a new expense to localStorage
 * @param {Object} expense - The expense object to save
 */
export function saveExpense(expense) {
  try {
    const expenses = getExpenses();
    expenses.unshift(expense); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expense:', error);
    
    // Check if quota exceeded
    if (error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please delete some expenses.');
    }
    
    throw error;
  }
}

/**
 * Delete an expense from localStorage
 * @param {string} id - The expense ID to delete
 */
export function deleteExpense(id) {
  try {
    const expenses = getExpenses();
    const filtered = expenses.filter(expense => expense.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
}

/**
 * Clear all expenses from localStorage
 */
export function clearAllExpenses() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing expenses:', error);
    throw error;
  }
}


