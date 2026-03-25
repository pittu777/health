"use client";
import React, { useCallback, useDeferredValue, useEffect, useLayoutEffect, useMemo, useOptimistic, useRef, useState, useTransition } from 'react';
import Myinput from './Myinput';



const data = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

const ItemList = React.memo(({ items }: { items: string[] }) => {
    console.log("List component rendered!");
    return (
        <>
            {items.map((d, i) => (
                <p key={i}>{d}</p>
            ))}
        </>
    );
});

const Screen = () => {
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const deffered = useDeferredValue(search);
    const isPending = search !== deffered;

    const handleSearch = (e) => {
        // 1. Update the input immediately (High Priority)
        setSearch(e.target.value);
    };


    const filtered = useMemo(() => {
        console.log("filtering ran!");
        return data.filter((item) => item.toLowerCase().includes(deffered));
    }, [deffered]);

    return (
        <>
            <input type="text" onChange={handleSearch} value={search} />
            {isPending && <p>Updating list...</p>}
            <p>{count}</p>
            <button onClick={() => setCount((p) => p + 1)}>click</button>
            <ItemList items={filtered} />
        </>
    );
};

export default Screen;