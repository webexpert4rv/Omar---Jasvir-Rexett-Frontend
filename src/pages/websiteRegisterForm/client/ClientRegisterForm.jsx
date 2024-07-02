import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import CommonInput from "../../../components/atomic/CommonInput";
import ScreenLoader from "../../../components/atomic/ScreenLoader";
import CommonAutocomplete from "../../../components/atomic/CommonAutoComplete";
import RexettButton from "../../../components/atomic/RexettButton";
import { getAllCountries } from "../../../redux/slices/authenticationDataSlice";
import StepperFormWrapper from "../../../components/common/websiteRegisterStepsForm/StepperFormWrapper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {
  VERIFY_USER_MESSAGE,
  convertSkills,
  getActiveStepOptions,
  getCurrentStepper,
  getKeysForActiveStep,
} from "./constant";
import {
  applyAsClient,
  clientPostJob,
  getCoutriesList,
  getSkillList,
  getWebClientData,
  getWebClientLookUp,
  getWebsiteSkills,
  sendVerificationOtp,
  verifyOtp,
} from "../../../redux/slices/clientDataSlice";
import RemainingSteps from "./RemainingSteps";
import ConfirmationModal from "../../views/Modals/ConfirmationModal";
import Otp from "../../Authentication/Otp";
import LastStep from "../developer/LastStep";

const ClientRegisterForm = ({ role }) => {
  const { t } = useTranslation();
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
  } = useForm({});
  const clientId = localStorage.getItem("clientId");
  const [activeStep, setActiveStep] = useState(1);
  const [email, setEmail] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [step, setStep] = useState("register");

  // const toggleVerificationModal = () =>
  //   setShowVerificationModal(!showVerificationModal);
  const dispatch = useDispatch();
  const { skillList, clientLook, webClientData, smallLoader, screenLoader } =
    useSelector((state) => state.clientData);
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
  let { name, inputType, headingData, label, optionKey } =
    getCurrentStepper(activeStep);

  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });

  const labelAndValue = clientLook[name]?.map((item) => {
    return { value: item.slug, label: item.name };
  });

  useEffect(() => {
    const storedStep = localStorage.getItem("clientActiveStep");
    if (storedStep) {
      setActiveStep(Number(storedStep));
    }
  }, []);
  useEffect(() => {
    if (activeStep === 1) {
      setValue("client_type", "individual");
      dispatch(getCoutriesList());
    }
    dispatch(getWebClientLookUp());
  }, []);
  const increaseActiveStep = () => {
    setActiveStep((prev) => prev + 1);
    localStorage.setItem("clientActiveStep", activeStep + 1);
  };
  const decreaseActiveStep = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem("clientActiveStep", activeStep - 1);
  };

  useEffect(() => {
    let originalSkillArray = [];
    if (activeStep === 6) {
      dispatch(
        getWebsiteSkills((skillArray) => {
          originalSkillArray = skillArray;
        })
      );
    }
    if (clientId) {
      dispatch(
        getWebClientData(clientId, (data) => {
          if (data) {
            const keysForActiveStep = getKeysForActiveStep(activeStep);
            keysForActiveStep.map((key) => {
              if (key === "country_code") {
                const newValue = { label: data["country"], value: data[key] };
                setValue(key, newValue);
              } else if (key === "state_iso_code") {
                const newValue = { label: data["state"], value: data[key] };
                setValue(key, newValue);
              } else if (key === "password") {
                // setValue("confirm_password", data[key]);
                // setValue("password", data[key]);
              } else if (key === "profile_picture") {
                setSelectedImage(data[key]);
                setValue(key, data[key]);
              } else if (key === "email") {
                setEmail(data[key]);
                setValue(key, data[key]);
              } else if (
                key === "engagement_type" ||
                key === "project_length"
              ) {
                setValue(key, data.jobs[0][key]);
              } else if (key === "when_should_the_development_start") {
                setValue(key, data?.jobs[0]["development_should_start_in"]);
              } else if (key === "availability") {
                setValue(key, data?.jobs[0]["contract_type"]);
              } else if (key === "skills") {
                const skillsForSelect = convertSkills({
                  convertTo: "array",
                  string: data?.jobs[0][key],
                  originalSkillArray: originalSkillArray,
                });
                setValue(key, skillsForSelect);
              } else {
                setValue(key, data[key]);
              }
            });
          }
        })
      );
    }
  }, [activeStep, showVerificationModal]);

  const onSubmit = (stepData) => {
    let payload = {};
    if (activeStep === 1) {
      payload = {
        ...stepData,
        country_code: stepData["country_code"]?.value,
        state_iso_code: stepData["state_iso_code"]?.value,
        country: stepData["country_code"]?.label,
        state: stepData["state_iso_code"]?.label,
        company_type: stepData["company_type"]?.value
          ? stepData["company_type"]?.value
          : null,
        profile_picture: selectedImage,
      };
      dispatch(
        applyAsClient(
          payload,
          () => {
            setActiveStep((prev) => prev + 1);
          },
          handleStep
        )
      );
    } else if (activeStep === 6) {
      payload = {
        ...stepData,
        client_id: clientId,
      };
      if (stepData?.["skills"]?.length) {
        payload = {
          ...stepData,
          client_id: clientId,
          skills: convertSkills({
            convertTo: "string",
            options: stepData?.skills,
          }),
        };
      }
    } else {
      // for step 2,3,4,5 and 7
      let currentStepData;
      const activeStepKeys = getKeysForActiveStep(activeStep);
      activeStepKeys?.map((curKey) => {
        if (curKey in stepData) {
          currentStepData = {
            ...currentStepData,
            [curKey]: stepData[curKey],
          };
        }
      });
      payload = {
        client_id: clientId,
        ...currentStepData,
      };
    }
    reset();
    activeStep !== 1 && dispatch(clientPostJob(payload, increaseActiveStep));
    // if (activeStep < 8) {
    //   setActiveStep((prev) => prev + 1);
    // }
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
  return (
    <>
      <section className="card-box">
        <div>
          {screenLoader ? (
            <ScreenLoader />
          ) : (
            step !== "verify-otp" && (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {activeStep === 1 ? (
                  <Step1
                    register={register}
                    errors={errors}
                    control={control}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    watch={watch}
                    setError={setError}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    headingData={headingData}
                  />
                ) : activeStep === 8 ? (
                  <LastStep role={"client"} />
                ) : (
                  <RemainingSteps
                    headingData={headingData}
                    name={name}
                    setValue={setValue}
                    skillList={skillList}
                    label={label}
                    setError={setError}
                    register={register}
                    watch={watch}
                    clearErrors={clearErrors}
                    inputType={inputType}
                    errors={errors}
                    control={control}
                    // client look contains the options data for all steps,and name contains active step key for options
                    options={getActiveStepOptions(clientLook, optionKey)}
                  />
                )}

                {/* {activeStep !== 8 && ( */}
                <>
                  {activeStep !== 8 && (
                    <div className="text-center mr-2">
                      {activeStep !== 1 && (
                        <RexettButton
                          type="button"
                          text="Back"
                          onClick={decreaseActiveStep}
                          className="main-btn outline-main-btn px-5"
                          // disabled={smallLoader}
                          // isLoading={smallLoader}
                        />
                      )}
                      <RexettButton
                        type="submit"
                        text={activeStep < 8 ? "Continue" : t("submit")}
                        className="main-btn px-5"
                        // onClick={() => {
                        //   setActiveStep((prev) => prev + 1);
                        // }}
                        // disabled={smallLoader}
                        // isLoading={smallLoader}
                      />
                    </div>
                  )}
                </>
                {/* )} */}
              </form>
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
          smallLoader={smallLoader}
        />
      )}
      {step === "verify-otp" && (
        <Otp
          email={email}
          userType={"client"}
          isRegisterStepForm={true}
          isLoading={smallLoader}
          handleVerifyOtp={handleVerifyOtp}
        />
      )}
    </>
  );
};
export default ClientRegisterForm;
