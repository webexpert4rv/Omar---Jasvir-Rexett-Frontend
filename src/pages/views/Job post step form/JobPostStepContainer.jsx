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
  getJobPostData,
  getSkillList,
  postJob,
  setJobId,
  singleJobPostData,
} from "../../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import ScreenLoader from "../../../components/atomic/ScreenLoader";

// add this inside constant file later
const hasNullOrUndefinedProperties = (obj,activeStep) => {
  if(activeStep === 3){
     return !obj?.screening_questions?.length
  }
  else{
    return Object.values(obj).some( 
      (value) => value === null 
    );
  }
};

export const STEP_LABELS = [
  "",
  "Job post step 1",
  "Job post step 2",
  "Job post step 3",
];
const DEFAULT_SCREENING_DATA = [
  {
    label: "Onsite Work",
    title: "",
    question: "Are you comfortable working in an onsite setting?",
    isRecommended:true,
    ideal_answer :"Yes",
    uniqueId:"1"
  },
  {
    label: "Education",
    question_type: "Degree",
    title: "",
    ideal_answer :"Yes",
    question: "Have you completed the following level of education: [Degree]",
    isRecommended:true,
    uniqueId:"2"

  },
  {
    label: "Language",
    title: "",
    question_type: "language",
    question: "What is your level of proficiency in [Language]?",
    isRecommended:true,
    uniqueId:"3"
  },
]

const JobPostStepContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [jobID, setJobID] = useState(null);
  // const { skillList } = useSelector((state) => state.clientData);
  // const skillListMapped = skillList.map((item) => {
  //   return { value: item.id, label: item.title };
  // });
  const [skillCate, setSkillsCate] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const ACTIVE_STEP_API_KEYS = ["", "step1", "step2", "step3"];
  const { jobPostedData, screenLoader } = useSelector(
    (state) => state.clientData
  );
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
  // order of the useEffects must be same
  useEffect(() => {
    const savedStep = localStorage.getItem("activeStep");
    if (savedStep) {
      setActiveStep(Number(savedStep));
    }
  }, []);
  useEffect(() => {
    let tempSkills = [];
    if (activeStep === 2) {
      dispatch(
        getSkillList((sklls) => {
          const skillListMapped = sklls.map((item) => {
            return { value: item.id, label: item.title };
          });
          tempSkills = skillListMapped;
          setSkillsCate(tempSkills);
        })
      );
    }
  }, [activeStep, dispatch]);

  useEffect(() => {
    localStorage.setItem("activeStep", activeStep);
    let jobId = localStorage.getItem("jobId");
    if(id){
      setJobID(id);
      jobId = id;
    }
    else if (jobId){
      setJobID(Number(jobId));

    }
    // if (jobId) {
    //   setJobID(Number(jobId));
    // } else {
    //   if (id) {
    //     setJobID(id);
    //     jobId = id;
    //   }
    // }

    if (jobId) {
      dispatch(
        getJobPostData(jobId, (jobpost) => {
          // managing is edit or not
          if (
            jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]] &&
            Object.keys(jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]])?.length
          ) {
            const IsNull = hasNullOrUndefinedProperties(
              jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]],activeStep
            );
            setIsEdit(!IsNull);
          }
          if (
            jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]] &&
            Object.keys(jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]])?.length
          ) {
            Object.keys(jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]).map(
              (key) => {
                if (activeStep === 2) {
                  if (key === "skills" || key === "optional_skills") {
                    if (jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]?.[key]) {
                      const convertedArray =
                        jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]?.[
                          key
                        ]?.split(",");
                      const arrayForSelect = skillCate?.filter((curElem) =>
                        convertedArray?.includes(curElem?.label)
                      );
                      setValue(key, arrayForSelect);
                    }
                  } else {
                    if (jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]?.[key]) {
                      setValue(
                        key,
                        jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]?.[key]
                      );
                    }
                  }
                } 
                else if (activeStep === 3){
                  if(key === "screening_questions"){
                    if(jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]?.[key]?.length){
                      setValue(
                        key,
                        jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]?.[key]
                      );
                    } else {
                      setValue("screening_questions",DEFAULT_SCREENING_DATA)
                    }
                  }
                }
                else {
                  setValue(
                    key,
                    jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]?.[key]
                  );
                }
              }
            );
          }
        })
      );
    }
  }, [activeStep, dispatch, skillCate]);
  console.log(isEdit,"isEdit")

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
    let payload = {};

    // for getting data of active step only
    getActiveStepKeys(activeStep).map((curKey) => {
      if (curKey in stepData) {
        payload = {
          ...payload,
          [curKey]: stepData[curKey],
        };
      }
    });
    payload = {
      ...payload,
      step: activeStep,
      job_id: jobID,
    };
    if (activeStep === 2) {
      // converting skills fields array of objects into string
      const skills = payload["skills"];
      const arrayOfSkills = skills?.map((curElem) => curElem.label);
      const formattedSkills = arrayOfSkills.toString();
      payload["skills"] = formattedSkills;
      // converting option_skills fields array of objects into string
      const optionSkills = payload["optional_skills"];
      const arrayOfOptionSkills = optionSkills?.map((curElem) => curElem.label);
      const formattedOptionSkills = arrayOfOptionSkills.toString();
      payload["optional_skills"] = formattedOptionSkills;
    }
    if (isEdit) {
      dispatch(clientUpdatePost(payload,isEdit, activeStep, jobID, () => {}));
    } else {
      dispatch(clientJobPost(payload, activeStep, () => {}));
    }

    // if (jobID) {
    //   dispatch(clientUpdatePost(payload, activeStep, jobID, () => {}));
    // } else {
    //   dispatch(clientJobPost(payload, activeStep, () => {}));
    // }
    // dispatch(clientUpdatePost(payload, activeStep, jobID, () => {}));
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    } else {
      navigate("/job-posted");
    }

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

    // if (activeStep < 3) {
    //   setActiveStep((prev) => prev + 1);
    // } else {
    //   let data = {
    //     ...stepData,
    //   };
    //   // converting skills fields array of objects into string
    //   const skills = data["skills"];
    //   const arrayOfSkills = skills?.map((curElem) => curElem.label);
    //   const formattedSkills = arrayOfSkills.toString();
    //   data["skills"] = formattedSkills;

    //   // converting option_skills fields array of objects into string
    //   const optionSkills = data["optional_skills"];
    //   const arrayOfOptionSkills = optionSkills?.map((curElem) => curElem.label);
    //   const formattedOptionSkills = arrayOfOptionSkills.toString();
    //   data["optional_skills"] = formattedOptionSkills;
    //   console.log(data, "data");
    //   data = {
    //     ...data,
    //     step: 1,
    //   };
    //   if (id) {
    //     clientUpdatePost(data, id, (res) => {
    //       setJobId(res?.job?.id);
    //       navigate("/job-posted");
    //     });
    //   } else {
    //     dispatch(
    //       postJob(data, () => {
    //         navigate("/job-posted");
    //       })
    //     );
    //   }
    // }
    // reset();
  };

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <>
          <div className="job-post-container card-box">
            <div className="stepLabels mb-4">
              <h5>{STEP_LABELS[activeStep]}</h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {getActiveStepComponent()}
              <div className="d-flex align-items-center gap-3 justify-content-center">
                {activeStep !== 1 && (
                  <RexettButton
                    type="button"
                    text="Back"
                    onClick={() => {
                      setActiveStep((prev) => prev - 1);
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
      )}
    </>
  );
};

export default JobPostStepContainer;
