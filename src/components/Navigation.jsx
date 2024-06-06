import React from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "react-bootstrap";
import Notification from "./atomic/Notfication";
import LanguageChange from "./atomic/LanguageChange";
import { GoArrowLeft } from "react-icons/go";
import ToolTip from "./common/Tooltip/ToolTip";

const clientName = localStorage.getItem("userName")
  ?.toString()
  .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSingleJob = pathname.split("/")[2] === "single-job";

  const backBtn = () => {
    navigate("/client/job-posted");
  };

  return (
    <header className="mb-4 zIndex3">
      <div className="d-flex align-items-center justify-content-between gap-3">
        <div>
          {isSingleJob && (
            <Button onClick={backBtn} className="outline-main-btn px-3 py-2 font-14">
              <GoArrowLeft /> Back
            </Button>
          )}
        </div>
        <div className="d-flex align-items-center gap-3">
          <LanguageChange />
          <Notification route="notification-client" job="single-job" doc="documents" />
          <ToolTip text="Create Job">
            <button
              className="main-btn add-new-job-btn"
              onClick={() => navigate("/client/job-post")}
            >
              +
            </button>
          </ToolTip>
          <ToolTip text={clientName}>
            <div className="profile-view">
              <span>{clientName?.charAt(0)}</span>
            </div>
          </ToolTip>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
