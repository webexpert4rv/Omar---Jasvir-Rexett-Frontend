import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";


const SidebarSection = ({activeStep,stepperSideBarItems,handleSetActiveStep}) => {
    const {t} = useTranslation();
  return (
    <div className="resume-sidebar">
      <div className="resume-sidelogo mb-4">
        <img src={"/rexett-logo-white.png"} />
      </div>
      <div>
        <ul>
          {stepperSideBarItems?.map(({stepNumber,label},index) => (
            <li key={index} className={stepNumber<activeStep && "active-step"} onClick={()=>{handleSetActiveStep(stepNumber)}}>
              <span className="resume-count">
                <span className="resume-step">{stepNumber}</span>
                <span className="resume-check">
                  <FaCheck />
                </span>
              </span>
              <span>{t(label)}</span>
            </li>
          ))}
        </ul>
      </div>
      <h4 className="resume-sideheading mt-3">Completeness:</h4>
      <div className="resume-progress-wrapper">
        <div className="resume-progressbx">
          <div></div>
        </div>
        <span className="resume-progress-status font-12 fw-medium">33%</span>
      </div>
    </div>
  );
};

export default SidebarSection;