import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { approvedClient } from '../../../redux/slices/clientDataSlice';
import RexettButton from '../../atomic/RexettButton';
import ScreenLoader from '../../atomic/ScreenLoader';
import NoDataFound from '../../atomic/NoDataFound';
import moment from 'moment';

const RexettTable = ({ selectedPeriod, headerColumn, data, role }) => {
    const { approvedLoader, smallLoader } = useSelector(state => state.clientData)
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
                                <th className="time-table-head">
                                    <span>{role !== "developer" ? "Image of Developer" : "Image of Client"}</span>
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
                                <th className="time-table-head">
                                    <span>Contract</span>
                                </th>
                                <th className="time-table-head">
                                    <span>Status</span>
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
                                                <td className="time-table-data">{item?.contractDetails?.user_details?.name}</td>
                                                <td className="time-table-data"><img src={item?.contractDetails?.user_details?.profile_picture} className="developer-img" alt="" /></td>
                                                {
                                                    item?.timeReports?.map((reprt) => {
                                                        if (reprt.report_date) {
                                                            return (
                                                                <>
                                                                    <td className={`time-table-data white-nowrap ${reprt.is_off_day ? "offday-data" : ""}`} >{reprt.start_time && reprt?.end_time ? `${moment(reprt?.start_time, 'HH:mm:ss').format('h:mm:ss A')} - ${moment(reprt?.end_time, 'HH:mm:ss').format('h:mm:ss A')} ` : "-"}</td>
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
                                                <td className='time-table-data'>{item?.totalDuration}hr</td>
                                                <td className="time-table-data white-nowrap">{item?.contractDetails?.employment_type}</td>
                                                <td className="time-table-data">
                                                    <span className={item?.contractDetails?.status ? "status-progress" : "status-finished"}>{item?.contractDetails?.status ? "Progress" : "Finished"}</span>
                                                </td>
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
        </div>
    )
}

export default RexettTable