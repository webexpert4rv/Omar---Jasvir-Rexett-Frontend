import React, { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import RexettButton from "../../atomic/RexettButton";
import { IoCheckmarkCircle } from "react-icons/io5";
import { NEW_TEMPLATE_TYPE } from "../JobOfferedTab/constant/constant";

const TemplateNameModal = ({ show, handleClose, handleSubmitForm }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const [showUploadSection, setShowUploadSection] = useState({show: false, value:''});
  const handleOnSubmit = (data) => {
    // handleClose(data.name, "upload");
    handleSubmitForm(data.name, showUploadSection.value);

  };

  const handleDocumentSelect = (e) => {
    console.log(e.target.value,"asd")
    setShowUploadSection({
      show: true,
      value: e.target.value
    })

  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="custom-modal"
      animation
      backdrop="static"
    >
      <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

      <Modal.Body>
        How do you want to create the template
        <Row className="justify-content-center">
          <Col md={4}>
            <div className="document-card">
              <input
                type="radio"
                className="document_select d-none"
                id="upload-doc"
                name="document"
                value={NEW_TEMPLATE_TYPE.upload}
                onChange={(event) => handleDocumentSelect(event)}
              />
              <Form.Label htmlFor="upload-doc" className="document_label">
                <span className="doccheck-icon">
                  <IoCheckmarkCircle />
                </span>
                <span>Upload document</span>
              </Form.Label>
            </div>
          </Col>
          <Col md={4}>
            <div className="document-card">
              <input
                type="radio"
                className="document_select d-none"
                id="create-doc"
                name="document"
                value={NEW_TEMPLATE_TYPE.create}
                onChange={(event) => handleDocumentSelect(event)}
              />
              <Form.Label htmlFor="create-doc" className="document_label">
                <span className="doccheck-icon">
                  <IoCheckmarkCircle />
                </span>
                <span>Create document</span>
              </Form.Label>
            </div>
          </Col>
        </Row>
        {showUploadSection.show &&
          <>
            <h3 className="popup-heading mt-4">Enter Template Name</h3>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <Form.Group className="mb-4">
                <Form.Label className="font-14">Name</Form.Label>

                <Controller
                  name="name"
                  control={control}
                  rules={{ required: `Please Enter Template Name` }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Template Name"
                      className="common-field font-14 w-100"
                      //   onChange={(e) => {
                      //     let finalText = e.target.value;
                      //     if (tagDetails.type === "Number") {
                      //       finalText = e.target.value.replace(/[^0-9]/g, "");
                      //     }
                      //     field.onChange(finalText);
                      //   }}
                    />
                  )}
                />
                <p className="error-message">{errors.name?.message}</p>
              </Form.Group>
              <div className="text-center">
                <RexettButton
                  type="submit"
                  text="Submit"
                  className="main-btn px-4 font-14 fw-semibold"
                  variant="transparent"
                />
              </div>
            </form>
          </>
        }
      </Modal.Body>
    </Modal>
  );
};

export default TemplateNameModal;
