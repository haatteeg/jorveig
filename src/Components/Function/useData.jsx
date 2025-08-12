import { useEffect, useState } from "react";

export const useData = () => {
    const [vocab, setVocab] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const query = `{
                toengmaalData_pl {
                    word
                    type
                    meaning
                    transcription
                    origin
                    originWord
                    oldJotisk
                    middleJotisk
                    modernJotisk
                }
            }`;
            const res = await fetch("https://eu-west-2.cdn.hygraph.com/content/cmd6h8oyc00w408w6rf8wab7b/master", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NTI3NzI0OTIsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY21kNmg4b3ljMDB3NDA4dzZyZjh3YWI3Yi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiNTA2MTRmNzMtMzMwZS00ZDRlLTgwMjMtMzYwY2VhMTRjODI2IiwianRpIjoiY21kN25oajF5MG9peDBkbGE4bWNzOXNmdCJ9.qByLEMi45IIeZRG3bu3vwIAkJrHGUNWvwJuHXXcxcd2dGQC_dUpDz23KJqfowsPA7-xNRlWyrshXDac2Y0ypDBqUguswJwXLqQqWtLLwcEpvErV-eBObS-B7b_CBSrlXjGQLN63FWuUCPrddVSEFumg_HnbzGsLHti_m32gDnrDpIjkxRV56wPx_erfunZ-7-7tirzXAKGN4N4Q_154bQTLCGMJdxiCokq3xWm6lPPctyuxTwEfC0biByyo3BptnVkDR3TP0rZcMjWCdvcMmnTJVycBU0Q9dDlEAGyel-Z42YkZYCd05HQ3wYYddH4Y77Cu0HXRNr6g_OUp7An4x_LS66bziM1UCtDm9dEbG7XTARmRAL_yxzgaZA2171BuJIodyEQ6Wd7nfTexIoyx_SdPoLtE4lNEQs__IYyTGeG1g1e2A6Fu0o88Kqy4fbTKCIe37Xcd5mwD38p_pzxeuJp1ahTMr84XaDtc4lUXCUEruHWNFdzjDm9xPzN5jOmU2tv3t_0KxM-LUdm7vQtfCBGLw-uyH3bBTR-vGckGH97uDrqgVY24U4Z2EKsr2UIof0Y4f6Od20XJbmyC1ap4Uc66A9HJIF9JpHeXhJw2Q4xPJkpkyvzmF1C1SuUUi1zQrSlxj5F5Wx9B0y70b6I3wa54X85VMIgtuDAxer1lvriI"
                },
                body: JSON.stringify({ query })
            });
            const json = await res.json();
            if (json.errors) {
                console.error("Hygraph GraphQL errors:", json.errors);
                setVocab([]);
                return;
            }
            if (json.data && json.data.toengmaalData_pl) {
                setVocab(json.data.toengmaalData_pl);
            } else {
                setVocab([]);
            }
        };
        fetchData();
    }, []);

    return { vocab };
};