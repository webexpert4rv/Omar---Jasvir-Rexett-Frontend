import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

const CommonInput = ({
  label,
  name,
  type = 'text',
  control,
  rules,
  readOnly = false,
  placeholder = '',
  error,
  autoComplete = 'off',
  isPassword = false,
  onTogglePassword,
  icon,
  onChange,
  accept,
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
          render={({ field }) => (
            <Form.Control
              {...field}
              type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
              className="common-field"
              placeholder={placeholder}
              readOnly={readOnly}
              autoComplete={autoComplete}
              onChange={onChange ? (e) => onChange(e, field) : field.onChange}
              accept={accept}
            />
          )}
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
