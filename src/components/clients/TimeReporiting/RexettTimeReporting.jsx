import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import developerImg from '../../../assets/img/user-img.jpg'
import { useDispatch, useSelector } from "react-redux";
import { timeReporting } from "../../../redux/slices/clientDataSlice";
import RexettTable from "../../../components/clients/TimeReporiting/RexettTable";
import { TABLE_HEADER, getCurrentPeriodFromAPi, weeklyTimeReports } from "../../../components/clients/TimeReporiting/constant";
import RexettButton from "../../../components/atomic/RexettButton";
import { getPreviousTimeReports } from "../../../redux/slices/developerDataSlice";
const RexettTimeReporting = ({ timeReportingData, handleShowModal, role }) => {
    const dispatch = useDispatch()
    const [selectedPeriod, setSelectedPeriod] = useState("weekly");
    const [selectedFilter, setSelectedFilter] = useState({});

    const { smallLoader } = useSelector(state => state.clientData)


    const handlePeriodChange = (e) => {
        setSelectedPeriod(e.target.value);
        let filterData = {
            ...selectedFilter,
            filter: e.target.value
        }
        dispatch(timeReporting(filterData, role))
    };
    const handleChange = (e, select) => {
        e.preventDefault()
        setSelectedFilter({
            ...selectedFilter,
            [select]: e.target.value
        })
    }

    console.log(selectedFilter, "selectedFilter")

    const handlePrevTimeReporting = (e) => {
        e.preventDefault()
        dispatch(timeReporting(selectedFilter, role))
    }

    return (
        <>
            <section>
                <div className="filter-section">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
                        <Form>
                            <div className="">
                                <div className="d-flex gap-3 flex-wrap align-items-end">
                                    <div className="flex-none">
                                        {/* <Form.Label className="common-label">Select View</Form.Label> */}
                                        <Form.Select className="filter-select time-filter-select shadow-none" onChange={handlePeriodChange} value={selectedPeriod}>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="yearly">Yearly</option>
                                        </Form.Select>
                                    </div>
                                    <div>
                                        {/* <Form.Label className="common-label">Select Year</Form.Label> */}
                                        <Form.Select className="time-filter-select shadow-none" onChange={(e) => handleChange(e, "year")}>
                                            <option disabled selected >Select Year</option>
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
                                        <Form.Select className="time-filter-select shadow-none" onChange={(e) => handleChange(e, "month")}>
                                            <option disabled selected >Select Month</option>
                                            <option value="january">January</option>
                                            <option value="feburary">Feburary</option>
                                            <option value="march">March</option>
                                            <option value="april">April</option>
                                            <option value="may">May</option>
                                            <option value="june">June</option>
                                            <option value="july">July</option>
                                            <option value="august">August</option>
                                            <option value="september">September</option>
                                            <option value="october">October</option>
                                            <option value="november">November</option>
                                            <option value="december">December</option>
                                        </Form.Select>
                                    </div> : ""}
                                    {selectedPeriod !== "yearly" && selectedPeriod !== "monthly" ? <div>
                                        {/* <Form.Label className="common-label">Select Week</Form.Label> */}
                                        <Form.Select className="time-filter-select shadow-none" onChange={(e) => handleChange(e, "week")}>
                                            <option disabled selected >Select Week</option>
                                            <option value="week1">Week 1</option>
                                            <option value="week2">Week 2</option>
                                            <option value="week3">Week 3</option>
                                            <option value="week4">Week 4</option>
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
                                            className="main-btn py-2 px-5"
                                            variant="transparent"
                                            onClick={handlePrevTimeReporting}
                                            isLoading={Object.keys(selectedFilter).length > 0 ? smallLoader : false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                        <div>
                            <Button variant="transparent" onClick={handleShowModal} className="outline-main-btn px-xxl-4 px-3">{role === "client" ? `Edit Time Report` : "Add Bulk Time"}</Button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <div className="indicator-time-slot d-flex gap-3 align-items-center flex-wrap">
                                <div className="d-inline-flex align-items-center gap-1">
                                    <span className="slot-indicate offday"></span>
                                    <span className="font-13 fw-semibold">Off Day</span>
                                </div>
                                <div className="d-inline-flex align-items-center gap-1">
                                    <span className="slot-indicate workday"></span>
                                    <span className="font-13 fw-semibold">Work Day</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RexettTable headerColumn={weeklyTimeReports(timeReportingData[0], selectedPeriod)} selectedPeriod={selectedPeriod} data={timeReportingData} role={role} />

            </section>
        </>
    )
}
export default RexettTimeReporting;