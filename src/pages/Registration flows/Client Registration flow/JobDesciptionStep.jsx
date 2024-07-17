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
import CustomSkill from "../DeveloperRegistrationFlow/CustomSkill";
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
            <CustomSkill 
             activeStep={activeStep}
             errors={errors}
             control={control}
             watch={watch}
             register={register}
             skillOptions={skillOptions}
            />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default JobDesciptionStep;
