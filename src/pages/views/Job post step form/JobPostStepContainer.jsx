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
// add this inside constant file later

export const JOB_POST_STEP_LABELS = [
  {
    step_key: "step_1",
    step_title_key: "1 of 3 Post a Job",
    //   img: ,
    svgIcon: "",
    activeKey:"1"
  },
  {
    step_key: "step_2",
    step_title_key: "2 of 3 Tell us about the role",
    //   img: ,
    svgIcon: "",
    activeKey:"2"

  },
  {
    step_key: "step_3",
    step_title_key: "3 of 3 Receive qualified applicants",
    //   img: ,
    svgIcon: "",
    activeKey:"3"

  },
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
        return <JobPostStep1 register={register} errors={errors} watch = {watch} setValue ={setValue} />;
      case 2:
        return <JobPostStep2 register={register} errors={errors} watch = {watch} setValue ={setValue} control = {control}/>;
      case 3:
        return <JobPostStep3 register={register} errors={errors} watch = {watch} setValue ={setValue}/>;
    }
  };
  const onSubmit = (stepData) => {
    let payload = {};
    console.log(stepData, "stepData");
    // add these inside a constant and get active step using a switch inside a method
    const step1keys = ["jobTitle"];
    const step2keys = ["skill","skillDescription"];
    const step3keys = ["email"];
    const activeStepKeys =
      activeStep === 1
        ? step1keys
        : activeStep === 2
        ? step2keys
        : activeStep === 3 && step3keys;
    activeStepKeys.map((curKey) => {
      if (curKey in stepData) {
        payload = {
          ...payload,
          [curKey]: stepData[curKey],
        };
      }
    });

    console.log(payload, "payload");
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    } else {
        toast.success("Form submitted successfully")
      navigate("/dashboard");
    }
    // reset();
  };
  console.log(activeStep, "active step");

  return (
    <div className="job-post-container card-box">
      <div>
        {JOB_POST_STEP_LABELS?.map(({ step_title_key, svgIcon,activeKey}, idx) => (
          <Fragment key={idx}>
            <div className="">
                {activeStep == activeKey && <h5 className="section-head mb-4">{step_title_key}</h5>}
              {/* <h5 className={activeStep == activeKey ? "activeIconClass" :"inactiveIconClass"}>{step_title_key}</h5> */}
            </div>
          </Fragment>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {getActiveStepComponent()}

        {/* {activeStep === 1 && <JobPostStep1 />}
        {activeStep === 2 && <JobPostStep2 />}
        {activeStep === 3 && <JobPostStep3 />} */}
        <div className="d-flex align-items-center gap-3 justify-content-center">
          {activeStep !== 1 && (
            <RexettButton
              type="button"
              text="Back"
              onClick={() => setActiveStep((prev) => prev - 1)}
              className="main-btn outline-main-btn px-5"
              disabled={smallLoader}
              isLoading={smallLoader}
            />
          )}
          <RexettButton
            type="submit"
            text={activeStep < 3 ? "Continue" : t("submit")}
            className="main-btn px-5"
            disabled={smallLoader}
            isLoading={smallLoader}
          />
        </div>
      </form>
    </div>
  );
};

export default JobPostStepContainer;
