"use client";
import React, { createContext, useContext, useState } from "react";

{/* <Dropdown>
  <Dropdown.Trigger>Options</Dropdown.Trigger>
  <Dropdown.Menu>
    <Dropdown.Item onClick={() => console.log("Edit")}>Edit</Dropdown.Item>
    <Dropdown.Item onClick={() => console.log("Delete")}>Delete</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown> */}

type DropdownContextType = {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
}

export const DropdownContext = createContext<null | DropdownContextType>(null);

type ChildProps = {
    children: React.ReactNode;
}

export const DropdownProvider = ({ children }: ChildProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const close = () => {
        setIsOpen(false);
    }
    const toggle = () => {
        setIsOpen((prev) => !prev);
    }

    const val = { close, toggle, isOpen };
    return (
        <DropdownContext.Provider value={val}>{children}</DropdownContext.Provider>
    )
}


export const useDropDown = () => {
    const ctx = useContext(DropdownContext);
    if (ctx === null) {
        throw new Error("please use ctx inside provider");
    }
    return ctx;
}