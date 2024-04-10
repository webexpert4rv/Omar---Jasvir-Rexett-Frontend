import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { Dropdown } from "react-bootstrap";
import { NOTIFICATIONBASEURL, getToken } from "../helper/utlis";
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../redux/slices/adminDataSlice";
import moment from "moment";
import Notification from "./atomic/Notfication";
const AdminNavigation = ({ handleSidebar }) => {

    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                        {/* <button onClick={handleSidebar} className="bars-btn"><HiBars3 /></button> */}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <Notification route="notification-admin"  job="admin-single-job" doc="admin-documents" />
                        <Link to={'/developer-list'} className="text-decoration-none main-btn">List of all developers</Link>
                    </div>
                </div>
            </header>
        </>
    )
}
export default AdminNavigation;