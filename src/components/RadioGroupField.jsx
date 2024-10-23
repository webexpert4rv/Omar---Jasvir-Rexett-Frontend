import React from "react";
import { Form } from "react-bootstrap";

const RadioGroupField = ({
  fieldName,
  handleMarkAsStatusChange,
  radioOptions,
  label,
  register,
  onChangeRequired = false,
  rules
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
        {onChangeRequired ? (
          <div className="position-relative">
            {radioOptions?.map(({ label, value }) => (
              <Form.Check
                {...register(
                  fieldName,
                  (onchange = (e) => {
                    handleMarkAsStatusChange(e.target.value);
                  })
                )}
                type="checkbox"
                label={label}
                value={value}
              />
            ))}
          </div>
        ) : (
          <div className="position-relative">
            {radioOptions?.map(({ label, value }) => (
              <Form.Check
                {...register(
                  fieldName,rules
                )}
                type="checkbox"
                label={label}
                value={value}
              />
            ))}
          </div>
        )}
      </Form.Group>
    </>
  );
};

export default RadioGroupField;
