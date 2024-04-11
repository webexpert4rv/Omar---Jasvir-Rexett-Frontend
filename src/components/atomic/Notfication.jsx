import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import {useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { NOTIFICATIONBASEURL, getToken } from "../../helper/utlis";
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { getNotification, markAsRead } from "../../redux/slices/adminDataSlice";
import moment from "moment";
import ScreenLoader from "./ScreenLoader";
import { toast } from 'react-toastify';
const Notification = ({route,job,doc}) => {
 const dispatch =useDispatch()
 const navigate=useNavigate()
 const [nottificationData,setNotificationData]=useState([])
 const {notificationList,screenLoader}=useSelector(state=>state.adminData)
 const [newJobPost,setNewJobPost]=useState(null)
 const [notificationModal,setNotificationModal]=useState(false)

 const userId=localStorage.getItem("userId")

    useEffect(()=>{
        dispatch(getNotification())
    },[])

    useEffect(()=>{
        if(newJobPost!==null){
          let mergeRow=[newJobPost,...notificationList['unreadNotifications']]
            setNotificationData([...nottificationData,...mergeRow])

        }else if(nottificationData?.length>0){
            setNotificationData(nottificationData)
        }else{
            setNotificationData(notificationList['unreadNotifications'])
        }
    },[notificationList,newJobPost])

    useEffect(() => {
        const socket = io(NOTIFICATIONBASEURL);
    
        socket.on('connect', () => {
          console.log('Connected to Socket.IO server');
        });
    
        socket.on('newJobPost_'+userId, (jobPost) => {
            setNewJobPost(jobPost)
            toast.success(jobPost.message)
            
          });

          socket.on('new_job_application_'+userId, (jobPost) => {
            setNewJobPost(jobPost)
            toast.success(jobPost.message)
          });

          socket.on('job_application_revert_'+userId, (jobPost) => {
            setNewJobPost(jobPost)
            toast.success(jobPost.message)
          });
    
          socket.on('file_shared_'+userId, (jobPost) => {
            setNewJobPost(jobPost)
            toast.success(jobPost.message)
          });
          socket.on('invoice_uploaded_'+userId, (jobPost) => {
            setNewJobPost(jobPost)
            toast.success(jobPost.message)
          });
          socket.on('time_report_approved_'+userId, (jobPost) => {
            setNewJobPost(jobPost)
            toast.success(jobPost.message)
          });
          socket.on('time_report_added_'+userId, (jobPost) => {
            setNewJobPost(jobPost)
            toast.success(jobPost.message)
          });
          
        socket.on('disconnect', () => {
          console.log('Disconnected from Socket.IO server');
        });

        return () => {
          socket.disconnect();
        };
      }, []); 



      const handleNotification=(notificationId,id,data)=>{
        setNotificationModal(false)
        dispatch(markAsRead(notificationId,()=>{
            dispatch(getNotification())
            setNewJobPost(null)
            setNotificationData([])
        }))
        if(data=="Documents"){
            navigate(`/${doc}`)
        }else if(data=="Jobs"){
            navigate(`/${job}/${id}`)          
        }
      }

      const redirectToallScreen=()=>{
        navigate(`/${route}`)
      }

      const handleNotificationBell=()=>{
        setNewJobPost(null)
        setNotificationModal(true)
      }

      function compareDates(a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
    }

    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                    </div>
                    <div className="d-flex align-items-center gap-3">
                       <Dropdown className="notification-dropdown">
                            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="notification-dropdown-toggle p-0">
                                <button className={`notification-btn ${newJobPost!==null?"active":""} `} onClick={handleNotificationBell} ><FaBell /></button>
                            </Dropdown.Toggle>
                            {notificationModal &&<Dropdown.Menu className="notification-dropdown-menu">
                                <div className="dropdown-notify-wrapper">
                                   {nottificationData.length>0? [...nottificationData]?.sort(compareDates)?.map((item)=>{
                                    return (
                                        <>
                                         <div className="dropdown-notify-item" onClick={()=>handleNotification(item?.id,item?.reference_id,item?.reference_model)}>
                                        <h4 className="dropdown-notifyheading">{item?.title}</h4>
                                        <p className="dropdown-notifytext">{item?.message}</p>
                                        <div className="text-end mt-2">
                                            <span className="dropdown-notify-time">{moment(item?.created_at).fromNow()}</span>
                                        </div>
                                    </div>
                                        </>
                                    )
                                   }): <Dropdown.Item className="text-center no-notification">You have no notification</Dropdown.Item> }

                                </div>
                                <Dropdown.Item onClick={redirectToallScreen} className="see-all-notify mt-4"> See All</Dropdown.Item>
                                
                            </Dropdown.Menu>}
                        </Dropdown>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Notification;