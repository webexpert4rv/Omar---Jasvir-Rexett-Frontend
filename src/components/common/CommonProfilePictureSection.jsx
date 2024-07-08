import React from "react";
import { Form } from "react-bootstrap";
import { IoIosCamera } from "react-icons/io";
import { IMAGE_ALLOWED_EXTENSIONS } from "../../pages/websiteRegisterForm/developer/developeStepConstant";
import { IoCameraOutline } from "react-icons/io5";

const CommonProfilePictureSection = ({
  register,
  fieldName,
  previewImage,
  setPreviewImage,
  imageFile,
  setImageFile,
  setValue,
  clearErrors,
  errors,
  setError,
}) => {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (IMAGE_ALLOWED_EXTENSIONS.includes(file.type)) {
        const url = URL.createObjectURL(file);
        setPreviewImage(url);
        setImageFile(file);
        clearErrors(fieldName);
      } else {
        setValue(fieldName, null);
        setError(fieldName, {
          type: "manual",
          message: "Please enter a valid image i.e png || jpeg || jpg || svg",
        });
        setPreviewImage(null);
      }
    }
  };
  return (
    <>
      <div className="profile-upload-preview position-relative">
        <div className="profile-img-preview w-100 h-100">
          <img src={previewImage ? previewImage : "/demo-user.png"} />
        </div>
        <Form.Group>
          <Form.Control
            {...register(fieldName, {
              onChange: (e) => handleImageChange(e),
            })}
            type="file"
            id="logo_file"
            placeholder="Company Name"
            className="common-field d-none"
          />
          <Form.Label htmlFor="logo_file" className="profile-img-label">
            <IoCameraOutline />
          </Form.Label>
          {errors[fieldName] && (
            <p className="field-error">{errors[fieldName]?.message}</p>
          )}
        </Form.Group>
      </div>
      {/* <Form.Group className="mb-4">
        <Form.Control
          {...register(fieldName, {
            onChange: (e) => handleImageChange(e),
          })}
          type="file"
          id="logo_file"
          placeholder="Company Name"
          className="common-field d-none"
        />
        <div className="file_shown">
          <img src={previewImage ? previewImage : "/demo-user.png"} />
          <Form.Label htmlFor="logo_file" className="camera-btn mb-0">
            <IoIosCamera />
          </Form.Label>
        </div>
        {errors?.fieldName && (
          <p className="error-message">{errors.fieldName?.message}</p>
        )}
      </Form.Group> */}
    </>
  );
};

export default CommonProfilePictureSection;
