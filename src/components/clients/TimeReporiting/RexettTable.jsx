import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Tooltip } from "react-bootstrap";
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
import ConfirmationModal from '../../../pages/views/Modals/ConfirmationModal';
import { timeReporting } from '../../../redux/slices/clientDataSlice';
import remarkIcon from '../../../assets/img/remarks-icon.svg'
import { OverlayTrigger } from 'react-bootstrap/esm';

const RexettTable = ({ selectedPeriod, headerColumn, data, role,page }) => {
    const [show, setShow] = useState(false);
    const [approvedConfirmation, setApprovedConfirmation] = useState({
        isApproved: false,
        approvedId: null
    })
    const [currentDetails, setCurrentDetails] = useState(null)
    const handleClose = () => setShow(false);
    const handleShow = (data, index, isOff) => {
        if (!isOff?.is_off_day) {
            let memoDetails = data?.timeReports[index]
            let newData = {
                ...data,
                timeReports: memoDetails

            }
            setCurrentDetails(newData)
            setShow(true)
        }

    };
    const viewremark = (
        <Tooltip id="tooltip">
          View Remarks
        </Tooltip>
      );

    const [remarkshow, setremarkShow] = useState(false);
    const handleremarkClose = () => setremarkShow(false);
    const handleremarkShow = (data, index) => {

        let memoDetails = data?.timeReports[index]
        let newData = {
            ...data,
            timeReports: memoDetails

        }
        setCurrentDetails(newData)
        setremarkShow(true)
    };
    const { approvedLoader, smallLoader } = useSelector(state => state.developerData)
    const [selectedApprovedBtn, setSelectedApprovedBtn] = useState(null)
    const dispatch = useDispatch()
    const submitApproved = (id, index) => {
        setApprovedConfirmation({
            isApproved: true,
            approvedId: id

        })
        // setSelectedApprovedBtn(index)
        // dispatch(approvedClient(id,role))
    }

    const handleCloseApproveModal = () => {
        setApprovedConfirmation({
            isApproved: false,
            approvedId: null

        })
    }

    const handleTimeSheetApprove = (e) => {
        e.preventDefault()
        dispatch(approvedClient(approvedConfirmation?.approvedId, role, () => {
            setApprovedConfirmation({
                isApproved: false,
                approvedId: null

            })
            let filterData={
                page:page

            } 
            dispatch(timeReporting(filterData, role));
        }))
    }

    const currentTextData=(role,isApproved)=>{
        if(role=="client"){
            if(isApproved){
                return "Submitted"
            }else{
                return "Submit & Approve"
            }
        }else 
        {
            return "Submit"
        }


    }

    console.log(currentDetails,"currentDetailsuuu")
    return (
        <>
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
                                        <span>Project</span>
                                    </th>
                                    <th className="time-table-head">
                                        <span>Timesheet</span>
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
                                                    <td className="time-table-data">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div className='d-flex gap-2 align-items-center white-nowrap'><div className="position-relative"><img src={item?.contractDetails?.user_details?.profile_picture ? item?.contractDetails?.user_details?.profile_picture : userImage } className="developer-img" alt="" /><span className="number-count overlay">1</span></div> {item?.contractDetails?.user_details?.name}</div>
                                                        </div>
                                                    </td>
                                                    {
                                                        item?.timeReports?.map((reprt) => {
                                                            if (reprt.report_date) {
                                                                return (
                                                                    <>
                                                                        <td onClick={()=>handleShow(item,index,reprt)} className={`time-table-data white-nowrap ${reprt.is_off_day ? "offday-data" : "workday-data"}`} ><div><span className={`${reprt.is_off_day ? "" : "timing-text d-inline-block"}`}>{reprt.start_time && reprt?.end_time ? `${moment(reprt?.start_time, 'HH:mm').format('h:mm A')} - ${moment(reprt?.end_time, 'HH:mm').format('h:mm A')} ` : "Holiday"}</span>
                                                                        {reprt?.memo &&<p className='memo-text'>{reprt?.memo?reprt?.memo:""}</p>}
                                                                        </div></td>
                                                                    </>
                                                                )
                                                            } else if (reprt.week) {
                                                                return (
                                                                    <>
                                                                            <td onClick={()=>handleShow(item,index,reprt)} className={`time-table-data white-nowrap ${reprt.is_off_week ? "offday-data" : "workday-data"}`} ><div>{reprt?.duration ? `${reprt?.duration.toFixed("2")} hr` : "Holiday"}</div></td>
                                                                        {/* <td className={`time-table-data ${reprt.is_off_month ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
                                                                    </>
                                                                )
                                                            } else {
                                                                return (
                                                                    <>
                                                                            <td onClick={()=>handleShow(item,index,reprt)} className={`time-table-data white-nowrap ${reprt.is_off_month ? "offday-data" : "workday-data"}`} ><div>{reprt?.duration ? `${reprt?.duration.toFixed("2")} hr` : "Holiday"}</div></td>
                                                                        {/* <td className={`time-table-data ${reprt.is_off_year ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
                                                                    </>
                                                                )
                                                            }

                                                        })
                                                    }
                                                    <td className='time-table-data'>{item?.totalDuration>0?item?.totalDuration.toFixed("2"):item?.totalDuration}hr</td>
                                                    {/* <td className="time-table-data white-nowrap">{item?.contractDetails?.employment_type}</td> */}
                                                    <td className="time-table-data">
                                                        <span className={item?.is_complete ? "status-progress white-nowrap" : "status-finished white-nowrap"}>{item?.is_complete ? "Progress" : "Finished"}</span>
                                                    </td>
                                                    <td className="time-table-data">
                                                        <span className="status-progress white-nowrap">Under Review</span>
                                                    </td>
                                                <td className="time-table-data"><div className="d-flex gap-1 align-items-center justify-content-center"><p onClick={()=>handleremarkShow(item,index)} className='remarks-text white-nowrap'>{item?.contractDetails?.remarks?.length>0 ?<OverlayTrigger placement="bottom" overlay={viewremark}><img src={remarkIcon} className="remark-icon" /></OverlayTrigger>:"Add Remarks"}</p><span className="number-count">1</span></div></td>
                                                
                                                    {selectedPeriod == "weekly"  ? <td className="time-table-data">
                                                        <RexettButton
                                                            type="submit"
                                                            text={currentTextData(role,item?.isisApproved)}
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
                    <SingleTimeReporting currentDetails={currentDetails} selectedPeriod={selectedPeriod} role={role}  />
                    }
                        
                    {  selectedPeriod == "monthly" &&  
                        <SingleTimeReporting currentDetails={currentDetails} selectedPeriod={selectedPeriod} role={role}/>
                    }

                    {/* { selectedPeriod == "yearly" &&  <SingleTimeReporting currentDetails={currentDetails} selectedPeriod={selectedPeriod}/> } */}
                        { selectedPeriod == "yearly" &&  <SingleTimeReporting currentDetails={currentDetails} selectedPeriod={selectedPeriod} role={role}/>}
                    </Offcanvas.Body>
                </Offcanvas>
            {remarkshow ?<TimeReportRemark remarkshow={remarkshow} handleremarkClose={handleremarkClose} currentDetails={currentDetails} page={page}/>:""}
            <ConfirmationModal
            text={`Are you sure to Approve this time sheet?`}
            show={approvedConfirmation?.isApproved}
            handleClose={handleCloseApproveModal}
            onClick={handleTimeSheetApprove}
            smallLoader={approvedLoader}
        />
            </div>
            <div className="helper-text-section">
                <h3>Guiding You Through: Helpful Text to Navigate Time Reporting</h3>
                <ol className="ps-3 mb-0">
                    <li className="mb-2">
                        <p>Admin can effortlessly review daily time sheets and promptly raise invoices for clients. Click on any client's name in the table above to delve deeper into their project and time reporting details. Gain insights and manage project progress with precision. Also you can raise invoice for clients and track the invoices for Devs , Vendors and Clients.</p>
                    </li>
                    <li className="mb-2">
                        <p>Admin can effortlessly review daily time sheets and promptly raise invoices for clients. Click on any client's name in the table above to delve deeper into their project and time reporting details. Gain insights and manage project progress with precision. Also you can raise invoice for clients and track the invoices for Devs , Vendors and Clients.</p>
                    </li>
                    <li className="mb-0">
                        <p>Admin can effortlessly review daily time sheets and promptly raise invoices for clients. Click on any client's name in the table above to delve deeper into their project and time reporting details. Gain insights and manage project progress with precision. Also you can raise invoice for clients and track the invoices for Devs , Vendors and Clients.</p>
                    </li>
                </ol>
            </div>
        </>
    )
}

export default RexettTable