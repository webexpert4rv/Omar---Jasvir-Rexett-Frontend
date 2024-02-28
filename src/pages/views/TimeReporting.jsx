import React, {useEffect, useState} from "react";
import { Form, Button } from "react-bootstrap";
import developerImg from '../../assets/img/user-img.jpg'
import { useDispatch, useSelector } from "react-redux";
import { timeReporting } from "../../redux/slices/clientDataSlice";
import RexettTable from "../../components/clients/TimeReporiting/RexettTable";
import { TABLE_HEADER } from "../../components/clients/TimeReporiting/constant";
import EditTimeModal from "./Modals/EditTimeModal";
const TimeReporting = () => {
    const dispatch =useDispatch()
    const [selectedPeriod, setSelectedPeriod] = useState("weekly");
    const {timeReportingData}=useSelector(state=>state.clientData)
console.log(timeReportingData,"timeReportingData")
console.log(TABLE_HEADER[0][selectedPeriod],"TABLE_HEADER[0][selectedPeriod]")

    useEffect(()=>{
        dispatch(timeReporting(selectedPeriod))
    },[dispatch,selectedPeriod])

    const handlePeriodChange = (e) => {
        setSelectedPeriod(e.target.value);
    };

    const [showEditTimeModal, setShowEditTimeModal] = useState(false);
    const handleShowEditTimeModal = () => {
        setShowEditTimeModal(true);
    };

    const handleCloseEditTimeModal = () => {
        setShowEditTimeModal(false);
    };

    console.log(TABLE_HEADER,"TABLE_HEADER")
    return (
        <>
            <section>
                <Form className="mb-4">
                    <div className="d-flex gap-3 justify-content-between">
                        <div className="d-flex gap-3">
                            <div>
                                <Form.Label className="common-label">From</Form.Label>
                                <Form.Control type="date" className="filter-field shadow-none"></Form.Control>
                            </div>
                            <div>
                                <Form.Label className="common-label">To</Form.Label>
                                <Form.Control type="date" className="filter-field shadow-none"></Form.Control>
                            </div>
                        </div>
                        <div className="flex-none">
                            <Form.Label className="common-label">Select Period</Form.Label>
                            <Form.Select className="filter-select shadow-none" onChange={handlePeriodChange} value={selectedPeriod}>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </Form.Select>
                        </div>
                    </div>
                </Form>
                <div className="indicator-time-slot d-flex gap-3 align-items-center flex-wrap mb-4">
                    <div className="d-inline-flex align-items-center gap-1">
                        <span className="slot-indicate offday"></span>
                        <span>Off Day</span>
                    </div>
                    <div className="d-inline-flex align-items-center gap-1">
                        <span className="slot-indicate workday"></span>
                        <span>Work Day</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-3 w-50">
                        <Form.Control type="text" placeholder="Search" className="search-field"></Form.Control>
                        <button className="main-btn px-5">Filter</button>
                    </div>
                    <div>
                        <Button variant="transparent" onClick={handleShowEditTimeModal} className="main-btn px-5">Edit Time Report</Button>
                    </div>
                </div>
                <RexettTable headerColumn={TABLE_HEADER[0][selectedPeriod]} selectedPeriod={selectedPeriod} data={timeReportingData}/>
                {/* <div className={`weekly-report-table ${selectedPeriod === "weekly-period" ? '' : 'd-none'}`}>
                    <div className="table-responsive">
                        <table className="table time-table table-bordered">
                            <thead>
                                <th className="time-table-head">
                                    Developer Name
                                </th>
                                <th className="time-table-head">
                                    Image of Developer
                                </th>
                                <th className="time-table-head">
                                    Mon 22
                                </th>
                                <th className="time-table-head">
                                    Tue 23
                                </th>
                                <th className="time-table-head">
                                    Wed 24
                                </th>
                                <th className="time-table-head">
                                    Thu 25
                                </th>
                                <th className="time-table-head">
                                    Fri 26
                                </th>
                                <th className="time-table-head">
                                    Total Hours
                                </th>
                                <th className="time-table-head">
                                    Contract
                                </th>
                                <th className="time-table-head">
                                    Status
                                </th>
                                <th className="time-table-head">
                                    Time Report Submit
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data offday-data"></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data offday-data"></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data offday-data"></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data offday-data"></td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data offday-data"></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}
                {/* <div className={`monthly-report-table ${selectedPeriod === "monthly-period" ? '' : 'd-none'}`}>
                    <div className="table-responsive">
                        <table className="table time-table table-bordered">
                            <thead>
                                <th className="time-table-head">
                                    Developer Name
                                </th>
                                <th className="time-table-head">
                                    Image of Developer
                                </th>
                                <th className="time-table-head">
                                    Jan 22
                                </th>
                                <th className="time-table-head">
                                    Feb 22
                                </th>
                                <th className="time-table-head">
                                    Mar 22
                                </th>
                                <th className="time-table-head">
                                    Apr 22
                                </th>
                                <th className="time-table-head">
                                    May 22
                                </th>
                                <th className="time-table-head">
                                    Jun 22
                                </th>
                                <th className="time-table-head">
                                    Jul 22
                                </th>
                                <th className="time-table-head">
                                    Aug 22
                                </th>
                                <th className="time-table-head">
                                    Sep 22
                                </th>
                                <th className="time-table-head">
                                    Oct 22
                                </th>
                                <th className="time-table-head">
                                    Nov 22
                                </th>
                                <th className="time-table-head">
                                    Dec 22
                                </th>
                                <th className="time-table-head">
                                    Total Hours
                                </th>
                                <th className="time-table-head">
                                    Contract
                                </th>
                                <th className="time-table-head">
                                    Status
                                </th>
                                <th className="time-table-head">
                                    Time Report Submit
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data offday-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">36 hrs</td> 
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">30 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}
                {/* <div className={`yearly-report-table ${selectedPeriod === "yearly-period" ? '' : 'd-none'}`}>
                    <div className="table-responsive">
                        <table className="table time-table table-bordered">
                            <thead>
                                <th className="time-table-head">
                                    Developer Name
                                </th>
                                <th className="time-table-head">
                                    Image of Developer
                                </th>
                                <th className="time-table-head">
                                    2018
                                </th>
                                <th className="time-table-head">
                                    2019
                                </th>
                                <th className="time-table-head">
                                    2020
                                </th>
                                <th className="time-table-head">
                                    2021
                                </th>
                                <th className="time-table-head">
                                    2022
                                </th>
                                <th className="time-table-head">
                                    Total Hours
                                </th>
                                <th className="time-table-head">
                                    Contract
                                </th>
                                <th className="time-table-head">
                                    Status
                                </th>
                                <th className="time-table-head">
                                    Time Report Submit
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="finished">Finished</option>
                                            <option value="progress">Progress</option>
                                            <option value="progress">Progress</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </section>
            <EditTimeModal show={showEditTimeModal} handleClose={handleCloseEditTimeModal} />
        </>
    )
}
export default TimeReporting;