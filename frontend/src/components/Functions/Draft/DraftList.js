import React, { useState, useEffect } from 'react';
import DraftButton from '../../Button/DraftButton/DraftButton';
import { getDrafts } from '../../../connector.js';
import './DraftList.css';
import { useNavigate } from 'react-router-dom';

const DraftList = ({ openDeletePopup }) => {
    const [drafts, setDrafts] = useState([]);
    const navigate = useNavigate(); // useNavigate hook

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


    const handleRowSelected = (selectedData) => {
        navigate('/edit-existing-client', { state: { selectedRow: selectedData } });
    };
    

    return (
        <div className="draft-list">
            {drafts.length === 0 ? (
                <div className="nodraft-message">No drafts available.</div>
            ) : (
                drafts.map((draft) => (
                    <DraftButton key={draft._id} draft={draft} openDeletePopup={openDeletePopup} onRowSelected={() => handleRowSelected(draft)}/>
                ))
            )}
        </div>
    );
};

export default DraftList;