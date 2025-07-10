import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Navigation</h2>
            <ul>
                <li><Link to="/section1">Section 1</Link></li>
                <li><Link to="/section2">Section 2</Link></li>
                <li><Link to="/section3">Section 3</Link></li>
                <li><Link to="/section4">Section 4</Link></li>
            </ul>
        </div>
    );
};