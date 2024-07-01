import React, { useState } from "react";
import { t } from "i18next";
import { Col, Form, OverlayTrigger, Tooltip, Row } from "react-bootstrap";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { BsQuestionCircleFill } from "react-icons/bs";
import companyLogo from "../../../assets/img/aviox-logo.png";
import { Controller } from "react-hook-form";
import { JOB_TYPES_OPTIONS, WORKPLACE_TYPES_OPTIONS } from "./constant";
import { GOOGLE_AUTOCOMPLETE_API_KEY } from "../../clients/TimeReporiting/constant";
import LocationSection from "../../../pages/websiteRegisterForm/developer/LocationSection";

const JobPostStep1 = ({ register, errors, control, setValue, watch ,setError,clearErrors}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };
  const handleOnBlur = () => {
    // this does not work
    // setValue("job_location", null);
    // this works
    if (!watch("job_location")?.length) {
      setValue("job_location", "");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!watch("job_location")?.length) {
        setValue("job_location", "");
      }
    }
  };
  const jobTitleTooltip = (
    <Tooltip id="tooltip">
      Make your job, more discoverable to job seekers by entering your job
      title.
    </Tooltip>
  );
  const jobLocationTooltip = (
    <Tooltip id="tooltip">
      Picking a specific city or metro area can make your on-site job more
      discoverable by job seekers in those area.
    </Tooltip>
  );
  return (
    <div>
      <section className="job-post-section">
        <Row>
          <Col md="12" className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label className="d-flex gap-2 align-items-center">
                {t("jobTitle")}
                <OverlayTrigger placement="bottom" overlay={jobTitleTooltip}>
                  <span>
                    <BsQuestionCircleFill />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                className="common-field font-14 p-2"
                placeholder="Enter Job Name"
                {...register("title", {
                  required: "Job title is required",
                })}
              />
              {errors?.title && (
                <p className="error-message">{errors.title?.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex gap-2 align-items-center">
                {t("companyName")}
              </Form.Label>
              <p className="common-field font-14 d-flex align-items-center gap-2">
                {/* <img src={companyLogo} className="company-imgbx" /> */}
                <Form.Control
                  type="text"
                  {...register("company_name", {
                    required: "Company name is required",
                  })}
                  className="common-field font-14 p-2"
                  placeholder="Enter company name"
                />
              </p>
              {errors?.company_name && (
                <p className="error-message">{errors.company_name?.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("workplaceType")}</Form.Label>
              <Form.Select
                className="common-field font-14 p-2"
                {...register("job_type", {
                  required: "Workplace type is required",
                })}
              >
                <option value="" disabled selected>
                  Please select workplace options
                </option>
                {WORKPLACE_TYPES_OPTIONS?.map(({ value, label }, idx) => (
                  <option key={idx} value={value}>
                    {label}
                  </option>
                ))}
              </Form.Select>
              {errors?.job_type && (
                <p className="error-message">{errors.job_type?.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex gap-2 align-items-center">
                {t("jobLocation")}
                <OverlayTrigger placement="bottom" overlay={jobLocationTooltip}>
                  <span>
                    <BsQuestionCircleFill />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              {/* <Controller
                name="jobLocation"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    apiKey = {MAP_API_KEY}
                    className ="common-field font-14"
                    onPlaceSelected={(place) => {
                      // handlePlaceSelect(place);
                      field.onChange(place?.formatted_address);
                    }}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                      // if (event.target.value === "") {
                      //   setLocation(null);
                      // }
                    }}
                    // onBlur={handleOnBlur}
                    // types={["(regions)"]}
                    placeholder={"Select job location"}
                    onKeyDown={(e) => {
                      // handleKeyPress(e);
                    }}
                    // componentRestrictions={{ country: "us" }} // Restrict results to a specific country if needed
                  />
                )}
              /> */}

              <Controller
                name="job_location"
                className="common-field font-14 p-2"
                rules={{
                  required: "Job location is required",
                }}
                control={control}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    {...field}
                    errors={fieldState?.errors}
                    apiKey={GOOGLE_AUTOCOMPLETE_API_KEY}
                    debounce={1000}
                    className="common-field font-14 w-100 p-2"
                    options={{
                      types: ["establishment", "geocode"], // Allows searching for places like buildings, landmarks, etc.
                    }}
                    onPlaceSelected={(place) => {
                      field.onChange(place?.formatted_address);
                    }}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                    onBlur={handleOnBlur}
                    onKeyDown={(e) => {
                      handleKeyPress(e);
                    }}
                    onLoadFailed={(error) => {
                      console.error(
                        "Google Places Autocomplete failed to load",
                        error
                      );
                    }}
                  />
                )}
              />
              {/* {errors && <div style={{ color: "red" }}>{errors.message}</div>} */}
              {errors?.job_location && (
                <p className="error-message"> {errors.job_location?.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("jobType")}</Form.Label>
              <Form.Select
                {...register("contract_type", {
                  required: "Job type is required",
                })}
                className="common-field font-14 p-2"
              >
                <option value="" disabled selected>
                  Please select job type
                </option>
                {JOB_TYPES_OPTIONS?.map(({ value, label }) => (
                  <option value={value}>{label}</option>
                ))}
              </Form.Select>
              {errors?.contract_type && (
                <p className="error-message">{errors.contract_type?.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex gap-2 align-items-center">
                {t("jobPositions")}
              </Form.Label>
              <Controller
                name="job_positions"
                control={control}
                rules={{ required: "Number of job position is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="common-field font-14 p-2 w-100"
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      field.onChange(numericValue);
                    }}
                  />
                )}
              />
              {/* <input
                type="number"
                className="common-field font-14 p-2 w-100"
                min={0}
                {...register("job_positions", {
                  required: "Number of job positions is required",
                })}
              /> */}
              {errors?.job_positions && (
                <p className="error-message">{errors.job_positions?.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex gap-2 align-items-center">
                {t("responseDate")}
              </Form.Label>
              <p className="common-field font-14 d-flex align-items-center gap-2">
                <Form.Control
                  type="date"
                  {...register("response_time", {
                    required: "Response time is required",
                  })}
                  min={new Date().toISOString().split("T")[0]}
                  className="common-field font-14 p-2"
                  placeholder="Enter response time"
                />
              </p>
              {errors?.response_time && (
                <p className="error-message">{errors.response_time?.message}</p>
              )}
            </Form.Group>
            <LocationSection
              control={control}
              errors={errors}
              LocationSection={true}
              watch={watch}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />{" "}
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default JobPostStep1;
