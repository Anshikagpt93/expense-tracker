import React, { useState, useRef } from 'react';
import './UploadZone.css';
import { extractReceipt } from '../utils/api';

function UploadZone({ onUploadSuccess, onUploadError, isProcessing, setIsProcessing }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'];
    if (!allowedTypes.includes(file.type)) {
      onUploadError('Please upload a JPG, PNG, or HEIC image.');
      return;
    }

    // Validate file size (6MB)
    const maxSize = 6 * 1024 * 1024;
    if (file.size > maxSize) {
      onUploadError('File too large. Maximum size is 6MB.');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    try {
      const result = await extractReceipt(selectedFile);
      
      if (result.success) {
        onUploadSuccess(result.data);
        // Reset upload zone
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        onUploadError(result.error || 'Failed to process receipt');
      }
    } catch (error) {
      onUploadError(error.message || 'Failed to process receipt. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-section">
      {!selectedFile && !isProcessing && (
        <div
          className={`upload-zone ${isDragging ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="upload-icon">📸</div>
          <h2 className="upload-title">Upload Receipt</h2>
          <p className="upload-subtitle">
            {isDragging ? 'Drop to upload! 🎯' : 'Drag and drop your receipt here'}
          </p>
          
          <button className="choose-file-btn" type="button">
            Choose File
          </button>
          
          <p className="upload-info">JPG, PNG, HEIC • Max 6MB</p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/heic"
            onChange={handleFileInputChange}
            className="file-input"
          />
        </div>
      )}

      {selectedFile && !isProcessing && (
        <div className="upload-zone preview-mode">
          <div className="image-preview">
            <img src={previewUrl} alt="Receipt preview" />
          </div>
          <p className="file-name">{selectedFile.name}</p>
          <p className="file-size">{(selectedFile.size / 1024).toFixed(0)} KB</p>
          
          <button className="process-btn" onClick={handleProcess}>
            Process Receipt 🚀
          </button>
          
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="upload-zone processing-mode">
          <div className="spinner">🔄</div>
          <h2 className="processing-title">Processing...</h2>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="processing-subtitle">Extracting expense details...</p>
          <p className="processing-info">This takes 5-10 seconds (larger files may take up to 60 seconds)</p>
        </div>
      )}
    </div>
  );
}

export default UploadZone;


