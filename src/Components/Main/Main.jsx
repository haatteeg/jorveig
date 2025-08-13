import './Main.css';
import React from 'react';
import { Random } from './Random/Random';

export const Main = ({ vocab }) => {
    return (
        <div className="main-content">
            <div className='container'>
                <Random vocab={vocab} />
            </div>
        </div>
    );
};