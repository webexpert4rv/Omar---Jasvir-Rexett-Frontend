import React from "react";
import { getActiveStepHeadingData } from "./registrationConstant";
import { useTranslation } from "react-i18next";

const StepperHeadingSection = ({ activeStep, type }) => {
  console.log(activeStep ,'activestep')
  console.log(type,"type")
  const { t } = useTranslation();
  let { heading, para } = getActiveStepHeadingData(activeStep , type);
  return (
    <div>
      <h2 className="resume-heading">{t(heading)}</h2>
      <p>{t(para)}</p>
    </div>
  );
};

export default StepperHeadingSection;
