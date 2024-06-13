import React, { useState } from "react";
import DevStep1 from "./stepContainer/Step1";
import Step2 from "./StepsContainer/Step2";
import Step3 from "./StepsContainer/Step3";
import Success from "./StepsContainer/Step4";
const DevRegister = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };


    switch (step) {
        case 1:
            return <DevStep1 nextStep={nextStep} />;
        // case 2:
        //     return <Step1 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
        // case 3:
        //     return <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
        // case 4:
        //     return <Step3 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
        // case 5:
        //     return <Success />;
        default:
            return <div>Step not found</div>;
    }
}
export default DevRegister;