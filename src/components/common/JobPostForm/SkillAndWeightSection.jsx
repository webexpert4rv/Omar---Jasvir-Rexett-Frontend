import React, { useEffect, useState } from "react";
import { WEIGHT_OPTIONS } from "./constant";
import { Col, Form, Row } from "react-bootstrap";
import {
  getClassNameFromWeight,
  getPercentageValueFromWeight,
  removeDuplicateBasedOnLabels,
} from "../../utils";

const SkillAndWeightSection = ({
  optional_skills,
  skills,
  traitSkill,
  setTraitSkills,
  setValue,
}) => {
  const [weightSkills, setWeightAndSkills] = useState([]);
  console.log(weightSkills, "weightSkills");

  const handleSelectWeight = (e, idx) => {
    const { value } = e.target;
    let temp = [...traitSkill];
    temp[idx]["weight"] = value;
    setTraitSkills(temp);
  };
  console.log(traitSkill, "traitSkills inside component");
  return (
    <Row>
      <Col md={8}>
        <div>
          <h4 className="font-18 fw-medium">Skills and traits</h4>
        </div>
      </Col>
      <Col md={4}>
        <div>
          <h5 className="text-center font-18 fw-medium">Weight</h5>
          <div className="d-flex justify-content-center gap-3">
            {
              // For displaying Beginner, Intermediate, Expert
              WEIGHT_OPTIONS.map((wt) => (
                <span className="font-14">{wt}</span>
              ))
            }
          </div>
        </div>
      </Col>
      {traitSkill?.length > 0 &&
        traitSkill.map(({ value, label, weight }, skillIndex) => (
          <Row key={value}>
            <Col md={8} className="mb-3">
              <div>
                <div
                  className={`skill-progress  ${getClassNameFromWeight(
                    weight
                  )}`}
                >
                  <span className="skill-progress-name fw-semibold">
                    {label}
                  </span>
                  <span className="skill-percent">
                    {/* getPercentageValueFromWeight() beginnerr = 0%,intermediate=25%,expert=100% */}
                    {getPercentageValueFromWeight(weight) || "0%"}
                  </span>
                </div>
              </div>
            </Col>
            <Col md={4} className="align-self-center mb-3">
              <div className="d-flex justify-content-center gap-3">
                {WEIGHT_OPTIONS?.map((wt, idx) => {
                  //for showing radio buttons with these values i.e Beginner, Intermediate, Expert
                  return (
                    <>
                      <div className="low-wrapper" key={idx}>
                        <Form.Check
                          type="radio"
                          id={`${idx}-${wt}`}
                          value={wt}
                          onChange={(e) => handleSelectWeight(e, skillIndex)}
                          className="weight-radio"
                          checked={weight == wt} // weight == trait skill weight , wt === radio option value
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </Col>
          </Row>
        ))}
    </Row>
  );
};

export default SkillAndWeightSection;
