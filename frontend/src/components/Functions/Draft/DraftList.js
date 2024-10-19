import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DraftButton from '../../Button/DraftButton/DraftButton';
import './DraftList.css';

const DraftList = ({ openDeletePopup }) => {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/records/drafts`);
                setDrafts(response.data);
            } catch (error) {
                console.error('Error fetching drafts:', error);
            }
        };

        fetchDrafts();
    }, []);

    return (
        <div className="draft-list">
            {drafts.map((draft) => (
                <DraftButton key={draft._id} draft={draft} openDeletePopup={openDeletePopup} />
            ))}
        </div>
    );
};

export default DraftList;