import React, { useEffect, useState } from "react";
import VendorStep1 from "./VendorStep1";
import VendorRemainingSteps from "./VendorRemainingSteps";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoutriesList,
  getWebClientLookUp,
  sendVerificationOtp,
  verifyOtp,
} from "../../../redux/slices/clientDataSlice";
import {
  getActiveStepData,
  getActiveStepPostAPIUrl,
  getActiveVendorStepKeys,
  getYearFromData,
} from "./vendorConstant";
import { getSkillOptions } from "../../../redux/slices/developerDataSlice";
import {
  getVendorStepData,
  postVendorStepData,
} from "../../../redux/slices/vendorDataSlice";
import ScreenLoader from "../../../components/atomic/ScreenLoader";
import { VERIFY_USER_MESSAGE } from "../client/constant";
import ConfirmationModal from "../../views/Modals/ConfirmationModal";
import Otp from "../../Authentication/Otp";
import LastStep from "../developer/LastStep";
import { useTranslation } from "react-i18next";
import { createOptionsForReactSelect } from "../developer/developeStepConstant";

const VendorRegisterForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const companyId = localStorage.getItem("companyId");
  const [step, setStep] = useState("register");
  const [email, setEmail] = useState(null);
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const userId = localStorage.getItem("vendorUserId");
  const [activeStep, setActiveStep] = useState(1);
  const [profilePiture, setProfilePicture] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const { smallLoader, screenLoader } = useSelector(
    (state) => state.vendorData
  );
  const { OtpLoader } = useSelector((state) => state.clientData);
  const { countries, skillOptions } = useSelector(
    (state) => state.developerData
  );
  const activeStepFields = getActiveStepData(activeStep);
  useEffect(() => {
    const storedStep = localStorage.getItem("vendorActiveStep");
    if (storedStep) {
      setActiveStep(Number(storedStep));
    }
  }, []);
  useEffect(() => {
    if (activeStep === 1) {
      dispatch(getCoutriesList());
    }
    if (activeStep === 3) {
      dispatch(getSkillOptions());
    }
    if (activeStep === 3) {
      dispatch(
        getWebClientLookUp((data) => {
          const newOptions = createOptionsForReactSelect(
            data?.specialization_area,
            "name",
            "name"
          );
          setSpecializationOptions(newOptions);
        })
      );
    }
  }, [activeStep]);

  useEffect(() => {
    if (userId) {
      dispatch(
        getVendorStepData(userId, (data) => {
          const keysForActiveStep = getActiveVendorStepKeys(activeStep);
          keysForActiveStep?.map((key) => {
            if (key === "pin_code") {
              setValue(key, data?.company?.post_code);
            } else if (key === "name_of_the_company") {
              setValue(key, data?.company?.name);
            } else if (key === "country_code") {
              const newValue = {
                label: data?.company["country"],
                value: data?.company[key],
              };
              setValue(key, newValue);
            } else if (key === "state_iso_code") {
              const newValue = {
                label: data?.company?.["state"],
                value: data?.company[key],
              };
              setValue(key, newValue);
            } else if (key === "skill") {
              const newValue = {
                label: data?.company?.company_expertise[0]?.skill,
                value: data?.company?.company_expertise[0]?.id,
              };
              setValue("skill", newValue);
            } else if (key === "specialization") {
              const newValue = {
                label: data?.company?.specialization,
                value: data?.company?.specialization,
              };
              setValue("specialization",newValue);
            } else if (key === "experience") {
              setValue(
                "experience",
                data?.company?.company_expertise[0]?.experience
              );
            } else if (key === "logo") {
              setLogoImage(data?.company?.logo);
            } else {
              if (key === "email") {
                setEmail(data?.company?.[key]);
              }
              setValue(key, data?.company?.[key]);
            }
          });
        })
      );
    }
  }, [activeStep]);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    clearErrors,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const increaseStepCount = () => {
    setActiveStep((prev) => prev + 1);
    localStorage.setItem("vendorActiveStep", activeStep + 1);
  };
  const decreaseStepCount = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem("vendorActiveStep", activeStep - 1);
  };
  const onSubmit = (values) => {
    const URL = getActiveStepPostAPIUrl(activeStep);
    let payload = {};
    if (activeStep === 1) {
      payload = {
        ...values,
        logo: logoImage,
        country_code: values?.country_code?.value,
        country: values?.country_code?.label,
        state_iso_code: values?.state_iso_code?.value,
        state: values?.state_iso_code?.label,
        city: values?.city?.label,
      };
      delete payload["confirm_password"];
    } else if (activeStep === 2) {
      payload = {
        company_id: companyId,
        ...values,
        establishment_year: getYearFromData(values?.establishment_year_date),
      };
    } else if (activeStep === 3) {
      payload = {
        company_id: companyId,
        ...values,
        specialization: values?.specialization?.label,
        skills: [
          {
            skill: values?.skill?.label,
            experience: values?.experience,
          },
        ],
      };
      delete payload["skill"];
    } else if (activeStep === 4) {
      payload = {
        company_id: companyId,
        ...values,
      };
    }

    dispatch(
      postVendorStepData(
        URL,
        payload,
        () => {
          increaseStepCount();
          reset();
        },
        activeStep,
        handleStep
      )
    );
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
      {step !== "verify-otp" && (
        <section className="card-box">
          <div>
            {screenLoader ? (
              <ScreenLoader />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {activeStep === 1 && (
                  <VendorStep1
                    countries={countries}
                    control={control}
                    errors={errors}
                    setError={setError}
                    setValue={setValue}
                    clearErrors={clearErrors}
                    register={register}
                    logoImage={logoImage}
                    setLogoImage={setLogoImage}
                    watch={watch}
                    activeStepFields={activeStepFields}
                  />
                )}
                {activeStep === 5 && <LastStep role="vendor" />}
                {activeStep !== 5 && activeStep !== 1 && (
                  <VendorRemainingSteps
                    control={control}
                    register={register}
                    errors={errors}
                    watch={watch}
                    specializationOptions={specializationOptions}
                    activeStep={activeStep}
                    activeStepFields={activeStepFields}
                    skillOptions={skillOptions}
                  />
                )}
                {/* {activeStep === 1 ? (
                  <VendorStep1
                    countries={countries}
                    control={control}
                    errors={errors}
                    setError={setError}
                    setValue={setValue}
                    clearErrors={clearErrors}
                    register={register}
                    logoImage={logoImage}
                    setLogoImage={setLogoImage}
                    watch={watch}
                    activeStepFields={activeStepFields}
                  />
                ) : activeStep === 5 ? (
                  <LastStep role="vendor" />
                ) : (
                  <VendorRemainingSteps
                    control={control}
                    errors={errors}
                    watch={watch}
                    activeStep={activeStep}
                    activeStepFields={activeStepFields}
                    skillOptions={skillOptions}
                  />
                )} */}
                {activeStep !== 5 && (
                  <div className="text-center mr-2">
                    {activeStep !== 1 && (
                      <RexettButton
                        type="button"
                        text="Back"
                        disabled={smallLoader}
                        onClick={decreaseStepCount}
                        className="main-btn outline-main-btn px-5"
                        // disabled={smallLoader}
                        // isLoading={smallLoader}
                      />
                    )}
                    <RexettButton
                      type="submit"
                      text={activeStep < 8 ? "Continue" : t("submit")}
                      className="main-btn px-5"
                      disabled={smallLoader}
                      isLoading={smallLoader}
                    />
                  </div>
                )}
              </form>
            )}
          </div>
        </section>
      )}
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
          userType={"vendor"}
          isRegisterStepForm={true}
          isLoading={OtpLoader}
          handleVerifyOtp={handleVerifyOtp}
        />
      )}
    </>
  );
};

export default VendorRegisterForm;
