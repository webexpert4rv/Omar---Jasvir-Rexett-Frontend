import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RexettButton from "../../atomic/RexettButton";

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
          <Form.Group>
            <Form.Label>Step 1 Input</Form.Label>
            <Form.Control
              type="text"
              {...register("step1Input", { required: true })}
            />
            {errors.step1Input && <span>This field is required</span>}
          </Form.Group>
        );
      case 2:
        return (
          <Form.Group>
            <Form.Label>Step 2 Input</Form.Label>
            <Form.Control
              type="text"
              {...register("step2Input", { required: true })}
            />
            {errors.step2Input && <span>This field is required</span>}
          </Form.Group>
        );
      case 3:
        return (
          <Form.Group>
            <Form.Label>Step 3 Input</Form.Label>
            <Form.Control
              type="text"
              {...register("step3Input", { required: true })}
            />
            {errors.step3Input && <span>This field is required</span>}
          </Form.Group>
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
    <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
      <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {renderActiveStep()}
          <div className="d-flex justify-content-end align-items-center mt-3">
            {activeStep > 1 && (
              <RexettButton
                type="button"
                text="Prev"
                className="main-btn px-5 me-2"
                onClick={handlePrev}
              />
            )}
            {activeStep < 3 ? (
              <RexettButton
                type="button"
                text="Next"
                className="main-btn px-5"
                onClick={handleNext}
              />
            ) : (
              <RexettButton
                type="submit"
                text="Submit"
                className="main-btn px-5"
              />
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOffer;
