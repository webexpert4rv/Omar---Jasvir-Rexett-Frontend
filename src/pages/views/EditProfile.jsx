import React, {useState, useEffect} from "react";
import { Nav, Tab } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AllRoleEditProfile from "../../components/common/EditProfile/AllRoleEditProfile";
import ProfileWrapper from "../../components/common/EditProfile/ProfileWrapper";
import CompanyProfile from "../../components/common/EditProfile/CompanyProfile";
import { useDispatch, useSelector } from "react-redux";
import { getCoutriesList,getCitiesList,getStatesList, getTimeZoneForCountry} from "../../redux/slices/clientDataSlice";
import { fileUploadForWeb, getDeveloperProfileDetails } from "../../redux/slices/developerDataSlice";
import { developerRegistration } from "../../redux/slices/developerDataSlice";
import { getDeveloperActiveStepFields, getStepDataFromAPI, getActiveStepFields } from "../Registration flows/registrationConstant";
import { clientRegistration } from "../../redux/slices/clientDataSlice";
import { getClientProfileDetails } from "../../redux/slices/clientDataSlice";

const EditProfile = () => {
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
  const { smallLoader ,clientProfileData} = useSelector(
    (state) => state?.clientData
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

  const { t } = useTranslation();

  let userId=localStorage.getItem("userId")

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
          language_preference: values?.language_preference?.value,
          total_experience: values?.total_experience,
          city: null,
          state: values?.state_iso_code?.label,
          country_iso_code: values?.country_iso_code?.value,
          state_iso_code: values?.state_iso_code?.value,
          passcode: values?.passcode,
          country_code: values?.country_code.value,
          phone_number: values?.phone_number,
          language_proficiency: values?.language_proficiency,
          time_zone: values?.time_zone?.label,
          resume: uploadedUrls?.resume,
          linkedin_url: values?.linked_in,
          github_url: values?.git_hub,
          intro_video_url: uploadedUrls?.introVideo,
          user_id: userId,
          company_name: values?.company_name,
          company_tax_id: values?.company_tax_id,
          establishment_year: values?.establishment_year,
          website_url: values?.website_url,
          yearly_revenue: values?.yearly_revenue,
          employee_strength: values?.employee_strength,
        };

        dispatch(clientRegistration(payload));
      });
    };
    uploadFiles({
      resume: imageFile.resume,
      introVideo: imageFile.introVideo,
      profile_picture: imageFile.profile_picture,
    });
  }

  const watchAllFields = watch();


console.log(watchAllFields,'allfieldsssssss hihi');

  const toggleConfirmationModal = (e) => {
    // Handle toggle confirmation modal
  };

  const [screenLoader, setScreenLoader] = React.useState(false); // Assuming screenLoader is a state

  const activeStep = 1; // Assuming activeStep is defined somewhere
  const nestedActiveStep = 0; // Assuming nestedActiveStep is defined somewhere
  
//  const activeStepFields = getActiveStepFields(
//     activeStep,
//     clientProfileData?.company_type
//   );
  // console.log(activeStepFields,'activeStepFields hihi');
  // let stepData = getStepDataFromAPI(developerRegistrationData, activeStep);
  console.log(clientProfileData,'hihi clientdata')

  // let stepData = getStepDataFromAPI(clientProfileData, activeStep);

  useEffect(() => {

    if(userId){
    dispatch(getClientProfileDetails(userId));
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

  // console.log(stepData,'stepstep hihi');
  return (
    <>
      <ProfileWrapper>
        {/* <section>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="personal_details"
          >
            <Nav variant="pills" className="mb-4 application-pills">
              <Nav.Item className="application-item">
                <Nav.Link
                  className="application-link"
                  eventKey="personal_details"
                >
                  Personal Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="application-item">
                <Nav.Link
                  className="application-link"
                  eventKey="company_details"
                >
                  Company Details
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="personal_details">
              <AllRoleEditProfile role="client" name ={"indivisual"} />
              </Tab.Pane>

              <Tab.Pane eventKey="company_details">
              <AllRoleEditProfile role="client" name = {"company"} />
              </Tab.Pane>
           
            </Tab.Content> 
          </Tab.Container>
        </section> */}
         <AllRoleEditProfile role="client" name={clientProfileData?.company_type && clientProfileData?.company_type} onSubmit={onSubmit} activeStep={activeStep} previewImage={previewImage} imageFile={imageFile} setImageFile={setImageFile} setPreviewImage={setPreviewImage} stepData={clientProfileData}/>
      </ProfileWrapper>
    </>
  );
};

export default EditProfile;
