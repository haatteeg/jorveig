import { useEffect, useState, useRef } from "react";
import './Random.css';

const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const HISTORY_KEY = "randomWordHistory";
const HISTORY_DURATION = 60 * 1000;

const getRandomLetter = () => {
    return LATIN[Math.floor(Math.random() * LATIN.length)];
};

function getRecentHistory() {
    const now = Date.now();
    try {
        const arr = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
        return arr.filter(entry => now - entry.time < HISTORY_DURATION);
    } catch {
        return [];
    }
}

function addToHistory(word) {
    const now = Date.now();
    const history = getRecentHistory();
    history.push({ word, time: now });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
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
            pickNewWord();
        }
    }, [vocab]);

    useEffect(() => {
        if (current) {
            localStorage.setItem("randomWord", JSON.stringify(current));
            addToHistory(current.word);
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

        function lockNext() {
            lockIndex++;
            if (lockIndex > word.length) {
                clearInterval(intervalRef.current);
                timeoutRef.current = setTimeout(() => {
                    pickNewWord();
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

    function pickNewWord() {
        if (!vocab || vocab.length === 0) return;
        const history = getRecentHistory();
        const recentWords = new Set(history.map(entry => entry.word));
        const available = vocab.filter(v => !recentWords.has(v.word));
        let next;
        if (available.length > 0) {
            next = available[Math.floor(Math.random() * available.length)];
        } else {
            next = vocab[Math.floor(Math.random() * vocab.length)];
        }
        setCurrent(next);
    }

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
            <p style={{ wordBreak: "break-all" }}
                key={current.meaning}
                className="fade-in">{current.meaning}</p>
        </div>
    );
};
