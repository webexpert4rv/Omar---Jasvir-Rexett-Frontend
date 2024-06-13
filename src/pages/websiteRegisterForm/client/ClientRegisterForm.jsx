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
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm();
  
  const { handleSubmit, trigger } = methods;

  const nextStep = () => {
    if (currentStep < 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  let stepper=[ <Step1/>, <Step2 />,   <Step3/>]
  let currentStepper=stepper[currentStep]
  return (
    <>
    {currentStepper}
    </>
  );
};
export default ClientRegisterForm;
