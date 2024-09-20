import React from "react";
import { Col, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const DateSection = ({
  startDateField,
  endDateField,
  startDateLabel,
  watch,
  endDateLabel,
  startDateRequired,
  endDateRequired,
  errors,
  register,
  clearErrors,
  setError,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Form.Group className="mb-4">
        <Form.Label className="font-14">{t(startDateLabel)}</Form.Label>
        <Form.Control
          type="date"
          className="common-field"
          placeholder="Enter Start Date"
          max={new Date().toISOString().split("T")[0]}
          {...register(startDateField, {
            ...startDateRequired,
            validate: {
              dateRange: (value) => {
                const endDate = watch(endDateField);
                if (!endDate || value <= endDate) {
                  return true;
                }
                return "Start Date must be before End Date";
              },
            },
          })}
        />
        {errors?.[startDateField] && (
          <p className="error-message">{errors?.[startDateField]?.message}</p>
        )}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label className="font-14">{t(endDateLabel)}</Form.Label>
        <Form.Control
          type="date"
          className="common-field"
          placeholder="Enter End Date"
          max={new Date().toISOString().split("T")[0]}
          {...register(
            endDateField,
            {
              ...endDateRequired
            },
            (onchange = (e) => {
              const startdate = watch(startDateField);
              const endDate = watch(endDateField);
              if (endDate) {
                if (startdate < endDate) {
                  clearErrors(startDateField);
                } else {
                  setError(startDateField, {
                    type: "manual",
                    message: "Start Date must be before End Date",
                  });
                }
              }
            })
          )}
          // disabled={disabledEndDates[index]}
        />
        {errors?.[endDateField] && (
          <p className="error-message">{errors?.[endDateField]?.message}</p>
        )}
      </Form.Group>
    </>
  );
};

export default DateSection;
