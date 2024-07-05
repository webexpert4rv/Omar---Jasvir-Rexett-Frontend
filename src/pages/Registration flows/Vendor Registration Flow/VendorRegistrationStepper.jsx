import React, { useEffect, useState } from "react";
import RexettButton from "../../../components/atomic/RexettButton";
import SidebarSection from "../SidebarSection";
import {
  SIDEBAR_ITEMS,
  getActiveStepFields,
  getVendorActiveStepFields,
} from "../registrationConstant";
import { useForm } from "react-hook-form";
import ClientStep1 from "../Client Registration flow/ClientStep1";
import { Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getWebClientLookUp } from "../../../redux/slices/clientDataSlice";
import { createOptionsForReactSelect } from "../../websiteRegisterForm/developer/developeStepConstant";

const VendorRegistrationStepper = () => {
  const dispatch = useDispatch();
  const [companyTypeOptions,setCompanyTypeOptions] = useState([]);
  const { smallLoader } = useSelector((state) => state.developerData);
  const {} = useSelector((state) => state.clientData);
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

  useEffect(() => {
    const storedStep = localStorage.getItem("vendorActiveStep");
    if (storedStep) {
      setActiveStep(Number(storedStep));
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
  const activeStepFields = getVendorActiveStepFields(activeStep);
  const increaseStepCount = () => {
    if (activeStep === 3) {
      // localStorage.removeItem("clientActiveStep");
    } else {
      setActiveStep((prev) => prev + 1);
      localStorage.setItem("vendorActiveStep", activeStep + 1);
    }
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
        return "Next : Area of Expertise";
      case 3:
        return "Submit";
    }
  };

  const onSubmit = (values) => {
    console.log(values);
  };
  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
      case 3:
        // add proper naming for Client Step 1 This step can be used everywhere when we have to map fields
        return (
          <ClientStep1
            control={control}
            errors={errors}
            activeStep={activeStep}
            register={register}
            stepFields={activeStepFields}
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
        return <VendorDecisionMakers />;
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
    </>
  );
};

export default VendorRegistrationStepper;
