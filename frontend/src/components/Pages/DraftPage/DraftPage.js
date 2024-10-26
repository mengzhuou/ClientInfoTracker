import React, { useState } from 'react';
import DeletePopup from '../../Functions/PopupModals/DeletePopup/DeletePopup.js';

const DraftPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Draft deleted!");
    setIsPopupOpen(false);
  };

  return (
    <div>
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
