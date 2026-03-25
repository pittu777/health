"use client";
import React, { useEffect, useRef } from 'react'
import { DropdownProvider, useDropDown } from './DropDownContext'

{/* <Dropdown>
  <Dropdown.Trigger>Options</Dropdown.Trigger>
  <Dropdown.Menu>
    <Dropdown.Item onClick={() => console.log("Edit")}>Edit</Dropdown.Item>
    <Dropdown.Item onClick={() => console.log("Delete")}>Delete</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown> */}

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
}
function DropdownInner({ children }: Props) {
    const { close } = useDropDown();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                close();
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return <div ref={ref}>{children}</div>;
}

export function DropDown({ children }: Props) {
    return (
        <DropdownProvider>
            <DropdownInner>{children}</DropdownInner>
        </DropdownProvider>
    )
}

export function Trigger({ children }: Props) {
    const { toggle } = useDropDown();

    return (
        <button onClick={toggle}>{children}</button>
    )
}
export function Menu({ children }: Props) {
    const { isOpen } = useDropDown();
    if (!isOpen) {
        return null;
    }
    return (
        <>{children}</>
    )
}
export function Item({ children, onClick }: Props) {
    const { close } = useDropDown();

    const handleClick = () => {
        onClick?.();
        close();
    }
    return (
        <p onClick={handleClick}>{children}</p>
    )
}


export default DropDown