import React, { useState } from 'react'
import CommonInput from '../../../components/atomic/CommonInput';
import CommonAutocomplete from '../../../components/atomic/CommonAutoComplete';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';

const Step3 = () => {
  const { t } = useTranslation();
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const dispatch = useDispatch();
  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;

  const [isPassword, setPassword] = useState({
    firstPass: false,
    secondPass: false,
  });

  return (
    <Row className="mb-4">
                <Col md="6">
                  <div className="inner-form">
                    <div>
                      <CommonInput
                        // label={t("As Individual")}
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        error={errors.name}
                        type="radio"
                        options={[
                          { label: "As Individual", value: "as_individual" },
                        ]}
                      />
                      <CommonInput
                        // label={t("As Company")}
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        error={errors.name}
                        type="radio"
                        options={[{ label: "As Company", value: "as_company" }]}
                      />
                    </div>

                    <CommonInput
                      label={t("Name") + " *"}
                      name="name"
                      control={control}
                      rules={{ required: "Name is required" }}
                      error={errors.name}
                    />
                    <CommonInput
                      label={t("email") + " *"}
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      }}
                      error={errors.email}
                      readOnly
                    />
                    <CommonInput
                      label={t("Password")}
                      name="password"
                      control={control}
                      type={isPassword.firstPass ? "text" : "password"}
                      rules={{ validate: {} }}
                      error={errors.previous_password}
                      isPassword
                      onTogglePassword={() =>
                        setPassword({
                          ...isPassword,
                          firstPass: !isPassword.firstPass,
                        })
                      }
                      icon={<FaEye />}
                    />
                    <CommonInput
                      label={t("Confirm Password")}
                      name="confirm_password"
                      control={control}
                      type={isPassword.secondPass ? "text" : "password"}
                      rules={{ validate: {} }}
                      error={errors.password}
                      isPassword
                      onTogglePassword={() =>
                        setPassword({
                          ...isPassword,
                          secondPass: !isPassword.secondPass,
                        })
                      }
                      icon={<FaEye />}
                    />
                    <CommonAutocomplete
                      label={t("address") + " *"}
                      name="address"
                      control={control}
                      rules={{ required: "Address is required" }}
                      error={errors.address}
                      apiKey={GOOGLE_MAP_API_KEY}
                      onPlaceSelected={(place) => {
                        setValue("address", place.formatted_address);
                      }}
                      onChange={(e) => {
                        setValue("address", e.target.value);
                      }}
                      options={{ types: ["establishment", "geocode"] }}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div>
                    <CommonInput
                      label={t("phone") + "*"}
                      name="phone_number"
                      control={control}
                      type="phone"
                      rules={{
                        required: "Phone Number is required",
                        pattern: {
                          value: /^\+?[0-9]{10,14}$/,
                          message: "Please enter a valid phone number",
                        },
                      }}
                      error={errors.phone_number}
                    />
                    <CommonInput
                      label={t("city") + "*"}
                      name="city"
                      control={control}
                      rules={{
                        required: "City is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message:
                            "City should not contain numbers or special characters",
                        },
                      }}
                      error={errors.city}
                    />
                    <CommonInput
                      label={t("postCode") + "*"}
                      name="passcode"
                      control={control}
                      rules={{
                        required: "Postcode is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Postcode should only contain numbers",
                        },
                      }}
                      error={errors.passcode}
                    />

                    <CommonInput
                      label={t("country") + "*"}
                      name="country"
                      type="select"
                      control={control}
                      rules={{
                        required: "Country is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message:
                            "Country should not contain numbers or special characters",
                        },
                      }}
                      selectOptions={[]}
                      error={errors.country}
                    />

                    <CommonInput
                      label={t("state") + "*"}
                      name="state"
                      type="select"
                      control={control}
                      rules={{
                        required: "State is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message:
                            "Country should not contain numbers or special characters",
                        },
                      }}
                      error={errors.country}
                      selectOptions={[]}
                    />
                    <CommonInput
                      label={t("City") + "*"}
                      name="city"
                      type="select"
                      control={control}
                      rules={{
                        required: "City is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message:
                            "Country should not contain numbers or special characters",
                        },
                      }}
                      selectOptions={[]}
                      error={errors.country}
                    />

                  
                  </div>
                </Col>
              </Row>
  )
}

export default Step3