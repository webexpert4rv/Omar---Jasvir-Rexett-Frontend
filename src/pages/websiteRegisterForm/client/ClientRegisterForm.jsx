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

const ClientRegisterForm = ({ role }) => {
  const userId = localStorage.getItem("userId");
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const dispatch = useDispatch();

  const [isPassword, setPassword] = useState({
    firstPass: false,
    secondPass: false,
  });
  const [file, setFile] = useState(null);
  const { smallLoader, userProfileDetails, screenLoader, countries } =
    useSelector((state) => state.developerData);

  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;

  console.log(userProfileDetails, "userProfileDetails");

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  useEffect(() => {
    if (userProfileDetails?.data) {
      setValue("name", userProfileDetails?.data?.name);
      setValue("email", userProfileDetails?.data?.email);
      setValue("phone_number", userProfileDetails?.data?.phone_number);
      setValue("address", userProfileDetails?.data?.address);
      setValue("address_2", userProfileDetails?.data?.address_2);
      setValue("city", userProfileDetails?.data?.city);
      setValue("country", userProfileDetails?.data?.country);
      setValue("passcode", userProfileDetails?.data?.passcode);
    }
  }, [userProfileDetails]);

  const disableProfile = <Tooltip id="tooltip">Disable your Account</Tooltip>;

  const onSubmit = (values) => {
    // let formData = new FormData();
    // let fileData = new FormData();
    // for (const key in values) {
    //   formData.append(key, values[key]);
    // }
    // fileData.append("file", file);
    // if (file == null) {
    //   let data = {
    //     ...values,
    //     user_id: userId,
    //   };
    //   dispatch(updateDeveloperProfile(data));
    // } else {
    //   dispatch(
    //     filePreassignedUrlGenerate(fileData, (url) => {
    //       let data = {
    //         ...values,
    //         profile_picture: url,
    //         user_id: userId,
    //       };
    //       dispatch(updateDeveloperProfile(data));
    //     })
    //   );
    // }
  };
  const validatePassword = (value) => {
    if (value === "") {
      return true; // Password is not required, so return true if empty
    } else {
      // Check if password matches the pattern
      const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!pattern.test(value)) {
        return "Password must contain at least a symbol, upper and lower case letters and a number";
      }
    }
    return true; // Password meets the criteria
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
     <StepperFormWrapper>
      <Step1/>
      <Step2 />
      <Step1/>
     </StepperFormWrapper>
    </>
  );
};
export default ClientRegisterForm;
