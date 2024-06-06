import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import {
  DEVELOPER_NAME_OPTIONS,
  INVOICE_STATUS_OPTIONS,
  MONTH_FILTER_OPTIONS,
  PROJECT_FILTER_OPTIONS,
  WEEK_FILTER_OPTIONS,
  YEAR_FILTER_OPTIONS,
} from "./adminConstant";
import { useForm } from "react-hook-form";

const TimeReportingFilterSection = ({
  filters,
  setFilters,
  isHeaderFilter = false,
}) => {
  const { register, handleSubmit, watch ,setValue} = useForm();
  const {
    register: registerSearch,
    handleSubmit: handleSearchSubmit,
    watch: watchSearch,
  } = useForm();

  useEffect(() => {
    for (let key in filters){
      setValue(key,filters[key]);
    }
  }, []);

  const onSubmitFilters = (selectedFilters) => {
    setFilters({
      ...filters,
      ...selectedFilters,
    });
  };
  const isAnyFieldFilled = () => {
    const fields = watch();
    return Object.values(fields).some((value) => value !== "");
  };

  return (
    <div className="s">
      <div className="filter-section d-lg-flex align-items-center mb-4 justify-content-between">
        <div className="d-flex align-items-center gap-2 mb-lg-0 mb-3 flex-wrap">
          <Form onSubmit={handleSubmit(onSubmitFilters)}>
            <div>
              {/* <Form.Select className="time-filter-select shadow-none">
            <option disabled selected>
              Select Week
            </option>
            {WEEK_FILTER_OPTIONS?.map(({ label, value }) => (
              <option value={value}>{label}</option>
            ))}
          </Form.Select> */}
            </div>
            <div>
              <Form.Select
                {...register("month")}
                className="time-filter-select shadow-none"
              >
                <option disabled selected value="">
                  Select Month
                </option>
                {MONTH_FILTER_OPTIONS?.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}
              </Form.Select>
            </div>
            <div>
              <Form.Select
                {...register("year")}
                className="time-filter-select shadow-none"
              >
                <option disabled selected value="">
                  Select Year
                </option>
                {YEAR_FILTER_OPTIONS?.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}
              </Form.Select>
            </div>
            {!isHeaderFilter && (
              <div>
                <Form.Select
                  {...register("developerName")}
                  className="time-filter-select shadow-none"
                >
                  <option disabled selected value="">
                    Select Developer
                  </option>
                  {DEVELOPER_NAME_OPTIONS?.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                  ))}
                </Form.Select>
              </div>
            )}
            <div>
              <Form.Select
                {...register("projectName")}
                className="time-filter-select shadow-none"
              >
                <option disabled selected value="">
                  Select Project
                </option>
                {PROJECT_FILTER_OPTIONS?.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}
              </Form.Select>
            </div>
            {!isHeaderFilter && (
              <div>
                <Form.Select
                  {...register("invoice_status")}
                  className="time-filter-select shadow-none"
                >
                  <option disabled selected value="">
                    Invoice Status
                  </option>
                  {INVOICE_STATUS_OPTIONS?.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                  ))}
                </Form.Select>
              </div>
            )}
            <div>
              <Button
                disabled={!isAnyFieldFilled()}
                type="submit"
                className="main-btn py-1_5 px-4"
                variant="transparent"
              >
                Filter
              </Button>
            </div>
          </Form>
        </div>

        {/* search filter */}
        <div className="d-flex align-items-center gap-3">
          <Form onSubmit={handleSearchSubmit(onSubmitFilters)}>
            <Form.Control
              {...registerSearch("developerName")}
              type="text"
              className="common-field font-14 shadow-none"
              placeholder="Enter Keyword..."
            />
            <Button
              type="submit"
              // disabled = {watchSearch("developerName") === ""}
              variant="transparent"
              className="main-btn px-3 search-btn"
            >
              <IoSearch />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TimeReportingFilterSection;
