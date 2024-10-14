import React, { useEffect, useState } from "react";
import ClientStep1 from "../Registration flows/Client Registration flow/ClientStep1";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form } from "react-bootstrap";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getDeveloperActiveStepFields, getStepDataFromAPI } from "../Registration flows/registrationConstant";
import ProfileWrapper from "../../components/common/EditProfile/ProfileWrapper";
import { fileUploadForWeb, getDeveloperProfileDetails } from "../../redux/slices/developerDataSlice";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../components/atomic/RexettButton";
import { getCoutriesList, getCitiesList, getStatesList, getTimeZoneForCountry } from "../../redux/slices/clientDataSlice";
import { developerRegistration } from "../../redux/slices/developerDataSlice";
import AllRoleEditProfile from "../../components/common/EditProfile/AllRoleEditProfile";



const DeveloperEditProfile = () => {
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
  const dispatch = useDispatch()
  const { smallLoader, developerRegistrationData } = useSelector(
    (state) => state?.developerData
  );
  const [previewImage, setPreviewImage] = useState({
    profile_picture: "",
    resume: "",
    introVideo: "",
  });
  const [imageFile, setImageFile] = useState({
    resume: "",
    introVideo: "",
  });

  let userId = localStorage.getItem("userId")

  const onSubmit = (values) => {
    // debugger;
    console.log(values, "va");

    const uploadFiles = (files) => {
      let uploadedUrls = {};

      const uploadPromises = Object.keys(files).map((key) => {
        if (files[key]) {
          let fileData = new FormData();
          fileData.append("file", files[key]);

          return new Promise((resolve) => {
            dispatch(
              fileUploadForWeb(fileData, (url) => {
                console.log(url, `${key} url`);
                uploadedUrls[key] = url;
                resolve();
              })
            );
          });
        } else {
          return Promise.resolve(); // Resolve immediately if no file to upload
        }
      });

      Promise.all(uploadPromises).then(() => {
        let payload = {
          first_name: values?.first_name,
          last_name: values?.last_name,
          profile_picture: uploadedUrls?.profile_picture,
          profession: values?.professional_title,
          email: values?.email,
          country: values?.country_code?.label,
          address: values?.address,
          password: values?.password,
          language_preference: values?.language_preference,
          total_experience: values?.total_experience,
          // city: values?.city,
          city: null,
          confirm_password: values?.confirm_password,
          state: values?.state_iso_code?.label,
          country_iso_code: values?.country_iso_code?.value,
          state_iso_code: values?.state_iso_code?.value,
          passcode: values?.passcode,
          country_code: values?.country_code?.value,
          phone_number: values?.phone_number,
          language_proficiency: values?.language_proficiency?.value,
          time_zone: values?.time_zone?.value,
          resume: uploadedUrls?.resume ? uploadedUrls?.resume : values?.resume,
          linkedin_url: values?.linkedin_url,
          github_url: values?.github_url,
          intro_video_url: uploadedUrls?.introVideo ? uploadedUrls?.introVideo : values?.intro_video_url,
          user_id: userId,
          is_2FA_enabled: values?.is_2FA_enabled,
          tax_id: values?.tax_id,
          cin: values?.cin,
          address_2: values?.address_2,
          company_name: values?.company_name,
          company_tax_id: values?.company_tax_id
        };

        dispatch(developerRegistration(payload));
      });
    };
    uploadFiles({
      resume: imageFile.resume,
      introVideo: imageFile.introVideo,
      profile_picture: imageFile.profile_picture,
    });
  }


  const toggleConfirmationModal = (e) => {
    // Handle toggle confirmation modal
  };

  const [screenLoader, setScreenLoader] = React.useState(false); // Assuming screenLoader is a state

  const activeStep = 1; // Assuming activeStep is defined somewhere
  const nestedActiveStep = 0; // Assuming nestedActiveStep is defined somewhere
  const activeStepFields = getDeveloperActiveStepFields(
    activeStep,
    nestedActiveStep
  );

  let stepData = getStepDataFromAPI(developerRegistrationData, activeStep);

  useEffect(() => {
    if (userId) {
      dispatch(getDeveloperProfileDetails(userId));
      dispatch(getCoutriesList());
    }
  }, []);

  useEffect(() => {
    if (watch("country")?.value) {
      dispatch(getStatesList(watch("country")?.value));
      dispatch(getTimeZoneForCountry(watch("country")?.value));
    }
  }, [watch("country")]);

  useEffect(() => {
    if (watch("state")?.value) {
      dispatch(getCitiesList(watch("country")?.value, watch("state")?.value));
      setValue("city", null);
    }
  }, [watch("state")]);


  return (
    <>
      <ProfileWrapper>
        <div>
          {screenLoader ? (
            <ScreenLoader />
          ) : (
            <AllRoleEditProfile role="developer" name={'individual'} onSubmit={onSubmit} activeStep={activeStep} previewImage={previewImage} imageFile={imageFile} setImageFile={setImageFile} setPreviewImage={setPreviewImage} stepData={stepData} activeStepFields={activeStepFields} />
          )}
        </div>
      </ProfileWrapper>

    </>
  );
};

export default DeveloperEditProfile;
