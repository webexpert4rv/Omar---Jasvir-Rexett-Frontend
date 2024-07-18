import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getCoutriesList, getWebClientLookUp } from "../../redux/slices/clientDataSlice";
import { applyAsVendor, getAreaExpertise, getEditDecision, getVendorUpdatedDetails } from "../../redux/slices/vendorDataSlice";
import { getVendorActiveStepFields, MODAL_INFORMATION, SIDEBAR_ITEMS } from "../Registration flows/registrationConstant";
// import ClientStep1 from "../admin/ClientRegister/ClientStep1";
import { createOptionsForReactSelect } from "../websiteRegisterForm/developer/developeStepConstant";
import SetUpJobModal from "../../components/common/Modals/SetUpJobModal";
import RexettButton from "../../components/atomic/RexettButton";
import VendorDecisionMakers from "../Registration flows/Vendor Registration Flow/VendorDecisionMakers";
import { uploadFileToS3Bucket } from "../../redux/slices/developerDataSlice";
import ClientStep1 from "../Registration flows/Client Registration flow/ClientStep1";
import SidebarSection from "../Registration flows/SidebarSection";

const VendorEditProfile = () => {
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
  const userId = localStorage.getItem("userId")
  console.log(userId, "userId")
  console.log(activeStep, "activestep2222")


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
  // useEffect(()=>{
  //   if(userId){
  //     dispatch(getVendorUpdatedDetails(userId , (response)=>{
  //       console.log(response,"reponseofvendor")
  //       for (let key in data){
  //         setValue()
  //       }

  //     }))
  //   }
   
  // },[userId])


  const activeStepFields = getVendorActiveStepFields(activeStep);
  console.log(activeStepFields, "activeStepFields")
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
  const getActiveStepText = () => {
    switch (activeStep) {
      case 1:
        return "Next : Decision Makers";
      case 2:
        return "Next : Area of Expertise";
      case 4:
        return "Submit";
    }
  };
  const onSubmit = () => {
    const buttonText = getActiveStepText();

    switch (buttonText) {
      case "Next : Decision Makers":
        callDecisionMakersAPI();
        break;
      case "Next : Area of Expertise":
        callAreaOfExpertiseAPI();
        break;
      case "Submit":
        break;
      
    }
  };

  const callDecisionMakersAPI = () => {
    if (activeStep === 1) {
      setShowSetUpJobModal(true);
    } else {
      increaseStepCount();
    }
    const stepData = watch();
    let formData = new FormData()
    formData.append('file', imageFile?.profile_picture)
    dispatch(uploadFileToS3Bucket(formData, (url) => {
      const payload = {
        ...stepData,
        user_id: userId,
        country_code: stepData["country_code"]?.value,
        state_iso_code: stepData["state_iso_code"]?.value,
        country: stepData["country_code"]?.label,
        state: stepData["state_iso_code"]?.label,
        company_logo: url,
        time_zone: stepData?.time_zone?.label,
        establishment_year: stepData?.establishment_year?.split("-")[0],
        total_it_recruiter: stepData?.Total_nos._of_IT_Recruiters
      };
      delete payload["profile_picture"]
      delete payload["timezone"]
      delete payload["confirm_password"]
      dispatch(applyAsVendor(payload, handleAfterApiSuccess));
    }))
  };


  const callCompanyInfoAPI = () => {
    const stepData = watch();
    let data = {
      user_id: userId,
      decision_makers: [
        {
          proprietor_name: stepData?.name,
          proprietor_email: stepData?.email,
          proprietor_contact_number: stepData?.phone_number,
          proprietor_position: stepData?.position
        }
      ]
    }
    console.log(data,"data")
    dispatch(getEditDecision(data,handleAfterApiSuccess))

  };

  const callAreaOfExpertiseAPI = () => {
    const stepData = watch();
    let payload={
      user_id: userId,
      specialization: stepData?.area_of_specialization,
      service_offering: stepData?.service_offering,
      turn_around_time_to_close_contract_position: stepData?.Your_Turnaround_time_to_close_Contract_Positions,
      turn_around_time_to_close_permanent_position: stepData?.Your_Turnaround_time_to_close_Permanent_Positions,
      success_story: stepData?.Please_share_your_success_Stories_with_atleast_2_of_your_exiting_IT_customers_and_their_Contact_details_for_reference_check
    }
    dispatch(getAreaExpertise(payload))
  };

  const handleSetActiveStep=(step)=>{
    if(activeStep > step){
      setActiveStep(step);
      localStorage.setItem("vendorActiveStep",step)
    }
  }
 

  const handleAfterApiSuccess = () => {
    increaseStepCount();
    reset();
  };
 
  //   if (activeStep === 1) {
  //     setShowSetUpJobModal(true);
  //   } else {
  //     increaseStepCount();
  //   }
  //   const stepData = watch();
  //   let formData = new FormData()
  //   formData.append('file', imageFile?.profile_picture)
  //   dispatch(uploadFileToS3Bucket(formData, (url) => {
  //     console.log(url, "url")
  //     const payload = {
  //       ...stepData,
  //       user_id: userId,
  //       country_code: stepData["country_code"]?.value,
  //       state_iso_code: stepData["state_iso_code"]?.value,
  //       country: stepData["country_code"]?.label,
  //       state: stepData["state_iso_code"]?.label,
  //       company_logo: url,
  //       time_zone: stepData?.time_zone?.label
  //     };
  //     delete payload["profile_picture"]
  //     delete payload["timezone"]
  //     delete payload["confirm_password"]
  //     dispatch(applyAsVendor(payload, handleAfterApiSuccess));
  //   })
  //   )
  // };
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
  return (
    <>
     <section className={`${token ? "edit-developer-wrapper resume-section-wrapper":"resume-section-wrapper"}`}>
        <SidebarSection
          activeStep={activeStep}
          handleSetActiveStep={handleSetActiveStep}
          stepperSideBarItems={SIDEBAR_ITEMS?.vendor}
        />
        <div className="resume-main-wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
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

export default VendorEditProfile;
