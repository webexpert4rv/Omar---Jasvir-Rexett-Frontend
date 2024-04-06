import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import {useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { NOTIFICATIONBASEURL, getToken } from "../../helper/utlis";
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../../redux/slices/adminDataSlice";
import moment from "moment";
const Notification = ({ handleSidebar }) => {
 const dispatch =useDispatch()
 const navigate=useNavigate()
 const [nottificationData,setNotificationData]=useState([])
 const {notificationList}=useSelector(state=>state.adminData)
 const [newJobPost,setNewJobPost]=useState(null)

 console.log(notificationList,"notifcti")
    useEffect(()=>{
        dispatch(getNotification())
    },[])

    useEffect(()=>{
        if(newJobPost!==null){
            setNotificationData([newJobPost,...notificationList['unreadNotifications']])

        }else if(nottificationData?.length>0){
            setNotificationData(nottificationData)
        }else{
            setNotificationData(notificationList['unreadNotifications'])
        }
    },[notificationList,newJobPost])
    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io(NOTIFICATIONBASEURL);
    
        // Define event handlers
        socket.on('connect', () => {
          console.log('Connected to Socket.IO server');
        });
    
        socket.on('newJobPost', (jobPost) => {
            console.log('New job post received:', jobPost);
            setNewJobPost(jobPost)
            // Handle the new job post data here
          });

          socket.on('job_application_revert', (jobPost) => {
            console.log('New job post received:', jobPost);
            setNewJobPost(jobPost)
            // Handle the new job post data here
          });
    
          
        socket.on('disconnect', () => {
          console.log('Disconnected from Socket.IO server');
        });
    
        // Clean up the socket connection when the component unmounts
        return () => {
          socket.disconnect();
        };
      }, []); 

      console.log(nottificationData,"nottificationData")

      const handleNotification=(id,data)=>{
        if(data=="Documents"){
            navigate(`/admin-documents`)
        }else{
            navigate(`/admin-single-job/${id}`)          
        }
      }

      const redirectToallScreen=()=>{
        navigate('/notification-admin')
      }

      const handleNotificationBell=()=>{
        setNewJobPost(null)
      }
    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                        {/* <button onClick={handleSidebar} className="bars-btn"><HiBars3 /></button> */}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <Dropdown className="notification-dropdown">
                            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="notification-dropdown-toggle p-0">
                                <button className={`notification-btn ${newJobPost!==null?"active":""} `} onClick={handleNotificationBell} ><FaBell /></button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="notification-dropdown-menu">
                                <div className="dropdown-notify-wrapper">
                                   {nottificationData?.length>0? nottificationData?.map((item)=>{
                                    return (
                                        <>
                                         <div className="dropdown-notify-item" onClick={()=>handleNotification(item?.reference_id,item?.reference_model)}>
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
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Notification;