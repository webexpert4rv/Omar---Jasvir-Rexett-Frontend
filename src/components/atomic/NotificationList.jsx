import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { FaBell } from "react-icons/fa6";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScreenLoader from "./ScreenLoader";
import { getNotification, markAsRead } from "../../redux/slices/adminDataSlice";
import NoDataFound from "../atomic/NoDataFound"
const NotificationList = ({job,doc}) => {
    const navigate=useNavigate()
    const dispatch =useDispatch()
    const [currenTab,setCurrentTabs]=useState('allNotifications')
    const [nottificationData,setNotificationData]=useState([])
  const { notificationList,screenLoader } = useSelector((state) => state.adminData);

  useEffect(()=>{
    setNotificationData(notificationList[currenTab])   
},[notificationList,currenTab])

const handleNotification=(notificationId,id,data)=>{
    dispatch(markAsRead(notificationId,()=>{
        dispatch(getNotification())
    }))
    if(data=="Documents"){
        navigate(`/${doc}`)
    }else if(data=="Jobs"){
        navigate(`/${job}/${id}`)          
    }
  }

  const handleSelect = (key) => {
    setNotificationData(notificationList[key])   
}

const newTitleFunction=(data)=>{
  const today = new Date();
  const targetDate = new Date(data);
  if (targetDate > today) {
    return true
  }
}

const markAllAsRead=()=>{
  dispatch(markAsRead(undefined,()=>{

  }))
}
  return (
    <>
      {screenLoader ?<ScreenLoader/>: <section className="notification-screen card-box">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h2 className="overview-card-heading fw-bold">Notification</h2>
            {notificationList['unreadNotifications']?.length>0 ?<p className="notification-text">{`You've ${notificationList['unreadNotifications']?.length} unread notifications`}</p>:""}
          </div>
          <Button variant="transparent" className="mark-read-btn" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
        <Tabs
          defaultActiveKey="allNotifications"
          id="justify-tab-example"
          className="mb-3 notification-tabs"
          justify
          onSelect={handleSelect}
        >
          <Tab eventKey="allNotifications" title="All">
            <div className="notification-main pt-4">
              <div className="notification-list">
                {nottificationData.length>0?nottificationData?.map((item) => {
                  return (
                    <>
                      <div className="notification-wrapper" onClick={()=>handleNotification(item?.id,item?.reference_id,item?.reference_model)}>
                        <span className="bell-icon">
                          <FaBell />
                        </span>
                        <div className="d-flex gap-4 justify-content-between">
                          <div>
                            <h3 className="notification-heading">
                              {item?.title}
                              {newTitleFunction(item?.created_at)&&<span className="new-notify">New</span>}
                            </h3>
                            <p className="notification-text">
                             {
                                item?.message
                             }
                            </p>
                          </div>
                          <div className="notify-recieve">
                            <span className="notify-date">{item?.created_at.slice(0,10)}</span>
                            {/* <span className="notify-time">Just Now</span> */}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }):<NoDataFound/>}
              </div>
            </div>
          </Tab>
          <Tab eventKey="readNotifications" title="New">
            <div className="notification-main pt-4">
              <div className="notification-list">

                {nottificationData?.map((item) => {
                  return (
                    <>
                      <div className="notification-wrapper" onClick={()=>handleNotification(item?.id,item?.reference_id,item?.reference_model)}>
                        <span className="bell-icon">
                          <FaBell />
                        </span>
                        <div className="d-flex gap-4 justify-content-between">
                          <div>
                            <h3 className="notification-heading">
                              {item?.title}
                         {newTitleFunction(item?.created_at) && <span className="new-notify">New</span>}
                            </h3>
                            <p className="notification-text">
                             {
                                item?.message
                             }
                            </p>
                          </div>
                          <div className="notify-recieve">
                            <span className="notify-date">{item?.created_at.slice(0,10)}</span>
                            {/* <span className="notify-time">Just Now</span> */}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}

              </div>
            </div>
          </Tab>
          <Tab eventKey="unreadNotifications" title="Read">
            <div className="notification-main pt-4">
              <div className="notification-list">
              {nottificationData?.map((item) => {
                  return (
                    <>
                       <div className="notification-wrapper" onClick={()=>handleNotification(item?.id,item?.reference_id,item?.reference_model)}>
                        <span className="bell-icon">
                          <FaBell />
                        </span>
                        <div className="d-flex gap-4 justify-content-between">
                          <div>
                            <h3 className="notification-heading">
                              {item?.title}
                              {newTitleFunction(item?.created_at) && <span className="new-notify">New</span>}
                            </h3>
                            <p className="notification-text">
                             {
                                item?.message
                             }
                            </p>
                          </div>
                          <div className="notify-recieve">
                            <span className="notify-date">{item?.created_at.slice(0,10)}</span>
                            {/* <span className="notify-time">Just Now</span> */}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </Tab>
        </Tabs>
      </section>}
    </>
  );
};
export default NotificationList;
