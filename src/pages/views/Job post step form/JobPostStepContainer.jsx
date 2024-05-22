import React, { Fragment, useEffect, useState } from "react";
import JobPostStep1 from "./JobPostStep1";
import JobPostStep2 from "./JobPostStep2";
import JobPostStep3 from "./JobPostStep3";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getActiveStepKeys, step1keys, step2keys, step3keys } from "./constant";
import {
  clientJobPost,
  clientUpdatePost,
  postJob,
  singleJobPostData,
} from "../../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

// add this inside constant file later

export const STEP_LABELS = [
  "",
  "Job post step 1",
  "Job post step 2",
  "Job post step 3",
];

const JobPostStepContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { skillList, jobId } = useSelector((state) => state.clientData);
  console.log(jobId, "jobId");
  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });
  const [skillCate, setSkillsCate] = useState(skillListMapped);

  const [activeStep, setActiveStep] = useState(1);
  const { jobPostedData } = useSelector((state) => state.clientData);
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
    // const savedStep = localStorage.getItem("activeStep");
    // if (savedStep) {
    //   setActiveStep(savedStep);
    // }
    if (id) {
      dispatch(singleJobPostData(id, () => {}));
    }
  }, [activeStep]);
  useEffect(() => {
    const keysToMap = [
      "title",
      "job_location",
      "company_name",
      "job_type",
      "contract_type",
      "skills",
      "description",
      "optional_skills",
      "screening_questions",
      "qualification_filter_out",
    ];
    if (id) {
      keysToMap?.map((key) => {
        if (key === "skills" || key === "optional_skills") {
          const convertedArray = jobPostedData?.job?.[key]?.split(",");
          const arrayForSelect = skillCate.filter((curElem) =>
            convertedArray?.includes(curElem?.label)
          );
          setValue(key, arrayForSelect);
        }
        setValue(key, jobPostedData?.job?.[key]);
      });
    }
    // getActiveStepKeys(activeStep).map((key) => {
    //   if (key === "skills" || key === "optional_skills") {
    //     const convertedArray = jobPostedData?.job?.[key]?.split(",");
    //     const arrayForSelect = skillCate.filter((curElem) =>
    //       convertedArray.includes(curElem?.label)
    //     );
    //     setValue(key, arrayForSelect);
    //   } else {
    //     setValue(key, jobPostedData?.job?.[key]);
    //   }
    // if (activeStep === 1) {
    //   setValue(key, jobPostedData?.job?.[key]);
    // }
    // if (activeStep === 2) {
    //   if (key === "skills" || key === "optional_skills") {
    //     const convertedArray = jobPostedData?.job?.[key].split(",");
    //     const arrayForSelect = skillCate.filter((curElem) =>
    //       convertedArray.includes(curElem?.label)
    //     );
    //     setValue(key, arrayForSelect);
    //   } else {
    //     setValue(key, jobPostedData?.job?.[key]);
    //   }
    // }
    // if (activeStep === 3) {
    //   setValue(key, jobPostedData?.job?.[key]);
    // }
    // });
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
            control={control}
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
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        );
    }
  };
  const onSubmit = (stepData) => {
    // let payload = {};
    // add these inside a constant and get active step using a switch inside a method
    // const activeStepKeys =
    //   activeStep === 1
    //     ? step1keys
    //     : activeStep === 2
    //     ? step2keys
    //     : activeStep === 3 && step3keys;
    // activeStepKeys.map((curKey) => {

    // for getting data of active step only
    // getActiveStepKeys(activeStep).map((curKey) => {
    //   if (curKey in stepData) {
    //     payload = {
    //       ...payload,
    //       [curKey]: stepData[curKey],
    //     };
    //   }
    // });
    // payload = {
    //   ...payload,
    //   step: activeStep,
    // };
    // if (activeStep === 2) {
    //   // converting skills fields array of objects into string
    //   const skills = payload["skills"];
    //   const arrayOfSkills = skills?.map((curElem) => curElem.label);
    //   const formattedSkills = arrayOfSkills.toString();
    //   payload["skills"] = formattedSkills;
    //   // converting option_skills fields array of objects into string
    //   const optionSkills = payload["optional_skills"];
    //   const arrayOfOptionSkills = optionSkills?.map((curElem) => curElem.label);
    //   const formattedOptionSkills = arrayOfOptionSkills.toString();
    //   payload["optional_skills"] = formattedOptionSkills;
    // }

    // if (jobId) {
    //   dispatch(clientUpdatePost(payload, jobId, () => {}));
    // } else {
    //   dispatch(clientJobPost(payload, activeStep, () => {}));
    // }
    // if (activeStep < 3) {
    //   setActiveStep((prev) => prev + 1);
    // } else {
    //   navigate("/job-posted");
    // }

    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
      // localStorage.setItem("activeStep", activeStep + 1);
    } else {
      let data = {
        ...stepData,
      };
      // converting skills fields array of objects into string
      const skills = data["skills"];
      const arrayOfSkills = skills?.map((curElem) => curElem.label);
      const formattedSkills = arrayOfSkills.toString();
      data["skills"] = formattedSkills;

      // converting option_skills fields array of objects into string
      const optionSkills = data["optional_skills"];
      const arrayOfOptionSkills = optionSkills?.map((curElem) => curElem.label);
      const formattedOptionSkills = arrayOfOptionSkills.toString();
      data["optional_skills"] = formattedOptionSkills;
      console.log(data, "data");
      data = {
        ...data,
        step: 1,
      };
      if (id) {
        clientUpdatePost(data, id, (res) => {
          // setJobId(res?.job?.id);
          navigate("/job-posted");
        });
      } else {
        dispatch(
          postJob(data, () => {
            navigate("/job-posted");
          })
        );
      }
    }
    // reset();
  };

  return (
    <>
      <div className="stepLabels">
        <h5>{STEP_LABELS[activeStep]}</h5>
      </div>
      <div className="job-post-container card-box">
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
                onClick={() => {
                  setActiveStep((prev) => prev - 1);
                  localStorage.setItem("activeStep", activeStep - 1);
                }}
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
    </>
  );
};

export default JobPostStepContainer;
