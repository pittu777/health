"use client"

import React from 'react'
import { ModalProvider, useModal } from './ModalContext'

export function Modal({ children }: any) {
    return (
        <ModalProvider>{children}</ModalProvider>
    )
}


export function Trigger({ children }: any) {

    const { open } = useModal();

    return <button onClick={open}>{children}</button>
}

export function Content({ children }: any) {

    const { isOpen } = useModal();

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className='bg-green-500'>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export function Close({ children }: any) {

    const { close } = useModal();


    return <button onClick={close}>{children}</button>
}



export default Modal;