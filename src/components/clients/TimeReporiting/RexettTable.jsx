import React from 'react'
import { Form, Button } from "react-bootstrap";
import developerImg from '../../../assets/img/user-img.jpg'

const RexettTable = ({selectedPeriod,headerColumn,data}) => {
    console.log(data,"timeReportingData")
  return (
    <div className={`weekly-report-table ${selectedPeriod}`}>
    <div className="table-responsive">
        <table className="table time-table table-bordered">
            <thead>
                <th className="time-table-head">
                    Developer Name
                </th>
                <th className="time-table-head">
                    Image of Developer
                </th>
                {
                    headerColumn?.map((item,index)=>{
                        return (
                            <>
                            <th className="time-table-head">
                            {item}
                            </th>
                            </>
                        )
                    })
                }
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
                    data?.map((item)=>{
                        return(
                            <>
                            <tr>
                    <td className="time-table-data">{item?.contractDetails?.developer_details?.name}</td>
                    <td className="time-table-data"><img src={item?.contractDetails?.developer_details?.profile_picture} className="developer-img" alt="" /></td>   
                    {
                        item?.timeReports?.map((reprt)=>{
                            return (
                                <>
                                 <td className={`time-table-data ${reprt.is_off_day?"offday-data":""}`} >{`${reprt?.start_time} - ${reprt?.end_time} `}</td>
                                </>
                            )
                        })
                    }
                    <td className="time-table-data">{item?.contractDetails?.employment_type}</td>
                    <td className="time-table-data">
                        <Form.Select value={item?.contractDetails?.status?"finished":"progress"} className="status-select shadow-none">
                            <option value="finished">Finished</option>
                            <option value="progress">Progress</option>
                        </Form.Select>
                    </td>
                    <td className="time-table-data">
                        <Button variant="transparent" className="outline-main-btn">Submit & Approved</Button>
                    </td>
                </tr>
                            </>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
</div>
  )
}

export default RexettTable