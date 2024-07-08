import React from "react";
import { Col, Row } from "react-bootstrap";
import StepperHeadingSection from "../StepperHeadingSection";

const VendorDecisionMakers = (activeStep) => {
  return (
    <>
      <Row>
        <Col md={12}>
          <StepperHeadingSection activeStep={activeStep} />
          <p className="font-12 fw-medium">* includes a required field</p>
        </Col>
      </Row>
    </>
  );
};

export default VendorDecisionMakers;
