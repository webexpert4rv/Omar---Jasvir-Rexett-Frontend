import React from "react";
import { Form } from "react-bootstrap";
import RexettButton from "../../atomic/RexettButton";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

const RexettInvoiceFilter = ({ setSelectedFilters, selectedFilters }) => {
  const { t } = useTranslation();
  const { handleSubmit, register,watch } = useForm();
  const handleFilterValues = (filterValues) => {
    setSelectedFilters(filterValues);
  };
   
  const isAllFieldEmpty = () => {
    const developerName = watch("developerName");
    const year = watch("year");
    const month = watch("month");
    const status = watch("status");

    if(!developerName && !year && !month && !status)
    {
      return true;
    }
      return false;
  }

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
      <Form onSubmit={handleSubmit(handleFilterValues)}>
        <div className="d-flex gap-3 align-items-end">
          <div>
            <Form.Select
              className="w-auto w-1 shadow-none"
              {...register("developerName")}
            >
              <option value="">{t("selectDevelopers")}</option>
              <option value="rohit">Rohit Sharma</option>
              <option value="rohit">Rohit Sharma</option>
              <option value="rohit">Rohit Sharma</option>
            </Form.Select>
          </div>
          <div>
            <Form.Select
              className="w-auto w-1 shadow-none"
              {...register("status")}
            >
              <option value="">{t("selectStatus")}</option>
              <option value="approved">{t("approved")}</option>
              <option value="pending">{t("pending")}</option>
            </Form.Select>
          </div>
          <div>
            {/* <Form.Label className="common-label">Select Year</Form.Label> */}
            <Form.Select className="w-auto shadow-none" {...register("year")}>
              <option value="">{t("selectYear")}</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </Form.Select>
          </div>

          <Form.Select className="w-auto shadow-none" {...register("month")}>
            <option value="">{t("selectMonth")}</option>
            <option value="1">{t("january")}</option>
            <option value="2">{t("feburary")}</option>
            <option value="3">{t("march")}</option>
            <option value="4">{t("april")}</option>
            <option value="5">{t("may")}</option>
            <option value="6">{t("june")}</option>
            <option value="7">{t("july")}</option>
            <option value="8">{t("august")}</option>
            <option value="9">{t("september")}</option>
            <option value="10">{t("october")}</option>
            <option value="11">{t("november")}</option>
            <option value="12">{t("december")}</option>
          </Form.Select>
          <div className="d-flex gap-3">
            {/* <Form.Control type="text" placeholder="Search" className="search-field" onChange={handleSearchChange}></Form.Control> */}
            <RexettButton
              type="submit"
              text={t("filter")}   
              className="main-btn py-1_5 px-4"
              variant="transparent"
              isLoading={false} 
              disabled={isAllFieldEmpty()}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RexettInvoiceFilter;
