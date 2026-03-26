import React from 'react'

export default function MoviewLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-center items-center'>

            <div className='w-[80%] h-screen flex items-center justify-start border-2 flex-col'>
                {children}
            </div>
        </div>
    )
}