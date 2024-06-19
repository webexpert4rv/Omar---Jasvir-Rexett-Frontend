import React, { useState } from "react";
import CommonInput from "../../../components/atomic/CommonInput";
import { validatePassword } from "../../../components/utils";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordSection = ({control,errors}) => {
    const {t} = useTranslation()
  const [isPassword, setPassword] = useState({
    firstPass: false,
    secondPass: false,
  });
  return (
    <>
      <CommonInput
        label={t("Password")}
        name="password"
        control={control}
        type={isPassword.firstPass ? "text" : "password"}
        rules={{ required:"Password is required",validate: validatePassword }}
        error={errors?.password}
        isPassword
        onTogglePassword={() =>
          setPassword({
            ...isPassword,
            firstPass: !isPassword.firstPass,
          })
        }
        icon={isPassword.firstPass ? <FaEyeSlash /> : <FaEye />}
      />
      <CommonInput
        label={t("Confirm Password")}
        name="confirm_password"
        control={control}
        type={isPassword.secondPass ? "text" : "password"}
        rules={{required:"Confirm password  is required", validate: validatePassword }}
        error={errors?.confirm_password}
        isPassword
        onTogglePassword={() =>
          setPassword({
            ...isPassword,
            secondPass: !isPassword.secondPass,
          })
        }
        icon={isPassword.secondPass ? <FaEyeSlash /> : <FaEye />}
      />
    </>
  );
};

export default PasswordSection;
