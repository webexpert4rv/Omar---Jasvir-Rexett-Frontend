import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "react-bootstrap";
import Notification from "../atomic/Notfication";
import LanguageChange from "../atomic/LanguageChange";
import { GoArrowLeft } from "react-icons/go";
import ToolTip from "../common/Tooltip/ToolTip";
import DeveloperCheckInOut from "./DeveloperCheckInOut";
import RexettMarquee from "./RexettMarquee";
import moment from "moment";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const clientName = localStorage
  .getItem("userName")
  ?.toString()
  .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

const RexettHeader = ({ role }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [fridayMarquee, setFridayMarquee] = useState(false);
  const { pathname } = useLocation();
  const isSingleJob = pathname.split("/")[2];
  const routePath = (isSingleJob) => {
    const data = {
      "single-job": "/client/job-posted",
      "client-single-developer": "/client/dashboard",
      "admin-single-job": "/admin/admin-job-listing",
    };

    return data[isSingleJob] || false;
  };

  useEffect(() => {
    const dt = moment(new Date(), "YYYY-MM-DD HH:mm:ss").format("dddd");
    setFridayMarquee(dt);
  }, []);

  const backBtn = () => {
    let routeName = routePath(isSingleJob);
    navigate(routeName);
  };

  return (
    <>
      {role == "developer" ? (
        <RexettMarquee fridayMarquee={fridayMarquee} />
      ) : (
        ""
      )}
      <header className="mb-4 zIndex3">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            {routePath(isSingleJob) && (
              <Button
                onClick={backBtn}
                className="outline-main-btn px-3 py-2 font-14"
              >
                <GoArrowLeft /> Back
              </Button>
            )}
          </div>
          <div className="d-flex align-items-center gap-3">
            {role == "developer" ? <DeveloperCheckInOut /> : ""}
            <LanguageChange />
            <Notification
              route="notification-client"
              job="single-job"
              doc="documents"
            />
            {role == "client" ? (
              <ToolTip text="Create Job">
                <button
                  className="main-btn add-new-job-btn"
                  onClick={() => navigate("/client/job-post")}
                >
                  +
                </button>
              </ToolTip>
            ) : (
              ""
            )}
            {role == "vendor" ? (
              <Link
                to={"/register-developer"}
                className="text-decoration-none main-btn"
              >
                {t("registerNewDeveloper")}
              </Link>
            ) : (
              ""
            )}
            <ToolTip text={clientName}>
              <div className="profile-view">
                <span>{clientName?.charAt(0)}</span>
              </div>
            </ToolTip>
          </div>
        </div>
      </header>
    </>
  );
};

export default RexettHeader;
