import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SidebarSection from "../SidebarSection";
import {
  DEFAULT_SCREENING_DATA,
  MODAL_INFORMATION,
  SIDEBAR_ITEMS,
  getActiveStepFields,
  getDeveloperActiveStepFields,
} from "../registrationConstant";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  applyAsClient,
  getCoutriesList,
  uploadFileToS3Bucket,
} from "../../../redux/slices/clientDataSlice";
import SetUpJobModal from "../../../components/common/Modals/SetUpJobModal.jsx";
import { getSkillOptions } from "../../../redux/slices/developerDataSlice.js";
import {
  FaArrowLeft,
  FaCheck,
  FaCirclePlay,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaUpload,
} from "react-icons/fa6";
import ClientStep1 from "../Client Registration flow/ClientStep1.jsx";
import RegistrationType from "../Client Registration flow/RegistrationType.jsx";
import ResumeOverView from "./ResumeOverView.jsx";
import { GoClockFill } from "react-icons/go";
import { MdLocalPhone, MdLocationOn, MdWork } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { IoCameraOutline, IoClose, IoPlay } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import StepperIntro from "./StepperIntro.jsx";

const DeveloperRegistrationStepper = () => {
  const dispatch = useDispatch();
  const { smallLoader } = useSelector((state) => state?.clientData);
  const [activeStep, setActiveStep] = useState(0);
  const [nestedActiveStep, setNestedActiveStep] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [registrationType, setRegistrationType] = useState("indivisual"); //for register as indivisual or company
  const [showSetUpModal, setShowSetUpJobModal] = useState(false);
  const activeStepFields = getDeveloperActiveStepFields(activeStep,nestedActiveStep);
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
  const increaseStepCount = (isNested) => {
   
     if(isNested){
        setNestedActiveStep((prev)=>prev+1)
     }else{
        setActiveStep((prev) => prev + 1);
        
      localStorage.setItem("clientActiveStep", activeStep + 1);
     } 

    if (activeStep === 4) {
      // localStorage.removeItem("clientActiveStep");
    } else {
    
    //   localStorage.setItem("clientActiveStep", activeStep + 1);
    }
  };
  const decreaseStepCount = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem("clientActiveStep", activeStep - 1);
  };
  console.log(nestedActiveStep,"nestedActiveStep")
  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
        switch(nestedActiveStep){
            case 0:
            case 2:
                return (
                    // this step will be used for both first and second
                    <ClientStep1
                      control={control}
                      errors={errors}
                      activeStep={activeStep}
                      type={"developer"}
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

               case 1:
                return (
                    <StepperIntro/>
                )   
        }
       
        
    }
  };
  const onSubmit = (values) => {
    console.log(values, "these are values");

    if (activeStep === 1 || activeStep == 4) {
        increaseStepCount(true)
    } else {
      increaseStepCount(false);
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
    // const handleAfterApiSuccess = () => {
    //   increaseStepCount();
    //   reset();
    // };
    // console.log(stepData,"stepData")
    // const filePayload = { file: imageFile };
    // dispatch(
    //   uploadFileToS3Bucket(filePayload, (url) => {
    //     const payload = {
    //       ...stepData,
    //       country_code: stepData["country_code"]?.value,
    //       state_iso_code: stepData["state_iso_code"]?.value,
    //       country: stepData["country_code"]?.label,
    //       state: stepData["state_iso_code"]?.label,
    //       profile_picture: url,
    //     };
    //     console.log(payload,"payload")
    //     dispatch(applyAsClient(payload, handleAfterApiSuccess));
    //   })
    // );

    // replace trigger verification modal with last callback function
    //  dispatch(applyAsClient(payload,handleAfterApiSuccess,()=>{}))
  };
  return (
    <section className="resume-section-wrapper">
      <SidebarSection
        activeStep={activeStep}
        handleSetActiveStep={handleSetActiveStep}
        stepperSideBarItems={SIDEBAR_ITEMS?.developer}
      />

      <div className="resume-main-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <div>
              <span
                onClick={decreaseStepCount}
                className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium cursor-pointer"
              >
                <FaArrowLeft /> Go Back
              </span>
            </div>
            <Row>
              <Col md={8}>{renderActiveStep()}</Col>
              <Col md={4}>
                <ResumeOverView />
              </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center ">
              <div></div>
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
  );
};

export default DeveloperRegistrationStepper;
