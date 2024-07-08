import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import StepperHeadingSection from "../StepperHeadingSection";
import ClientStep1 from "../Client Registration flow/ClientStep1";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import CommonProfilePictureSection from "../../../components/common/CommonProfilePictureSection";

const VendorDecisionMakers = (activeStep, activeStepFields, setError, clearErrors, setValue, previewImage, setImageFile,
  errors,
  control,
  watch,
  register,
  getActiveStepText,
  smallLoader,
  setPreviewImage,
  imageFile,
) => {

  console.log(activeStep, "activeStep")
  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
      case 2:
        return (
          // this step will be used for both first and second
          <ClientStep1
            control={control}
            errors={errors}
            activeStep={activeStep}
            type={"client"}
            register={register}
            stepFields={activeStepFields}
            setError={setError}
            clearErrors={clearErrors}
            watch={watch}
            setValue={setValue}
            previewImage={previewImage}
            imageFile={imageFile}
            setPreviewImage={setPreviewImage}
            setImageFile={setImageFile}
            isProfileSectionRequired={activeStep === 1}
          />
        );
    }
  };
  return (
    <>
      <section>
        <div className="resume-main-wrapper">
          <Container>
            <div>
              <Link className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium"><FaArrowLeft /> Go Back</Link>
              <div>
                <Row>
                  <Col md={12}>
                    <div>
                      {/* <h2 className="resume-heading">
                                                Decision Makers Details
                                            </h2> */}
                      {/* <StepperHeadingSection activeStep={activeStep} /> */}
                      <p>Rexett invites you to join our platform as a software development vendor and be part of our dynamic community of IT professionals</p>
                    </div>
                    <p className="font-12 fw-medium">* includes a required field</p>
                    <div>
                    {renderActiveStep()}
                      {/* {activeStep === 1 && (
                        <CommonProfilePictureSection
                          register={register}
                          setValue={setValue}
                          clearErrors={clearErrors}
                          setImageFile={setImageFile}
                          setPreviewImage={setPreviewImage}
                          previewImage={previewImage}
                          setError={setError}
                          imageFile={imageFile}
                          fieldName={"profile_picture"}
                          errors={errors}
                        />
                      )} */}
                      {/* <Row> */}
                        {/* <Col md={6}>
                          <div className="mb-3">
                            <Form.Label className="font-14 fw-medium">Name *</Form.Label>
                            <Form.Control type="text" className="common-field font-14" placeholder="e.g. John" />
                          </div>
                        </Col> */}
                        {/* <Col md={6}>
                          <div className="mb-3">
                            <Form.Label className="font-14 fw-medium">Position *</Form.Label>
                            <Form.Select className="common-field font-14">
                              <option>Select Position</option>
                              <option value="ceo">CEO</option>
                              <option value="cto">CTO</option>
                              <option value="cmo">CMO</option>
                              <option value="md">Managing Director</option>
                            </Form.Select>
                          </div>
                        </Col>
                        <Col md={6}> */}
                          {/* <div className="mb-3">
                            <Form.Label className="font-14 fw-medium">Phone Number *</Form.Label>
                            <Form.Control type="text" className="common-field font-14" placeholder="e.g. +91 123 456 7890" />
                          </div> */}
                        {/* </Col> */}
                        {/* <Col md={6}>
                          <div className="mb-3">
                            <Form.Label className="font-14 fw-medium">Email *</Form.Label>
                            <Form.Control type="email" className="common-field font-14" placeholder="e.g. johndoe123@gmail.com" />
                          </div>
                        </Col> */}
                      {/* </Row> */}
                      <div className="">
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
          </Container >
        </div >
      </section>
    </>
  );
};

export default VendorDecisionMakers;
