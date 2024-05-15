import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import developerImg from "../../../assets/img/user-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { timeReporting } from "../../../redux/slices/clientDataSlice";
import RexettTable from "../../../components/clients/TimeReporiting/RexettTable";
import { weeklyTimeReports } from "../../../components/clients/TimeReporiting/constant";
import RexettButton from "../../../components/atomic/RexettButton";
import ScreenLoader from "../../atomic/ScreenLoader";
import RexettPagination from "../../atomic/RexettPagination";
import { useTranslation } from "react-i18next";

const RexettTimeReporting = ({ timeReportingData, handleShowModal, role }) => {
  const dispatch = useDispatch();
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedFilter, setSelectedFilter] = useState({ filter: "weekly" });
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedView, setSelectedView] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { screenLoader, timeReportingPage } = useSelector(
    (state) => state.clientData
  );

  const monthOptions = [
    { label: "January", value: 1 },
    { label: "Feburary", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];
  const weekOptions = [
    { label: "Week 1", value: 1 },
    { label: "Week 2", value: 2 },
    { label: "Week 3", value: 3 },
    { label: "Week 4", value: 4 },
  ];
  useEffect(() => {
    let filterData = {
      ...selectedFilter,
      filter: selectedPeriod,
      page: page,
    };
    dispatch(timeReporting(filterData, role));
  }, [page]);
  

  const handlePeriodChange = (value) => {
    setSelectedView(value);
    const selectedPeriodValue = value;
    setSelectedPeriod(selectedPeriodValue);
    let filterData = {
      ...selectedFilter,
      filter: selectedPeriodValue,
      page: page,
    };

    delete filterData.week;
    delete filterData.month;
    delete filterData.year;

    setSelectedMonth("");
    setSelectedYear("");
    setSelectedWeek("");
    setSelectedFilter({ filter: selectedPeriodValue });
    dispatch(timeReporting(filterData, role));
  };

  const handleChange = (e, select) => {
    const selectedValue= e.target.value;
    e.preventDefault();
    setSelectedFilter({
      ...selectedFilter,
      [select]: e.target.value,
    });
    if (select === "week") {
      setSelectedWeek(selectedValue);
    } else if (select === "month") {
      setSelectedMonth(selectedValue);
    } else {
      setSelectedYear(e.target.value);
    }
  };

  const handlePrevTimeReporting = (e) => {
    e.preventDefault();
    let filterData = {
      ...selectedFilter,
      filter: selectedPeriod,
      page: page,
    };
    if (selectedPeriod === "yearly") {
      filterData.year = selectedFilter.year;
      delete filterData.month;
      delete filterData.week;
    } else if (selectedPeriod === "monthly") {
      filterData.year = selectedFilter.year;
      filterData.month = selectedFilter.month;
      delete filterData.week;
    } else {
      filterData.year = selectedFilter.year;
      filterData.month = selectedFilter.month;
      filterData.week = selectedFilter.week;
    }
    dispatch(timeReporting(filterData, role));
  };

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <section>
          <div className="filter-section">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <Form>
                <div className="d-flex gap-3 flex-wrap align-items-end">
                  <div className="flex-none">
                    {/* <Form.Label className="common-label">Select View</Form.Label> */}
                    <Form.Select
                      className=" time-filter-select shadow-none"
                      value={selectedView}
                      onChange={(e) => handlePeriodChange(e.target.value)}
                    >
                      <option selected disabled>
                        {t("selectView")}
                      </option>
                      <option value="weekly">{t("weekly")}</option>
                      <option value="monthly">{t("monthly")}</option>
                      <option value="yearly">{t("yearly")}</option>
                    </Form.Select>
                  </div>
                  <div>
                    {/* <Form.Label className="common-label">Select Year</Form.Label> */}
                    <Form.Select
                      className="time-filter-select shadow-none"
                      onChange={(e) => handleChange(e, "year")}
                      value= {selectedYear}
                    >
                      <option value="" disabled selected>
                       { t("selectYear")}
                      </option>
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
                  {selectedPeriod !== "yearly" ? (
                    <div>
                      {/* <Form.Label className="common-label">Select Month</Form.Label> */}
                      <Form.Select
                        className="time-filter-select shadow-none"
                        onChange={(e) => handleChange(e, "month")}
                        value={selectedMonth}
                      >
                        <option value="" selected disabled>
                          {t("selectMonth")}
                        </option>
                        {monthOptions?.map((opt, index) => (
                          <option key={index} value={opt?.value}>
                            {opt?.label}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  ) : (
                    ""
                  )}
                  {selectedPeriod !== "yearly" &&
                  selectedPeriod !== "monthly" ? (
                    <div>
                      {/* <Form.Label className="common-label">Select Week</Form.Label> */}
                      <Form.Select
                        className="time-filter-select shadow-none"
                        onChange={(e) => handleChange(e, "week")}
                        value={selectedWeek}
                      >
                        <option value="" selected disabled>
                          {t("selectWeek")}
                        </option>
                        {weekOptions?.map((item, index) => (
                          <option key={index} value={item?.value}>
                            {item?.label}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="d-flex gap-3">
                    {/* <Form.Control type="text" placeholder="Search" className="search-field" onChange={handleSearchChange}></Form.Control> */}
                    <RexettButton
                      type="submit"
                      text="Filter"
                      className="main-btn py-1_5 px-4"
                      variant="transparent"
                      onClick={handlePrevTimeReporting}
                      isLoading={false}
                      disabled={
                        selectedPeriod === "weekly" &&
                        Object.keys(selectedFilter).length > 3
                          ? false
                          : selectedPeriod === "monthly" &&
                            Object.keys(selectedFilter).length > 2
                          ? false
                          : selectedPeriod === "yearly" &&
                            Object.keys(selectedFilter).length > 1
                          ? false
                          : true
                      }
                    />
                  </div>
                </div>
              </Form>
              <div>
              {role === "developer" ?<Button variant="transparent" onClick={()=>handleShowModal("Edit")} className="outline-main-btn px-xxl-4 px-3 py-1_5 me-2">{role === "client" ? `` : `${t("editTimeReport")}`}</Button>:""}
              <Button variant="transparent" onClick={()=>handleShowModal("AddTime")} className="outline-main-btn px-xxl-4 px-3 py-1_5">{role === "client" ? `${t("editTimeReport")}` : `${t("addBulkTime")}`}</Button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <div className="indicator-time-slot d-flex gap-3 align-items-center flex-wrap">
                  <div className="d-inline-flex align-items-center gap-1">
                    <span className="slot-indicate offday"></span>
                    <span className="font-15 fw-semibold">{t("offDay")}</span>
                  </div>
                  <div className="d-inline-flex align-items-center gap-1">
                    <span className="slot-indicate workday"></span>
                    <span className="font-15 fw-semibold">{t("workDay")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RexettTable
            headerColumn={weeklyTimeReports(
              timeReportingData[0],
              selectedPeriod
            )}
            selectedPeriod={selectedPeriod}
            data={timeReportingData}
            role={role}
          />

          {timeReportingPage?.totalPages > 1 ? (
            <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
              <p className="showing-result">
                {t("showing")} {timeReportingData?.length} {t("results")}
              </p>
              <RexettPagination
                number={timeReportingPage?.totalPages}
                setPage={setPage}
                page={page}
              />
            </div>
          ) : (
            ""
          )}
        </section>
      )}
    </>
  );
};
export default RexettTimeReporting;
