import React, { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import userImg from "../../../assets/img/user-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaTimes } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlinePersonRemove } from "react-icons/md";
import NoDataFound from "../../atomic/NoDataFound";
import RexettPagination from "../../atomic/RexettPagination";
import { useSelector } from "react-redux";
import { ImUserCheck } from "react-icons/im";
import { PiUserRectangleFill } from "react-icons/pi";
import { ImUserMinus } from "react-icons/im";
import { RiUserAddFill } from "react-icons/ri";
import ScreenLoader from "../../atomic/ScreenLoader";
import { LuMessagesSquare } from "react-icons/lu";
import ScheduleMeeting from "../Modals/ScheduleMeeting";
import { FaStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const JobCard = ({
  handleJobStatusModal,
  type,
  data,
  jobStatus,
  // role,
  setPage,
  page,
}) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
  const [ showScheduleMeeting , setShowScheduleMeet ] = useState(false);
  const { singleJobPagination, screenLoader } = useSelector(
    (state) => state.adminData
  );
console.log(role,"role")
  console.log(type,"type")
  console.log(jobStatus,"jobStatus")
  const scheduleInterview = (
    <Tooltip>Move to Interview</Tooltip>
  )
  const approvedApply = (
    <Tooltip>Approve</Tooltip>
  )
  const rejectedApply = (
    <Tooltip>Reject</Tooltip>
  )
  const developerCardToolTip = (
    <Tooltip id="tooltip">
      {type === "interviewing" ? "Hire" : type === "Shortlisted" ? " Move to Interview" : "Shortlist"}
    </Tooltip>
  );


  const suggestedCardToolTip = (status) => {
    return (
      <Tooltip id="tooltip">
        {status ? " Remove from suggestion" : "Suggest the developer"}
      </Tooltip>
    );
  };

  const handleDeveloperCard = (e, id) => {
    if (role == "client") {
      navigate(`/client/client-single-developer/${id}`);
    } else if (role === "admin") {
      navigate(`/admin-single-developer/${id}`);
    }
  };
  
  const handleShowScheduleMeeting = () => {
    setShowScheduleMeet(!showScheduleMeeting);
  }
  const handleCloseScheduleMeeting = () =>{
    setShowScheduleMeet(false);
  }
  const rejectedCardToolTip = <Tooltip id="tooltip">Reject</Tooltip>;

  return (
    <>
      {screenLoader ? <ScreenLoader /> : <>
        <h5>List of {type} Developers</h5>
        <div className="developers-list job-card pt-0">
          {data?.length > 0 ? (
            <>
              {data?.map((item, index) => {
                return (
                  <>

                    <div
                      className={
                        item?.recommed
                          ? "developer-card recomed-dev p-0"
                          : "developer-card p-0"
                      }
                    >

                      {/* <div className="tag-developer">{item?.recommed ? "Recommend" : "Suggest"}</div> */}
                      <div className="tag-developer">
                        {type && type === "suggested"  ? "Suggest" : type}
                      </div>
                      <div className="overflow-hidden inner-dev-card">
                        <div
                          className="user-imgbx"
                          onClick={(e) =>
                            handleDeveloperCard(e, item?.id)
                          }
                        >
                          <img
                            src={
                              item?.developer?.profile_picture
                                ? item?.developer?.profile_picture
                                : userImg
                            }
                            alt="developer"
                            className="user-img"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">{item?.developer?.name}</h3>
                          <div className="text-center mt-2">
                            <span className="status-finished w-auto d-inline-block mb-2">Profile Match - <strong>{item?.matchPercentage}%</strong></span>
                          </div>
                          <div className="mb-2">
                            <span className="status-upcoming d-inline-flex align-items-center gap-1">
                              <FaStar /> 4.4
                            </span>
                          </div>
                          {/* <p className="designation-user">{item?.name}</p> */}
                          <p className="email-user">{item?.developer?.developer?.email}</p>
                          <ul className="social-icons">
                            <li>
                              <Link to={item?.developer?.developer_detail?.github_url}>
                                <FaGithub />
                              </Link>
                            </li>
                            <li>
                              <Link to={item?.developer?.developer_detail?.linkedin_url}>
                                <FaLinkedin />
                              </Link>
                            </li>
                            {/* <li>
                                                    <Link to="#"><MdEmail /></Link>
                                                </li> */}
                          </ul>
                          <div className="job-card-btns">
                            {role === "admin" || role === "client" &&
                              (type == "Shortlisted" ||
                                type === "suggested" ||
                                 type == "applied" ||
                                type === "interviewing") &&
                              type !== "Hired" ? (
                              <OverlayTrigger
                                placement="bottom"
                                overlay={developerCardToolTip}
                              >
                                <Button
                                  variant="danger"
                                  disabled={
                                    jobStatus === "Ended" ? true : false
                                  }
                                  onClick={(e) =>{
                                    handleJobStatusModal(e, item?.developer?.id,"shortlisted", type,item?.id)
                                  }
                                   
                                  }
                                  className="w-100 main-btn text-black border-white mt-3"
                                >
                                  {type === "interviewing" ? (
                                    <RiUserAddFill />
                                  ) : type === "Shortlisted" ? (
                                    <PiUserRectangleFill />
                                  ) : (
                                    <ImUserCheck />
                                  )}
                                </Button>
                              </OverlayTrigger>
                            ) : (
                              ""
                            )}
                            {/* {role === "admin"    && ( */}
                              <OverlayTrigger
                                placement="bottom"
                                overlay={rejectedCardToolTip}
                              >
                                <Button
                                  variant="danger"
                                  onClick={(e) =>
                                    handleJobStatusModal(
                                      e, item?.developer?.id,  "rejected",type,item?.id
                                    )
                                  }
                                  disabled={
                                    jobStatus === "Ended" ? true : false
                                  }
                                  className="w-100"
                                >
                                  <ImUserMinus />
                                </Button>
                              </OverlayTrigger>
                            {/* )} */}
                            {/* {role !== "admin" && (
                              <OverlayTrigger
                                placement="top"
                                overlay={suggestedCardToolTip(
                                  item?.developer?.already_suggested
                                )}
                              >
                                <Button
                                  variant={
                                    item?.developer?.already_suggested
                                      ? "dark"
                                      : "success"
                                  }
                                  onClick={() =>
                                    handleJobStatusModal(
                                      item?.developer?.id,
                                      item?.developer?.already_suggested ? 0 : 1
                                    )
                                  }
                                  className="w-100 mt-2 main-btn py-2 text-black mt-3 font-15"
                                >
                                  {item?.developer?.already_suggested ? (
                                    <MdOutlinePersonRemove />
                                  ) : (
                                    <RiUserAddFill />
                                  )}
                                </Button>
                              </OverlayTrigger>
                            )} */}
                              {/* {role !== "admin" && (
                              <OverlayTrigger placement="top" overlay={approvedApply}>
                                <Button className="w-100 mt-2 main-btn py-2 text-black mt-3 font-15">
                                  <FaCheck />
                                </Button>
                              </OverlayTrigger>
                              )} */}
                            {/* {role !== "admin" && (
                            <OverlayTrigger placement="top" overlay={rejectedApply}>
                              <Button variant="danger" className="w-100">
                                <FaTimes />
                              </Button>
                            </OverlayTrigger>
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <div>
              <NoDataFound data="⚙️ No Developer in Sight" />
            </div>
          )}

        </div>

        {role === "admin" && type === "suggested" ? (
          <div className="d-flex w-100 align-items-center justify-content-between my-4">
            <p className="mb-0">
              Showing {singleJobPagination?.data?.length} results
            </p>
            <RexettPagination
              number={singleJobPagination?.total_pages_for_all}
              setPage={setPage}
              page={page}
            />
          </div>
        ) : (
          ""
        )}
      </>}
      <ScheduleMeeting show={showScheduleMeeting} handleClose={handleCloseScheduleMeeting}  />
    </>
  );
};

export default JobCard;
