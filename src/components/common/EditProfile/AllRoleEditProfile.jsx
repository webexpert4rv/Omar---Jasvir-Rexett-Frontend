import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  Container,
} from "react-bootstrap";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  filePreassignedUrlGenerate,
  getCitiesList,
  getCoutriesList,
  getEnableDisableAccount,
  getStatesList,
  getTimeZoneForCountry,
  updateClientProfile,
} from "../../../redux/slices/clientDataSlice";
import {
  getProfileDetails,
  updateDeveloperProfile,
  updateProfileDetails,
} from "../../../redux/slices/developerDataSlice";
import ScreenLoader from "../../atomic/ScreenLoader";
import RexettButton from "../../atomic/RexettButton";
import ConfirmationModal from "../Modals/ConfirmationModal";
import CommonInput from "../../atomic/CommonInput";
import CommonAutocomplete from "../../atomic/CommonAutoComplete";
import { getCurrentRoleEndPoint, updateCurrentRoleEndPoint } from "./helper";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import CommonReactSelect from "../../atomic/CommonReactSelect";
import { getConfigDetails, getUploadFile, updateAdminProfile } from "../../../redux/slices/adminDataSlice";
import { getActiveStepFields, getClientEditFields, MODAL_INFORMATION, SIDEBAR_ITEMS } from "../../../pages/Registration flows/registrationConstant";
import SidebarSection from "../../../pages/Registration flows/SidebarSection";
import SetUpJobModal from "../Modals/SetUpJobModal";
import ClientStep1 from "../../../pages/Registration flows/Client Registration flow/ClientStep1";
import RegistrationType from "../../../pages/Registration flows/Client Registration flow/RegistrationType";

const AllRoleEditProfile = ({ role, name, onSubmit, activeStep, previewImage, imageFile, setImageFile, setPreviewImage, stepData, activeStepFields }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [twoFactorStatus, setTwoFactorStatus] = useState(false);
  const editStepFields = getClientEditFields();
  const ComponentActiveStepFields = getActiveStepFields(activeStep, name);
  const {
    register,
    setValue,
    watch,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const { smallLoader, userProfileDetails, screenLoader } = useSelector(
    (state) => state.developerData
  );
  useEffect(() => {
    if (stepData) {
      let name = stepData?.name ? stepData?.name?.split(' ') : '';
      let [firstName, ...rest] = name;
      let lastName = rest.join(' ');
      setValue('first_name', firstName);
      setValue('last_name', lastName);
      Object.entries(stepData).forEach(([key, value]) => {
        if (key == "country_iso_code") {
          const newValue = {
            label: stepData["country"],
            value: stepData[key],
          };
          setValue("country_code", newValue);
        }
        else if (key === "state_iso_code") {
          const newValue = {
            label: stepData["state"],
            value: stepData[key],
          };
          setValue(key, newValue);
        } else if (key === "time_zone") {
          const newValue = { label: stepData[key], value: stepData["time_zone"] };
          setValue(key, newValue);
        } else if (key === "professional_title") {
          const newValue = stepData[key]
          setValue("profession", newValue)
        }else {
          setValue(key, (value === null || value === undefined ? '' : value));
        }
      });
      setPreviewImage({
        ...previewImage,
        profile_picture: stepData?.profile_picture
      });
    }
  }, [stepData])

  const toggleConfirmationModal = (e) => {
    const { checked } = e?.target;
    setShowConfirmationModal(!showConfirmationModal);
    setTwoFactorStatus(checked);
  };
  const closeConfirmationModal = () => setShowConfirmationModal(false);
  const handleTwoFaAction = () => {
    setValue("is_2FA_enabled", twoFactorStatus);
    closeConfirmationModal();
  };
 
  const renderActiveStep = () => {
    return (
      <ClientStep1
        control={control}
        errors={errors}
        activeStep={activeStep}
        type={role}
        register={register}
        stepFields={role == "client" ? editStepFields : activeStepFields  ?  activeStepFields : ComponentActiveStepFields}
        setError={setError}
        clearErrors={clearErrors}
        watch={watch}
        setValue={setValue}
        previewImage={previewImage}
        imageFile={imageFile}
        setPreviewImage={setPreviewImage}
        setImageFile={setImageFile}
        isProfileSectionRequired={activeStep === 1}
        isEditMode={true}
        flowName={"edit_profile"}
      />)
  }
  return (
    <>
      <section className="resume-section-wrapper">
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
                            isDisabled={true}
                            
                          />
                        )}
                      />
                    </div>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="resume-main-wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
              {renderActiveStep()}
              <div className="d-flex justify-content-between align-items-center ">
                <div>
                  <RexettButton
                    type="submit"
                    text={"Update"}
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
          role={"client-edit-profile"}
          text={`Are you sure, you want to ${twoFactorStatus ? "enable" : "disable"
            } two factor authentication`}
        />
      )}
    </>
  )
}
export default AllRoleEditProfile
