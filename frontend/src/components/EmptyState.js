import React from 'react';
import './EmptyState.css';

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">📭</div>
      <h3 className="empty-title">No expenses yet</h3>
      <p className="empty-subtitle">Upload a receipt to get started!</p>
    </div>
  );
}

export default EmptyState;


