import React, { useState } from 'react';
import './ClientSearch.css'; 

const ClientSearch = ({ onSearch }) => {
    const [query, setQuery] = useState(''); // State to hold the input value

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value); // Update local state
        onSearch(value); // Call the parent function to filter results
    };

    const handleBlur = () => {
        setQuery(''); // Clear input on blur
    };

    return (
        <div className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Type Name or Company"
                    value={query} // Controlled input
                    onChange={handleChange}
                    onBlur={handleBlur} // Clear input on blur
                />
            </div>
        </div>
    );
};

export default ClientSearch;
