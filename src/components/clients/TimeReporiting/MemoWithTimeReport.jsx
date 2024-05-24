import React from 'react'
import userImage from "../../../assets/img/user-img.jpg"
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import moment from 'moment';
const MemoWithTimeReport = ({item}) => {
    let {end_time,start_time,memo,report_date}=item
  return (
    <div className='weekly-detail mb-3 p-3'>
        <div className='client-info mb-3 gap-5'>
            <div className='mb-2'>
                <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar />{report_date}</p>
            </div>
            <div className='d-flex gap-4 justify-content-between'>
                <div className='d-flex gap-3 align-items-center'>
                    <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock />{start_time? moment(start_time, 'HH:mm:ss').format('h:mm:ss A'):"00:00"}</p>
                    <p className='client-name-heading'>-</p>
                    <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock />{end_time? moment(end_time, 'HH:mm:ss').format('h:mm:ss A'):"00:00"}</p>
                </div>
            </div>
        </div>
        <div className='client-info'>
            <h4 className='sidebar-heading'>Memo</h4>
            <p className='client-name-heading'>{memo?memo:"Memo not Found"}</p>
        </div>
    </div>
  )
}

export default MemoWithTimeReport