import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { Tooltip , OverlayTrigger } from "react-bootstrap";
import { NOTIFICATIONBASEURL, getToken } from "../helper/utlis";
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../redux/slices/adminDataSlice";
import moment from "moment";
import Notification from "./atomic/Notfication";
import { useTranslation } from "react-i18next";
import LanguageChange from "./atomic/LanguageChange";

const adminName = localStorage.getItem("userName")
const tooltip = (
    <Tooltip id="tooltip">
      {adminName}
    </Tooltip>
  );
const AdminNavigation = ({ handleSidebar }) => {
    const{t} = useTranslation()

    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                        {/* <button onClick={handleSidebar} className="bars-btn"><HiBars3 /></button> */}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <LanguageChange/>
                        <Notification route="notification-admin"  job="admin-single-job" doc="admin-documents" />
                        <Link to={'/developer-list'} className="text-decoration-none main-btn">{t("listOfAllDevelopers")}</Link>
                        <OverlayTrigger placement="bottom" overlay={tooltip}>
                            <div className="profile-view">
                                <span>{adminName.split("")[0]}</span>
                            </div>
                        </OverlayTrigger>
                    </div>
                </div>
            </header>
        </>
    )
}
export default AdminNavigation;