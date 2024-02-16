import React from "react";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
const AdminNavigation = ({ handleSidebar }) => {
    return(
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                        <button onClick={handleSidebar} className="bars-btn"><HiBars3 /></button>
                    </div>
                    <div className="d-flex gap-3">
                        <button className="notification-btn"><FaBell /></button>
                        <Link to={'/developer-list'} className="text-decoration-none main-btn">List of all developers</Link>
                    </div>
                </div>
            </header>
        </>
    )
}
export default AdminNavigation;