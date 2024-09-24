import React from "react";
import { Form } from "react-bootstrap";

const RadioGroupField = ({
  fieldName,
  handleMarkAsStatusChange,
  radioOptions,
  label,
  register,
}) => {
  return (
    <>
      <Form.Group className="mb-3">
        {label ? (
          <Form.Label className="font-14 fw-medium form-label">
            {label}
          </Form.Label>
        ) : (
          ""
        )}
        <div className="position-relative">
          {radioOptions?.map(({ label, value }) => (
            <Form.Check
              {...register(
                fieldName,
                (onchange = (e) => {
                  handleMarkAsStatusChange(e.target.value);
                })
              )}
              type="radio"
              label={label}
              value={value}
            />
          ))}
        </div>
      </Form.Group>
    </>
  );
};

export default RadioGroupField;
