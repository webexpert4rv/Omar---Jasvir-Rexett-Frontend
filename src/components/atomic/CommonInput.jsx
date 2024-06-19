import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";

const CommonInput = ({
  label,
  name,
  type = "text",
  control,
  rules,
  readOnly = false,
  placeholder = "",
  error,
  autoComplete = "off",
  isPassword = false,
  onTogglePassword,
  icon,
  onChange,
  accept,
  options = [], // For radio inputs or select options
  selectOptions, // For react-select options
  isMulti = false,
  isMinRequired = false,
  isMaxRequired = false,
  defaultOption=""
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
    if (onTogglePassword) {
      onTogglePassword();
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="common-label">{label}</Form.Label>
      <div className="position-relative">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => {
            if (type === "radio") {
              return options.map((option, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  id={`${name}-${index}`}
                  label={option.label}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              ));
            } else if (type === "phone") {
              return (
                <PhoneInput
                  placeholder={placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  inputProps={{
                    name: name,
                    readOnly: readOnly,
                    autoComplete: autoComplete,
                    className: "common-field",
                  }}
                />
              );
            } else if (type === "select") {
              return (
                <Select
                  {...field}
                  options={selectOptions}
                  className="common-field"
                  isDisabled={readOnly}
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  value={selectOptions?.find(
                    (option) => option.value === field.value
                  )}
                  placeholder={placeholder}
                  isMulti={isMulti}
                />
              );
            } else if (type === "normal-select") {
              return (
              <Form.Select {...field} className="filter-select width-full shadow-none">
                <option value="">{defaultOption}</option>
                {options?.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}
              </Form.Select>

              )
            } else if (type === "multi-select") {
              return (
                <Select
                  {...field}
                  options={selectOptions}
                  className="common-field"
                  // isDisabled={readOnly}
                  // onChange={(selectedOption) => field.onChange(selectedOption)}
                  // value={selectOptions?.find(option => option.value === field.value)}
                  placeholder={placeholder}
                  isMulti={true}
                />
              );
            } else if (type === "date") {
              return (
                <Form.Control
                  {...field}
                  type="date"
                  className="common-field"
                  // if date should not be less than current date
                  min={isMinRequired && new Date().toISOString().split("T")[0]}
                  // if date should not be less than current date
                  max={isMaxRequired && new Date().toISOString().split("T")[0]}
                />
              );
            } else if (type === "time") {
              return (
                <Form.Control {...field} type="time" className="common-field" />
              );
            } else {
              return (
                <Form.Control
                  {...field}
                  type={
                    isPassword
                      ? isPasswordVisible
                        ? "text"
                        : "password"
                      : type
                  }
                  className={`common-field`}
                  // id='developer-image'
                  placeholder={placeholder}
                  readOnly={readOnly}
                  autoComplete={autoComplete}
                  onChange={
                    onChange ? (e) => onChange(e, field) : field.onChange
                  }
                  accept={accept}
                />
              );
            }
          }}
        />
        {isPassword && (
          <span
            className="eye-btn"
            onClick={handleTogglePassword}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {icon}
          </span>
        )}
      </div>
      {error && <p className="error-message">{error.message}</p>}
    </Form.Group>
  );
};

export default CommonInput;
