import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import StepperHeadingSection from "../StepperHeadingSection";
import ClientStep1 from "../Client Registration flow/ClientStep1";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import {
  getActiveStepHeadingData,
  getVendorActiveStepFields,
  VENDOR_STEP_2_FIELDS,
} from "../registrationConstant";
import { useTranslation } from "react-i18next";

const ExpertiseArea = (
  activeStepFields,
  setError,
  clearErrors,
  setValue,
  previewImage,
  setImageFile,
  errors,
  control,
  // watch,
  // register,
  getActiveStepText,
  smallLoader,
  setPreviewImage,
  imageFile
) => {
  const { register, handleSubmit, reset, watch } = useForm({});
  const [activeStep, setActiveStep] = useState(4);

  const onSubmit = (values) => {
    console.log(values, "values");
  };
  const {t} = useTranslation();

  const type = "vendor";
  const fields = getVendorActiveStepFields(activeStep);

  const decreaseStepCount = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem("clientActiveStep", activeStep - 1);
  };

  return (
    <>
      <section>
        <div>
        <div>
                <span
                  onClick={decreaseStepCount}
                  className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium cursor-pointer"
                >
                  <FaArrowLeft /> Go Back
                </span>
              </div>
       
          <Row>
            <Col md={12}>
            
              <StepperHeadingSection activeStep={activeStep} type={type} />
              <p className="font-12 fw-medium">* includes a required field</p>
              <div>
              <Row className="w-100">
                {fields?.map(
                  (
                    {
                      label,
                      fieldName,
                      type,
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
                   
                      <Col md={columnWidth}>
                        <Form.Group className="mb-3">
                          <Form.Label className="font-14 fw-medium">
                          {t(label)}
                            {isRequired && (
                              <span className="text-danger">*</span>
                            )}
                          </Form.Label>
                          <Form.Control
                            type={type}
                            placeholder={placeholder}
                            name={fieldName}
                            className="common-field font-14"
                          />
                          {/* {errors[field?.fieldName] && (
                                  <span className="text-danger">{errors[field?.fieldName]?.message}</span>
                                )} */}
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

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div></div>
            <div>
              <Link
                to={"/vendor-registration"}
                className="main-btn font-14 text-decoration-none"
              >
               Submit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExpertiseArea;
