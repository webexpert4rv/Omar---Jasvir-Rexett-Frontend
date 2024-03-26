import React, { useState } from "react";
import StepOne from "./Steps/Step1";
import StepTwo from "./Steps/Step2";
import StepThree from "./Steps/Step3";
import StepFour from "./Steps/Step4";
import StepFive from "./Steps/Step5";
import { Button } from "react-bootstrap";

const steps = [
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive
];

const RegisterDeveloper = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const goToNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <>
            <section className="register-developer card-box">
                <div className="step-counts">
                    {steps.map((step, index) => (
                        <span
                            key={index}
                            className={`count ${currentStep === index ? "current" : ""} ${currentStep > index ? "active" : ""}`}
                        >
                            {index + 1}
                        </span>
                    ))}
                </div>
                <div className="">
                    {React.createElement(steps[currentStep])}
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        {currentStep > 0 && (
                            <Button
                                variant="transparent"
                                className="main-btn px-5 outline-main-btn"
                                onClick={goToPreviousStep}
                            >
                                Back
                            </Button>
                        )}
                        {currentStep === steps.length - 1 ? (
                            <Button
                                variant="transparent"
                                className="main-btn px-5"
                                onClick={goToNextStep}
                            >
                                Finish
                            </Button>
                        ) : (
                            <Button
                                variant="transparent"
                                className="main-btn px-5"
                                onClick={goToNextStep}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default RegisterDeveloper;
