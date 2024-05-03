import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RexettButton from '../../atomic/RexettButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import ScreenLoader from '../../atomic/ScreenLoader';
import NoDataFound from '../../atomic/NoDataFound';
import { approvedClient } from '../../../redux/slices/developerDataSlice';
import userImage from "../../../assets/img/user-img.jpg"
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import moment from 'moment';

const RexettTable = ({ selectedPeriod, headerColumn, data, role }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { approvedLoader, smallLoader } = useSelector(state => state.developerData)
    const [selectedApprovedBtn, setSelectedApprovedBtn] = useState(null)
    const dispatch = useDispatch()
    const submitApproved = (id, index) => {
        setSelectedApprovedBtn(index)
        dispatch(approvedClient(id,role))
    }
    return (
        <div className={`weekly-report-table ${selectedPeriod}`}>
            <div className="table-responsive">
                {smallLoader ? <ScreenLoader /> :
                    data?.length > 0 ?
                        <table className="table time-table table-bordered table-ui-custom">
                            <thead>
                                <th className="time-table-head">
                                    <span>{role !== "developer" ? "Developer Name" : "Client Name"}</span>
                                </th>

                                {
                                    headerColumn?.map((item, index) => {
                                        return (
                                            <>
                                                <th className="time-table-head">
                                                    <span>{item}</span>
                                                </th>
                                            </>
                                        )
                                    })
                                }
                                <th className="time-table-head">
                                    <span>Total Hours</span>
                                </th>
                                {/* <th className="time-table-head">
                                    <span>Contract</span>
                                </th> */}
                                <th className="time-table-head">
                                    <span>Status</span>
                                </th>
                                <th className="time-table-head">
                                    <span>Client's Remarks</span>
                                </th>
                                {selectedPeriod == "weekly" ? <th className="time-table-head">
                                    <span>Time Report Submit</span>
                                </th> : ""}
                            </thead>

                            <tbody>

                                {data.length>0 ? data?.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className="time-table-data"><div className='d-flex gap-2 align-items-center white-nowrap'><img src={item?.contractDetails?.user_details?.profile_picture ? item?.contractDetails?.user_details?.profile_picture : userImage } className="developer-img" alt="" /> {item?.contractDetails?.user_details?.name}</div></td>
                                                {
                                                    item?.timeReports?.map((reprt) => {
                                                        if (reprt.report_date) {
                                                            return (
                                                                <>
                                                                    <td onClick={handleShow} className={`time-table-data white-nowrap ${reprt.is_off_day ? "workday-data" : "workday-data"}`} ><div>{reprt.start_time && reprt?.end_time ? `${moment(reprt?.start_time, 'HH:mm:ss').format('h:mm:ss A')} - ${moment(reprt?.end_time, 'HH:mm:ss').format('h:mm:ss A')} ` : "-"}<p className='timing-text'>9:30 AM - 7:00 PM</p><p className='memo-text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p></div></td>
                                                                </>
                                                            )
                                                        } else if (reprt.month) {
                                                            return (
                                                                <>
                                                                    <td className={`time-table-data ${reprt.is_off_month ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td>
                                                                </>
                                                            )
                                                        } else {
                                                            return (
                                                                <>
                                                                    <td className={`time-table-data ${reprt.is_off_year ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td>
                                                                </>
                                                            )
                                                        }

                                                    })
                                                }
                                                <td className='time-table-data'>{item?.totalDuration}hr</td>
                                                {/* <td className="time-table-data white-nowrap">{item?.contractDetails?.employment_type}</td> */}
                                                <td className="time-table-data">
                                                    <span className={item?.contractDetails?.status ? "status-progress" : "status-finished"}>{item?.contractDetails?.status ? "Progress" : "Finished"}</span>
                                                </td>
                                                <td className="time-table-data"><p className='remarks-text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p></td>
                                                {selectedPeriod == "weekly" ? <td className="time-table-data">
                                                    <RexettButton
                                                        type="submit"
                                                        text={role=="client"? "Submit & Approved":"Submit"}
                                                        className="outline-main-btn white-nowrap px-2 font-13"
                                                        variant="transparent"
                                                        onClick={() => submitApproved(item?.contractDetails?.contract_id, index)}
                                                        isLoading={selectedApprovedBtn === index ? approvedLoader : false}
                                                    />
                                                </td> : ""}
                                            </tr>
                                        </>
                                    )
                                })
                                :<td colSpan={17}><NoDataFound/></td> }

                            </tbody>


                        </table>
                        : <NoDataFound />}
            </div>
            <Offcanvas className="time-detail-sidepanel" show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Time Reporting</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* <div className='detail-view day-view'>
                            <div className='client-info mb-3'>
                                <h4 className='sidebar-heading'>Client Name</h4>
                                <p className='client-name-heading'><img src={userImage}/> Pankaj Pundir</p>
                            </div>
                            <div className='client-info mb-3 d-flex gap-5'>
                                <div className='mb-0'>
                                    <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                </div>
                                <div className='d-flex gap-4 justify-content-between'>
                                    <div className='d-flex gap-3 align-items-center'>
                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                        <p className='client-name-heading'>-</p>
                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        <div class="weekly-detail">
                            <div className='client-info'>
                                <h4 className='sidebar-heading'>Memo</h4>
                                <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            </div>
                        </div>
                    </div> */}
                    
                    {/* <div className='detail-view weekly-view'>
                        <div className='client-info mb-3'>
                            <h4 className='sidebar-heading'>Client Name</h4>
                            <p className='client-name-heading'><img src={userImage}/> Pankaj Pundir</p>
                        </div>
                        <div className='client-info mb-3 gap-5 d-flex align-items-center'>
                            <div className='mb-0'>
                                <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar />Week 1 Jan 2024</p>
                            </div>
                            <div className='d-flex gap-4 justify-content-between'>
                                <div className='d-flex gap-3 align-items-center'>
                                    <p className='client-name-heading d-flex gap-1 align-items-center fw-semibold'><FaRegClock /> 40 hrs</p>
                                </div>
                            </div>
                            <div>
                                <span className="status-progress">Progress</span>
                            </div>
                        </div>
                        <div className='client-info mb-3'>
                            <h4 className='sidebar-heading'>Your Remark</h4>
                            <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <div className='weekly-detail mb-3 p-3'>
                            <div>
                                <div className='client-info mb-3 gap-5'>
                                    <div className='mb-2'>
                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                    </div>
                                    <div className='d-flex gap-4 justify-content-between'>
                                        <div className='d-flex gap-3 align-items-center'>
                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                            <p className='client-name-heading'>-</p>
                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='client-info'>
                                    <h4 className='sidebar-heading'>Memo</h4>
                                    <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                </div>
                            </div>
                        </div>
                        <div className='weekly-detail mb-3 p-3'>
                            <div>
                                <div className='client-info mb-3 gap-5'>
                                    <div className='mb-2'>
                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                    </div>
                                    <div className='d-flex gap-4 justify-content-between'>
                                        <div className='d-flex gap-3 align-items-center'>
                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                            <p className='client-name-heading'>-</p>
                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='client-info'>
                                    <h4 className='sidebar-heading'>Memo</h4>
                                    <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                </div>
                            </div>
                        </div>
                        <div className='weekly-detail mb-3 p-3'>
                            <div>
                                <div className='client-info mb-3 gap-5'>
                                    <div className='mb-2'>
                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                    </div>
                                    <div className='d-flex gap-4 justify-content-between'>
                                        <div className='d-flex gap-3 align-items-center'>
                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                            <p className='client-name-heading'>-</p>
                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='client-info'>
                                    <h4 className='sidebar-heading'>Memo</h4>
                                    <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                </div>
                            </div>
                        </div>
                        <div className='weekly-detail mb-3 p-3'>
                            <div>
                                <div className='client-info mb-3 gap-5'>
                                    <div className='mb-2'>
                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                    </div>
                                    <div className='d-flex gap-4 justify-content-between'>
                                        <div className='d-flex gap-3 align-items-center'>
                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                            <p className='client-name-heading'>-</p>
                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='client-info'>
                                    <h4 className='sidebar-heading'>Memo</h4>
                                    <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                </div>
                            </div>
                        </div>
                        <div className='weekly-detail p-3'>
                            <div>
                                <div className='client-info mb-3 gap-5'>
                                    <div className='mb-2'>
                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                    </div>
                                    <div className='d-flex gap-4 justify-content-between'>
                                        <div className='d-flex gap-3 align-items-center'>
                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                            <p className='client-name-heading'>-</p>
                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='client-info'>
                                    <h4 className='sidebar-heading'>Memo</h4>
                                    <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className='detail-view monthly-view'>
                        <div className='client-info mb-3'>
                            <h4 className='sidebar-heading'>Client Name</h4>
                            <p className='client-name-heading'><img src={userImage}/> Pankaj Pundir</p>
                        </div>
                        <div className='client-info mb-3 gap-5 d-flex align-items-center'>
                            <div className='mb-0'>
                                <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar />Jan 2024</p>
                            </div>
                            <div className='d-flex gap-4 justify-content-between'>
                                <div className='d-flex gap-3 align-items-center'>
                                    <p className='client-name-heading d-flex gap-1 align-items-center fw-semibold'><FaRegClock /> 140 hrs</p>
                                </div>
                            </div>
                            <div>
                                <span className="status-progress">Progress</span>
                            </div>
                        </div>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="week-first">
                            <Nav variant="pills" className="weekly-tabs">
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link' eventKey="week-first">Week 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link' eventKey="week-second">Week 2</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link' eventKey="week-third">Week 3</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link' eventKey="week-forth">Week 4</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="week-first">
                                    <div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='client-info mb-3'>
                                            <h4 className='sidebar-heading'>Your Remark</h4>
                                            <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </div>
                                        <div className='client-info'>
                                            <h4 className='sidebar-heading'>Client's Remark</h4>
                                            <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="week-second">
                                    <div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='client-info mb-3'>
                                            <h4 className='sidebar-heading'>Your Remark</h4>
                                            <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </div>
                                        <div className='client-info'>
                                            <h4 className='sidebar-heading'>Client's Remark</h4>
                                            <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="week-third">
                                    <div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='client-info mb-3'>
                                            <h4 className='sidebar-heading'>Your Remark</h4>
                                            <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </div>
                                        <div className='client-info'>
                                            <h4 className='sidebar-heading'>Client's Remark</h4>
                                            <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="week-forth">
                                    <div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='weekly-detail mb-3 p-3'>
                                            <div>
                                                <div className='client-info mb-3 gap-5'>
                                                    <div className='mb-2'>
                                                        <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                    </div>
                                                    <div className='d-flex gap-4 justify-content-between'>
                                                        <div className='d-flex gap-3 align-items-center'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                            <p className='client-name-heading'>-</p>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='client-info'>
                                                    <h4 className='sidebar-heading'>Memo</h4>
                                                    <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='client-info mb-3'>
                                            <h4 className='sidebar-heading'>Your Remark</h4>
                                            <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </div>
                                        <div className='client-info'>
                                            <h4 className='sidebar-heading'>Client's Remark</h4>
                                            <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
        
    )
}

export default RexettTable