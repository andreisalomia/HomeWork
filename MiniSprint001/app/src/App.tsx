// 1.10 useState si useRef

// useState accepta o stare initiala si returneaza starea curenta + o functie care updateaza starea

// useRef e folosit pentru a pastra valoarea intre randari, putem face update la aceasta valoare fara re-render, folosita pentru a accesa direct un element din DOM

import { useState, useRef } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const renders = useRef(0);

    renders.current++;

    return (
        <div>
            <p>Count: {count}</p>
            <p>Renders: {renders.current}</p>

            <button onClick={() => setCount(count + 1)}>Count cu render</button>
            <button onClick={() => renders.current++}>Count fara render</button>

        </div>
    );
}

export default function App() {
    return (
        <div>
            <h1>Exemplu useRef si useState</h1>
            <Counter />
        </div>
    );
}