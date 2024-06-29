import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { convertCountriesForSelect } from "../utils";

const CommonReactSelect = ({ control, name, errors, options, required ,label,type}) => {
  // in required prop a  message should be given eg. Country name is required 
  const [formattedOptions,setFormattedOptions] = useState([]);
  useEffect(() => {
    const formattedOptions = convertCountriesForSelect(options,type);
    setFormattedOptions(formattedOptions);
  },[options]);
  
  return (
     <Form.Group className="mb-3">
      <Form.Label className="common-label font-14 fw-medium">{label}{required && "*"}</Form.Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: required ? true : false,
            message: required,
          },
        }}
        render={({ field }) => <Select className="common-field font-14" {...field} options={formattedOptions}/>}
      />
      {errors[name] && <p className="error-message">{errors[name]?.message}</p>}
      </Form.Group>
  );
};

export default CommonReactSelect;
