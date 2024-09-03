import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ClientStep1 from "./ClientStep1.jsx";
import SidebarSection from "../SidebarSection";
import {
  DEFAULT_SCREENING_DATA,
  MODAL_INFORMATION,
  SIDEBAR_ITEMS,
  getActiveStepFields,
} from "../registrationConstant";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  applyAsClient,
  clientJobPost,
  getCoutriesList,
  getProfile,
  getTimeZoneList,
  updateClientPost,
  uploadFileToS3Bucket,
} from "../../../redux/slices/clientDataSlice";
import RegistrationType from "./RegistrationType";
import SetUpJobModal from "../../../components/common/Modals/SetUpJobModal.jsx";
import JobPostStep2 from "../../../components/common/JobPostForm/JobPostStep2.jsx";
import JobPostStep3 from "../../../components/common/JobPostForm/JobPostStep3.jsx";
import JobDesciptionStep from "./JobDesciptionStep.jsx";
import { getSkillOptions } from "../../../redux/slices/developerDataSlice.js";
import ScreeningSection from "./ScreeningSection.jsx";
import { FaArrowLeft } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import ScreenLoader from "../../../components/atomic/ScreenLoader.jsx";
import moment from "moment";


const ClientRegistrationStepper = () => {
  const dispatch = useDispatch();
  const { smallLoader, approvedLoader, screenLoader, timeZoneList, clientJobPostDetails } = useSelector((state) => state?.clientData);
  const [text, setText] = useState("");
  const [details, setDetails] = useState()
  const [activeStep, setActiveStep] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [registrationType, setRegistrationType] = useState("individual"); //for register as indivisual or company
  const [showSetUpModal, setShowSetUpJobModal] = useState(false);
  const [groupedTime, setGroupedTime] = useState([])
  const [skillDetails, setSkillDetails] = useState({
    skillName: [],
    skillWeight: []
  })
  console.log(clientJobPostDetails, "clientJobPostDetails")
  const job_id = localStorage.getItem("jobId")
  let currentFormtype = localStorage.getItem("currentRegisterFormType")
  const activeStepFields = getActiveStepFields(activeStep, currentFormtype);
  console.log(activeStepFields, "activeStepFields")
  const { profileData } = useSelector((state) => state?.clientData)
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
    watch,
    setError,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      skills: [{ title: "", level: "" }],
      screening_questions: DEFAULT_SCREENING_DATA,
    },
  });
  const { skillOptions } = useSelector((state) => state.developerData);
  const { t } = useTranslation()
  const [countryCode, setCountryCode] = useState()
  let arrPercentage = [0, 0, 30, 50, 70, 100]

  useEffect(() => {
    dispatch(getTimeZoneList())
    const storedStep = localStorage.getItem("clientActiveStep");
    if (storedStep) {
      setActiveStep(Number(storedStep));
    }
  }, []);
  useEffect(() => {
    if (activeStep == 1) {
      dispatch(getCoutriesList());
    }
    if (activeStep == 3) {
      dispatch(getSkillOptions());
    }
  }, [activeStep]);
  const user_id = localStorage.getItem("clientId")
  useEffect(() => {
    if (timeZoneList?.length > 0) {
      let groupedTimeZones = timeZoneList?.map((item) => {
        return {
          label: item?.country_name,
          options: item?.timezones?.map((it) => {
            return { label: it, value: it }
          }),
        }
      })
      setGroupedTime(groupedTimeZones)
    }
  }, [timeZoneList])

  useEffect(() => {
    const activeStepKeys = {
      1: "step1",
      2: "step2",
      3: "step3",
      4: "step4",
    };

    if (user_id) {
      dispatch(getProfile(user_id, (data) => {
        for (let key in data) {
          if (activeStep === 1) {
            if (key === "country_code") {
              const newValue = {
                label: data["country"],
                value: data[key],
              };
              setCountryCode(newValue?.value);
              setValue(key, newValue);
            } else if (key === "state_iso_code") {
              const newValue = { label: data["state"], value: data[key] };
              setValue(key, newValue);
            } 
            else if (key === "city") {
              const newValue = {
                label: data["city"],
                value: data[key]
              }
              setValue(key, newValue)
            }else if (key === "time_zone") {
              const newValue = { label: data[key], value: data[key] };
              setValue(key, newValue);
            } else {
              setValue(key, data[key]);
            }
            if (key === "name") {
              const [firstName, surname] = data[key]?.split(" ");
              setValue("first_name", firstName);
              setValue("last_name", surname);
            }
            if (key === "address") {
              setValue("address", data[key]);
            }
            if (key === "tax_id") {
              setValue("company_tax_id", data[key]);
            }
            if (key === "company_logo") {
              setPreviewImage({ profile_picture: data?.profile_picture })
            }
          } else if (activeStep === 2) {
            const step1Data = data.jobs[0].step1;
            for (let step1Key in step1Data) {
              if (step1Key === "time_zone") {
                const newValue = { label: step1Data[step1Key], value: step1Data[step1Key] };
                setValue("time_zone", newValue);
              } else if (step1Key === "response_date") {
                const responseDate = step1Data[step1Key].slice(0, 10)
                setValue("response_date", responseDate)
              } else {
                setValue(step1Key, step1Data[step1Key])
              }
            }
          } else if (activeStep === 3) {
            const step2Data = data?.jobs[0]?.step2;
            for (let step2Key in step2Data) {
              if (step2Data?.job_skills) {
                const newSkills = [];
                const newWeights = [];
                step2Data?.job_skills?.forEach((item) => {
                  newSkills.push({ label: item?.skill_name, value: item?.skill_name });
                  newWeights.push({ label: item?.weight, value: item?.weight });
                });
                setSkillDetails({
                  skillName: newSkills,
                  skillWeight: newWeights
                });
              }
              if (step2Key === "description") {
                const desc = stripHtmlTags(step2Data[step2Key])
                setValue(step2Key, desc)
              }
            }
          }
        }
      }));
    }
  }, [activeStep, user_id, dispatch]);

  const getActiveStepText = (values) => {
    switch (activeStep) {
      case 1:
        return "Next : Setup Job";
      case 2:
        return "Next : Job Description";
      case 3:
        return "Next: Screening Info";
      case 4:
        return "Submit";
    }
  };
  const onSubmit = () => {
    if (activeStep == 1 || activeStep == 4) {
      setShowSetUpJobModal(true);
    } else {
      // increaseStepCount();
    }
    const buttonText = getActiveStepText();
    switch (buttonText) {
      case "Next : Setup Job":
        setShowSetUpJobModal(true);
        break;
      case "Next : Job Description":
        callJobStep1API();
        break;
      case "Next: Screening Info":
        callJobStep2API();
        break;
      case "Submit":
        callJobStep3API();
    }
  };

  const stripHtmlTags = (str) => {
    return str?.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const jobStepData = watch();
  const callJobStep1API = () => {

    if (activeStep == 2) {
      let payload;
      if (job_id) {
        payload = {
          step: 1,
          title: jobStepData?.title,
          contract_type: jobStepData?.contract_type,
          job_location: jobStepData?.job_location,
          job_positions: jobStepData?.job_positions,
          job_type: jobStepData?.job_type,
          response_date: jobStepData?.response_date,
          time_zone: jobStepData?.time_zone?.label
        }
        dispatch(updateClientPost(user_id, job_id, payload, handleAfterApiSuccess))
      } else {
        payload = {
          step: 1,
          title: jobStepData?.title,
          contract_type: jobStepData?.contract_type,
          job_location: jobStepData?.job_location,
          job_positions: jobStepData?.job_positions,
          job_type: jobStepData?.job_type,
          response_date: jobStepData?.response_date,
          time_zone: jobStepData?.time_zone?.label
        }
        dispatch(clientJobPost(payload, activeStep, user_id, handleAfterApiSuccess))
      }
    }
  }
  const jobSkills = jobStepData?.skills?.map(skill => ({
    skill_id: skill?.title?.value,
    skill_name: skill?.title?.label,
    weight: skill?.level?.label,
  }));

  const screeningQuestions = jobStepData?.screening_questions?.map(ques => (
    {
      title: ques?.title,
      question: ques?.question,
      ideal_answer: ques?.ideal_answer,
      must_have: ques?.must_have,
      question_type: ques?.question_type,
    }
  ))
  const callJobStep2API = () => {
    if (activeStep == 3) {
      if (job_id) {
        let payload = {
          step: 2,
          // job_id: job_id,
          description: jobStepData?.description,
          job_skills: jobSkills,
        }
        dispatch(updateClientPost(user_id, job_id, payload, handleAfterApiSuccess))
      }
    }
  }

  const callJobStep3API = () => {
    if (activeStep == 4) {
      const stepData = watch();
      let payload = {
        step: 3,
        job_id: job_id,
        user_id: user_id,
        qualification_filter_out: jobStepData?.qualification_filter_out,
        screening_questions: screeningQuestions,
      }
      dispatch(updateClientPost(user_id, job_id, payload, handleAfterApiSuccess))

    }
  }

  const increaseStepCount = () => {
    if (activeStep === 4) {
      localStorage.removeItem("clientActiveStep");
    } else {
      setActiveStep((prev) => prev + 1);
      localStorage.setItem("clientActiveStep", activeStep + 1);
    }
  };
  const decreaseStepCount = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem("clientActiveStep", activeStep - 1);
  };
  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
      case 2:
        return (
          // this step will be used for both first and second
          <ClientStep1

            screenLoader={screenLoader}
            control={control}
            errors={errors}
            activeStep={activeStep}
            type={"client"}
            register={register}
            stepFields={activeStepFields}
            setError={setError}
            clearErrors={clearErrors}
            watch={watch}
            setValue={setValue}
            previewImage={previewImage}
            imageFile={imageFile}
            setPreviewImage={setPreviewImage}
            setImageFile={setImageFile}
            isProfileSectionRequired={activeStep === 1}
            countryCode={countryCode}
            skillOptions={groupedTime}
          />
        );
      case 3:
        return (
          <JobDesciptionStep
            skillDetails={skillDetails}
            screenLoader={screenLoader}
            register={register}
            stepFields={activeStepFields}
            errors={errors}
            skillOptions={skillOptions}
            activeStep={activeStep}
            watch={watch}
            setValue={setValue}
            control={control}
            type={"client"}
          />
        );
      case 4:
        return (
          <ScreeningSection
            screenLoader={screenLoader}
            activeStep={activeStep}
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
            type={"client"}
          />
        );
    }
  };
  const handleSetActiveStep = (step) => {
    if (activeStep > step) {
      setActiveStep(step);
      localStorage.setItem("clientActiveStep", step);
    }
  };
  useEffect(() => {
    if (activeStep == 4) {
      setText("Submit")
    }
  }, [activeStep])

  const handleRegistrationType = (registrationType) => {
    localStorage.setItem("currentRegisterFormType", registrationType)
    setRegistrationType(registrationType);
    increaseStepCount();
  };
  const handleToggleSetupModal = () => {
    setShowSetUpJobModal((prev) => !prev);
  };
  const handleRedirect = () => {
    window.location.href = "https://rexett-frontend.rvtechnologies.info"
    // window.location.href= process.env.REACT_APP_BASE_URL
  }
  const handleAfterApiSuccess = () => {
    increaseStepCount();
    reset();
  };
  const handleProceed = () => {
    const stepData = watch();
    let fileData = new FormData();
    fileData.append("file", imageFile?.profile_picture)
    setShowSetUpJobModal(false);
    dispatch(uploadFileToS3Bucket(fileData, (url) => {
      const payload = {
        // name :`${stepData?.first_name } ${stepData?.last_name}`,
        first_name: stepData?.first_name,
        last_name: stepData?.last_name,
        password: stepData?.password,
        profile_picture: url,
        country_code: stepData?.country_code?.value,
        state_iso_code: stepData?.state_iso_code?.value,
        city:stepData?.city.label,
        email: stepData?.email,
        country_code: stepData?.country_code?.value,
        yearly_revenue: stepData?.yearly_revenue,
        tax_id: stepData?.company_tax_id,
        address: stepData?.address,
        country: stepData?.country_code?.label,
        state: stepData?.state_iso_code?.label,
        phone_number: stepData?.phone_number,
        passcode: stepData?.passcode,
        time_zone: stepData?.time_zone?.label

      }
      dispatch(applyAsClient(payload, handleAfterApiSuccess));
    })
    );
  };
  return (
    <>
      {/* {screenLoader ? <ScreenLoader /> : */}
      <div>
        {activeStep === 0 ? (
          <RegistrationType handleRegistrationType={handleRegistrationType} />
        ) : (
          <section className="resume-section-wrapper">
            <SidebarSection
              activeStep={activeStep}
              handleSetActiveStep={handleSetActiveStep}
              stepperSideBarItems={SIDEBAR_ITEMS?.client}
              arrPercentage={arrPercentage}
            />
            <div className="resume-main-wrapper">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                  <div>
                    <span onClick={decreaseStepCount} className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium cursor-pointer">
                      <FaArrowLeft /> Go Back
                    </span>
                  </div>
                  {renderActiveStep()}
                  <div className="d-flex justify-content-between align-items-center ">
                    <div>
                    </div>
                    <div>
                      <RexettButton
                        type="submit"
                        // onClick={() => text === "Submit"}
                        text={getActiveStepText()}
                        className="main-btn px-5 mr-2"
                        disabled={smallLoader}
                        isLoading={smallLoader}
                      />
                    </div>
                  </div>
                </Container>
              </form>
            </div>
          </section>
        )}
      </div>
      {/* } */}
      {showSetUpModal ? <SetUpJobModal
        show={showSetUpModal}
        handleClose={handleToggleSetupModal}
        handleRedirect={handleRedirect}
        handleProceed={handleProceed}
        smallLoader={smallLoader}
        modalData={MODAL_INFORMATION[activeStep]}
        activeStep={activeStep}
      />
        : ""}
      {/* <ThankRegister
        show={false}
        handleClose={handleCloseThanksRegister}
        role={"client"}
      /> */}
    </>
  );
};

export default ClientRegistrationStepper;