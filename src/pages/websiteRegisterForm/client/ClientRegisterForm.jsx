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
import { getCurrentStepper } from "./constant";
import {
  applyAsClient,
  getWebClientData,
  getWebClientLookUp,
  getWebsiteSkills,
} from "../../../redux/slices/clientDataSlice";

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
  const [activeStep, setActiveStep] = useState(1);
  const dispatch = useDispatch();
  const { skillList, clientLook } = useSelector((state) => state.clientData);

  let { data, name, inputType, headingData, label } =
    getCurrentStepper(activeStep);

  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });

  const labelAndValue = clientLook[name]?.map((item) => {
    return { value: item.slug, label: item.name };
  });

  useEffect(() => {
    dispatch(getWebsiteSkills());
    dispatch(getWebClientData());
    dispatch(getWebClientLookUp());
  }, [dispatch]);

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
            headingData={headingData}
          />
        );
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return (
          <Step2
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            control={control}
            stepperData={labelAndValue}
            name={name}
            inputType={inputType}
            selectOptions={skillListMapped}
            headingData={headingData}
            label={label}
          />
        );
      case 7:
      case 8:
        return (
          <Step3
            register={register}
            errors={errors}
            control={control}
            watch={watch}
            setValue={setValue}
            name={name}
            headingData={headingData}
          />
        );
      default:
        return;
    }
  };

  const onSubmit = (stepData) => {
    console.log(stepData,"ddd")

   let data= {
      "name": "himanshu",
      "email": "ram@yopmail.com",
      "phone_number": "9410514319",
      "country_code": "45",
      "password": "Pankaj@0987",
      "client_type": "individual",
      "company_logo": "",
      "company_name": "",
      "company_tax_id": "",
      "company_address": "",
      "company_type": "",
      "time_zone": "Asia/Kabul"
    }
    dispatch(applyAsClient(data))
  };

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
                // onClick={() => {
                //   setActiveStep((prev) => prev + 1);
                // }}
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
