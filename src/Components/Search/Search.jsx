import './Search.css';
import React from 'react';

export const Search = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="submit">Search</button>
        </div>
    );
};
