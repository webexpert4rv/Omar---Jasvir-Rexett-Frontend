import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import ScreenLoader from "../../../components/atomic/ScreenLoader";
import RexettButton from "../../../components/atomic/RexettButton";
import CommonStep1 from "./CommonStep1";
import {
  createOptionsForReactSelect,
  getActiveStepPostURL,
  getCurrentStepInfo,
  getDeveloperActiveStepKeys,
} from "./developeStepConstant";
import {
  getCoutriesList,
  getWebClientLookUp,
  sendVerificationOtp,
  verifyOtp,
} from "../../../redux/slices/clientDataSlice";
import {
  getDegreeList,
  getDegreeOptions,
  getDeveloperData,
  getLanguageOptions,
  getSkillOptions,
  postDeveloperStepData,
} from "../../../redux/slices/developerDataSlice";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import ProjectsSection from "./ProjectsSection";
import DeveloperStepSix from "./DeveloperStepSix";
import ConfirmationModal from "../../../components/common/Modals/ConfirmationModal";
import { VERIFY_USER_MESSAGE } from "../client/constant";
import Otp from "../../Authentication/Otp";
import LastStep from "./LastStep";

const DeveloperRegisterForm = ({ role }) => {
  const developerId = localStorage.getItem("developerId");
  const [activeStep, setActiveStep] = useState(1);
  const [experienceData, setExperienceData] = useState([]);
  const [step, setStep] = useState("register");
  const [educationData, setEducationData] = useState([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [email, setEmail] = useState(null);
  // crud fields
  // for adding at least one field error for crud fields
  const [atLeastOneError, setAtLeastOneError] = useState(null);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectOptions,setProjectOptions] = useState([]);

  // crud fields
  const { OtpLoader } = useSelector((state) => state.clientData);
  // For step 6 file and profile picture
  const [stepSixInfo, setStepSixInfo] = useState({
    resumeUrl: null,
    previewImage: null,
    fileName: null,
    imageName: null,
  });
  const { t } = useTranslation();
  const {
    watch,
    setValue,
    reset,
    clearErrors,
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      social_links: [
        {
          name: "",
          url: "",
        },
      ],
      ready_to_relocate: "Yes",
    },
  });
  const dispatch = useDispatch();
  // const [isPassword, setPassword] = useState({
  //   firstPass: false,
  //   secondPass: false,
  // });
  const [file, setFile] = useState(null);
  const {
    smallLoader,
    userProfileDetails,
    screenLoader,
    degreeOptions,
    countries,
    skillOptions,
    languageOptions,
  } = useSelector((state) => state.developerData);
  let { headingData, fields } = getCurrentStepInfo(activeStep);
  useEffect(() => {
    const storedStep = localStorage.getItem("developerActiveStep");
    if (storedStep) {
      setActiveStep(Number(storedStep));
    }
  }, []);
  useEffect(() => {
    if (activeStep === 1) {
      dispatch(getCoutriesList());
    }
    if (activeStep === 2) {
      dispatch(getLanguageOptions());
      dispatch(getSkillOptions());
    }
    if (activeStep === 4) {
      dispatch(getDegreeOptions());
    }

     if(activeStep === 5){
      dispatch(getWebClientLookUp((data) => {
      const newOptions =  createOptionsForReactSelect(data?.project_type,"name","name");
      setProjectOptions(newOptions);
      }))
     }
  }, [activeStep]);
  useEffect(() => {
    // if (activeStep === 1 || activeStep === 2) {
    if (developerId) {
      dispatch(
        getDeveloperData(developerId, (data) => {
          if (activeStep <= 2 || activeStep === 6) {
            const keysForActiveStep = getDeveloperActiveStepKeys(activeStep);
            keysForActiveStep.map((key) => {
              if (key === "name") {
                if (data[key]) {
                  const [firstName, lastName] = data[key].split(" ");
                  setValue("first_name", firstName);
                  setValue("last_name", lastName);
                }
              } else if (key === "country_code") {
                const newValue = { label: data["country"], value: data[key] };
                setValue(key, newValue);
              } else if (key === "state_iso_code") {
                const newValue = { label: data["state"], value: data[key] };
                setValue(key, newValue);
              } else if (key === "language") {
                const newValue = {
                  label: data?.developer_language?.language,
                  value: data?.developer_language?.id,
                };
                if (newValue?.label && newValue?.value) {
                  setValue("language", newValue);
                }
              } else if (key === "skill") {
                const newValue = {
                  label: data?.other_skills[0]?.skill,
                  value: data?.other_skills[0]?.id,
                };
                if (newValue?.label && newValue?.value) {
                  setValue("skill", newValue);
                }
              } else if (key === "experience") {
                setValue("experience", data?.other_skills[0]?.experience);
              } else if (key === "total_experience") {
                setValue(
                  "total_experience",
                  data?.developer_detail?.total_experience
                );
              } else if (key === "professional_title") {
                setValue(
                  "professional_title",
                  data?.developer_detail?.professional_title
                );
              } else if (key === "expertise_level") {
                setValue(
                  "expertise_level",
                  data?.developer_language?.experties_level
                );
              } else if (key === "bio") {
                setValue("bio", data?.developer_detail?.bio);
              } else if (key === "how_did_you_hear_about_rexett") {
                setValue(key, data?.["developer_detail"]?.[key]);
              } else if (key === "profile_picture") {
                setStepSixInfo({
                  ...stepSixInfo,
                  previewImage: data?.[key],
                });
              } else {
                setValue(key, data[key]);
                if (key === "email") {
                  setEmail(data[key]);
                }
                // remove this condition once social_links are got inside API
                else if (key === "social_links") {
                  if (data[key]?.length) {
                    setValue(key, data[key]);
                  } else {
                    setValue(key, [{ name: "", value: "" }]);
                  }
                }
              }
            });
          }
          if (activeStep === 3) {
            setExperienceData(data?.developer_experiences);
          } else if (activeStep === 4) {
            setEducationData(data?.developer_educations);
          } else if (activeStep === 5) {
            setProjectsData(data?.developer_projects);
          }
        })
      );
    }
    // }
    // if (activeStep === 2) {
    //   dispatch(getLanguageOptions());
    //   dispatch(getSkillOptions());
    // }
  }, [activeStep]);

  const increaseActiveStepCount = () => {
    setActiveStep((prev) => prev + 1);
    // setAtLeastOneError(null);
    localStorage.setItem("developerActiveStep", activeStep + 1);
  };
  const decreaseActiveStepCount = () => {
    setActiveStep((prev) => prev - 1);
    setAtLeastOneError(null);
    localStorage.setItem("developerActiveStep", activeStep - 1);
  };
  console.log(projectOptions,"projectOptions")
  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
      case 2:
        return (
          <CommonStep1
            control={control}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            fields={fields}
            headingData={headingData}
            setValue={setValue}
            watch={watch}
            setError={setError}
            countries={countries}
            skillOptions={skillOptions}
            languageOptions={languageOptions}
          />
        );
      case 3:
        return (
          <ExperienceSection
            control={control}
            experiences={experiences}
            setExperiences={setExperiences}
            atLeastOneError={atLeastOneError}
            setAtLeastOneError={setAtLeastOneError}
            errors={errors}
            smallLoader={smallLoader}
            experienceData={experienceData}
          />
        );
      case 4:
        return (
          <EducationSection
            control={control}
            atLeastOneError={atLeastOneError}
            setAtLeastOneError={setAtLeastOneError}
            errors={errors}
            educations={educations}
            setEducations={setEducations}
            educationData={educationData}
            degreeOptions={createOptionsForReactSelect(
              degreeOptions,
              "id",
              "title"
            )}
          />
        );
      case 5:
        return (
          <ProjectsSection
            projectData={projectsData}
            atLeastOneError={atLeastOneError}
            setAtLeastOneError={setAtLeastOneError}
            projects={projects}
            projectOptions = {projectOptions}
            setProjects={setProjects}
          />
        );
      case 6:
        return (
          <DeveloperStepSix
            control={control}
            errors={errors}
            clearErrors={clearErrors}
            register={register}
            setValue={setValue}
            setError={setError}
            watch={watch}
            stepSixInfo={stepSixInfo}
            setStepSixInfo={setStepSixInfo}
          />
        );
      case 7:
        return <LastStep role={"developer"} />;
    }
  };

  const beforeSubmit = () => {
    let allowNextStep = true;
    if (activeStep === 4) {
      if (educations?.length > 0) {
        setAtLeastOneError(null);
      } else {
        setAtLeastOneError("Add least one education ");
        allowNextStep = false;
      }
    } else if (activeStep === 3) {
      if (experiences?.length > 0) {
        setAtLeastOneError(null);
      } else {
        setAtLeastOneError("Add least one experience ");
        allowNextStep = false;
      }
    } else if (activeStep === 5) {
      if (projects?.length > 0) {
        setAtLeastOneError(null);
      } else {
        setAtLeastOneError("Add least one project ");
        allowNextStep = false;
      }
    }
    if (allowNextStep) {
      handleSubmit(onSubmit)();
    }
  };
  const onSubmit = (values) => {
    console.log(values, "these are values");
    const URL = getActiveStepPostURL(activeStep);
    let payload = {};
    if (activeStep <= 2 || activeStep === 6) {
      if (activeStep === 1) {
        payload = {
          ...values,
          country: values?.["country_code"]?.label,
          country_code: values?.["country_code"]?.value,
          state: values?.["state_iso_code"]?.label,
          state_iso_code: values?.["state_iso_code"]?.value,
        };
        delete payload.confirm_password;
        delete payload.social_links;
      } else if (activeStep === 2) {
        const { professional_title, total_experience, work_preference } = values;
        payload = {
          developer_id: developerId,
          professional_title,
          total_experience,
          work_preference,
          languages: [
            {
              language: values?.language?.label,
              expertise_level: values?.expertise_level,
            },
          ],
          skills: [
            {
              skill: values?.skill?.label,
              experience: values?.experience,
            },
          ],
        };
        delete payload.skill;
        delete payload.language;
        delete payload.experience;
      } else if (activeStep === 6) {
        const { bio, how_did_you_hear_about_rexett, social_links } = values;
        payload = {
          developer_id: developerId,
          profile_picture: stepSixInfo?.previewImage
            ? stepSixInfo?.previewImage
            : null,
          resume: stepSixInfo?.resumeUrl,
          bio: bio,
          how_did_you_hear_about_rexett: how_did_you_hear_about_rexett,
          social_links: social_links,
        };
      }
      dispatch(
        postDeveloperStepData(
          URL,
          payload,
          () => {
            reset();
            increaseActiveStepCount();
          },
          activeStep,
          handleStep
        )
      );
    } else if (activeStep !== 7 && activeStep !== 6) {
      increaseActiveStepCount();
    }
  };

  // Email verification logic

  const handleStep = (stepAction, completedStep) => {
    if (stepAction === "verify") {
      setShowVerificationModal(true);
      setStep("verify");
    } else if (stepAction === "verify-otp") {
      setStep("verify-otp");
      setShowVerificationModal(false);
    } else if ("otp-verify-success") {
      setStep("register");
      setActiveStep(Number(completedStep));
      setShowVerificationModal(false);
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const payload = { email: email };
    dispatch(sendVerificationOtp(payload, handleStep));
  };

  const handleVerifyOtp = (otp) => {
    dispatch(
      verifyOtp({ email: email, otp: otp }, (completedStep) => {
        handleStep("verify-otp-success", completedStep);
      })
    );
  };
  // Email verification logic
  return (
    <>
      <section className="card-box">
        <div>
          {screenLoader ? (
            <ScreenLoader />
          ) : (
            step !== "verify-otp" && (
              <>
                <form noValidate>
                  {renderActiveStep()}
                  {activeStep !== 7 && (
                    <div className="text-center mr-2">
                      {activeStep !== 1 && (
                        <RexettButton
                          type="button"
                          text="Back"
                          onClick={decreaseActiveStepCount}
                          className="main-btn outline-main-btn px-5"
                          // disabled={smallLoader}
                          // isLoading={smallLoader}
                        />
                      )}
                      <RexettButton
                        type="button"
                        onClick={beforeSubmit}
                        text={activeStep < 8 ? "Continue" : t("submit")}
                        className="main-btn px-5"
                        disabled={smallLoader}
                        isLoading={smallLoader}
                      />
                    </div>
                  )}
                </form>
              </>
            )
          )}
        </div>
      </section>
      {showVerificationModal && (
        <ConfirmationModal
          text={VERIFY_USER_MESSAGE}
          show={showVerificationModal}
          handleAction={handleSendOtp}
          handleClose={() => {
            setShowVerificationModal(false);
          }}
          submitText="Verify"
          smallLoader={OtpLoader}
        />
      )}
      {step === "verify-otp" && (
        <Otp
          email={email}
          userType={"client"}
          isRegisterStepForm={true}
          isLoading={OtpLoader}
          handleVerifyOtp={handleVerifyOtp}
        />
      )}
    </>
  );
};
export default DeveloperRegisterForm;
