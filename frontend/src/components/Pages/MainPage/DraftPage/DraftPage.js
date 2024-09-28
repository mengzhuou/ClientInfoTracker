import React, { useState } from 'react';
import DeletePopup from 'frontend/src/components/Functions/DeletePopup';

const DraftPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Draft deleted!");
    setIsPopupOpen(false);
  };

  return (
    <div>
      <h1>Draft Page</h1>
      <button onClick={handleDeleteClick}>Delete</button>
      {isPopupOpen && (
        <DeletePopup 
          onClose={handleClosePopup} 
          onConfirm={handleConfirmDelete} 
        />
      )}
    </div>
  );
};

export default DraftPage;
