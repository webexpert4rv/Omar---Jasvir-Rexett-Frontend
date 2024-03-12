import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import developerImg from '../../assets/img/user-img.jpg'
import EditTimeModal from "./Modals/EditTimeModal";
import RexettButton from "../../components/atomic/RexettButton";
const TimeReporting = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("weekly-period");

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
    return (
        <>
            <section>
                <Form className="mb-4">
                    <div className="d-flex gap-3 justify-content-between">
                    <div className="d-flex gap-3">
                           
                           <div>
                               <Form.Label className="common-label">Select Year</Form.Label>
                               <Form.Select className="shadow-none">
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
                           <div>
                               <Form.Label className="common-label">Select Month</Form.Label>
                               <Form.Select className="shadow-none">
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
                           </div>
                           <div>
                               <Form.Label className="common-label">Select Week</Form.Label>
                               <Form.Select className="shadow-none">
                                   <option value="week1">Week 1</option>
                                   <option value="week2">Week 2</option>
                                   <option value="week3">Week 3</option>
                                   <option value="week4">Week 4</option>
                               </Form.Select>
                           </div>
                           <div>
                               <Form.Label>Select Day</Form.Label>
                               <div className="indicator-time-slot d-flex gap-3 align-items-center flex-wrap mb-4">
                                   <div className="d-inline-flex align-items-center gap-1">
                                       <input className="slot-indicate offday" type="radio" value="off_day" />
                                       <span>Off Day</span>
                                   </div>
                                   <div className="d-inline-flex align-items-center gap-1">
                                       <input className="slot-indicate workday" type="radio" value="work_day"  />
                                       <span>Work Day</span>
                                   </div>
                               </div>
                           </div>
                       </div>
                       
                        <div className="flex-none">
                            <Form.Label className="common-label">Select View</Form.Label>
                            <Form.Select className="filter-select shadow-none" onChange={handlePeriodChange} value={selectedPeriod}>
                                <option value="weekly-period">Weekly</option>
                                <option value="monthly-period">Monthly</option>
                                <option value="yearly-period">Yearly</option>
                            </Form.Select>
                        </div>
                    </div>
                </Form>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-3 w-50">
                    <div className="d-flex gap-3 w-50">
                        <RexettButton
                            text="Filter"
                            className="main-btn px-5"
                            variant="transparent"
                        />
                    </div>
                    </div>
                    <div>
                        <Button variant="transparent" onClick={handleShowEditTimeModal}   className="main-btn px-5">Edit Time Report</Button>
                    </div>
                </div>
                <div className={`weekly-report-table ${selectedPeriod === "weekly-period" ? '' : 'd-none'}`}>
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
                </div>
                <div className={`monthly-report-table ${selectedPeriod === "monthly-period" ? '' : 'd-none'}`}>
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
                                    Week1
                                </th>
                                <th className="time-table-head">
                                    Week2
                                </th>
                                <th className="time-table-head">
                                    Week3
                                </th>
                                <th className="time-table-head">
                                    Week4
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
                                    <td className="time-table-data">90 hrs</td>
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
                                    <td className="time-table-data">90 hrs</td>
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
                                    <td className="time-table-data">90 hrs</td>
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
                                    <td className="time-table-data">90 hrs</td>
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
                                    <td className="time-table-data">90 hrs</td>
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
                                    <td className="time-table-data">90 hrs</td>
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
                </div>
                <div className={`yearly-report-table ${selectedPeriod === "yearly-period" ? '' : 'd-none'}`}>
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
                                    JAN24
                                </th>
                                <th className="time-table-head">
                                    FEB24
                                </th>
                                <th className="time-table-head">
                                    MAR24
                                </th>
                                <th className="time-table-head">
                                    APR24
                                </th>
                                <th className="time-table-head">
                                    MAY24
                                </th>
                                <th className="time-table-head">
                                    JUN24
                                </th>
                                <th className="time-table-head">
                                    JULY24
                                </th>
                                <th className="time-table-head">
                                    AUG24
                                </th>
                                <th className="time-table-head">
                                    SEP24
                                </th>
                                <th className="time-table-head">
                                    OCT24
                                </th>
                                <th className="time-table-head">
                                    NOV24
                                </th>
                                
                                <th className="time-table-head">
                                    DEC24
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
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
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
                                    <td className="time-table-data">100 hrs</td>
                                    <td className="time-table-data">100 hrs</td>
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
                </div>
               <EditTimeModal show={showEditTimeModal} handleClose={handleCloseEditTimeModal} />

        
            </section>
        </>
    )
}
export default TimeReporting;