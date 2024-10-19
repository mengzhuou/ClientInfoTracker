import React from 'react';
import './DraftButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}-${day} ${hours}:${minutes}`;
};

const DraftButton = ({ draft, openDeletePopup }) => {
    return (
        <div className="draft-button">
            <span className="draft-name">{draft.name}</span>
            <span className="draft-date">
                {formatDate(draft.createdAt)}
            </span>
            <span className="trash-icon" onClick={(e) => {
                e.stopPropagation();
                openDeletePopup(draft._id);
            }}>
                <FontAwesomeIcon icon={faTrashCan} />
            </span>
        </div>
    );
};

export default DraftButton;