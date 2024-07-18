import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import StepperHeadingSection from "../StepperHeadingSection";
import { useForm } from "react-hook-form";
import { getActiveStepHeadingData, getVendorActiveStepFields } from "../registrationConstant";
import { FaArrowLeft } from "react-icons/fa";

const VendorDecisionMakers = ({
  activeStepFields,
  setError,
  type,
  clearErrors,
  setValue,
  previewImage,
  setImageFile,
  errors,
  control,
  getActiveStepText,
  smallLoader,
  setPreviewImage,
  imageFile
}) => {
  const { register, handleSubmit, reset, watch } = useForm({});
  const [activeStep, setActiveStep] = useState(2);

  const onSubmit = (values) => {
    console.log(values, "values");
  };

  const fields = getVendorActiveStepFields(activeStep);
  

  return (
    <>
      <section>
        <div>
      
          <Row>
            <Col md={12}>
              <StepperHeadingSection activeStep={activeStep} type={"vendor"}/>
              <p className="font-12 fw-medium">* includes a required field</p>
              <div>
                <Row className="w-100">
                  {fields?.map(
                    (
                      {
                        label,
                        fieldName,
                        rules,
                        placeholder,
                        columnWidth,
                        isRequired,
                        isPasswordSection,
                        isAutocomplete,
                        options,
                        isLocation,
                        defaultOption,
                      },
                      index
                    ) => (
                      <Col md={columnWidth} key={index}>
                        <Form.Group className="mb-3">
                          <Form.Label className="font-14 fw-medium">
                            {label}
                          </Form.Label>
                          <Form.Control
                            placeholder={placeholder}
                            name={fieldName}
                            className="common-field font-14"
                          />
                        </Form.Group>
                      </Col>
                    )
                  )}
                </Row>
                {/* <div className="">
                  <Button variant="transparent" className="position-btn">
                    + Add another member
                  </Button>
                </div> */}
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default VendorDecisionMakers;
