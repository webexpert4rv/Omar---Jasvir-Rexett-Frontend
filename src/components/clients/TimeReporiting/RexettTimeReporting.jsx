import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import developerImg from '../../../assets/img/user-img.jpg'
import { useDispatch, useSelector } from "react-redux";
import { timeReporting } from "../../../redux/slices/clientDataSlice";
import RexettTable from "../../../components/clients/TimeReporiting/RexettTable";
import { weeklyTimeReports } from "../../../components/clients/TimeReporiting/constant";
import RexettButton from "../../../components/atomic/RexettButton";
import ScreenLoader from "../../atomic/ScreenLoader";
import RexettPagination from "../../atomic/RexettPagination";
import { useTranslation } from "react-i18next";



const RexettTimeReporting = ({ timeReportingData, handleShowModal, role }) => {
    const dispatch = useDispatch()
    const [selectedPeriod, setSelectedPeriod] = useState("weekly");
    const [selectedFilter, setSelectedFilter] = useState({ filter: "weekly" });
    const [selectedWeek, setSelectedWeek] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [page, setPage] = useState(1)
    const { screenLoader , timeReportingPage } = useSelector(state => state.clientData)

    useEffect(()=>{
        let filterData = {
            ...selectedFilter,
            filter: selectedPeriod,
            page:page
        };
        dispatch(timeReporting(filterData, role));
    },[page])
    const { t } = useTranslation();


    const handlePeriodChange = (e) => {
        const selectedPeriodValue = e.target.value;
        setSelectedPeriod(selectedPeriodValue);
        let filterData = {
            ...selectedFilter,
            filter: selectedPeriodValue,
            page:page
        };

        delete filterData.week;
        delete filterData.month;
        delete filterData.year;

        setSelectedMonth("")
        setSelectedYear("")
        setSelectedWeek("")
        setSelectedFilter({ filter: selectedPeriodValue })
        dispatch(timeReporting(filterData, role));
    }

    const handleChange = (e, select) => {
        e.preventDefault()
        // const monthValue = e.target.value
        // let monthName;
        // if (!isNaN(monthValue)) {
        //     const monthNumber = parseInt(monthValue);
        //     monthName = new Date(2022, monthNumber - 1).toLocaleString('default', { month: 'long' });
        // } else {
        //     monthName = monthValue;
        // }
        // console.log(monthName,"monthName")
        setSelectedFilter({
            ...selectedFilter,
            [select]: e.target.value
        })
        if (select === "week") {
            setSelectedWeek(e.target.value);
        } else if (select === "month") {
            setSelectedMonth(e.target.value);
        } else {
            setSelectedYear(e.target.value)
        }

    }


    const handlePrevTimeReporting = (e) => {
        e.preventDefault()
        let filterData = {
            ...selectedFilter,
            filter: selectedPeriod,
            page:page
        }
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
        };
        // setSelectedFilter({filter:''})
        dispatch(timeReporting(filterData, role))
    }



    return (
        <>
            {screenLoader ? <ScreenLoader /> :
                <section>
                    <div className="filter-section">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <Form>
                                <div className="d-flex gap-3 flex-wrap align-items-end">
                                    <div className="flex-none">
                                        {/* <Form.Label className="common-label">Select View</Form.Label> */}
                                        <Form.Select className="filter-select time-filter-select shadow-none" onChange={handlePeriodChange} >
                                            <option value="weekly">{t("weekly")}</option>
                                            <option value="monthly">{t("monthly")}</option>
                                            <option value="yearly">{t("yearly")}</option>
                                        </Form.Select>
                                    </div>
                                    <div>
                                        {/* <Form.Label className="common-label">Select Year</Form.Label> */}
                                        <Form.Select className="time-filter-select shadow-none" value={selectedYear} onChange={(e) => handleChange(e, "year")}>
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
                                    {selectedPeriod !== "yearly" ? <div>
                                        {/* <Form.Label className="common-label">Select Month</Form.Label> */}
                                        <Form.Select className="time-filter-select shadow-none" value={selectedMonth} onChange={(e) => handleChange(e, "month")}>
                                            <option value="" >{t("selectMonth")}</option>
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
                                    </div> : ""}
                                    {selectedPeriod !== "yearly" && selectedPeriod !== "monthly" ? <div>
                                        {/* <Form.Label className="common-label">Select Week</Form.Label> */}
                                        <Form.Select className="time-filter-select shadow-none" value={selectedWeek} onChange={(e) => handleChange(e, "week")}>
                                            <option value="">{t("selectWeek")}</option>
                                            <option value="1">{t("week")} 1</option>
                                            <option value="2">{t("week")} 2</option>
                                            <option value="3">{t("week")} 3</option>
                                            <option value="4">{t("week")} 4</option>
                                        </Form.Select>
                                    </div> : ""}
                                    {/* <div>
                                        <Form.Label>Select Day</Form.Label>
                                        <div className="indicator-time-slot d-flex gap-3 align-items-center flex-wrap mb-4">
                                            <div className="d-inline-flex align-items-center gap-1">
                                                <input className="slot-indicate offday" type="radio" value="off_day" />
                                                <span>Off Day</span>
                                            </div>
                                            <div className="d-inline-flex align-items-center gap-1">
                                                <input className="slot-indicate workday" type="radio" value="work_day"/>
                                                <span>Work Day</span>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="d-flex gap-3">
                                        {/* <Form.Control type="text" placeholder="Search" className="search-field" onChange={handleSearchChange}></Form.Control> */}
                                        <RexettButton
                                            type="submit"
                                            text="Filter"
                                            className="main-btn py-1_5 px-4"
                                            variant="transparent"
                                            onClick={handlePrevTimeReporting}
                                            isLoading={false}
                                            disabled={selectedPeriod === "weekly" && Object.keys(selectedFilter).length > 3 ? false : selectedPeriod === "monthly" && Object.keys(selectedFilter).length > 2 ? false : selectedPeriod === "yearly" && Object.keys(selectedFilter).length > 1 ? false : true}
                                        />
                                    </div>
                                </div>
                            </Form>
                            <div>
                                <Button variant="transparent" onClick={handleShowModal} className="outline-main-btn px-xxl-4 px-3 py-1_5">{role === "client" ? `${t("editTimeReport")}` : `${t("addBulkTime")}`}</Button>
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

                    <RexettTable headerColumn={weeklyTimeReports(timeReportingData[0], selectedPeriod)} selectedPeriod={selectedPeriod} data={timeReportingData} role={role} />

                    { <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                   <p className="showing-result">{t("showing")} {(timeReportingData?.length)} {t("results")}</p> 
                <RexettPagination number={timeReportingPage?.totalPages} setPage={setPage} page={page}/>
            </div>}
                </section>}

        </>
    )
}
export default RexettTimeReporting;