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

        const stored = localStorage.getItem("randomWord");
        let initial = null;
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && vocab.some(v => v.word === parsed.word)) {
                    initial = parsed;
                }
            } catch { }
        }
        if (initial) {
            setCurrent(initial);
        } else {
            const idx = Math.floor(Math.random() * vocab.length);
            setCurrent(vocab[idx]);
        }
    }, [vocab]);

    useEffect(() => {
        if (current) {
            localStorage.setItem("randomWord", JSON.stringify(current));
        }
    }, [current]);

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

        const lockNext = () => {
            lockIndex++;
            if (lockIndex > word.length) {
                clearInterval(intervalRef.current);

                timeoutRef.current = setTimeout(() => {
                    let idx;
                    do {
                        idx = Math.floor(Math.random() * vocab.length);
                    } while (vocab[idx].word === current.word && vocab.length > 1);
                    setCurrent(vocab[idx]);
                }, 6500);
                return;
            }
            timeoutRef.current = setTimeout(lockNext, 100);
        }
        lockNext();

        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, [current, vocab]);

    if (!current) return null;

    return (
        <div className="random-word">
            <h2 style={{ letterSpacing: "0.1em", fontFamily: "monospace", wordBreak: "break-all" }}>
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
            <p style={{ wordBreak: "break-all" }}
                key={current.meaning}
                className="fade-in">{current.meaning}</p>
        </div>
    );
};