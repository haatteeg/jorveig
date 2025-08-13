import React, { useState, useEffect } from 'react';
import './Vocabulary.css';

export const Vocabulary = ({ vocab }) => {
    const priority = [
        "common noun",
        "neuter noun",
        "regular verb",
        "irregular verb",
        "aa-verb",
        "modal verb"
    ];

    let types = Array.from(new Set(vocab.map(item => item.type)));

    types = types.sort((a, b) => {
        const aIndex = priority.indexOf(a);
        const bIndex = priority.indexOf(b);
        if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
        }
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return a.localeCompare(b);
    });

    const [activeType, setActiveType] = useState(types[0] || "");
    useEffect(() => {
        if (!activeType && types.length > 0) {
            setActiveType(types[0]);
        }
    }, [types, activeType]);
    return (
        <section className="info-section">
            <h1>Vocabulary</h1>
            <hr />
            <div className="type-menu">
                {types.map(type => (
                    <button
                        key={type}
                        className={`type-brick${activeType === type ? " active" : ""}`}
                        onClick={() => setActiveType(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </section>
    );
};