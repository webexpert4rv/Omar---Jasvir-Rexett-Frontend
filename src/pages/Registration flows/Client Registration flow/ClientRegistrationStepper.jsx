import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ClientStep1 from "./ClientStep1";
import SidebarSection from "../SidebarSection";
import { SIDEBAR_ITEMS, getActiveStepFields } from "../registrationConstant";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import RexettButton from "../../../components/atomic/RexettButton";
import { useSelector } from "react-redux";

const ClientRegistrationStepper = () => {
  const [activeStep, setActiveStep] = useState(1);
  const {smallLoader}= useSelector(state=>state.clientData)
  const activeStepFields = getActiveStepFields(activeStep);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
    setError,
    setValue,
    clearErrors,
  } = useForm();
  useEffect(() => {
    const storedStep = localStorage.getItem("clientActiveStep");
    if (storedStep) {
      setActiveStep(Number(storedStep));
    }
  }, []);
  const increaseStepCount = () => {
    setActiveStep((prev) => prev + 1);
    localStorage.setItem("clientActiveStep", activeStep + 1);
  };
  const decreaseStepCount = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem("clientActiveStep", activeStep - 1);
  };
  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <ClientStep1
            control={control}
            errors={errors}
            activeStep={activeStep}
            stepFields={activeStepFields}
            setError={setError}
            clearErrors={clearErrors}
            watch={watch}
            setValue={setValue}
          />
        );
    }
  };
  const onSubmit = (values) => {
    console.log(values);
  };
  const handleSetActiveStep = (step) => {
    if (activeStep > step) {
      setActiveStep(step);
      localStorage.setItem(step);
    }
  };
  //   add this inside constant file
  const getActiveStepText = () => {
    switch (activeStep) {
      case 1:
        return "Next : Engagement";
      case 2:
        return "Next : Engagement Length";
      case 3:
        return "Next : Start Team";
      case 4:
        return "Next : Availability";
      case 5:
        return "Next : Skillset";
      case 6:
        return "Next : Book Meeting";
      case 7:
        return "Submit";
    }
  };
  return (
    <div>
      <section className="resume-section-wrapper">
        <SidebarSection
          activeStep={activeStep}
          hanSetActiveStep={handleSetActiveStep}
          stepperSideBarItems={SIDEBAR_ITEMS?.client}
        />
        <div className="resume-main-wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderActiveStep()}
            <div className="d-flex justify-content-between align-items-center">
              <div></div>
              <div>
                <RexettButton
                  type="submit"
                  text={getActiveStepText()}
                  className="main-btn px-5"
                    disabled={smallLoader}
                    isLoading={smallLoader}
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ClientRegistrationStepper;
