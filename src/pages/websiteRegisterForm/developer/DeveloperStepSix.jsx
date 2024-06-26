import React, { useTransition } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CommonInput from "../../../components/atomic/CommonInput";
import { useTranslation } from "react-i18next";
import {
  ALLOWED_EXTENSIONS,
  IMAGE_ALLOWED_EXTENSIONS,
  STEP_SIX_SELECT_OPTIONS,
  returnUrl,
} from "./developeStepConstant";
import { HiUpload } from "react-icons/hi";
import { Controller } from "react-hook-form";
import { uploadFileToS3Bucket } from "../../../redux/slices/developerDataSlice";
import LinkSection from "./LinkSection";
import { useDispatch } from "react-redux";
import { IoIosCamera } from "react-icons/io";

const DeveloperStepSix = ({
  control,
  errors,
  register,
  setValue,
  setError,
  clearErrors,
  watch,
  stepSixInfo,
  regster,
  setStepSixInfo,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleFileChange = async (event, field) => {
    const file = event.target.files[0];
    if (file) {
      if (ALLOWED_EXTENSIONS.includes(file.type)) {
        const payload = { file: file };
        await dispatch(
          uploadFileToS3Bucket(payload, (fileUrl) => {
            setStepSixInfo({
              ...stepSixInfo,
              resumeUrl: fileUrl,
              fileName: file.name,
            });
            setValue("resume", file, { shouldValidate: true });
          })
        );
        clearErrors("resume");
      } else {
        setError("resume", {
          type: "manual",
          message: "Please enter a valid file i.e pdf || doc || docx",
        });
        setValue("resume", null);
        setStepSixInfo({
          resumeUrl: null,
          fileName: null,
        });
      }
    }
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (IMAGE_ALLOWED_EXTENSIONS.includes(file.type)) {
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //   setValue("profile_picture", file);
        //   setStepSixInfo({
        //     ...stepSixInfo,
        //     previewImage: e.target.result,
        //     imageName: file.name,
        //   });
        // };
        // reader.readAsDataURL(file);
        const payload = { file: file };
        await dispatch(
          uploadFileToS3Bucket(payload, (imageUrl) => {
            setStepSixInfo({
              ...stepSixInfo,
              previewImage: imageUrl,
              imageName: file.name,
            });
            setValue("profile_picture", file, { shouldValidate: true });
          })
        );
        clearErrors("profile_picture");
      } else {
        setValue("profile_picture", null);
        setError("profile_picture", {
          type: "manual",
          message: "Please enter a valid image i.e png || jpeg || jpg || svg",
        });
        setStepSixInfo({
          ...stepSixInfo,
          previewImage: null,
          imageName: null,
        });
      }
    }
  };

  return (
    <section className="card-box">
      <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
        <h2>Upload your Image</h2>
        <p>Your Image can be updated at a latertime</p>
      </div>
      <div>
        <Row className="mb-4">
          <Col md="6">
            <div className="inner-form">
              <div className="input fields">
                {/* <Form.Label>Image*</Form.Label> */}
                <Form.Group className="mb-4">
                  <Form.Control
                    {...register("profile_picture", {
                      onChange: (e) => handleImageChange(e),
                    })}
                    type="file"
                    id="profile_picture_file"
                    placeholder="Company Name"
                    className="common-field d-none"
                  />
                  <div className="file_shown">
                    <img
                      src={
                        stepSixInfo?.previewImage
                          ? stepSixInfo?.previewImage
                          : "/demo-user.png"
                      }
                      alt="Profile Picture"
                    />
                    <Form.Label
                      htmlFor="profile_picture_file"
                      className="camera-btn mb-0"
                    >
                      <IoIosCamera />
                    </Form.Label>
                  </div>
                  {errors?.profile_picture && (
                    <p className="error-message">
                      {errors.profile_picture?.message}
                    </p>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Upload Your CV</Form.Label>
                  <Form.Label
                    htmlFor="developer-resume"
                    className="upload-image-label d-block"
                  >
                    <HiUpload />
                    {t("uploadFileStep6")}
                  </Form.Label>
                  <Form.Control
                    {...register("resume", {
                      onChange: (e) => handleFileChange(e),
                    })}
                    type="file"
                    id="developer-resume"
                    placeholder="Company Name"
                    className="common-field d-none"
                  />
                  {errors?.resume && (
                    <p className="error-message">{errors?.resume?.message}</p>
                  )}
                  <div className="fileName">
                    {stepSixInfo?.fileName && stepSixInfo?.fileName}
                  </div>
                </Form.Group>
                <CommonInput
                  label={t("bio") + " *"}
                  name="bio"
                  type="textarea"
                  rows={3}
                  control={control}
                  rules={{ required: "Bio is Required" }}
                  error={errors?.["bio"]}
                />{" "}
                <CommonInput
                  label={t("hearAboutRexett") + " *"}
                  name="how_did_you_hear_about_rexett"
                  type={"normal-select"}
                  control={control}
                  options={STEP_SIX_SELECT_OPTIONS}
                  rules={{ required: "This field is Required" }}
                  error={errors?.["how_did_you_hear_about_rexett"]}
                  defaultOption="Select"
                />{" "}
                <LinkSection
                  control={control}
                  errors={errors}
                  watch={watch}
                  register={register}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default DeveloperStepSix;
