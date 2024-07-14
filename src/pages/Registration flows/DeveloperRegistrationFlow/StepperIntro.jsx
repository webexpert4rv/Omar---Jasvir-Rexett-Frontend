import React from 'react';
import { useTranslation } from 'react-i18next';
import { getStepperIntroData } from '../registrationConstant';

const StepperIntro = ({ activeStep, nestedActiveStep }) => {
  const { t } = useTranslation();
  let introData = getStepperIntroData(activeStep);
  console.log(introData, "heading1");

  return (
    <div>
      <h3 className="font-18 fw-semibold">{t(introData?.heading)}</h3>
      <h2 className="resume-heading">
        {t(introData?.mainHead)}
      </h2>
      <p className="fw-semibold">{t(introData?.heading1)}</p>
      <p className="mb-1">{t(introData?.para)}</p>
    </div>
  );
}

export default StepperIntro;
