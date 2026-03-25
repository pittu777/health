"use client";

import React, { createContext, useContext, useState } from "react";
interface TabsContextType {
    tabId: string;
    handleClick: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export const TabsProvider = ({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) => {
    const [tabId, setTabId] = useState(defaultTab);

    const handleClick = (id: string) => setTabId(id);

    return (
        <TabsContext.Provider value={{ tabId, handleClick }}>
            {children}
        </TabsContext.Provider>
    );
};

export const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("useTabs must be used inside <Tabs>");
    return context;
};