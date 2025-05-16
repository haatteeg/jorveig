import { useEffect, useState } from "react";

export const useData = () => {
    const [vocab, setVocab] = useState([]);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/data/vocab.json")
            .then(res => res.json())
            .then(data => {
                setVocab(data);
            });
    }, []);

    return { vocab };
};