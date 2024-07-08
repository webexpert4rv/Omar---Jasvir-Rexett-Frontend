import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StepperHeadingSection from "../StepperHeadingSection";
import { FaArrowLeft } from "react-icons/fa6";
import JobPostStep3 from "../../../components/common/JobPostForm/JobPostStep3";

const ScreeningSection = ({
  activeStep,
  register,
  control,
  errors,
  setValue,
  watch,
}) => {
  return (
    <>
      <div>
        <Row>
          <Col md={12}>
            <StepperHeadingSection activeStep={activeStep} />
            <p className="font-12 fw-medium">* includes a required field</p>
            <JobPostStep3
              register={register}
              control={control}
              errors={errors}
              watch={watch}
              isRegistrationStep={true}
              setValue={setValue}
              invalidFieldRequired={true}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ScreeningSection;
