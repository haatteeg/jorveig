import { useEffect, useState, useRef } from "react";
import './Random.css';

const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const HISTORY_KEY = "randomWordHistory";
const HISTORY_DURATION = 20 * 60 * 1000;
const BATCH_SIZE = 20;

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

function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
}

function getAvailableWords(vocab, history) {
    const recentWords = new Set(history.map(entry => entry.word));
    return vocab.filter(v => !recentWords.has(v.word));
}

function getRandomBatch(vocab, history) {
    let available = getAvailableWords(vocab, history);
    if (available.length < BATCH_SIZE) {
        clearHistory();
        available = vocab.slice();
    }
    const shuffled = available.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(BATCH_SIZE, shuffled.length));
}

export const Random = ({ vocab }) => {
    const [current, setCurrent] = useState(null);
    const [displayed, setDisplayed] = useState([]);
    const [batch, setBatch] = useState([]);
    const [batchIndex, setBatchIndex] = useState(0);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!vocab || vocab.length === 0) return;
        const history = getRecentHistory();
        const newBatch = getRandomBatch(vocab, history);
        setBatch(newBatch);
        setBatchIndex(0);
        setCurrent(newBatch[0]);
    }, [vocab]);

    useEffect(() => {
        if (!batch.length) return;
        if (batchIndex >= batch.length) {
            const history = getRecentHistory();
            const newBatch = getRandomBatch(vocab, history);
            setBatch(newBatch);
            setBatchIndex(0);
            setCurrent(newBatch[0]);
        } else {
            setCurrent(batch[batchIndex]);
        }
    }, [batchIndex, batch, vocab]);

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
                    setBatchIndex(idx => idx + 1);
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
            <p style={{ wordBreak: "break-all" }}
                key={current.meaning}
                className="fade-in">{current.meaning}</p>
        </div>
    );
};