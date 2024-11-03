import React, { useState, useEffect } from 'react';
import DraftButton from '../../Button/DraftButton/DraftButton';
import { getDrafts } from '../../../connector.js';
import './DraftList.css';

const DraftList = ({ openDeletePopup }) => {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        const loadDrafts = async () => {
            try {
                const data = await getDrafts();
                const sortedDrafts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setDrafts(sortedDrafts);
            } catch (error) {
                console.error('Error loading drafts:', error);
            }
        };

        loadDrafts();
    }, []);

    return (
        <div className="draft-list">
            {drafts.length === 0 ? (
                <div className="nodraft-message">No drafts available.</div>
            ) : (
                drafts.map((draft) => (
                    <DraftButton key={draft._id} draft={draft} openDeletePopup={openDeletePopup} />
                ))
            )}
        </div>
    );
};

export default DraftList;