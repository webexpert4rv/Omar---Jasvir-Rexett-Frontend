import React, { useEffect, useState } from "react";
import { Controller,useForm } from "react-hook-form";
import { Container,Row,
  Col,
  Form } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getCoutriesList, getWebClientLookUp } from "../../redux/slices/clientDataSlice";
import { applyAsVendor, getAreaExpertise, getEditDecision, getVendorUpdatedDetails, uploadFileToS3Bucket } from "../../redux/slices/vendorDataSlice";
import { getVendorActiveStepFields, MODAL_INFORMATION, SIDEBAR_ITEMS } from "../Registration flows/registrationConstant";
// import ClientStep1 from "../admin/ClientRegister/ClientStep1";
import { createOptionsForReactSelect } from "../websiteRegisterForm/developer/developeStepConstant";
import SetUpJobModal from "../../components/common/Modals/SetUpJobModal";
import RexettButton from "../../components/atomic/RexettButton";
import VendorDecisionMakers from "../Registration flows/Vendor Registration Flow/VendorDecisionMakers";
import ClientStep1 from "../Registration flows/Client Registration flow/ClientStep1";
import SidebarSection from "../Registration flows/SidebarSection";
import ConfirmationModal from "../../components/common/Modals/ConfirmationModal";

const VendorEditProfile = () => {
  const dispatch = useDispatch();
  const [companyTypeOptions, setCompanyTypeOptions] = useState([]);
  const { smallLoader} = useSelector((state) => state.vendorData);
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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [twoFactorStatus, setTwoFactorStatus] = useState(false);

  const userId = localStorage.getItem("userId")


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
  useEffect(() => {
    const activeStepKeys = {
      1: "step1",
      2: "step2",
      3: "step3"
    }
    if (userId && [activeStepKeys[activeStep]]) {
      dispatch(getVendorUpdatedDetails(userId, (response) => {
        const data = response[activeStepKeys[activeStep]];
        for (let key in data) {
          setValue(key, data[key])
          if (activeStep === 1) {
            if (key === "country_code") {
              const newValue = {
                label: data["country"],
                value: data[key],
              };
              setValue(key, newValue);
            } else if (key === "state_iso_code") {
              const newValue = {
                label: data["state"],
                value: data[key],
              };
              setValue(key, newValue);
            } else if (key === "time_zone") {
              const newValue = { label: data[key], value: data["time_zone"] };
              setValue(key, newValue);
            } else if (key === "company_logo") {
              setPreviewImage({ profile_picture: data?.company_logo })
            } else if (key === "post_code") {
              setValue("passcode", data[key])
            }
          }
        }
      }))
    }
  }, [activeStep,userId])


  const activeStepFields = getVendorActiveStepFields(activeStep);
  const increaseStepCount = () => {
    if (activeStep === 3) {
      // localStorage.removeItem("clientActiveStep");
    } else {
      setActiveStep((prev) => prev + 1);
      localStorage.setItem("vendorActiveStep", activeStep + 1);
    }
  };

  const toggleConfirmationModal = (e) => {
    const { checked } = e?.target;
    setShowConfirmationModal(!showConfirmationModal);
    setTwoFactorStatus(checked);
  };
 
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
  const onSubmit = () => {
    const buttonText = getActiveStepText();
    switch (buttonText) {
      case "Next : Decision Makers":
        callCompanyInfoAPI();
        break;
      case "Next : Area of Expertise":
        callDecisionMakersAPI();
        break;
      case "Submit":
        callAreaOfExpertiseAPI();
        break;
    }
  };

  const callCompanyInfoAPI = () => {
    // increaseStepCount()
      const stepData = watch();
      let formData = new FormData()
      formData.append('file', imageFile?.profile_picture)
      let year = new Date(stepData?.establishment_year).getFullYear()
      dispatch(uploadFileToS3Bucket(formData, (url) => {
        const payload = {
          ...stepData,
          user_id: userId,
          country_code: stepData["country_code"]?.value,
          state_iso_code: stepData["state_iso_code"]?.value,
          country: stepData["country_code"]?.label,
          state: stepData["state_iso_code"]?.label,
          company_logo: url ? url : stepData?.company_logo,
          time_zone: stepData?.time_zone?.label,
          is_2FA_enabled: twoFactorStatus || stepData?.is_2FA_enabled,
          establishment_year:year
        };
        delete payload["profile_picture"]
        delete payload["timezone"]
        delete payload["confirm_password"]
        dispatch(applyAsVendor(payload, handleAfterApiSuccess));
      }))
  };


  const callDecisionMakersAPI = () => {
      const stepData = watch();
      let data = {
        user_id: userId,
        decision_makers: [
          {
            proprietor_name: stepData?.proprietor_name,
            proprietor_email: stepData?.proprietor_email,
            proprietor_contact_number: stepData?.proprietor_contact_number,
            proprietor_position: stepData?.proprietor_position
          }
        ]
      }
      dispatch(getEditDecision(data, handleAfterApiSuccess))
  };

  const closeConfirmationModal = () => setShowConfirmationModal(false);

  const handleTwoFaAction = () => {
    setValue("is_2FA_enabled", twoFactorStatus);
    closeConfirmationModal();
  };


  const callAreaOfExpertiseAPI = () => {
      const stepData = watch();
      let payload = {
        user_id: userId,
        specialization: stepData?.specialization,
        service_offering: stepData?.service_offering,
        turn_around_time_to_close_contract_position: stepData?.turn_around_time_to_close_contract_position,
        turn_around_time_to_close_permanent_position: stepData?.turn_around_time_to_close_permanent_position,
        success_story: stepData?.success_story
      }
      dispatch(getAreaExpertise(payload))
  };

  const handleSetActiveStep = (step) => {
    if (activeStep > step) {
      setActiveStep(step);
      localStorage.setItem("vendorActiveStep", step)
    }
  }


  const handleAfterApiSuccess = () => {
    increaseStepCount();
    reset();
  };

  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
        return(
          <div>
          <Row className="mb-4">
            <Col md="12" className="mb-3">
              <h5 className="fw-semibold mb-3">Security</h5>
              <Form.Group className="mb-3">
                <Row className="gx-4">
                  <Col md={8}>
                    <Form.Label className="common-label font-16 fw-semibold mb-0">
                      Enable Two Factor Authentication
                    </Form.Label>
                    <p className="font-14 mb-0">Two-Factor Authentication (2FA) is a security process in which users provide two different authentication factors to verify their identity. This method adds an additional layer of security, making it more difficult for unauthorized individuals to access your accounts.</p>
                  </Col>
                  <Col md={4}>
                    <div class="form-check form-switch toggle-switch-wrapper">
                      <Controller
                        name="is_2FA_enabled"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            onChange={(e) => {
                              toggleConfirmationModal(e);
                            }}
                            checked={
                              watch("is_2FA_enabled") === true ? true : false
                            }
                            class="form-check-input toggle-switch-custom"
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
          </Row>
          <ClientStep1
            control={control}
            errors={errors}
            activeStep={activeStep}
            type={"vendor"}
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
            isVendorStep1={true}
            flowName={"edit_profile"}
          />
        </div>
        )
      case 3:
        // add proper naming for Client Step 1 This step can be used everywhere when we have to map fields
        return (
          <ClientStep1
            control={control}
            errors={errors}
            activeStep={activeStep}
            type={"vendor"}
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
            isVendorStep1={true}
          />
        );
      case 2:
        return (
          <VendorDecisionMakers
            stepFields={activeStepFields}
            //  skillOptions={skillOptions}
            errors={errors}
            onSubmit={onSubmit}
            type={"vendor"}
            activeStepFields={activeStepFields}
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
  let token = localStorage.getItem("token")
  const decreaseStepCount = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem("vendorActiveStep", activeStep - 1);
  };
  return (
    <>
      <section className={`${token ? "edit-developer-wrapper resume-section-wrapper" : "resume-section-wrapper"}`}>
        <SidebarSection
          activeStep={activeStep}
          handleSetActiveStep={handleSetActiveStep}
          stepperSideBarItems={SIDEBAR_ITEMS?.vendor}
        />
       
        <div className="resume-main-wrapper">
        {activeStep > 1 && <div>
                <span
                  onClick={decreaseStepCount}
                  className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium cursor-pointer"
                >
                  <FaArrowLeft /> Go Back
                </span>
              </div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
              {renderActiveStep()}
              <div className="d-flex justify-content-between align-items-center">
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
      {showConfirmationModal && (
        <ConfirmationModal
          show={showConfirmationModal}
          handleClose={closeConfirmationModal}
          handleAction={handleTwoFaAction}
          smallLoader={smallLoader}
          text={`Are you sure, you want to ${twoFactorStatus ? "enable" : "disable"
            } two factor authentication`}
        />
      )}
    </>
  );
};

export default VendorEditProfile;
