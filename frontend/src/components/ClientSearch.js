import React from 'react';
import './ClientSearch.css'; 

const ClientSearch = ({ onSearch }) => {
    return (
        <div className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    onChange={(e) => onSearch(e.target.value)}
                />
                <span className="search-icon">&#128269;</span> {/* Unicode magnifying glass */}
            </div>
        </div>
    );
};

export default ClientSearch;
