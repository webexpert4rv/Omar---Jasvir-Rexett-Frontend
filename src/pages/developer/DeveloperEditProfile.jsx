import React, { useEffect } from "react";
import ClientStep1 from "../Registration flows/Client Registration flow/ClientStep1";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form } from "react-bootstrap";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getDeveloperActiveStepFields, getStepDataFromAPI } from "../Registration flows/registrationConstant";
import ProfileWrapper from "../../components/common/EditProfile/ProfileWrapper";
import { getDeveloperProfileDetails } from "../../redux/slices/developerDataSlice";
import { useDispatch, useSelector } from "react-redux";


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

  const onSubmit = (data) => {

  };

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
  const previewImage = ""; // Assuming previewImage is defined somewhere
  const imageFile = null; // Assuming imageFile is defined somewhere
  const setPreviewImage = () => {}; // Assuming setPreviewImage is defined somewhere
  const setImageFile = () => {}; // Assuming setImageFile is defined somewhere

  console.log(stepData,"stepData")


  useEffect(() => {

    if(true){
    dispatch(getDeveloperProfileDetails(657));
    }
  }, []);

  // useEffect(()=>{
  //   setValue()

  // },[stepData])


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
          </form>
        )}
      </div>
      </ProfileWrapper>
     
    </>
  );
};

export default DeveloperEditProfile;
