import React from 'react'
import userImage from "../../../assets/img/user-img.jpg"
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import moment from 'moment';

const SingleTimeReporting = ({currentDetails}) => {
    console.log(currentDetails,"currentDetails")
    let {contractDetails:{user_details},endDate,startDate,timeReports:{end_time,start_time}}=currentDetails
  return (
   <div className='detail-view day-view'>
    <div className='client-info mb-3'>
        <h4 className='sidebar-heading'>Developer Name</h4>
        <p className='client-name-heading'><img src={user_details?.profile_picture}/>{user_details?.name}</p>
    </div>
    <div className='client-info mb-3 d-`flex gap-5'>
        <div className='mb-0'>
            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
        </div>
        <div className='d-flex gap-4 justify-content-between'>
            <div className='d-flex gap-3 align-items-center'>
                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock />{start_time? moment(start_time, 'HH:mm:ss').format('h:mm:ss A'):"-"}</p>
                <p className='client-name-heading'>-</p>
                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock />{start_time? moment(end_time, 'HH:mm:ss').format('h:mm:ss A'):"-"}</p>
            </div>
        </div>
    </div>
<div class="weekly-detail">
    <div className='client-info'>
        <h4 className='sidebar-heading'>Memo</h4>
        <p className='client-name-heading'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
    </div>
</div>
</div>
  )
}

export default SingleTimeReporting