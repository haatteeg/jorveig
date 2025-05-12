import './Nav.css';
import React from 'react';
import { Search } from '../Search/Search';

export const Nav = () => {
    return (
        <nav className="navigation-bar">
            <Search />
            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#help">Help</a></li>
            </ul>
        </nav>
    );
};