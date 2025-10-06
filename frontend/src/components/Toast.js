import React from 'react';
import './Toast.css';

function Toast({ type, message, onDismiss }) {
  const icon = type === 'success' ? '✅' : '❌';

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{icon}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-dismiss" onClick={onDismiss}>
        Dismiss
      </button>
    </div>
  );
}

export default Toast;


