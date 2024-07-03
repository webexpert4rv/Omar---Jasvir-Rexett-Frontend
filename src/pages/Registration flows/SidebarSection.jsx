import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";

const SidebarSection = ({activeStep,stepperSideBarItems}) => {
    const {t} = useTranslation();
  return (
    <div className="resume-sidebar">
      <div className="resume-sidelogo mb-4">
        {/* <img src={rexettLogo} /> */}
      </div>
      <div>
        <ul>
          {stepperSideBarItems?.map(({stepNumber,label},index) => (
            <li key={index} className={stepNumber<activeStep && "active-step"}>
              <span className="resume-count">
                <span className="resume-step">{stepNumber}</span>
                <span className="resume-check">
                  <FaCheck />
                </span>
              </span>
              <span>{t(label)}</span>
            </li>
          ))}
          <li>
            <span className="resume-count">
              <span className="resume-step">1</span>
              <span className="resume-check">
                <FaCheck />
              </span>
            </span>
            <span>Personal</span>
          </li>
          <li>
            <span className="resume-count">
              <span className="resume-step">2</span>
              <span className="resume-check">
                <FaCheck />
              </span>
            </span>
            <span>Engagment</span>
          </li>
          <li>
            <span className="resume-count">
              <span className="resume-step">3</span>
              <span className="resume-check">
                <FaCheck />
              </span>
            </span>
            <span>Engagement length</span>
          </li>
          <li>
            <span className="resume-count">
              <span className="resume-step">4</span>
              <span className="resume-check">
                <FaCheck />
              </span>
            </span>
            <span>Start Team</span>
          </li>
          <li>
            <span className="resume-count">
              <span className="resume-step">5</span>
              <span className="resume-check">
                <FaCheck />
              </span>
            </span>
            <span>Availability</span>
          </li>
          <li>
            <span className="resume-count">
              <span className="resume-step">6</span>
              <span className="resume-check">
                <FaCheck />
              </span>
            </span>
            <span>Skillset</span>
          </li>
          <li>
            <span className="resume-count">
              <span className="resume-step">7</span>
              <span className="resume-check">
                <FaCheck />
              </span>
            </span>
            <span>Book Meeting</span>
          </li>
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
