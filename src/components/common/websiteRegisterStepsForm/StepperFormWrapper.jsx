import React, { useState } from 'react';

const StepperFormWrapper = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < children.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
        
      <div>{children[currentStep]}</div>
      <div>
        <button onClick={prevStep} disabled={currentStep === 0}>
          Continue
        </button>
        <button onClick={nextStep} disabled={currentStep === children.length - 1}>
          Back
        </button>
      </div>
    </div>
  );
};

export default StepperFormWrapper;
