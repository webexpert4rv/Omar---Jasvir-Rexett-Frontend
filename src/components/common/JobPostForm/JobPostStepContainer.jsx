import React, { Fragment, useEffect, useState } from "react";
import JobPostStep1 from "./JobPostStep1";
import JobPostStep2 from "./JobPostStep2";
import JobPostStep3 from "./JobPostStep3";
import { useForm } from "react-hook-form";
import RexettButton from "../../atomic/RexettButton";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getActiveStepKeys, step1keys, step2keys, step3keys } from "./constant";
import {
  clientJobPost,
  clientUpdatePost,
  getCoutriesList,
  getJobPostData,
  getSkillList,
  postJob,
  setJobId,
  singleJobPostData,
} from "../../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import ScreenLoader from "../../atomic/ScreenLoader";
import { getDegreeList } from "../../../redux/slices/developerDataSlice";

// add this inside constant file later
const hasNullOrUndefinedProperties = (obj, activeStep) => {
  console.log(obj,"object")
  console.log(activeStep,"activeStep")

  if (activeStep === 3) {
    return !obj?.screening_questions?.length;
  } else {
    return Object.values(obj).some((value) => value === null);
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
    optionId: 1,
    label: "Work Experience",
    title: "",
    question_type: "",
    question: "How many years of experience do you currently have?",
    isRecommended: true,
  },
  {
    optionId: 2,
    label: "Education",
    question_type: "Degree",
    title: "",
    ideal_answer: "Yes",
    question: "Have you completed the following level of education: [Degree]",
    isRecommended: true,
  },
  {
    optionId: 3,
    label: "Language",
    title: "",
    question_type: "language",
    question: "What is your level of proficiency in [Language]?",
    isRecommended: true,
  },
];

const JobPostStepContainer = ({ role }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [jobID, setJobID] = useState(null);
  const [traitSkill,setTraitSkill]=useState([])
  // const { skillList } = useSelector((state) => state.clientData);
  // const skillListMapped = skillList.map((item) => {
  //   return { value: item.id, label: item.title };
  // });
  const userId = localStorage.getItem("userId");
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
    setError,
    clearErrors,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      screening_questions: DEFAULT_SCREENING_DATA,
    },
  });
  const getActiveStepLocalStorageKey = () => {
    const activeStepKey =
      role === "admin" ? "adminJobPostActiveStep" : "clientJobPostActiveStep";
    return activeStepKey;
  };

  // order of the useEffects must be same
  useEffect(() => {
    const savedStep = localStorage.getItem(getActiveStepLocalStorageKey());
    if (savedStep) {
      setActiveStep(Number(savedStep));
    }
  }, []);


  useEffect(() => {
    dispatch(getDegreeList())
  }, [])

  const {degreeList} = useSelector(state => state.developerData)
  console.log(degreeList, "degreeList")

  useEffect(() => {
    let tempSkills = [];
    if (activeStep === 1) {
      dispatch(getCoutriesList());
    }
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
    // localStorage.setItem("activeStep", activeStep);
    let jobId = localStorage.getItem("jobId");
    if (id) {
      setJobID(id);
      jobId = id;
    } else if (jobId) {
      setJobID(Number(jobId));
    }
    console.log(jobId,"jobId")
    if (jobId) {
      dispatch(
        getJobPostData(jobId, (jobpost) => {
          console.log(jobpost,"jobpost")
          // managing is edit or not
          if (
            jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]] &&
            Object.keys(jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]])?.length
          ) {
            console.log("insideapicall")
            const IsNull = hasNullOrUndefinedProperties(
              jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]],
              activeStep
            );
            console.log(isEdit, "isEditinseide")
            console.log(IsNull,"IsNull")
            console.log(!IsNull,"IsEdit")

            setIsEdit(!IsNull);
          }
          if (
            jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]] &&
            Object.keys(jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]])?.length
          ) {
            Object.keys(jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]).map(
              (key) => {
                if (activeStep === 1) {
                  console.log("insideSettingvalues")
                  const data = jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]];
                  console.log(data,"data")
                  if (key === "country_code") {
                    const newValue = {
                      label: data["country"],
                      value: data[key],
                    };
                    setValue(key, newValue);
                  } else if (key === "state_iso_code") {
                    const newValue = { label: data["state"], value: data[key] };
                    setValue(key, newValue);
                  } else if (key === "time_zone") {
                    const newValue = { label: data[key], value: data[key] };
                    setValue(key, newValue);
                  }
                  setValue(key,data[key])
                } else if (activeStep === 2) {
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
                } else if (activeStep === 3) {
                  if (key === "screening_questions") {
                    const data =
                      jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]?.[key];
                    console.log(data, "screening question data inside data");
                    if (
                      jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]?.[key]?.length
                    ) {
                      setValue(
                        key,
                        jobpost?.[ACTIVE_STEP_API_KEYS[activeStep]]?.[key]
                      );
                    } else {
                      setValue("screening_questions", DEFAULT_SCREENING_DATA);
                    }
                  }
                } else {
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
            setError={setError}
            clearErrors={clearErrors}
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
            setTraitSkill={setTraitSkill}
            traitSkill={traitSkill}
          />
        );
      case 3:
        return (
          <JobPostStep3
          degreeList={degreeList}
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        );
    }
  };
  const increaseStep = () => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
      localStorage.setItem(getActiveStepLocalStorageKey(), activeStep + 1);
    } else {
      const navigationUrl =
        role === "admin" ? "/admin/admin-job-listing" : "/client/job-posted";
      localStorage.setItem(getActiveStepLocalStorageKey(), 1);

      navigate(navigationUrl);
    }
  };

  const decreaseStep = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem(getActiveStepLocalStorageKey(), activeStep - 1);
  };
  let finalValue= traitSkill?.map((item)=>{
    return  {
      "skill_id": item?.value,
      "skill_name": item?.label,
      "weight": item?.level?.find((itm, idx)=>(itm?.isTrue==true))?.name
    }
  })
  console.log(finalValue,"weightvalue")
  console.log(getActiveStepKeys[1],"step1keys")
 
  const onSubmit = (stepData) => {
    console.log(stepData,"stepdata")
    let payload = {};

    // for getting data of active step only
    getActiveStepKeys(activeStep).map((curKey) => {
      if (curKey in stepData) {
        payload = {
          ...payload,
          user_id: userId,
          [curKey]: stepData[curKey],
        };
      }
    });
    payload = {
      ...payload,
      user_id: userId,
      step: activeStep,
      job_id: jobID,
    };
    if (activeStep === 1) {
      payload = {
        ...payload,
        country: payload?.country_code?.label,
        country_code: payload?.country_code?.value,
        state: payload?.state_iso_code?.label,
        state_iso_code: payload?.state_iso_code?.value,
        time_zone: payload?.time_zone?.label,
      };
    }
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
      payload["job_skills"]=finalValue;
    }
    if (isEdit === true) {
      dispatch(
        clientUpdatePost(payload, isEdit, activeStep, jobID, increaseStep)
      )
    } else {
      dispatch(clientJobPost(payload, activeStep, increaseStep));
    }
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
                    onClick={decreaseStep}
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
