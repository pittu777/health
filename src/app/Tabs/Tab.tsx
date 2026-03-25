"use client";

import React from "react";
import { TabsProvider, useTabs } from "./TabsContext";

export function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
    return <TabsProvider defaultTab={defaultTab}>{children}</TabsProvider>;
}

export function List({ children }: { children: React.ReactNode }) {
    return <ul className="flex flex-row gap-3.5 list-none p-0">{children}</ul>;
}

export function Trigger({ id, children }: { id: string; children: React.ReactNode }) {
    const { tabId, handleClick } = useTabs();
    return (
        <li
            onClick={() => handleClick(id)}
            className={`cursor-pointer px-4 py-2 rounded ${tabId === id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
                }`}
        >
            {children}
        </li>
    );
}

export function Content({ id, children }: { id: string; children: React.ReactNode }) {
    const { tabId } = useTabs();
    if (tabId !== id) return null;
    return <div className="mt-4">{children}</div>;
}

// Tabs.List = List;
// Tabs.Trigger = Trigger;
// Tabs.Content = Content;

// export default Tabs;