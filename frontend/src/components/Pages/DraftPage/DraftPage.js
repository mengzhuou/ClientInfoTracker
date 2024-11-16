import React, { useState } from 'react';
import './DraftPage.css';
import DraftList from '../../Functions/Draft/DraftList';
import DeletePopup from '../../Functions/PopupModals/DeletePopup/DeletePopup.js';
import { withFuncProps } from '../../withFuncProps';
import { deleteDraft } from '../../../connector';

const DraftPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState(null);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setDraftToDelete(null); // Reset draft to delete
  };

  const handleConfirmDelete = async () => {
    if (draftToDelete) {
      try {
        await deleteDraft(draftToDelete);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting draft:', error);
      }
    }
    setIsPopupOpen(false);
  };

  const openDeletePopup = (draftId) => {
    setDraftToDelete(draftId);
    setIsPopupOpen(true);
  };

  return (
    <div className="draft-page-body">
      <div className="draft-page-container">
        <p className="draft-inbox-header">Draft Inbox</p>
        <DraftList openDeletePopup={openDeletePopup} />
      </div>
      {isPopupOpen && (
        <DeletePopup 
          onClose={handleClosePopup} 
          onConfirm={handleConfirmDelete} 
        />
      )}
    </div>
  );
};

export default withFuncProps(DraftPage);