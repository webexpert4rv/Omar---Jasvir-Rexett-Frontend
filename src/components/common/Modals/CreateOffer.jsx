import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RexettButton from "../../atomic/RexettButton";
import sowIcon from '../../../assets/img/sow-icon.png';
import ndaIcon from '../../../assets/img/nda-icon.png';
import { IoCheckmarkCircle } from "react-icons/io5";
import sowDoc from '../../../assets/img/statement-work.pdf';

const CreateOffer = ({ show, handleClose }) => {
  const [activeStep, setActiveStep] = useState(1);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <div>
            <h4 className="text-center">Select Document</h4>
            <p className="text-center">select document you want to create</p>
            <Row className="justify-content-center">
                <Col md={4}>
                    <div className="document-card">
                        <input type="radio" className="document_select d-none" id="sow-document" name="document_select" />
                        <Form.Label htmlFor="sow-document" className="document_label">
                                <span className="doccheck-icon">
                                    <IoCheckmarkCircle />
                                </span>
                                <img src={sowIcon} />
                                <span>Statement of work</span>
                        </Form.Label>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="document-card">
                        <input type="radio" className="document_select d-none" id="nda-document" name="document_select" />
                        <Form.Label htmlFor="nda-document" className="document_label">
                                <span className="doccheck-icon">
                                    <IoCheckmarkCircle />
                                </span>
                                <img src={ndaIcon} />
                                <span>Non Discolure Agreement</span>
                        </Form.Label>
                    </div>
                </Col>
            </Row>
          </div>
        );
      case 2:
        return (
            <div>
                <h4 className="text-center mb-4">Statement of work</h4>
                <Row>
                    <Col md={6}>
                        <div className="mb-4">
                            <Form.Label className="font-14 fw-medium">Name</Form.Label>
                            <Form.Control type="text" value="Rohit Sharma" readOnly className="common-field font-14" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-4">
                            <Form.Label className="font-14 fw-medium">Email address</Form.Label>
                            <Form.Control type="text" value="rohitsharma123@gmail.com" readOnly className="common-field font-14" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-4">
                            <Form.Label className="font-14 fw-medium">Phone Number</Form.Label>
                            <Form.Control type="text" value="+91 12345657890" readOnly className="common-field font-14" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-4">
                            <Form.Label className="font-14 fw-medium">Project Location</Form.Label>
                            <Form.Control type="text" value="Remote" readOnly className="common-field font-14" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-4">
                            <Form.Label className="font-14 fw-medium">Price(in dollars)</Form.Label>
                            <Form.Control type="text" placeholder="E.g. 100" className="common-field font-14" />
                        </div>
                    </Col> 
                    <Col md={6}>
                        <div className="mb-4">
                            <Form.Label className="font-14 fw-medium">Project Start Date</Form.Label>
                            <Form.Control type="date" className="common-field font-14" />
                        </div>
                    </Col> 
                    <Col md={6}>
                        <div className="mb-4">
                            <Form.Label className="font-14 fw-medium">Expected End Date</Form.Label>
                            <Form.Control type="date" className="common-field font-14" />
                        </div>
                    </Col> 
                    <Col md={12}>
                        <div className="mb-4">
                            <Form.Label className="font-14 fw-medium">Goals of project</Form.Label>
                            <Form.Control type="date" className="common-field font-14" as="textarea" rows="3" />
                        </div>
                    </Col>  
                </Row>
            </div>
        );
      case 3:
        return (
            <div>
                <h4 className="text-center mb-4">Statement of work</h4>
                <iframe src={sowDoc} className="w-100 sow-doc"></iframe>
            </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
      <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {renderActiveStep()}
          <div className="d-flex justify-content-end align-items-center mt-3">
            {activeStep > 1 && (
              <RexettButton
                type="button"
                text="Prev"
                className="outline-main-btn font-14 px-5 me-2"
                onClick={handlePrev}
              />
            )}
            {activeStep == 2 && (
              <RexettButton
                type="button"
                text="Preview"
                className="main-btn font-14 px-5 me-2"
                onClick={handlePrev}
              />
            )}
            {activeStep < 3 ? (
              <RexettButton
                type="button"
                text="Next"
                className="main-btn font-14 px-5"
                onClick={handleNext}
              />
            ) : (
              <RexettButton
                type="submit"
                text="Submit"
                className="main-btn font-14 px-5"
              />
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOffer;
