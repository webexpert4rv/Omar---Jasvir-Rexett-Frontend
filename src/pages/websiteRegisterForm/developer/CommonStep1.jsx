import React, { Fragment, useEffect, useState } from "react";
import CommonInput from "../../../components/atomic/CommonInput";
import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CommonAutocomplete from "../../../components/atomic/CommonAutoComplete";
import PasswordSection from "./PasswordSection";
import LocationSection from "./LocationSection";
import { createOptionsForReactSelect } from "./developeStepConstant";
import PhoneInput from "react-phone-number-input";

// this step is for first and second step
const CommonStep1 = ({
  control,
  errors,
  register,
  name,
  setValue,
  watch,
  setError,
  fields,
  clearErrors,
  headingData,
  countries,
  skillOptions,
  languageOptions,
}) => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;
  const [skillOptionsForSelect, setSkillOptionsForSelect] = useState([]);
  const [languageOptionsForSelect, setLanguageOptionsForSelect] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (skillOptions?.length) {
      const formattedSkillOptions = createOptionsForReactSelect(
        skillOptions,
        "id",
        "title"
      );
      setSkillOptionsForSelect(formattedSkillOptions);
    }
    if (languageOptions?.length) {
      const formattedLanguageOptions = createOptionsForReactSelect(
        languageOptions,
        "id",
        "name"
      );
      setLanguageOptionsForSelect(formattedLanguageOptions);
    }
  }, [skillOptions, languageOptions]);
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
                    (
                      {
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
                      },
                      index
                    ) => (
                      <Fragment key={index}>
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
                          <PasswordSection
                            control={control}
                            errors={errors}
                            setError={setError}
                            watch={watch}
                            clearErrors={clearErrors}
                          />
                        )}
                        {isLocation && (
                          <LocationSection
                            watch={watch}
                            clearErrors={clearErrors}
                            setValue={setValue}
                            countries={countries}
                            control={control}
                            errors={errors}
                          />
                        )}

                        {!isAutocomplete && !isPassword && !isLocation && (
                          <CommonInput
                            label={t(`${label}`) + `${isRequired && " *"}`}
                            name={fieldName}
                            type={type}
                            control={control}
                            rules={{ ...rules }}
                            error={errors?.[fieldName]}
                            // if we have skill or language options then use that because they are fetched from API
                            // otherwise use options given in the field
                            options={options}
                            defaultOption={defaultOption}
                            selectOptions={
                              fieldName === "skill"
                                ? skillOptionsForSelect
                                : fieldName === "language" &&
                                  languageOptionsForSelect
                            }
                          />
                        )}
                      </Fragment>
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
