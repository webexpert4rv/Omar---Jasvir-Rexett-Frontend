import React, { Fragment, useEffect, useState } from "react";
import JobPostStep1 from "./JobPostStep1";
import JobPostStep2 from "./JobPostStep2";
import JobPostStep3 from "./JobPostStep3";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getActiveStepKeys, step1keys, step2keys, step3keys } from "./constant";

// add this inside constant file later

export const STEP_LABELS = [
    "",
    "Job post step 1",
    "Job post step 2",
    "Job post step 3"
];

const JobPostStepContainer = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();
  const [smallLoader, setSmallLoader] = useState(false);
  const {
    register,
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    // setValue(getValues().key,getValues().value);
    // setValue("jobTitle","random job title value")
    // setValue("skill","random skill value")
    // setValue("email","Random email value")
  }, [activeStep]);
  const getValues = () => {
    switch (activeStep) {
      case 1:
        return { key: "jobTitle", value: "Random job title" };
      case 2:
        return { key: "skill", value: "Random skill name" };
      case 3:
        return { key: "email", value: "random email" };
    }
  };

  const getActiveStepComponent = () => {
    switch (activeStep) {
      case 1:
        return (
          <JobPostStep1
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        );
      case 2:
        return (
          <JobPostStep2
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            control={control}
          />
        );
      case 3:
        return (
          <JobPostStep3
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        );
    }
  };
  const onSubmit = (stepData) => {
    let payload = {};
    // add these inside a constant and get active step using a switch inside a method
    // const activeStepKeys =
    //   activeStep === 1
    //     ? step1keys
    //     : activeStep === 2
    //     ? step2keys
    //     : activeStep === 3 && step3keys;
    // activeStepKeys.map((curKey) => {
    
    // for getting data of active step only
    getActiveStepKeys(activeStep).map((curKey) => {
      if (curKey in stepData) {
        payload = {
          ...payload,
          [curKey]: stepData[curKey],
        };
      }
    });
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    } else {
      toast.success("Form submitted successfully");
      navigate("/dashboard");
    }
    // reset();
  };


  return (
    <div>
      <div className="stepLabels">
      <h5>{STEP_LABELS[activeStep]}</h5>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {getActiveStepComponent()}

        {/* {activeStep === 1 && <JobPostStep1 />}
        {activeStep === 2 && <JobPostStep2 />}
        {activeStep === 3 && <JobPostStep3 />} */}
        <div>
          {activeStep !== 1 && (
            <RexettButton
              type="button"
              text={t("previous")}
              onClick={() => setActiveStep((prev) => prev - 1)}
              className="main-btn px-5 m-4"
              disabled={smallLoader}
              isLoading={smallLoader}
            />
          )}
          <RexettButton
            type="submit"
            text={activeStep < 3 ? t("next") : t("submit")}
            className="main-btn px-5 m-2"
            disabled={smallLoader}
            isLoading={smallLoader}
          />
        </div>
      </form>
    </div>
  );
};

export default JobPostStepContainer;
