import React, { Fragment } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { IMAGE_ALLOWED_EXTENSIONS } from "../developer/developeStepConstant";
import { IoIosCamera } from "react-icons/io";
import CommonInput from "../../../components/atomic/CommonInput";
import { useTranslation } from "react-i18next";
import PasswordSection from "../developer/PasswordSection";
import LocationSection from "../developer/LocationSection";
import CommonAutocomplete from "../../../components/atomic/CommonAutoComplete";
import { uploadFileToS3Bucket } from "../../../redux/slices/vendorDataSlice";
import { useDispatch } from "react-redux";

const VendorStep1 = ({
  register,
  activeStepFields,
  control,
  errors,
  watch,
  logoImage,
  setLogoImage,
  clearErrors,
  setValue,
  setError,
}) => {
  const dispatch = useDispatch();
  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;
  const { t } = useTranslation();
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (IMAGE_ALLOWED_EXTENSIONS.includes(file.type)) {
        const url = URL.createObjectURL(file);
        // setLogoImage(url);
        const payload = { file: file };
        await dispatch(
          uploadFileToS3Bucket(payload, (url) => {
            setLogoImage(url);
          })
        );
        // const reader = new FileReader();
        // reader.onload=((e)=>{
        //   setLogoImage(e.target.result);
        // })
        // reader.readAsDataURL(file);
        clearErrors("logo");
      } else {
        setValue("logo", null);
        setError("logo", {
          type: "manual",
          message: "Please enter a valid image i.e png || jpeg || jpg || svg",
        });
        setLogoImage(null);
      }
    }
  };
  console.log(logoImage, "logoImage");
  return (
    <section className="card-box">
      <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
        <h2>Join Rexett as Partner</h2>
        <p>
          Rexett invites you to join our platform as a software development
          vendor and be part of our dynamic community of IT professionals
        </p>
      </div>
      <Row className="mb-4">
        <Col md="6">
          <div className="inner-form">
            <div className="input fields">
              <Form.Group className="mb-4">
                <Form.Control
                  {...register("logo", {
                    onChange: (e) => handleImageChange(e),
                  })}
                  type="file"
                  id="logo_file"
                  placeholder="Company Name"
                  className="common-field d-none"
                />
                <div className="file_shown">
                  <img src={logoImage ? logoImage : "/demo-user.png"} />
                  <Form.Label htmlFor="logo_file" className="camera-btn mb-0">
                    <IoIosCamera />
                  </Form.Label>
                </div>
                {errors?.logo && (
                  <p className="error-message">{errors.logo?.message}</p>
                )}
              </Form.Group>
              {activeStepFields?.map(
                (
                  {
                    label,
                    type,
                    options,
                    rules,
                    isRequired,
                    defaultOption,
                    isCountry,
                    fieldName,
                    isPassword,
                    isAutocomplete,
                  },
                  index
                ) => (
                  <Fragment key={index}>
                    {isPassword && (
                      <PasswordSection
                        control={control}
                        errors={errors}
                        setError={setError}
                        clearErrors={clearErrors}
                        watch={watch}
                      />
                    )}
                    {isCountry && (
                      <LocationSection
                        control={control}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                        setError={setError}
                        clearErrors={clearErrors}
                      />
                    )}
                    {isAutocomplete && (
                      <CommonAutocomplete
                        label={t(`${label}`) + `${isRequired && " *"}`}
                        name={fieldName}
                        control={control}
                        rules={{ ...rules }}
                        error={errors?.[fieldName]}
                        apiKey={GOOGLE_MAP_API_KEY}
                        onPlaceSelected={(place) => {
                          setValue(fieldName, place.formatted_address);
                        }}
                        onChange={(e) => {
                          setValue(fieldName, e.target.value);
                        }}
                        options={{ types: ["establishment", "geocode"] }}
                      />
                    )}
                    {!isCountry && !isPassword && !isAutocomplete && (
                      <CommonInput
                        label={t(`${label}`) + `${isRequired && " *"}`}
                        name={fieldName}
                        type={type}
                        control={control}
                        rules={{ ...rules }}
                        error={errors?.[fieldName]}
                        options={options}
                        defaultOption={defaultOption}
                      />
                    )}
                  </Fragment>
                )
              )}
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default VendorStep1;
