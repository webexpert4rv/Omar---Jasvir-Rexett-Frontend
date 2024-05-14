import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";
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
import SingleTimeReporting from './SingleTimeReporting';
import TimeReportRemark from './TimeReportRemark';

const RexettTable = ({ selectedPeriod, headerColumn, data, role }) => {
    const [show, setShow] = useState(false);
    const [currentDetails,setCurrentDetails]=useState(null)
    const handleClose = () => setShow(false);
    const handleShow = (data,index) =>{ 
        let memoDetails=data?.timeReports[index]
        let newData={
            ...data,
            timeReports:memoDetails

        }
        setCurrentDetails(newData)
        setShow(true)
    };
    
    const [remarkshow, setremarkShow] = useState(false);
    const handleremarkClose = () => setremarkShow(false);
    const handleremarkShow = (data,index) =>{

        let memoDetails=data?.timeReports[index]
        let newData={
            ...data,
            timeReports:memoDetails

        }
        setCurrentDetails(newData)
        setremarkShow(true)
    } ;
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
                                    <span>Remarks</span>
                                </th>
                                {selectedPeriod == "weekly" ? <th className="time-table-head">
                                    <span>Submit</span>
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
                                                                    <td onClick={()=>handleShow(item,index)} className={`time-table-data white-nowrap ${reprt.is_off_day ? "workday-data" : "workday-data"}`} ><div>{reprt.start_time && reprt?.end_time ? `${moment(reprt?.start_time, 'HH:mm:ss').format('h:mm:ss A')} - ${moment(reprt?.end_time, 'HH:mm:ss').format('h:mm:ss A')} ` : "-"}<p className='memo-text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p></div></td>
                                                                </>
                                                            )
                                                        } else if (reprt.month) {
                                                            return (
                                                                <>
                                                                           <td onClick={()=>handleShow(item,index)} className={`time-table-data white-nowrap ${reprt.is_off_day ? "workday-data" : "workday-data"}`} ><div>{reprt?.duration ? `${reprt?.duration.toFixed("2")} hr` : "-"}</div></td>
                                                                    {/* <td className={`time-table-data ${reprt.is_off_month ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
                                                                </>
                                                            )
                                                        } else {
                                                            return (
                                                                <>
                                                                           <td onClick={()=>handleShow(item,index)} className={`time-table-data white-nowrap ${reprt.is_off_day ? "workday-data" : "workday-data"}`} ><div>{reprt?.duration ? `${reprt?.duration.toFixed("2")} hr` : "-"}</div></td>
                                                                    {/* <td className={`time-table-data ${reprt.is_off_year ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
                                                                </>
                                                            )
                                                        }

                                                    })
                                                }
                                                <td className='time-table-data'>{item?.totalDuration>0?item?.totalDuration.toFixed("2"):item?.totalDuration}hr</td>
                                                {/* <td className="time-table-data white-nowrap">{item?.contractDetails?.employment_type}</td> */}
                                                <td className="time-table-data">
                                                    <span className={item?.contractDetails?.status ? "status-progress" : "status-finished"}>{item?.contractDetails?.status ? "Progress" : "Finished"}</span>
                                                </td>
                                              { item?.contractDetails?.remarks?.length>0?  <td className="time-table-data"><p onClick={()=>handleremarkShow(item,index)} className='remarks-text white-nowrap'>{item?.contractDetails?.remarks?.length>0 ?"View Remarks":"No Remarks"}</p></td>
                                            :  <td className="time-table-data"><p className='white-nowrap'>No Remarks</p></td>
                                            }
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
                  { selectedPeriod == "weekly" && 
                  <SingleTimeReporting currentDetails={currentDetails} selectedPeriod={selectedPeriod} />
                  }
                    
                {  selectedPeriod == "monthly" &&  
                    <SingleTimeReporting currentDetails={currentDetails} selectedPeriod={selectedPeriod}/>
                }

                  {/* { selectedPeriod == "yearly" &&  <SingleTimeReporting currentDetails={currentDetails} selectedPeriod={selectedPeriod}/> } */}
                    { selectedPeriod == "yearly" &&  <SingleTimeReporting currentDetails={currentDetails} selectedPeriod={selectedPeriod}/>}
                </Offcanvas.Body>
            </Offcanvas>
          {remarkshow ?<TimeReportRemark remarkshow={remarkshow} handleremarkClose={handleremarkClose} currentDetails={currentDetails}/>:""}
        </div>
        
    )
}

export default RexettTable