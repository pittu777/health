"use client";

import React, { createContext, useContext, useState } from "react";

{/* <Stepper>
  <Stepper.Progress />
  
  <Stepper.Step step={1}>
    <h2>Step 1 - Personal Info</h2>
  </Stepper.Step>

  <Stepper.Step step={2}>
    <h2>Step 2 - Address</h2>
  </Stepper.Step>

  <Stepper.Step step={3}>
    <h2>Step 3 - Confirm</h2>
  </Stepper.Step>

  <Stepper.Back>Back</Stepper.Back>
  <Stepper.Next>Next</Stepper.Next>
</Stepper> */}

interface StepperContextType {
    currentStep: number;
    back: () => void;
    next: () => void;
    totalSteps: number;
}

export const StepperContext = createContext<StepperContextType | null>(null);

export const StepperProvider = ({ children, totalSteps }: { children: React.ReactNode, totalSteps: number }) => {
    const [currentStep, setcurrentStep] = useState(1);

    const next = () => {
        if (currentStep < totalSteps) setcurrentStep(prev => prev + 1);
    }
    const back = () => {
        if (currentStep > 1) setcurrentStep(prev => prev - 1);
    }
    const val = { back, next, currentStep, totalSteps };

    return (
        <StepperContext.Provider value={val}>
            {children}
        </StepperContext.Provider>
    )
}


export const useStepper = () => {
    const ctx = useContext(StepperContext);
    if (ctx === null) {
        throw new Error("please use inside context");
    }
    return ctx;
}