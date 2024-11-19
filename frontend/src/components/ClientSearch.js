import React, { useState } from 'react';
import './ClientSearch.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClientSearch = ({ onSearch }) => {
   const [query, setQuery] = useState('');
   const [isFocused, setIsFocused] = useState(false); 

   const handleChange = (e) => {
       const value = e.target.value;
       setQuery(value); 
       onSearch(value); 
   };

   const handleBlur = () => {
       setIsFocused(false); 
       if (query === '') {
           setQuery('');
       }
   };

   const handleFocus = () => {
       setIsFocused(true);
   };

   return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder={isFocused ? '' : 'Type Name or Company'} 
                value={query} 
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus} 
            />
            <button type="button" className="search-button">
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
   );
};

export default ClientSearch;
