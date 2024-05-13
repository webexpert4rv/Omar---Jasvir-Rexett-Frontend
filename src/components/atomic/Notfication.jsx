import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { NOTIFICATIONBASEURL, getToken } from "../../helper/utlis";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getNotification, markAsRead } from "../../redux/slices/adminDataSlice";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Notification = ({ route, job, doc, timeReport }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nottificationData, setNotificationData] = useState([]);
  const { notificationList, screenLoader } = useSelector(
    (state) => state.adminData
  );
  const [newJobPost, setNewJobPost] = useState(null);
  const [notificationModal, setNotificationModal] = useState(false);
  const [notifId, setNotifId] = useState();
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getNotification());
    setNewJobPost(null)
  }, [newJobPost]);

  console.log(notificationList,"notificationList")

  useEffect(() => {
    if (newJobPost !== null) {
      let mergeRow = [newJobPost, ...notificationList["unreadNotifications"]];
      setNotificationData([...nottificationData, ...mergeRow]);
    } else if (nottificationData?.length > 0) {
      setNotificationData(nottificationData);
    } else {
      setNotificationData(notificationList["unreadNotifications"]);
    }
  }, [notificationList, newJobPost]);

  useEffect(() => {
    const socket = io(NOTIFICATIONBASEURL);

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("newJobPost_" + userId, (jobPost) => {
      setNewJobPost(jobPost);
    });

    socket.on("new_job_application_" + userId, (jobPost) => {
      setNewJobPost(jobPost);
    });

    socket.on("job_application_revert_" + userId, (jobPost) => {
      setNewJobPost(jobPost);
    });

    socket.on("file_shared_" + userId, (jobPost) => {
      setNewJobPost(jobPost);
    });
    socket.on("invoice_uploaded_" + userId, (jobPost) => {
      setNewJobPost(jobPost);
    });
    socket.on("registration_loggedin_" + userId, (jobPost) => {
      setNewJobPost(jobPost);
    });
    socket.on("time_report_approved_" + userId, (jobPost) => {
      setNewJobPost(jobPost);
    });
    socket.on("time_report_added_" + userId, (jobPost) => {
      setNewJobPost(jobPost);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNotification = (notificationId, id, data) => {
    setNotifId(notificationId);
    setNotificationModal(false);
    dispatch(
      markAsRead(notificationId, () => {
        dispatch(getNotification());
        setNewJobPost(null);
        setNotificationData([]);
      })
    );
    if (data == "Documents") {
      navigate(`/${doc}`);
    } else if (data == "Jobs") {
      navigate(`/${job}/${id}`);
    } else if (data == "Time_reports") {
      navigate(`/${timeReport}`);
    } else if (data == "Users") {
      navigate(`/admin-single-developer/${id}`);
    }
  };

  const redirectToallScreen = () => {
    dispatch(
      markAsRead(notifId, () => {
        dispatch(getNotification());
      })
    );

    navigate(`/${route}`);
  };

  const handleNotificationBell = () => {
    setNewJobPost(null);
    setNotificationModal(true);
  };

  function compareDates(a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  }
  return (
    <>
      <header>
        <div className="d-flex align-items-center justify-content-between">
          <div className=""></div>
          <div className="d-flex align-items-center gap-3">
            <Dropdown className="notification-dropdown">
              <Dropdown.Toggle
                variant="transparent"
                id="dropdown-basic"
                className="notification-dropdown-toggle p-0"
              >
                <button
                  className={`notification-btn ${
                    newJobPost !== null ? "active" : ""
                  } `}
                  onClick={handleNotificationBell}
                >
                  {notificationList?.unreadCount > 0 ? (
                    <span className="bell-count">
                      {notificationList.unreadCount}
                    </span>
                  ) : (
                    ""
                  )}
                  <FaBell />
                </button>
              </Dropdown.Toggle>
              {notificationModal && (
                <Dropdown.Menu className="notification-dropdown-menu">
                  <div className="dropdown-notify-wrapper">
                    {nottificationData?.length > 0 ? (
                      [...nottificationData]
                        ?.sort(compareDates)
                        ?.map((item) => {
                          return (
                            <>
                              <div
                                className="dropdown-notify-item"
                                onClick={() =>
                                  handleNotification(
                                    item?.id,
                                    item?.reference_id,
                                    item?.reference_model
                                  )
                                }
                              >
                                <h4 className="dropdown-notifyheading">
                                  {item?.title}
                                </h4>
                                <p className="dropdown-notifytext">
                                  {item?.message}
                                </p>
                                <div className="text-end mt-2">
                                  <span className="dropdown-notify-time">
                                    {moment(item?.created_at).fromNow()}
                                  </span>
                                </div>
                              </div>
                            </>
                          );
                        })
                    ) : (
                      <Dropdown.Item className="text-center no-notification">
                        {t("youHaveNoNotification")}
                      </Dropdown.Item>
                    )}
                  </div>
                    <Dropdown.Item
                      onClick={redirectToallScreen}
                      className="see-all-notify mt-4"
                    >
                      {" "}


                  {t("seeAll")}
                    </Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
};
export default Notification;
