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
  getCoutriesList,
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

const ClientRegistrationStepper = () => {
  const dispatch = useDispatch();
  const { smallLoader } = useSelector((state) => state?.clientData);
  const [activeStep, setActiveStep] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [registrationType, setRegistrationType] = useState("indivisual"); //for register as indivisual or company
  const [showSetUpModal, setShowSetUpJobModal] = useState(false);
  const activeStepFields = getActiveStepFields(activeStep, registrationType);
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

  useEffect(() => {
    const storedStep = localStorage.getItem("clientActiveStep");
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
  }, [activeStep]);
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
          />
        );
      case 3:
        return (
          <JobDesciptionStep
            register={register}
            stepFields={activeStepFields}
            errors={errors}
            skillOptions={skillOptions}
            activeStep={activeStep}
            watch={watch}
            setValue={setValue}
            control={control}
          />
        );
      case 4:
        return (
          <ScreeningSection
            activeStep={activeStep}
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        );
    }
  };
  const onSubmit = (values) => {
    console.log(values, "these are values");
    if (activeStep === 1 || activeStep==4) {
      setShowSetUpJobModal(true);
    } else {
      increaseStepCount();
    }
  };
  const handleSetActiveStep = (step) => {
    if (activeStep > step) {
      setActiveStep(step);
      localStorage.setItem("clientActiveStep", step);
    }
  };
  //   add this inside constant file
  const getActiveStepText = () => {
    switch (activeStep) {
      case 1:
        return "Next : Setup Job";
      case 2:
        return "Next : Job Description";
      case 3:
        return "Next:Screening Info";
      case 4:
        return "Submit";
    }
  };

  const handleRegistrationType = (registrationType) => {
    setRegistrationType(registrationType);
    increaseStepCount();
  };
  const handleToggleSetupModal = () => {
    setShowSetUpJobModal((prev) => !prev);
  };
  const handleProceed = () => {
    const stepData = watch();
    const payload = {
      ...stepData,
      country_code: stepData["country_code"]?.value,
      state_iso_code: stepData["state_iso_code"]?.value,
      country: stepData["country_code"]?.label,
      state: stepData["state_iso_code"]?.label,
      // profile_picture: selectedImage,
    };
    setShowSetUpJobModal(false);
    increaseStepCount();
    const handleAfterApiSuccess = () => {
      increaseStepCount();
      reset();
    };
    const filePayload = { file: imageFile };
    dispatch(
      uploadFileToS3Bucket(filePayload, (url) => {
        const payload = {
          ...stepData,
          country_code: stepData["country_code"]?.value,
          state_iso_code: stepData["state_iso_code"]?.value,
          country: stepData["country_code"]?.label,
          state: stepData["state_iso_code"]?.label,
          profile_picture: url,
        };
        dispatch(applyAsClient(payload, handleAfterApiSuccess));
      })
    );

    // replace trigger verification modal with last callback function
    //  dispatch(applyAsClient(payload,handleAfterApiSuccess,()=>{}))
  };
  return (
    <>
      <div>
        {activeStep === 0 ? (
          <RegistrationType handleRegistrationType={handleRegistrationType} />
        ) : (
          <section className="resume-section-wrapper">
            <SidebarSection
              activeStep={activeStep}
              handleSetActiveStep={handleSetActiveStep}
              stepperSideBarItems={SIDEBAR_ITEMS?.client}
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
                      <RexettButton
                        type="submit"
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
     {showSetUpModal? <SetUpJobModal
        show={showSetUpModal}
        handleClose={handleToggleSetupModal}
        handleProceed={handleProceed}
        smallLoader={smallLoader}
        modalData={MODAL_INFORMATION[activeStep]}
        activeStep={activeStep}
      />:""}
      {/* <ThankRegister
        show={showthanksregister}
        handleClose={handleCloseThanksRegister}
      /> */}
    </>
  );
};

export default ClientRegistrationStepper;
