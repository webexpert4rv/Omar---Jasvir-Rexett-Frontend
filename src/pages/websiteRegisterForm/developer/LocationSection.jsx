import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCitiesList,
  getStatesList,
  getTimeZoneForCountry,
} from "../../../redux/slices/clientDataSlice";
import CommonReactSelect from "../../../components/atomic/CommonReactSelect";

const LocationSection = ({ setValue, watch, errors, control, clearErrors }) => {
  const { countriesList, statesList, citiesList } = useSelector(
    (state) => state.clientData
  );

  useEffect(() => {
    if (watch("country_code")) {
      dispatch(getStatesList(watch("country_code")?.value));
    }
  }, []);
  const dispatch = useDispatch();
  const handleDropDownChange = (value, name) => {
    if (name === "country_code") {
      setValue("country_code", value);
      clearErrors("country_code");
      dispatch(getStatesList(watch("country_code")?.value));
      dispatch(getTimeZoneForCountry(watch("country_code")?.value));
      setValue("time_zone", null);
      setValue("state_iso_code", null);
      setValue("city", null);
    } else if (name === "state_iso_code") {
      setValue("state_iso_code", value);
      clearErrors("state_iso_code");
      dispatch(
        getCitiesList(
          watch("country_code")?.value,
          watch("state_iso_code")?.label
        )
      );
      setValue("city", null);
    }
  };
  return (
    <>
      <CommonReactSelect
        name="country_code"
        errors={errors}
        handleChange={handleDropDownChange}
        watch={watch}
        control={control}
        required="Country is required"
        label="Country"
        type="country"
        options={countriesList}
      />

      <CommonReactSelect
        name="state_iso_code"
        errors={errors}
        handleChange={handleDropDownChange}
        watch={watch}
        control={control}
        required="State is required"
        label="State"
        type="state"
        options={statesList}
      />
      <CommonReactSelect
        name="city"
        errors={errors}
        handleChange={handleDropDownChange}
        control={control}
        // required="City is required"
        label="City"
        type="city"
        watch={watch}
        options={citiesList}
      />
    </>
  );
};

export default LocationSection;
