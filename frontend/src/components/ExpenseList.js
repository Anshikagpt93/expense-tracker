import React from 'react';
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';
import EmptyState from './EmptyState';

function ExpenseList({ expenses, onDelete }) {
  return (
    <div className="expense-section">
      <div className="expense-header">
        <h2 className="expense-title">YOUR EXPENSES</h2>
        {expenses.length > 0 && (
          <span className="expense-count">
            {expenses.length} total {expenses.length === 1 ? 'expense' : 'expenses'}
          </span>
        )}
      </div>

      <div className="expense-list">
        {expenses.length === 0 ? (
          <EmptyState />
        ) : (
          expenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;


