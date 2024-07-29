import React, { useEffect, useState } from "react";
import RexettButton from "../../../components/atomic/RexettButton";
import SidebarSection from "../SidebarSection";
import {
  MODAL_INFORMATION,
  SIDEBAR_ITEMS,
  getActiveStepFields,
  getVendorActiveStepFields,
} from "../registrationConstant";
import { useForm } from "react-hook-form";
import ClientStep1 from "../Client Registration flow/ClientStep1";
import { Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { applyAsClient, getCoutriesList, getWebClientLookUp } from "../../../redux/slices/clientDataSlice";
import { createOptionsForReactSelect } from "../../websiteRegisterForm/developer/developeStepConstant";
import VendorDecisionMakers from "./VendorDecisionMakers";
import SetUpJobModal from "../../../components/common/Modals/SetUpJobModal";
import { uploadFileToS3Bucket } from "../../../redux/slices/developerDataSlice";
import { applyAsVendor } from "../../../redux/slices/vendorDataSlice";
import ExpertiseArea from "./ExpertiseArea";

const VendorRegistrationStepper = () => {
  const dispatch = useDispatch();
  const [companyTypeOptions, setCompanyTypeOptions] = useState([]);
  const { smallLoader } = useSelector((state) => state.developerData);
  const { } = useSelector((state) => state.clientData);
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
  } = useForm({});
  const [activeStep, setActiveStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showSetUpModal, setShowSetUpJobModal] = useState(false);
  console.log(errors,"errors")



  useEffect(() => {
    const storedStep = localStorage.getItem("vendorActiveStep");
    if (storedStep) {
      setActiveStep(Number(storedStep));
    }
    if (activeStep === 1) {
      dispatch(getCoutriesList());
    }
  }, []);
  useEffect(() => {
    if (activeStep === 1) {
      dispatch(
        getWebClientLookUp((data) => {
          const newOptions = createOptionsForReactSelect(
            data?.company_type,
            "name",
            "name"
          );
          setCompanyTypeOptions(newOptions);
        })
      );
    }
  }, [activeStep]);
  const increaseStepCount = () => {
    if (activeStep === 4) {
      // localStorage.removeItem("clientActiveStep");
    } else {
      setActiveStep((prev) => prev + 1);
      localStorage.setItem("vendorActiveStep", activeStep + 1);
    }
  };
  const handleToggleSetupModal = () => {
    setShowSetUpJobModal((prev) => !prev);
  };
  const decreaseStepCount = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem("vendorActiveStep", activeStep - 1);
  };
  const handleSetActiveStep = (step) => {
    if (activeStep > step) {
      setActiveStep(step);
      localStorage.setItem("vendorActiveStep", step);
    }
  };
  //   add this inside constant file
  const getActiveStepText = () => {
    switch (activeStep) {
      case 1:
        return "Next : Decision Makers";
      case 2:
        return "Next : Company Info";
      case 3:
        return "Next : Area of Expertise";
      case 4:
        return "Submit";
    }
  };
  const handleAfterApiSuccess = () => {
      increaseStepCount();
      reset();
    };

  const handleProceed = () => {
    increaseStepCount();
    const stepData = watch();
    const payload = {
      ...stepData,
      country_code: stepData["country_code"]?.value,
      state_iso_code: stepData["state_iso_code"]?.value,
      country: stepData["country_code"]?.label,
      state: stepData["state_iso_code"]?.label,
      // profile_picture: selectedImage,
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
        console.log(payload, "payload")
        dispatch(applyAsVendor(payload, handleAfterApiSuccess));
      })
    );
  };

  const onSubmit = (values) => {
    if (activeStep === 1) {
      setShowSetUpJobModal(true);
    } else {
      increaseStepCount();
    }
  };
  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
      case 3:
      case 4:
        // add proper naming for Client Step 1 This step can be used everywhere when we have to map fields

        return (
          <ClientStep1
            control={control}
            errors={errors}
            activeStep={activeStep}
            type={"vendor"}
            register={register}
            // stepFields={activeStepFields}
            setError={setError}
            clearErrors={clearErrors}
            companyTypeOptions={companyTypeOptions}
            watch={watch}
            setValue={setValue}
            previewImage={previewImage}
            imageFile={imageFile}
            setPreviewImage={setPreviewImage}
            setImageFile={setImageFile}
            isProfileSectionRequired={activeStep === 1}
          />
        );
      case 2:
        return (
          <VendorDecisionMakers
          type={"vendor"}
            // stepFields={activeStepFields}
            //  skillOptions={skillOptions}
            onSubmit={onSubmit}
            // activeStepFields={activeStepFields}
            activeStep={activeStep}
            watch={watch}
            control={control}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
            previewImage={previewImage}
            setImageFile={setImageFile}
            getActiveStepText={getActiveStepText}
            smallLoader={smallLoader}
            setPreviewImage={setPreviewImage}
            imageFile={imageFile}
            setActiveStep={setActiveStep}
          />
        );
    }
  };
  return (
    <>
      <section className="resume-section-wrapper">
        <SidebarSection
          activeStep={activeStep}
          handleSetActiveStep={handleSetActiveStep}
          stepperSideBarItems={SIDEBAR_ITEMS?.vendor}
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
              {renderActiveStep()}
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
     {showSetUpModal ? <SetUpJobModal
        show={showSetUpModal}
        handleClose={handleToggleSetupModal}
        handleProceed={handleProceed}
        smallLoader={smallLoader}
        modalData={MODAL_INFORMATION[1]}
        activeStep={activeStep}
      />:""}
    </>
  );
};

export default VendorRegistrationStepper;
