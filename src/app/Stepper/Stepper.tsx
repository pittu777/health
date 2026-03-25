"use client";

import React from 'react';
import { StepperProvider, useStepper } from './StepperContext';


type Props = {
    children: React.ReactNode;
    step?: number;
}

export function Stepper({ children, totalSteps }: { children: React.ReactNode; totalSteps: number }) {
    return (
        <StepperProvider totalSteps={totalSteps}>{children}</StepperProvider>
    )
}

export function StepperStep({ children, step }: Props) {
    const { currentStep } = useStepper();
    if (currentStep === step) {
        return (
            <h1>{children}</h1>
        )
    }
    return null;
}

export function StepperBack({ children }: Props) {
    const { back } = useStepper();
    return (
        <button onClick={back} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {children}
        </button>
    )
}
export function StepperNext({ children }: Props) {
    const { next } = useStepper();
    return (
        <button onClick={next} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {children}
        </button>

    )
}

export function Progress({ children }: Props) {
    const { currentStep, totalSteps } = useStepper();

    return (
        <p>{children}: {currentStep} of {totalSteps}</p>
    )
}



export default Stepper;