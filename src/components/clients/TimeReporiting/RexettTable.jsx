import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { approvedClient } from '../../../redux/slices/clientDataSlice';
import RexettButton from '../../atomic/RexettButton';
import ScreenLoader from '../../atomic/ScreenLoader';

const RexettTable = ({ selectedPeriod, headerColumn, data,role }) => {
    const { approvedLoader,smallLoader } = useSelector(state => state.clientData)
    const [selectedApprovedBtn,setSelectedApprovedBtn]=useState(null)
    const dispatch = useDispatch()
    const submitApproved = (id,index) => {
        setSelectedApprovedBtn(index)
        dispatch(approvedClient(id))
    }
    return (
        <div className={`weekly-report-table ${selectedPeriod}`}>
            <div className="table-responsive">
                {smallLoader?<ScreenLoader/>:
                    <table className="table time-table table-bordered">
                    <thead>
                        {/* <th className="time-table-head">
                            Developer Name
                        </th> */}
                        {/* <th className="time-table-head">
                            Image of Developer
                        </th> */}
                        {role==="developer" ?<th className="time-table-head">
                           Client Name
                        </th>:""}
                        {
                            headerColumn?.map((item, index) => {
                                return (
                                    <>
                                        <th className="time-table-head">
                                            {item}
                                        </th>
                                    </>
                                )
                            })
                        }
                        {role==="developer"? <th className="time-table-head">
                            Total Hours
                        </th>:""}
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
                        {
                            data?.map((item,index) => {
                                return (
                                    <>
                                        <tr>
                                            <td className="time-table-data">{item?.contractDetails?.developer_details?.name}</td>
                                            {/* <td className="time-table-data"><img src={item?.contractDetails?.developer_details?.profile_picture} className="developer-img" alt="" /></td> */}
                                            {
                                                item?.timeReports?.map((reprt) => {
                                                    if (reprt.report_date) {
                                                        return (
                                                            <>
                                                                <td className={`time-table-data ${reprt.is_off_day ? "offday-data" : ""}`} >{reprt.start_time && reprt?.end_time ? `${reprt?.start_time} - ${reprt?.end_time} ` : "-"}</td>
                                                            </>
                                                        )
                                                    } else if (reprt.month) {
                                                        return (
                                                            <>
                                                                <td className={`time-table-data ${reprt.is_off_month ? "offday-data" : ""}`} >{reprt?.duration ? reprt?.duration : "-"}</td>
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <>
                                                                <td className={`time-table-data ${reprt.is_off_year ? "offday-data" : ""}`} >{reprt?.duration ? reprt?.duration : "-"}</td>
                                                            </>
                                                        )
                                                    }

                                                })
                                            }
                                            <td className='time-table-data'>200 hrs</td>
                                            <td className="time-table-data">{item?.contractDetails?.employment_type}</td>
                                            <td className="time-table-data">
                                                <span>{item?.contractDetails?.status ? "Progress" : "Finished"}</span>
                                            </td>
                                            <td className="time-table-data">
                                                <RexettButton
                                                    type="submit"
                                                    text="Submit & Approved"
                                                    className="outline-main-btn"
                                                    variant="transparent"
                                                    onClick={() => submitApproved(item?.contractDetails?.client_id,index)}
                                                    isLoading={selectedApprovedBtn===index?approvedLoader:false}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }

                    </tbody>
                </table>}
            </div>
        </div>
    )
}

export default RexettTable