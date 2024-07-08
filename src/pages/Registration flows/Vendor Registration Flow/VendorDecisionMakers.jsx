import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import StepperHeadingSection from "../StepperHeadingSection";
import ClientStep1 from "../Client Registration flow/ClientStep1";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import CommonProfilePictureSection from "../../../components/common/CommonProfilePictureSection";
import { getActiveStepHeadingData, getVendorActiveStepFields, VENDOR_STEP_2_FIELDS } from "../registrationConstant";

const VendorDecisionMakers = (activeStepFields, setError, clearErrors, setValue, previewImage, setImageFile,
  errors,
  control,
  // watch,
  // register,
  getActiveStepText,
  smallLoader,
  setPreviewImage,
  imageFile,
) => {

  const { register, handleSubmit, reset, watch } = useForm({})
  const [activeStep, setActiveStep] = useState(2)

  const onSubmit = (values) => {
    console.log(values, "values")

  }

  const type = "vendor"
  const newStepHeading = getActiveStepHeadingData(activeStep, type)
  console.log(newStepHeading, "newStep")
  const fields = getVendorActiveStepFields(activeStep)
  console.log(fields, "fields")
  console.log(activeStepFields, "activeStepFields")

  console.log(activeStep, "activeStep")


  return (
    <>
      <section>
        <div className="resume-main-wrapper">
          <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Link className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium"><FaArrowLeft /> Go Back</Link>
                <div>
                  <Row>
                    <Col md={12}>
                      <div>
                        <StepperHeadingSection activeStep={activeStep} />
                        <p>Rexett invites you to join our platform as a software development vendor and be part of our dynamic community of IT professionals</p>
                      </div>
                      <p className="font-12 fw-medium">* includes a required field</p>
                      <div  >
                        {fields?.map((field, index) => (
                          <Row key={index}>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label className="font-14 fw-medium">
                                  {field?.label} {field?.isRequired && <span className="text-danger">*</span>}
                                </Form.Label>
                                <Form.Control
                                  type={field?.type}
                                  placeholder={field?.placeholder}
                                  name={field?.fieldName}
                                  className="common-field font-14"
                                />
                                {/* {errors[field?.fieldName] && (
                                  <span className="text-danger">{errors[field?.fieldName]?.message}</span>
                                )} */}
                              </Form.Group>
                            </Col>
                          </Row>
                        ))}
                        < div className="" >
                          <Button variant="transparent" className="position-btn">+ Add another member</Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>

                  </div>
                  <div>
                    <Link to={'/area-expertise'} className="main-btn font-14 text-decoration-none">Next: Area of Expertise</Link>
                  </div>
                </div>
              </div >
            </Form>
          </Container >
        </div >
      </section >
    </>
  );
};

export default VendorDecisionMakers;
