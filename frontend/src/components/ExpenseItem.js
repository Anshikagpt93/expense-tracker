import React from 'react';
import './ExpenseItem.css';
import { formatDate, formatCurrency } from '../utils/formatters';

function ExpenseItem({ expense, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Delete expense from ${expense.merchant}?`)) {
      onDelete(expense.id);
    }
  };

  return (
    <div className="expense-item">
      <div className="expense-merchant">{expense.merchant}</div>
      <div className="expense-amount">{formatCurrency(expense.amount)}</div>
      <div className="expense-date">{formatDate(expense.date)}</div>
      <button 
        className="expense-delete"
        onClick={handleDelete}
        aria-label="Delete expense"
      >
        ×
      </button>
    </div>
  );
}

export default ExpenseItem;


