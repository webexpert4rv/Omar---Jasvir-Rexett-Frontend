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
  headingData
}) => {
  return (
    <div className="container">
        <h2>{headingData.h1}</h2>
        <p>{headingData.para}</p>
      <form id="stepForm">
        {
          name?
          <>
          <CommonInput
          label="Select your Date"
          name="date"
          control={control}
          rules={{ required: "Name is required" }}
          error={errors.name}
          type="date"
        />
        <CommonInput
          label="Select your Time"
          name="time"
          control={control}
          rules={{ required: "Name is required" }}
          error={errors.name}
          type="time"
        />
          </>
          :""
        }
        
      </form>
    </div>
  );
};

export default Step2;