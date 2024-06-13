import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { IoIosCamera } from "react-icons/io";
import Autocomplete from "react-google-autocomplete";
import RexettButton from "../../atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  filePreassignedUrlGenerate,
  getClientProfile,
  updateClientProfile,
} from "../../../redux/slices/clientDataSlice";
import { useTranslation } from "react-i18next";
import companyLogo from "../../../assets/img/amazon.png";
import CommonAutocomplete from "../../atomic/CommonAutoComplete";

const CompanyProfile = () => {
  const userId = localStorage.getItem("userId");
  const [logo, setLogo] = useState(null);
  const {
    register,
    control,
    setValue,
    watch,
    trigger,
    handleSubmit,

    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});

  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { smallLoader, clientProfileDetails, screenLoader, approvedLoader } =
    useSelector((state) => state.clientData);

  useEffect(() => {
    dispatch(getClientProfile());
  }, [dispatch]);

  useEffect(() => {
    setValue("company_address", clientProfileDetails?.data?.company_address);
    setValue("company_name", clientProfileDetails?.data?.company_name);
    setValue("company_tax_id", clientProfileDetails?.data?.company_tax_id);
    setValue("company_type", clientProfileDetails?.data?.company_type);
    if (clientProfileDetails?.data?.company_logo) {
      setLogo(clientProfileDetails?.data?.company_logo);
    }
  }, [clientProfileDetails]);

  // const onSubmit = (values) => {
  //   localStorage.setItem("newUserName", values?.name);
  //   console.log(values, "values o");
  //   let formData = {
  //     ...values,
  //     password: values?.password ? values.password : null,
  //     previous_password: values?.previous_password
  //       ? values.previous_password
  //       : null,
  //     client_type: "individual",
  //   };
  //   dispatch(updateClientProfile(formData), () => {
  //     dispatch(getClientProfile());
  //   });
  // };
  // const handleJobStatusModal = () => {
  //   setStatus(!status);
  //   setShowModal(false);
  // };

  // const validatePassword = (value) => {
  //   if (value === "") {
  //     return true;
  //   } else {
  //     const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  //     if (!pattern.test(value)) {
  //       return "Password must contain at least a symbol, upper and lower case letters and a number";
  //     }
  //   }
  //   return true;
  // };
  const onSubmit = (values) => {
    console.log(values, "companyDetailsSubmit");
    const clientProfileDetails = watch();
    const payload = {
      ...values,
      // ...clientProfileDetails,
      password: clientProfileDetails.password
        ? clientProfileDetails.password
        : null,
      previous_password: clientProfileDetails.previous_password
        ? clientProfileDetails.previous_password
        : null,
      client_type: "company",
    };
    if (values?.company_logo.name !== undefined) {
      let fileData = new FormData();
      fileData.append("file", values?.company_logo);
      dispatch(
        filePreassignedUrlGenerate(fileData, (url) => {
          let data = {
            ...payload,
            company_logo: url,
            user_id: userId,
          };
          dispatch(updateClientProfile(data));
        })
      );
    } else {
      let data = {
        ...payload,
        company_logo: logo,
        user_id: userId,
      };
      dispatch(updateClientProfile(data));
    }
  };
  const handleCompanyLogo = (e) => {
    const file = e?.target?.files?.[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/svg"];
    if (file) {
      if (allowedTypes.includes(file.type)) {
        const fileUrl = URL.createObjectURL(file);
        setValue("company_logo", file);
        setLogo(fileUrl);
      } else {
        // clearErrors("company_logo", {
        //   type: "manual",
        //   message:
        //     "Please select a valid image file i.e (.png,.jpg,.svg or jpeg)",
        // });
        setLogo(null);
        setValue("company_logo", null);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-4">
              <Form.Label className="common-label">Company Logo</Form.Label>
              <Form.Control
                {...register("company_logo", {
                  onChange: (e) => handleCompanyLogo(e),
                })}
                type="file"
                id="company_logo_file"
                placeholder="Company Name"
                className="common-field d-none"
              />
              <div className="file_shown">
                <img src={logo ? logo : companyLogo} alt="Company Logo" />
                <Form.Label
                  htmlFor="company_logo_file"
                  className="camera-btn mb-0"
                >
                  <IoIosCamera />
                </Form.Label>
              </div>
              {errors?.company_logo && (
                <p className="error-message">{errors.company_logo?.message}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="common-label">Company Name*</Form.Label>
              <Form.Control
                {...register("company_name", {
                  required: "Company name is required",
                })}
                type="text"
                placeholder="Company Name"
                className="common-field"
              />
              {errors?.company_name && (
                <p className="error-message">{errors.company_name?.message}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="common-label">Type of Company*</Form.Label>
              <Form.Select
                {...register("company_type", {
                  required: "Company type is required",
                })}
                className="common-field"
              >
                <option disabled selected value="">
                  Please select company type
                </option>
                <option value="sole_partnership">Sole Partnership</option>
                <option value="partnership">Partnership</option>
                <option value="limited_liability_company(LLC)">
                  Limited Liability Company(LLC)
                </option>
                <option value="corporation">Corporation</option>
                <option value="nonprofit_organization">
                  Nonprofit Organization
                </option>
                <option value="cooperative">Cooperative</option>
                <option value="franchise">Franchise</option>
                <option value="joint_venture">Joint Venture</option>
              </Form.Select>
              {errors?.company_type && (
                <p className="error-message">{errors.company_type?.message}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <CommonAutocomplete
                label={t("Company Address") + " *"}
                name="address"
                control={control}
                rules={{ required: "Company Address is required" }}
                error={errors.company_address}
                apiKey={GOOGLE_MAP_API_KEY}
                onPlaceSelected={(place) => {
                  setValue("company_address", place.formatted_address);
                }}
                onChange={(e) => {
                  setValue("company_address", e.target.value);
                }}
                options={{ types: ["establishment", "geocode"] }}
              />
              {errors?.company_address && (
                <p className="error-message">
                  {errors.company_address?.message}
                </p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="common-label">Tax ID*</Form.Label>
              <Form.Control
                {...register("company_tax_id", {
                  required: "Company tax id is required",
                })}
                name="company_tax_id"
                type="text"
                placeholder="Tax Id"
                className="common-field"
              />
              {errors?.company_tax_id && (
                <p className="error-message">
                  {errors.company_tax_id?.message}
                </p>
              )}
            </Form.Group>
          </Col>
          <Col md={12}>
            <div className="text-center">
              <RexettButton
                type="submit"
                text={t("updateProfile")}
                className="main-btn px-5 mt-4"
                variant="transparent"
                disabled={smallLoader}
                isLoading={smallLoader}
              />
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default CompanyProfile;
