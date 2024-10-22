import React from "react";
import { Form, Modal } from "react-bootstrap";
import RexettButton from "../../atomic/RexettButton";
import { useForm, Controller } from "react-hook-form";

const DocumentFieldModal = ({ show, handleClose, tagDetails, onSubmit }) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const handleOnSubmit = (data) => {
    onSubmit({...data, tagDetails})
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
        <h3 className="popup-heading">Enter The {tagDetails.tag}</h3>
        <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
          <Form.Group className="mb-4">
            <Form.Label className="font-14">{tagDetails.tag}</Form.Label>

            <Controller
              name={tagDetails.tag}
              control={control}
              placeholder={`Enter ${tagDetails.tag}`}
              rules={{ required: `Please Enter ${tagDetails.tag}` }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder={`Enter ${tagDetails.tag}`}
                  className="common-field font-14 w-100"
                  onChange={(e) => {
                    let finalText = e.target.value;
                    if (tagDetails.type === "Number") {
                      finalText = e.target.value.replace(/[^0-9]/g, "");
                    }
                    field.onChange(finalText);
                  }}
                />
              )}
            />
            <p className="error-message">{errors[tagDetails.tag]?.message}</p>
            {tagDetails.subOption && (
              <>
                <div className="flex-none">
                  <Form.Label className="common-label">
                    {tagDetails.subOption.label}
                  </Form.Label>
                  <Form.Select
                    className="filter-select shadow-none"
                    {...register(tagDetails.subOption.label, {
                      required: {
                        value: true,
                        message: `Please Enter ${tagDetails.subOption.label}`,
                      },
                    })}
                  >
                    {tagDetails.subOption.value.map((vl, i) => (
                      <option key={i} value={vl}>
                        {vl}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <p className="error-message">
                  {errors[tagDetails.subOption.label]?.message}
                </p>
              </>
            )}
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
      </Modal.Body>
    </Modal>
  );
};

export default DocumentFieldModal;
