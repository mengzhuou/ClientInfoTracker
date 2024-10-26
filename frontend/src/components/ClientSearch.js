import React, { useState } from 'react';
import './ClientSearch.css';

const ClientSearch = ({ onSearch }) => {
   const [query, setQuery] = useState(''); // State to hold the input value
   const [isFocused, setIsFocused] = useState(false); // State to manage focus

   const handleChange = (e) => {
       const value = e.target.value;
       setQuery(value); // Update local state
       onSearch(value); // Call the parent function to filter results
   };

   const handleBlur = () => {
       setIsFocused(false); // Update focus state on blur
       if (query === '') {
           setQuery(''); // Clear input on blur if needed
       }
   };

   const handleFocus = () => {
       setIsFocused(true); // Update focus state on focus
   };

   return (
       <div className="search-container">
           <div className="search-bar">
               <input
                   type="text"
                   className="search-input"
                   placeholder={isFocused ? '' : 'Type Name or Company'} // Conditional placeholder
                   value={query} // Controlled input
                   onChange={handleChange}
                   onBlur={handleBlur} // Clear input on blur
                   onFocus={handleFocus} // Update focus state on focus
               />
           </div>
       </div>
   );
};

export default ClientSearch;
