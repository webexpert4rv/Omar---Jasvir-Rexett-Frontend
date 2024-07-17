import React, { useEffect,useState } from "react";
import ClientStep1 from "../Registration flows/Client Registration flow/ClientStep1";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form } from "react-bootstrap";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getDeveloperActiveStepFields, getStepDataFromAPI } from "../Registration flows/registrationConstant";
import ProfileWrapper from "../../components/common/EditProfile/ProfileWrapper";
import { getDeveloperProfileDetails } from "../../redux/slices/developerDataSlice";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../components/atomic/RexettButton";
import { fileUploadForWeb, getCoutriesList,getCitiesList,getStatesList, getTimeZoneForCountry} from "../../redux/slices/clientDataSlice";
import { developerRegistration } from "../../redux/slices/developerDataSlice";



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
  const dispatch =useDispatch()
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

  console.log(imageFile,'imageFileeeeeee')

  // const onSubmit = (data) => {

  // };


  const onSubmit = (values) => {
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
          profession: values?.profession,
          email: values?.email,
          country: values?.country_code?.label,
          address: values?.address,
          password: values?.password,
          city: values?.city,
          state: values?.state_iso_code?.label,
          country_iso_code: "string",
          state_iso_code: values?.state_iso_code?.value,
          passcode: values?.passcode,
          country_code: values?.country_code.value,
          phone_number: values?.phone_number,
          language_proficiency: values?.language_proficiency,
          time_zone: values?.time_zone?.label,
          resume: uploadedUrls?.resume,
          linkedin_url: "https://www.linkedin.com/",
          github_url: "https://github.com/",
          intro_video_url: uploadedUrls?.introVideo,
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
  console.log(stepData,'stepdatttttaaaa');


  let developerId=localStorage.getItem("developerId")

  useEffect(() => {

    if(developerId){
    dispatch(getDeveloperProfileDetails(developerId));
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

  useEffect(()=>{
    setValue("phone_number",stepData?.phone_number);
    setValue("email",stepData?.email);
    // setValue("country",stepData?.country);
     setValue("country",{ label: stepData?.country, value: null });
    // setValue("state",stepData?.state);
    setValue("state",{ label: stepData?.state, value: null });
    // setValue("city",stepData?.city);
   setValue("city",{ label: stepData?.city, value: null });
    setValue("passcode",stepData?.passcode);
    setValue("time_zone",stepData?.time_zone);
    setValue("time_zone",{ label: stepData?.time_zone, value: null });
    setValue("address",stepData?.address);
  },[stepData])


  return (
    <>
      <ProfileWrapper>
      <div>
        {screenLoader ? (
          <ScreenLoader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row className="mb-4">
              <Col md="12" className="mb-3">
                <h5 className="fw-semibold mb-3">Security</h5>
                <Form.Group className="mb-3">
                  <Row className="gx-4">
                    <Col md={8}>
                      <Form.Label className="common-label font-16 fw-semibold mb-0">
                        Enable Two Factor Authentication
                      </Form.Label>
                      <p className="font-14 mb-0">
                        Two-Factor Authentication (2FA) is a security process in
                        which users provide two different authentication factors
                        to verify their identity. This method adds an additional
                        layer of security, making it more difficult for
                        unauthorized individuals to access your accounts.
                      </p>
                    </Col>
                    <Col md={4}>
                      <div className="form-check form-switch toggle-switch-wrapper">
                        <Controller
                          name="is_2FA_enabled"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              onChange={(e) => {
                                toggleConfirmationModal(e);
                              }}
                              checked={watch("is_2FA_enabled") === true}
                              className="form-check-input toggle-switch-custom"
                              type="checkbox"
                              role="switch"
                            />
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col md="12">
                <ClientStep1
                  control={control}
                  errors={errors}
                  activeStep={activeStep}
                  nestedActiveStep={nestedActiveStep}
                  type="developer"
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
                  isProfileSectionRequired={activeStep === 1 && nestedActiveStep === 0}
                  isEditMode={true}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
            <RexettButton
                  type="submit"
                  text={'Update'}
                  className="main-btn px-5 mr-2"
                  disabled={smallLoader}
                  isLoading={smallLoader}
                />
            </div>
          </form>
        )}
      </div>
      </ProfileWrapper>
     
    </>
  );
};

export default DeveloperEditProfile;
