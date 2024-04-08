import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { FaBell } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const NotificationAdmin = () => {
  const navigate = useNavigate()
  const { notificationList } = useSelector((state) => state.adminData);
  const [nottificationData ,setNotificationData] = useState()
  const handleNotification = (id) => {
    navigate(`/admin-single-job/${id}`)
  }

  const handleSelect = (key) => {
    setNotificationData(notificationList[key])   
}
  return (
    <>
      <section className="notification-screen card-box">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h2 className="overview-card-heading fw-bold">Notification</h2>
            <p className="notification-text">You've 3 unread notifications</p>
          </div>
          <Button variant="transparent" className="mark-read-btn">
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
                {nottificationData?.map((item) => {
                  return (
                    <>
                      <div className="notification-wrapper" onClick={() => handleNotification(item?.reference_id)}>
                        <span className="bell-icon">
                          <FaBell />
                        </span>
                        <div className="d-flex gap-4 justify-content-between">
                          <div>
                            <h3 className="notification-heading">
                              {item?.title}
                              <span className="new-notify">New</span>
                            </h3>
                            <p className="notification-text">
                              {
                                item?.message
                              }
                            </p>
                          </div>
                          <div className="notify-recieve">
                            <span className="notify-date">{item?.created_at.slice(0, 10)}</span>
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
          <Tab eventKey="readNotifications" title="New">
            <div className="notification-main pt-4">
              <div className="notification-list">
                <div className="notification-wrapper">
                  <span className="bell-icon">
                    <FaBell />
                  </span>
                  <div className="d-flex gap-4 justify-content-between">
                    <div>
                      <h3 className="notification-heading">
                        You are Shortlisted for Amazon project{" "}
                        <span className="new-notify">New</span>
                      </h3>
                      <p className="notification-text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </div>
                    <div className="notify-recieve">
                      <span className="notify-date">10-02-2023</span>
                      <span className="notify-time">Just Now</span>
                    </div>
                  </div>
                </div>
                <div className="notification-wrapper">
                  <span className="bell-icon">
                    <FaBell />
                  </span>
                  <div className="d-flex gap-4 justify-content-between">
                    <div>
                      <h3 className="notification-heading">
                        You are Shortlisted for Amazon project{" "}
                        <span className="new-notify">New</span>
                      </h3>
                      <p className="notification-text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </div>
                    <div className="notify-recieve">
                      <span className="notify-date">10-02-2023</span>
                      <span className="notify-time">Just Now</span>
                    </div>
                  </div>
                </div>
                <div className="notification-wrapper">
                  <span className="bell-icon">
                    <FaBell />
                  </span>
                  <div className="d-flex gap-4 justify-content-between">
                    <div>
                      <h3 className="notification-heading">
                        You are Shortlisted for Amazon project{" "}
                        <span className="new-notify">New</span>
                      </h3>
                      <p className="notification-text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </div>
                    <div className="notify-recieve">
                      <span className="notify-date">10-02-2023</span>
                      <span className="notify-time">Just Now</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="notification-readarea">
                <div className="">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 className="notification-heading">
                        You are Shortlisted for Amazon project{" "}
                        <span className="new-notify">New</span>
                      </h3>
                      <Button variant="transparent" className="close-btn ms-2">
                        &times;
                      </Button>
                    </div>
                    <p className="notification-text">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                    <Button
                      variant="transparent"
                      className="mark-read-btn py-2"
                    >
                      Mark as read
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="unreadNotifications" title="Read">
            <div className="notification-main pt-4">
              <div className="notification-list">
                <div className="notification-wrapper">
                  <span className="bell-icon">
                    <FaBell />
                  </span>
                  <div className="d-flex gap-4 justify-content-between">
                    <div>
                      <h3 className="notification-heading">
                        You are Shortlisted for Amazon project
                      </h3>
                      <p className="notification-text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </div>
                    <div className="notify-recieve">
                      <span className="notify-date">10-02-2023</span>
                      <span className="notify-time">Just Now</span>
                    </div>
                  </div>
                </div>
                <div className="notification-wrapper">
                  <span className="bell-icon">
                    <FaBell />
                  </span>
                  <div className="d-flex gap-4 justify-content-between">
                    <div>
                      <h3 className="notification-heading">
                        You are Shortlisted for Amazon project
                      </h3>
                      <p className="notification-text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </div>
                    <div className="notify-recieve">
                      <span className="notify-date">10-02-2023</span>
                      <span className="notify-time">Just Now</span>
                    </div>
                  </div>
                </div>
                <div className="notification-wrapper">
                  <span className="bell-icon">
                    <FaBell />
                  </span>
                  <div className="d-flex gap-4 justify-content-between">
                    <div>
                      <h3 className="notification-heading">
                        You are Shortlisted for Amazon project
                      </h3>
                      <p className="notification-text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </div>
                    <div className="notify-recieve">
                      <span className="notify-date">10-02-2023</span>
                      <span className="notify-time">Just Now</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="notification-readarea">
                <div className="">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 className="notification-heading">
                        You are Shortlisted for Amazon project
                      </h3>
                      <Button variant="transparent" className="close-btn ms-2">
                        &times;
                      </Button>
                    </div>
                    <p className="notification-text">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                    <Button
                      variant="transparent"
                      className="mark-read-btn py-2"
                    >
                      Mark as read
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </section>
    </>
  );
};
export default NotificationAdmin;
