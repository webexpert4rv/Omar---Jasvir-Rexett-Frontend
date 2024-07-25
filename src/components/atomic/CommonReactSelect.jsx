import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { convertCountriesForSelect } from "../utils";
import CloseIcon from "./CloseIcon";

const CommonReactSelect = ({
  control,
  name,
  errors,
  options,
  watch,
  required,
  invalidFieldRequired = false,
  label,
  type,
  handleChange = null,
}) => {
  // in required prop a  message should be given eg. Country name is required
  const [formattedOptions, setFormattedOptions] = useState([]);
  console.log(options,"options")

  useEffect(() => {
    const formattedOptions = convertCountriesForSelect(options, type);
    setFormattedOptions(formattedOptions);
  }, [options]);
// useEffect(()=>{
//  const formatOptions = (options)?.map((item,idx)=>{
//   if (item.timezones) {
//     return item.timezones.map((timezone) => timezone);
//   }
//  })
//  setFormattedOptions(formatOptions)
// },[options])
console.log(formattedOptions,"formattedOptions")
  const showCloseIcon = () => {
    if(invalidFieldRequired && errors?.[name]?.message){
      return <CloseIcon/>
    }
  }
  return (
    <Form.Group className="mb-3">
      <Form.Label className="common-label font-14 fw-medium">
        {label}
        {required && "*"}
      </Form.Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: required ? true : false,
            message: required,
          },
        }}
        render={({ field }) =>
          handleChange ? (
            <>
              <Select
                className={`common-field font-14 ${
                  invalidFieldRequired &&
                  errors[name]?.message &&
                  "invalid-field"
                }`}
                {...field}
                value={watch(name)}
                onChange={(selectedOption) => {
                  handleChange(selectedOption, name);
                }}
                options={formattedOptions}
              />
              {showCloseIcon()}
            </>
          ) : (
            <>
              <Select
                className={`common-field 14 ${
                  invalidFieldRequired &&
                  errors[name]?.message &&
                  "invalid-field"
                }`}
                {...field}
                options={formattedOptions}
              />
              {showCloseIcon()}
            </>
          )
        }
      />
      {errors[name] && (
        <p
          className={`${
            invalidFieldRequired ? "field-error" : "error-message"
          }`}
        >
          {errors[name]?.message}
        </p>
      )}
    </Form.Group>
  );
};

export default CommonReactSelect;
