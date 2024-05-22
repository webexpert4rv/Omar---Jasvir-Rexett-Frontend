import React from "react";
import { HiBars3 } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import Notification from "./atomic/Notfication";
import { useTranslation } from "react-i18next";
import LanguageChange from "./atomic/LanguageChange";
import { GoArrowLeft } from "react-icons/go";
import ToolTip from "./common/Tooltip/ToolTip";

const str = String(localStorage.getItem("userName"));
const clientName = str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
const Navigation = ({ handleSidebar, handlemainSidebar, sidebaractive }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let url = pathname.split("/")[1];

  const backBtn = () => {
    navigate("/job-posted");
  };

  return (
    <>
      <header className="mb-4 zIndex3">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            {url == "single-job" ? (
              <Button
                onClick={backBtn}
                className="outline-main-btn px-3 py-2 font-14"
              >
                <GoArrowLeft /> Back
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex align-items-center gap-3">
            <LanguageChange />
            <Notification
              route="notification-client"
              job="single-job"
              doc="documents"
            />
            <ToolTip text=" Create Job">
              <button
                className="main-btn add-new-job-btn"
                onClick={() => navigate("/job-post")}
              >
                +
              </button>
            </ToolTip>
            <ToolTip text={clientName}>
              <div className="profile-view">
                <span> {clientName?.split("")[0]}</span>
              </div>
            </ToolTip>
            <div></div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navigation;
