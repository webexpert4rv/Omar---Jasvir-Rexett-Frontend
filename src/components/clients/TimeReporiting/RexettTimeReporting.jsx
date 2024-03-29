import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import developerImg from '../../../assets/img/user-img.jpg'
import { useDispatch, useSelector } from "react-redux";
import { timeReporting } from "../../../redux/slices/clientDataSlice";
import RexettTable from "../../../components/clients/TimeReporiting/RexettTable";
import { weeklyTimeReports } from "../../../components/clients/TimeReporiting/constant";
import RexettButton from "../../../components/atomic/RexettButton";
const RexettTimeReporting = ({ timeReportingData, handleShowModal, role }) => {
    const dispatch = useDispatch()
    const [selectedPeriod, setSelectedPeriod] = useState("weekly");
    const [selectedFilter, setSelectedFilter] = useState({filter:"weekly"});

    const { smallLoader } = useSelector(state => state.clientData)


    const handlePeriodChange = (e) => {
        setSelectedPeriod(e.target.value);
        let filterData = {
            ...selectedFilter,
            filter: e.target.value
        }
        dispatch(timeReporting(filterData, role))
    };
    const handleChange=(e,select)=>{
        e.preventDefault()
        setSelectedFilter({
            ...selectedFilter,
            [select]:e.target.value
        })
     }

console.log(selectedFilter,"selectedFilter")
    const handlePrevTimeReporting=(e)=>{
        e.preventDefault()
        dispatch(timeReporting(selectedFilter, role))
     }

    return (
        <>
            <section>
                <div className="filter-section d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <Form>
                        <div className="">
                            <div className="d-flex gap-3 flex-wrap align-items-end">
                                <div className="flex-none">
                                    <Form.Label className="common-label">Select View</Form.Label>
                                    <Form.Select className="filter-select time-filter-select shadow-none" onChange={handlePeriodChange} value={selectedPeriod}>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                    </Form.Select>
                                </div>
                                <div>
                                    <Form.Label className="common-label">Select Year</Form.Label>
                                    <Form.Select className="time-filter-select shadow-none" onChange={(e)=>handleChange(e,"year")}>
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
                               { selectedPeriod!=="yearly"? <div>
                                    <Form.Label className="common-label">Select Month</Form.Label>
                                    <Form.Select className="time-filter-select shadow-none"  onChange={(e)=>handleChange(e,"month")}>
                                    <option disabled selected >Select Month</option>
                                        <option value="1">January</option>
                                        <option value="2">Feburary</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </Form.Select>
                                </div>:""}
                              { selectedPeriod!=="yearly" && selectedPeriod!=="monthly"  ? <div>
                                    <Form.Label className="common-label">Select Week</Form.Label>
                                    <Form.Select className="time-filter-select shadow-none" onChange={(e)=>handleChange(e,"week")}>
                                    <option disabled selected >Select Week</option>
                                        <option value="1">Week 1</option>
                                        <option value="2">Week 2</option>
                                        <option value="3">Week 3</option>
                                        <option value="4">Week 4</option>
                                    </Form.Select>
                                </div>:""}
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
                        <Button variant="transparent" onClick={handleShowModal} className="main-btn px-xxl-5 px-3">{role === "client" ? `Edit Time Report` : "Add Bulk Time"}</Button>
                    </div>

                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                    <div>
                        <div className="indicator-time-slot d-flex gap-3 align-items-center flex-wrap">
                            <div className="d-inline-flex align-items-center gap-1">
                                <span className="slot-indicate offday"></span>
                                <span>Off Day</span>
                            </div>
                            <div className="d-inline-flex align-items-center gap-1">
                                <span className="slot-indicate workday"></span>
                                <span>Work Day</span>
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