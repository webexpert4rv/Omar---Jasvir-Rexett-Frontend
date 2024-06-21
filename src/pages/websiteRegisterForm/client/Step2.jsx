import React, { useState } from "react";
import CommonInput from "../../../components/atomic/CommonInput";

const Step2 = ({
  register,
  errors,
  control,
  setValue,
  watch,
  stepperData,
  name,
  inputType,
  selectOptions,
  headingData,
  label
}) => {
  setValue(name, "current_team");
  return (
    <div className="container">
      <h2>{headingData.h1}</h2>
      <p>{headingData.para}</p>
      <form id="stepForm">
        <CommonInput
        label={label}
          name={name}
          control={control}
          rules={{ required: "Name is required" }}
          error={errors.name}
          type={inputType}
          options={stepperData}
          selectOptions={selectOptions}
        />
      </form>
    </div>
  );
};

export default Step2;
