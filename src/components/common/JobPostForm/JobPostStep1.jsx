import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Col, Form, OverlayTrigger, Tooltip, Row } from "react-bootstrap";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { BsQuestionCircleFill } from "react-icons/bs";
import companyLogo from "../../../assets/img/aviox-logo.png";
import { Controller } from "react-hook-form";
import { JOB_TYPES_OPTIONS, WORKPLACE_TYPES_OPTIONS } from "./constant";
import { GOOGLE_AUTOCOMPLETE_API_KEY } from "../../clients/TimeReporiting/constant";
import LocationSection from "../../../pages/websiteRegisterForm/developer/LocationSection";
import CommonReactSelect from "../../atomic/CommonReactSelect";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getTimeZoneList } from "../../../redux/slices/clientDataSlice";
import Select from "react-select";

const JobPostStep1 = ({ register, errors, control, setValue, watch, setError, clearErrors }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [groupedTime, setGroupedTime] = useState([])
  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { countriesList, statesList, citiesList, timeZoneList } = useSelector(
    (state) => state.clientData
  );

  useEffect(() => {
    dispatch(getTimeZoneList());
  }, []);
  useEffect(() => {
    if (timeZoneList.length > 0) {
      let groupedTimeZones = timeZoneList?.map((item) => {
        return {
          label: item?.country_name,
          options: item?.timezones?.map((it) => {
            return { label: it, value: it }
          }),
        }
      })
      setGroupedTime(groupedTimeZones)
    }
  }, [timeZoneList])

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

  const handleLocationSelect = async (place) => {
    setValue("job_location", place?.formatted_address);

    // Extract ZIP code from address components
    const addressComponents = place?.address_components;

    const zipCodeObj = addressComponents?.find(component =>
      component.types.includes("postal_code")
    );

    const countryObj = addressComponents?.find(component =>
      component.types.includes("country")
    );
    const country = countryObj ? countryObj.long_name : null;
    setValue("country_code", country);
    
    const zipCode = zipCodeObj ? zipCodeObj.long_name : null;
    setValue('passcode', zipCode);

    console.log(zipCodeObj, "zipCodeObj");
    console.log(place, "place");

    const { lat, lng } = place.geometry.location;

    // Call Google Timezone API to get the timezone
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${lat()},${lng()}&timestamp=${Math.floor(Date.now() / 1000)}&key=${GOOGLE_AUTOCOMPLETE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const rawOffset = data.rawOffset; // Raw offset from the response (in seconds)
        const dstOffset = data.dstOffset;  // DST offset (in seconds)
        const totalOffset = rawOffset + dstOffset; // Total offset (considering DST)
        
        // Convert total offset from seconds to hours and minutes
        const hours = Math.floor(totalOffset / 3600);
        const minutes = Math.abs((totalOffset % 3600) / 60);
        
        // Determine the UTC offset sign
        const sign = hours >= 0 ? "+" : "-";
        
        // Construct the formatted string
        const utcOffsetString = `UTC ${sign}${Math.abs(hours)}:${minutes === 0 ? '00' : minutes}`;
        
        // Use the timeZoneId from the response
        const timezone = data.timeZoneId;
        const formattedResponse = `${timezone} ${utcOffsetString}`;
        setValue('time_zone', formattedResponse);
      } else {
        console.error("Error fetching timezone data: ", data.status);
      }
    } catch (error) {
      console.error("Error calling Google Timezone API: ", error);
    }
  };


  // const handleDropDownChange = (value, name) => {
  //   dispatch(getTimeZoneList());
  //   // timezone logic
  //   // setValue("timezone", value);
  //   setValue("time_zone", value);
  //   clearErrors("time_zone");
  // };
  console.log(watch("time_zone"), "time zone inside child");

  return (
    <div>
      <section className="job-post-section">
        <Row>
          <Col md="12" className="mb-4">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex font-14 fw-medium gap-2 align-items-center">
                    {t("jobTitle")}
                    <OverlayTrigger placement="bottom" overlay={jobTitleTooltip}>
                      <span>
                        <BsQuestionCircleFill />
                      </span>
                    </OverlayTrigger>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="common-field font-14"
                    placeholder="Enter Job Name"
                    {...register("title", {
                      required: "Job title is required",
                    })}
                  />
                  {errors?.title && (
                    <p className="error-message">{errors.title?.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex font-14 fw-medium gap-2 align-items-center">
                    {t("companyName")}
                  </Form.Label>
                  <p className="d-flex align-items-center gap-2">
                    {/* <img src={companyLogo} className="company-imgbx" /> */}
                    <Form.Control
                      type="text"
                      {...register("company_name", {
                        required: "Company name is required",
                      })}
                      className="common-field font-14"
                      placeholder="Enter company name"
                    />
                  </p>
                  {errors?.company_name && (
                    <p className="error-message">{errors.company_name?.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="font-14 fw-medium">{t("workplaceType")}</Form.Label>
                  <Form.Select
                    className="common-field font-14"
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
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex gap-2 align-items-center font-14 fw-medium">
                    {t("jobLocation")}
                    <OverlayTrigger placement="bottom" overlay={jobLocationTooltip}>
                      <span>
                        <BsQuestionCircleFill />
                      </span>
                    </OverlayTrigger>
                  </Form.Label>
                  <Controller
                    name="job_location"
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
                        className="common-field font-14 w-100"
                        options={{
                          types: ["establishment", "geocode"], // Allows searching for places like buildings, landmarks, etc.
                        }}
                        // onPlaceSelected={(place) => {
                        //   field.onChange(place?.formatted_address);
                        // }}
                        onPlaceSelected={handleLocationSelect}
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
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="font-14 fw-medium">{t("jobType")}</Form.Label>
                  <Form.Select
                    {...register("contract_type", {
                      required: "Job type is required",
                    })}
                    className="common-field font-14"
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
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex gap-2 align-items-center font-14 fw-medium">
                    {t("jobPositions")}
                  </Form.Label>
                  <Controller
                    name="job_positions"
                    control={control}
                    rules={{ required: "Number of job positions are required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="common-field font-14 w-100"
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
                  {errors?.job_positions && (
                    <p className="error-message">{errors.job_positions?.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex gap-2 align-items-center font-14 fw-medium">
                    {t("responseDate")}
                  </Form.Label>
                  <Form.Control
                    type="date"
                    {...register("response_date", {
                      required: "Response date is required",
                    })}
                    min={new Date().toISOString().split("T")[0]}
                    className="common-field font-14"
                    placeholder="Enter response time"
                  />
                  {errors?.response_date && (
                    <p className="error-message">{errors?.response_date?.message}</p>
                  )}
                </Form.Group>
              </Col>

            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="common-label font-14 fw-medium">
                {"Time Zone"}
              </Form.Label>
              <Controller
                name="time_zone"
                control={control}
                rules={{ required: "Time zone is required" }}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    // options={groupedTime}
                    // placeholder={"Select Timezone"}
                    type={'text'}
                    placeholder="Enter Time Zone"
                  // handleChange={handleDropDownChange}
                  />
                )}
              />
              {errors?.time_zone && <p className="error-message">{errors.time_zone?.message}</p>}
              {/* {error && <p className={`${ (invalidFieldRequired) ? "field-error" : "error-message"}`}>{error?.message}</p>} */}
            </Form.Group>


          </Col>
        </Row>
      </section>
    </div>
  );
};

export default JobPostStep1;
