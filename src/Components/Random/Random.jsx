import { useEffect, useState, useRef } from "react";
import './Random.css';

const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getRandomLetter = () => {
    return LATIN[Math.floor(Math.random() * LATIN.length)];
}

export const Random = ({ vocab }) => {
    const [current, setCurrent] = useState(null);
    const [displayed, setDisplayed] = useState([]);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!vocab || vocab.length === 0) return;

        const pickRandom = () => {
            const idx = Math.floor(Math.random() * vocab.length);
            setCurrent(vocab[idx]);
        }

        pickRandom();
        const interval = setInterval(pickRandom, 6500);

        return () => clearInterval(interval);
    }, [vocab]);

    useEffect(() => {
        if (!current) return;

        const word = current.word;
        let lockIndex = 0;

        setDisplayed(Array(word.length).fill("").map(getRandomLetter));

        clearInterval(intervalRef.current);
        clearTimeout(timeoutRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayed(prev =>
                prev.map((ch, i) =>
                    i < lockIndex ? word[i] : getRandomLetter()
                )
            );
        }, 50);

        function lockNext() {
            lockIndex++;
            if (lockIndex > word.length) {
                clearInterval(intervalRef.current);
                return;
            }
            timeoutRef.current = setTimeout(lockNext, 100);
        }
        lockNext();

        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, [current]);

    if (!current) return null;

    return (
        <div className="random-word">
            <h2 style={{ letterSpacing: "0.1em", fontFamily: "monospace" }}>
                {displayed.map((ch, i) => {
                    const isLocked = ch === current.word[i];
                    return (
                        <span
                            key={i}
                            className={!isLocked ? "scrambling" : ""}
                        >
                            {i === 0 && isLocked
                                ? ch.toUpperCase()
                                : ch}
                        </span>
                    );
                })}
            </h2>
            <p key={current.meaning} className="fade-in">{current.meaning}</p>
        </div>
    );
};
