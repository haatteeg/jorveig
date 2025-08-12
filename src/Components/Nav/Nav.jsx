import './Nav.css';
import React from 'react';
import { Search } from '../Search/Search';
import { Link } from 'react-router-dom';

export const Nav = () => {
    return (
        <nav className="navigation-bar">
            <h1><Link to="/">Jorveig</Link></h1>
            <Search />
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
};