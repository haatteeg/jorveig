import './Main.css';
import React from 'react';
import { Random } from '../Search/Random/Random';

export const Main = ({ data }) => {
    return (
        <div className="main-content">
            <div className='container'>
                <Random vocab={data.vocab} />
            </div>
        </div>
    );
};