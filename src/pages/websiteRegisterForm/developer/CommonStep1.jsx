import React, { useState } from "react";
import CommonInput from "../../../components/atomic/CommonInput";
import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import CommonAutocomplete from "../../../components/atomic/CommonAutoComplete";
import { validatePassword } from "../../../components/utils";
import PasswordSection from "./PasswordSection";
import LocationSection from "./LocationSection";
// this step is for first and second step
const CommonStep1 = ({
  control,
  errors,
  name,
  setValue,
  watch,
  fields,
  headingData,
  countries
}) => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;

  const [isPassword, setPassword] = useState({
    firstPass: false,
    secondPass: false,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <section className="card-box">
        <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
          <h2>{headingData.h1}</h2>
          <p>{headingData.para}</p>
        </div>
        <div>
          <Row className="mb-4">
            <Col md="6">
              <div className="inner-form">
                <div>
                  {fields.map(
                    ({
                      fieldName,
                      type,
                      label,
                      rules,
                      isRequired,
                      isPassword,
                      isAutocomplete,
                      options,
                      isLocation,
                      defaultOption,
                    }) => (
                      <>
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
                        {isPassword && (
                          <PasswordSection control={control} errors={errors} />
                        )}
                        {isLocation && (
                          <LocationSection
                            watch={watch}
                            setValue={setValue}
                            countries={countries}
                            control={control}
                            errors={errors}
                          />
                        )}

                        {(!isAutocomplete && !isPassword && !isLocation) && (
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
                      </>
                    )
                  )}
              </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default CommonStep1;
