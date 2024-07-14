import React, { useState } from "react";
import rexettLogo from "../../../assets/img/rexett-logo-white.png";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaCirclePlay,
  FaEnvelope,
  FaGithub,
  FaLightbulb,
  FaLinkedin,
} from "react-icons/fa6";
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";

import { IoAddOutline } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";
import ReactQuill from "react-quill";
import PreviewModal from "./Modals/PreviewResume";
import ClientStep1 from "../../Registration flows/Client Registration flow/ClientStep1";
const AddEducation = ({
  control,
  errors,
  activeStep,
  nestedActiveStep,
  type,
  register,
  stepFields,
  setValue,
  setError,
  clearErrors,
  watch,
  previewImage,
  imageFile,
  setPreviewImage,
  setImageFile,
  isProfileSectionRequired,
}) => {
  const tipstext = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Expert Insights</Popover.Header>
      <Popover.Body>
        {/* <p className="font-14 mb-2">Short cut: If you don’t have time to tailor your entire resume for a specific job application, at least change this section so that it matches the opportunity.</p> */}
        <ul className="ps-3 mb-0 tip-listing">
          <li className="font-12">
            Write a career overview so that hiring managers can immediately see
            the value that you bring.
          </li>
          <li className="font-12">
            Not sure how to write this? Choose one of our examples and edit it
            to match your background.
          </li>
          <li className="font-12">
            Make your summary sound stronger by writing it in the present tense.
            Focus on what you can do for a company, rather than what you did in
            the past.
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <div>
        <ClientStep1
          control={control}
          errors={errors}
          activeStep={activeStep}
          nestedActiveStep={nestedActiveStep}
          type={"developer"}
          register={register}
          stepFields={stepFields}
          setError={setError}
          clearErrors={clearErrors}
          watch={watch}
          setValue={setValue}
          previewImage={previewImage}
          imageFile={imageFile}
          setPreviewImage={setPreviewImage}
          setImageFile={setImageFile}
          isProfileSectionRequired={activeStep === 1 && nestedActiveStep == 0}
        />
      </div>

      <Row>
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
                  <p className="font-14 fw-medium mb-1">Expert Recommended</p>
                  <p className="font-14 mb-0">
                    Experienced Web Developer with passion for creating
                    attractive and interactive websites meeting customer needs
                    and exceeding expectations.
                  </p>
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
                  <p className="font-14 fw-medium mb-1">Expert Recommended</p>
                  <p className="font-14 mb-0">
                    Driven Web Developer with a proven track record at Aviox,
                    showcasing rapid adaptability and exceptional communication
                    skills.
                  </p>
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
                  <p className="font-14 mb-0">
                    Logical and results-driven Web Developer dedicated to
                    building and optimizing user-focused websites for customers
                    with various business objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div id="custom-ck">
            <ReactQuill />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default AddEducation;
