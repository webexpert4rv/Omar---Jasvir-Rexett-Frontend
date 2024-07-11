import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import StepperHeadingSection from "../StepperHeadingSection";
import { Controller, useFieldArray } from "react-hook-form";
import ReactQuill from "react-quill";
import { IoAddCircle, IoAddOutline, IoTrash } from "react-icons/io5";
import { registerables } from "chart.js";
import { createOptionsForReactSelect } from "../../websiteRegisterForm/developer/developeStepConstant";
import CommonInput from "../../../components/atomic/CommonInput";
import { t } from "i18next";
import CloseIcon from "../../../components/atomic/CloseIcon";
const LEVEL_OPTIONS = [
  {
    label: "Beginner",
    value: "beginner",
  },
  {
    label: "Intemediate",
    value: "intemediate",
  },
  {
    label: "Expert",
    value: "expert",
  },
];
const JobDesciptionStep = ({
  activeStep,
  errors,
  control,
  watch,
  register,
  skillOptions,
}) => {
  const [formattedSkillOptions, setFormattedSkillOptions] = useState([]);
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
    name: "skills",
  });
  const handleAppend = () => {
    const index = watch("skills").findIndex(
      (curElem) => curElem.title === "" || curElem.level === ""
    );
    //if index value is less than 0 (.i.e -1) means no field is empty
    if (index < 0) {
      append({ title: "", level: "" });
    }
  };
  console.log(errors?.description?.message, "these are errors");
  return (
    <Row>
      <Col md={12}>
        <StepperHeadingSection activeStep={activeStep} />
        <p className="font-12 fw-medium">* includes a required field</p>
        <div className="d-flex align-items-start gap-3">
          <Row className="w-100">
            <Col md={12}>
              <Form.Label className="font-14 fw-medium">
                Job Description
              </Form.Label>
              <div id="custom-ck">
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Job description is required" }}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      className={`common-field ${
                        errors.description?.message && "invalid-field"
                      }`}
                      theme="snow"
                    />
                  )}
                />
                {errors?.description && (
                  <p className="field-error">{errors.description?.message}</p>
                )}
              </div>
              <div>
                <p className="font-14 mt-3 fw-semibold">Add Skills</p>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <div className="recommended-desc">
                  <div className="d-flex align-items-center gap-3">
                    <Button
                      variant="transparent"
                      className="arrow-btn primary-arrow shadow-none"
                    >
                      <IoAddOutline />
                    </Button>
                    <div>
                      <p className="font-14 fw-medium mb-1">
                        Expert Recommended
                      </p>
                      <p className="font-14 mb-0">HTML</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <Button
                      variant="transparent"
                      className="arrow-btn primary-arrow shadow-none"
                    >
                      <IoAddOutline />
                    </Button>
                    <div>
                      <p className="font-14 fw-medium mb-1">
                        Expert Recommended
                      </p>
                      <p className="font-14 mb-0">CSS</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <Button
                      variant="transparent"
                      className="arrow-btn primary-arrow shadow-none"
                    >
                      <IoAddOutline />
                    </Button>
                    <div>
                      <p className="font-14 fw-medium mb-1">
                        Expert Recommended
                      </p>
                      <p className="font-14 mb-0">JavaScript</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <Button
                      variant="transparent"
                      className="arrow-btn primary-arrow shadow-none"
                    >
                      <IoAddOutline />
                    </Button>
                    <div>
                      <p className="font-14 mb-0">Front End Developers</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <Button
                      variant="transparent"
                      className="arrow-btn primary-arrow shadow-none"
                    >
                      <IoAddOutline />
                    </Button>
                    <div>
                      <p className="font-14 mb-0">Website optimization</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <Button
                      variant="transparent"
                      className="arrow-btn primary-arrow shadow-none"
                    >
                      <IoAddOutline />
                    </Button>
                    <div>
                      <p className="font-14 mb-0">Programming</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div>
                {fields?.map((field, idx) => (
                  <>
                    <div
                      key={field.id}
                      className="d-flex align-items-center gap-2"
                    >
                      <div className="w-100">
                        <CommonInput
                          label={"Enter Skill"}
                          name={`skills.${idx}.title`}
                          type={"select2"}
                          control={control}
                          rules={{ required: "This field is required" }}
                          error={errors?.skills?.[idx]?.title}
                          selectOptions={formattedSkillOptions}
                          invalidFieldRequired={true}
                          placeholder="Select Skill"
                        />{" "}
                      </div>
                      <div className="w-100">
                        <CommonInput
                          label={"Enter Level"}
                          name={`skills.${idx}.level`}
                          type={"select2"}
                          control={control}
                          rules={{ required: "This field is required" }}
                          error={errors?.skills?.[idx]?.level}
                          selectOptions={LEVEL_OPTIONS}
                          invalidFieldRequired={true}
                          placeholder="Select Level"
                        />{" "}
                      </div>
                      {/* <Button
                          onClick={handleAppend}
                          variant="transparent"
                          className="text-green font-24 p-0 shadow-none border-0"
                        >
                          <IoAddCircle />
                        </Button> */}
                      {watch("skills")?.length > 1 && (
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
                <Button
                  onClick={handleAppend}
                  variant="transparent"
                  className="text-green font-24 p-0 shadow-none border-0"
                >
                  <IoAddCircle />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default JobDesciptionStep;
