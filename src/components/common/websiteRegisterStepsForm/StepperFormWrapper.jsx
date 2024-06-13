import React, { useState } from "react";
import RexettButton from "../../atomic/RexettButton";
import { useTranslation } from "react-i18next";
import { useForm,FormProvider } from "react-hook-form";

const StepperFormWrapper = ({ children }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm();
  
  const { handleSubmit, trigger } = methods;

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
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
    
      <div>
        <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>{children[currentStep]}</div>
        <RexettButton
            type="Submit"
            text={t("Back")}
            className="main-btn px-5"
            variant="transparent"
            disabled={currentStep === 0}
            onClick={prevStep}
          />
  
          <RexettButton
            type="Submit"
            text={t("Continue")}
            className="main-btn px-5"
            variant="transparent"
            disabled={currentStep === children.length - 1}
            onClick={nextStep}
          />
        </form>
        </FormProvider>
    
     
      </div>
    </div>
  );
};

export default StepperFormWrapper;
