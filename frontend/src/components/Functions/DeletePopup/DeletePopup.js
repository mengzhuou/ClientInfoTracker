import React from 'react';
import './DeletePopup.css';

const DeletePopup = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Prompt</h3>
        <p>Delete this draft?</p>
        <div className="modal-actions">
          <button className="action-btn cancel" onClick={onClose}>Cancel</button>
          <button className="action-btn confirm" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
