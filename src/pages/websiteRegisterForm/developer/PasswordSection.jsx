import React, { useState } from "react";
import CommonInput from "../../../components/atomic/CommonInput";
import { validatePassword } from "../../../components/utils";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";

const PasswordSection = ({ control, errors, setError, clearErrors, watch }) => {
  const { t } = useTranslation();
  const [isPassword, setPassword] = useState({
    firstPass: false,
    secondPass: false,
  });
  const handleChangePassword = (value, type) => {
    const password = watch("password");
    const confirmPassword = watch("confirm_password");
    if (type === "password") {
      if (value === confirmPassword) {
        if (confirmPassword.length) {
          clearErrors("confirm_password");
        }
      } else {
        if (confirmPassword?.length) {
          setError("confirm_password", {
            type: "manual",
            message: "password and confirm password must match",
          });
        }
      }
    }
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="common-label">{t("Password")}</Form.Label>
        <div className="position-relative">
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}    
            render={({ field }) => (
              <Form.Control
                {...field}
                type={isPassword?.firstPass ? "text" : "password"}
                onChange={(e) => {
                  handleChangePassword(e.target.value, "password");
                  field.onChange(e);
                }}
                className={`common-field`}
                // id='developer-image'
              />
            )}
          />
          <span
            className="eye-btn"
            onClick={() => {
              setPassword({
                ...isPassword,
                firstPass: !isPassword?.firstPass,
              });
            }}
            // aria-label={
            //   isPassword?.firstPass ? "Hide password" : "Show password"
            // }
          >
            {isPassword?.firstPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors?.password && (
          <p className="error-message">{errors?.password?.message}</p>
        )}
      </Form.Group>
      {/* <CommonInput
        label={t("Password")}
        name="password"
        control={control}
        type={isPassword.firstPass ? "text" : "password"}
        rules={{ required: "Password is required", validate: validatePassword }}
        error={errors?.password}
        onChange={onChange}
        isPassword
        onTogglePassword={() =>
          setPassword({
            ...isPassword,
            firstPass: !isPassword.firstPass,
          })
        }
        icon={isPassword.firstPass ? <FaEyeSlash /> : <FaEye />}
      /> */}

      <Form.Group className="mb-3">
        <Form.Label className="common-label">
          {t("Confirm Password")}
        </Form.Label>
        <div className="position-relative">
          <Controller
            control={control}
            name="confirm_password"
            rules={{
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Password and confirm password must match",
            }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type={isPassword?.secondPass ? "text" : "password"}
                onChange={(e) => {
                  handleChangePassword(e.target.value, "confirm_password");
                  field.onChange(e);
                }}
                className={`common-field`}
                // id='developer-image'
              />
            )}
          />
          <span
            className="eye-btn"
            onClick={() => {
              setPassword({
                ...isPassword,
                secondPass: !isPassword?.secondPass,
              });
            }}
            aria-label={
              isPassword?.secondPass ? "Hide password" : "Show password"
            }
          >
            {isPassword?.secondPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors?.confirm_password && (
          <p className="error-message">{errors?.confirm_password?.message}</p>
        )}
      </Form.Group>
      {/* <CommonInput
        label={t("Confirm Password")}
        name="confirm_password"
        control={control}
        type={isPassword.secondPass ? "text" : "password"}
        rules={{
          required: "Confirm password  is required",
          validate: validatePassword,
        }}
        error={errors?.confirm_password}
        isPassword
        onTogglePassword={() =>
          setPassword({
            ...isPassword,
            secondPass: !isPassword.secondPass,
          })
        }
        icon={isPassword.secondPass ? <FaEyeSlash /> : <FaEye />}
      /> */}
    </>
  );
};

export default PasswordSection;
