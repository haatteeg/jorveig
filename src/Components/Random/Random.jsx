import { useEffect, useState } from "react";
import './Random.css';

export const Random = ({ vocab }) => {
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        if (vocab.length > 0) {
            const pickRandom = () => {
                const idx = Math.floor(Math.random() * vocab.length);
                setCurrent(vocab[idx]);
            };
            pickRandom();
            const interval = setInterval(pickRandom, 10000);
            return () => clearInterval(interval);
        }
    }, [vocab]);

    if (!current) return null;

    return (
        <div className="random-word">
            <h2>{current.word.charAt(0).toUpperCase() + current.word.slice(1)}</h2>
            <p>{current.meaning}</p>
        </div>
    );
}   