import React, { useEffect, useState } from "react";
import StepperHeadingSection from "../RegistrationFlows/StepperHeadingSection";
import RecommendationAI from "../RegistrationFlows/DeveloperRegistrationFlow/RecommendationAI";
import { Button, Col, Row } from "react-bootstrap";
import CustomSkill from "../RegistrationFlows/DeveloperRegistrationFlow/CustomSkill";
import { Controller, useFieldArray } from "react-hook-form";
import ReactQuill from "react-quill";
import CommonInput from "./CommonInput";
import {
  createOptionsForReactSelect,
  experienceLevels,
  LEVEL_OPTIONS,
} from "../constant/developerStepConstant";
import { IoAddCircle, IoTrash } from "react-icons/io5";

const ExpertiseSection = ({
  control,
  activeStep,
  watch,
  errors,
  register,
  skillOptions,
  nestedActiveStep,
  type,
  setSelectedRecommend,
  setValue,
  appendedSkills,
  selectedRecommend,
}) => {
  const [formattedSkilloptions, setFormattedSkillOptions] = useState([]);

  useEffect(() => {
    if (skillOptions?.length) {
      const formattedSkillOptions = createOptionsForReactSelect(
        skillOptions,
        "id",
        "title"
      );
      setFormattedSkillOptions(formattedSkillOptions);
    }
  }, [skillOptions]);

  const { fields, remove, append } = useFieldArray({
    control,
    name: "expertise_skills",
  });

  const skills = [
    {
      id: 1,
      text: "Typescript",
      isExpertRecommended: true,
    },
    {
      id: 2,
      text: "CSS",
      isExpertRecommended: true,
    },
    {
      id: 3,
      text: "HTML",
      isExpertRecommended: true,
    },
    {
      id: 4,
      text: "Next",
      isExpertRecommended: false,
    },
    {
      id: 5,
      text: "React",
      isExpertRecommended: false,
    },
    {
      id: 6,
      text: "Laravel",
      isExpertRecommended: false,
    },
  ];

  console.log(watch("expertise_skills"), "These are expertise skills");
  const areAllPreviousFieldsFilled = (array) => {
    return array.every(
      (item) =>
        item.skill.label && item.skill_weight.label && item.experience.label
    );
  };

  const handleAppend = () => {
    const expertise_skills = watch("expertise_skills");
    const itemToAppend = { experience: "", skill_weight: "", skill: "" };
    if (areAllPreviousFieldsFilled(expertise_skills)) {
      append(itemToAppend);
    }
  };
console.log(watch("                                                                                                                                                      "),"expertise_skills inside component")
  return (
    <>
      <div>
        <StepperHeadingSection
          nestedActiveStep={nestedActiveStep}
          activeStep={activeStep}
          type={type}
        />
        <Row>
          <Col md={5}>
            <RecommendationAI
              control={control}
              setRecommend={setSelectedRecommend}
              options={skills}
            />
          </Col>
          <Col md={7}>
            {fields?.map(({ id }, index) => (
              <div
                key={id}
                className="d-md-flex align-items-center gap-2 mt-md-0 mt-4"
              >
                {/* title  */}
                <div className="w-100">
                  <CommonInput
                    label={"Enter Skill"}
                    name={`expertise_skills.${index}.skill`}
                    type={"select2"}
                    control={control}
                    rules={{ required: "This field is required" }}
                    error={errors?.expertise_skills?.[index]?.title}
                    selectOptions={formattedSkilloptions}
                    invalidFieldRequired={true}
                    placeholder="Select Skill"
                  />
                </div>
                {/* experience  */}
                <div className="w-100">
                  <CommonInput
                    label={"Enter Experience"}
                    name={`expertise_skills.${index}.experience`}
                    type={"select2"}
                    control={control}
                    selectOptions={experienceLevels}
                    rules={{ required: "This field is required" }}
                    error={errors?.expertise_skills?.[index]?.experience}
                    invalidFieldRequired={true}
                    placeholder="Select Experience"
                  />
                </div>

                {/* level  */}
                <div className="w-100">
                  <CommonInput
                    label={"Enter Level"}
                    name={`expertise_skills.${index}.skill_weight`}
                    type={"select2"}
                    control={control}
                    rules={{ required: "This field is required" }}
                    error={errors?.expertise_skills?.[index]?.level}
                    selectOptions={LEVEL_OPTIONS}
                    invalidFieldRequired={true}
                    placeholder="Select Level"
                  />
                </div>
                {watch("expertise_skills")?.length > 1 && (
                  <Button
                    onClick={() => remove(index)}
                    variant="transparent"
                    className="text-danger font-24 p-0 shadow-none border-0"
                  >
                    <IoTrash />
                  </Button>
                )}
              </div>
            ))}
            <div className="text-end">
              <Button
                onClick={handleAppend}
                variant="transparent"
                className="arrow-btn font-24 p-0 shadow-none border-0"
              >
                <IoAddCircle />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ExpertiseSection;
<>
  {/* {fields?.map((field, idx) => (
        <>
          <div
            key={field.id}
            className="d-md-flex align-items-center gap-2 mt-md-0 mt-4"
          >
            <div className="w-100">
              <CommonInput
                label={"Enter Skill"}
                name={ `${fieldName}.${idx}.title`}
                type={"select2"}
                control={control}
                rules={{ required: "This field is required" }}
                error={nestedActiveStep == 1 ? errors?.skills?.[idx]?.title :  errors?.good_skills?.[idx]?.title}
                selectOptions={availableSkillOptions}
                invalidFieldRequired={true}
                placeholder="Select Skill"
              />
            </div>
           { nestedActiveStep == 1  ? <div className="w-100">
              <CommonInput
                label={"Enter Experience"}
                name={`skills.${idx}.experience`}
                type={"select2"}
                control={control}
                selectOptions={experienceLevels}
                rules={{ required: "This field is required" }}
                error={errors?.experience?.[idx]?.level}
                invalidFieldRequired={true}
                placeholder="Select Experience"
              />
            </div> : ""}
            <div className="w-100">
              <CommonInput
                label={"Enter Level"}
                name={`${fieldName}.${idx}.level` }
                type={"select2"}
                control={control}
                rules={{ required: "This field is required" }}
                error={nestedActiveStep == 1 ? errors?.skills?.[idx]?.level :  errors?.good_skills?.[idx]?.level}
                selectOptions={LEVEL_OPTIONS}
                invalidFieldRequired={true}
                placeholder="Select Level"
              />
            </div>
            {watch(`${fieldName}`)?.length > 1  && (
              <Button
                onClick={() => remove(idx)}
                variant="transparent"
                className="text-danger font-24 p-0 shadow-none border-0"
              >
                <IoTrash />
              </Button>
            )}
          </div>
        </>
      ))}
      <div className='text-end'>
        <Button
          onClick={handleAppend}
          variant="transparent"
          className="arrow-btn font-24 p-0 shadow-none border-0"
        >
          <IoAddCircle />
        </Button>
      </div> */}
</>;
