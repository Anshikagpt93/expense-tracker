import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import ExpenseList from './components/ExpenseList';
import Toast from './components/Toast';
import { getExpenses, saveExpense, deleteExpense } from './utils/storage';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const loadedExpenses = getExpenses();
    setExpenses(loadedExpenses);
  }, []);

  // Handle successful receipt upload
  const handleUploadSuccess = (extractedData) => {
    const newExpense = {
      id: Date.now().toString(),
      merchant: extractedData.merchant,
      amount: extractedData.amount,
      date: extractedData.date,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    saveExpense(newExpense);
    
    // Update state
    setExpenses([newExpense, ...expenses]);
    
    // Show success toast
    showToast('success', 'Expense saved successfully!');
  };

  // Handle delete expense
  const handleDelete = (id) => {
    deleteExpense(id);
    setExpenses(expenses.filter(expense => expense.id !== id));
    showToast('success', 'Expense deleted');
  };

  // Show toast notification
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle upload error
  const handleUploadError = (errorMessage) => {
    showToast('error', errorMessage);
  };

  return (
    <div className="App">
      <Header />
      
      {toast && (
        <Toast 
          type={toast.type} 
          message={toast.message} 
          onDismiss={() => setToast(null)} 
        />
      )}
      
      <main className="main-container">
        <UploadZone
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
        
        <ExpenseList
          expenses={expenses}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
