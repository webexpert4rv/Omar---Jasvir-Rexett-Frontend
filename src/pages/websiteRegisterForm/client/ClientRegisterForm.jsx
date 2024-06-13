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

const ClientRegisterForm = ({ role }) => {
  const { t } = useTranslation();
  const {
    register,
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [activeStep, setActiveStep] = useState(2);


  const getActiveStepComponent = () => {
    switch (activeStep) {
      case 1:
        return (
          <Step1
            register={register}
            errors={errors}
            control={control}
            watch={watch}
            setValue={setValue}
          />
        );
      case 2:
        return (
          <Step2
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            control={control}
          />
        );
      case 3:
        return (
          <Step3
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        );
        default:
          return
    }
  };

  const onSubmit = (stepData) => {
    console.log(stepData,"stepData")
  }
 
  return (
    <>
  <section className="card-box">
        <div>
          {false ? (
            <ScreenLoader />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {getActiveStepComponent()}
         
            {activeStep !== 1 && (
                  <RexettButton
                    type="button"
                    text="Back"
                    onClick={() => {
                      setActiveStep((prev) => prev - 1);
                    }}
                    className="main-btn outline-main-btn px-5"
                    // disabled={smallLoader}
                    // isLoading={smallLoader}
                  />
                )}
                <RexettButton
                  type="submit"
                  text={activeStep < 3 ? "Continue" : t("submit")}
                  className="main-btn px-5"
              
                  // disabled={smallLoader}
                  // isLoading={smallLoader}
                />
            </form>
          )}
        </div>
      </section>
    </>
  );
};
export default ClientRegisterForm;
