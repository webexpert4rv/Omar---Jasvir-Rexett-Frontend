import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import {
  CLIENT_NAME_OPTIONS,
  DEVELOPER_NAME_OPTIONS,
  INVOICE_STATUS_OPTIONS,
  MONTH_FILTER_OPTIONS,
  PROJECT_FILTER_OPTIONS,
  WEEK_FILTER_OPTIONS,
  YEAR_FILTER_OPTIONS,
} from "../../pages/admin/adminConstant";
import { useForm } from "react-hook-form";

const CommonFilterSection = ({
  filters,
  setFilters,
  filterFields,
  isSearchFilterRequired = true,
}) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const {
    register: registerSearch,
    handleSubmit: handleSearchSubmit,
    watch: watchSearch,
    setValue:setSearchValue
  } = useForm();

  useEffect(() => {
    for (let key in filters) {
      setValue(key, filters[key]);
    }
    setSearchValue(filterFields?.["searchFilter"]?.["key"],filters[filterFields?.["searchFilter"]?.["key"]])
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
    <div className="filter-section d-lg-flex align-items-center mb-4 justify-content-between">
      <Form onSubmit={handleSubmit(onSubmitFilters)}>
        <div className="d-flex align-items-center gap-2 mb-lg-0 mb-3 flex-wrap">
          {filterFields?.selectFilters?.map(({ key, filterLabel, options }) => (
            <div>
              <Form.Select
                {...register(key)}
                className="time-filter-select shadow-none"
              >
                <option disabled selected value="">
                  {filterLabel}
                </option>
                {options?.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}
              </Form.Select>
            </div>
          ))}
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
        </div>
      </Form>

      {/* search filter */}
      {isSearchFilterRequired && (
        <Form onSubmit={handleSearchSubmit(onSubmitFilters)}>
          <div className="d-flex align-items-center gap-3">
            <Form.Control
              {...registerSearch(filterFields?.["searchFilter"]?.["key"])}
              type="text"
              className="common-field font-14 shadow-none"
              placeholder={filterFields["searchFilter"]["placeholder"]}
            />
            <Button
              type="submit"
              // disabled = {watchSearch("developerName") === ""}
              variant="transparent"
              className="main-btn px-3 search-btn"
            >
              <IoSearch />
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default CommonFilterSection;
