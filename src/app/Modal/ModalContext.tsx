"use client";

import { createContext, useContext, useState } from "react";

interface ModalContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}


const ModalContext = createContext<null | ModalContextType>(null);


export const ModalProvider = ({ children }: any) => {

    const [isOpen, setIsopen] = useState(false);

    const open = () => {
        setIsopen(true);
    }
    const close = () => {
        setIsopen(false);
    }

    const val = { isOpen, open, close }

    return (
        <ModalContext.Provider value={val}>{children}</ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used inside <Modal>");
    return context;
};