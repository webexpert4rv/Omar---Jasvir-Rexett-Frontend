import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Nav,
  Row,
  Tab,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  adminApproveReject,
  allApplicationsList,
} from "../../redux/slices/adminDataSlice";
import RexettButton from "../../components/atomic/RexettButton";
import NoDataFound from "../../components/atomic/NoDataFound";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import RexettPagination from "../../components/atomic/RexettPagination";
import { IoSearch } from "react-icons/io5";
import { RxChevronRight } from "react-icons/rx";
import { IoCheckmark } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import userImg from "../../assets/img/user-img.jpg";
import CommonApplicationTable from "../../components/common/Admin Application/CommonApplicationTable";
import { HiDownload } from "react-icons/hi";
import generatePDF from "react-to-pdf";
import moment from "moment";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const SECRET_KEY = "abcfuipqw222";

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};
const COLUMNS = {
  vendors: [
    { header: "clientName", key: "name" },
    { header: "emailAddress", key: "email" },
    { header: "phoneNumber", key: "phone_number" },
    { header: "typeOfCompany", key: "company", subKey: "type_of_company" },
    { header: "engagements", key: "company", subKey: "total_employees" },
    { header: "engagementsLast", key: "company", subkey: "website" },
    { header: "availablity", key: "company", subkey: "yearly_revenue" },
    { header: "action", type: "action" },
  ],
  developers: [
    { header: "developerName", key: "name", type: "image" },
    { header: "emailAddress", key: "email" },
    { header: "phoneNumber", key: "phone_number" },
    { header: "action", key: "", type: "action" },
  ],
  clients: [
    { header: "individual/comapanyname", key: "name", type: "image" },
    { header: "emailAddress", key: "email" },
    { header: "phoneNumber", key: "phone_number" },
    { header: "action", key: "", type: "action" },
  ],
  clientsExpanded: [
    { label: "companyName", key: "" },
    { label: "", key: "" },
  ],
};
const Applications = () => {
  const targetRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allApplications, approvedLoader, screenLoader } = useSelector(
    (state) => state.adminData
  );
  const [search, setSearch] = useState("");
  const [timerValue, setTimerValue] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [arrowactive, setArrowActive] = useState(null);
  const [currentTab, setCurrentTab] = useState("clients");
  const [application, setApplication] = useState([]);
  const [selectedApprovedBtn, setSelectedApprovedBtn] = useState(null);
  const [selectedRejectedBtn, setSelectedRejectedBtn] = useState(null);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setArrowActive(index == arrowactive ? null : index);
  };

  const handleDownload = (e, resume) => {
    e.stopPropagation();
    window.open(resume, "_blank");
  };

  useEffect(() => {
    let data = {
      page: page,
    };
    dispatch(allApplicationsList(data));
  }, [page]);

  useEffect(() => {
    setApplication(allApplications[currentTab]);
  }, [allApplications]);

  const handleSelect = (key) => {
    setCurrentTab(key);
    setApplication(allApplications[key]);
    setArrowActive(null);
    setExpandedRow(null);
  };

  const convertToArray = (arr) => {
    const skillsArray = arr?.split(",");
    return skillsArray;
  };

  const handleClick = async (e, clientId, status, index) => {
    e.stopPropagation();
    let payload = {
      user_id: clientId,
      status: status,
      "active-tab": currentTab,
    };

    let data = {
      page: page,
      "active-tab": currentTab,
    };

    if (status === "approved") {
      setSelectedApprovedBtn(index);
    } else if (status === "rejected") {
      setSelectedRejectedBtn(index);
    }
    await dispatch(adminApproveReject(payload));
    setArrowActive(null);
    setSelectedApprovedBtn(null);
    setSelectedRejectedBtn(null);
    dispatch(allApplicationsList(data));
  };
  // const approvedTooltip = () => (
  //   <Tooltip id="button-tooltip" >
  //     {t("approve")}
  //   </Tooltip>
  // );
  const approvedTooltip = <Tooltip id="tooltip">{t("approve")}</Tooltip>;

  const rejectedTooltip = () => (
    <Tooltip id="button-tooltip">{t("reject")}</Tooltip>
  );
  const resumeTooltip = () => (
    <Tooltip id="button-tooltip">Download Resume</Tooltip>
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    clearTimeout(timerValue);
    const timer = setTimeout(() => {
      let data = {
        page: page,
        "active-tab": currentTab,
        search: e.target.value,
      };
      dispatch(allApplicationsList(data));
    }, 500);

    setTimerValue(timer);
  };

  const redirectToWebsiteForm = (currentUser, id) => {
    const encrypted = encrypt(id);
    const baseUrls = {
      developer: process.env.REACT_APP_DEVELOPER,
      vendor: process.env.REACT_APP_VENDOR,
      client: process.env.REACT_APP_CLIENT,
    };

    const url = baseUrls[currentUser];
    if (url) {
      window.open(`${url}?user_id=${encrypted}`, "_blank");
    } else {
      console.error("Invalid user type");
    }
  };

  return (
    <>
      <div className="border-bottom-grey pb-3 mb-4 d-md-flex justify-content-between align-items-center">
        <h2 className="section-head border-0 mb-0 pb-0">{t("applications")}</h2>
        <div className="d-flex gap-3">
          <Form.Control
            type="text"
            className="form-field font-14 shadow-none"
            placeholder={t("enterSearchKeywords")}
            onChange={handleSearchChange}
          />
          <Button variant="transparent" className="main-btn search-btn">
            <IoSearch />
          </Button>
        </div>
      </div>
      <div className="card-box">
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="clients"
          onSelect={handleSelect}
        >
          <Nav variant="pills" className="application-pills">
            <Nav.Item className="application-item">
              <Nav.Link eventKey="clients" className="application-link">
                {t("clients")}{" "}
                <span className="new-app">
                  {allApplications?.clients?.length}
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="application-item">
              <Nav.Link eventKey="vendors" className="application-link">
                {t("vendors")}{" "}
                <span className="new-app">
                  {allApplications?.vendors?.length}
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="application-item">
              <Nav.Link eventKey="developers" className="application-link">
                {t("developers")}{" "}
                <span className="new-app">
                  {allApplications?.developers?.length}
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="clients" className="py-4">
              <div className="table-responsive">
                <table className="table w-100 engagement-table table-ui-custom">
                  <thead>
                    <tr>
                      <th>{t("individual/comapanyname")}</th>
                      <th>
                        {t("email")} {t("address")}
                      </th>
                      <th>{t("phoneNumber")}</th>
                      <th>{t("action")}</th>
                      <th>{t("status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {screenLoader ? (
                      <ScreenLoader />
                    ) : (
                      <>
                        {currentTab == "clients" && application?.length > 0 ? (
                          application?.map((item, index) => (
                            <React.Fragment key={index}>
                              <tr
                                className="application-row"
                                onClick={() => handleRowClick(index)}
                              >
                                <td className="white-nowrap">
                                  <div className="d-flex align-items-center">
                                    <span
                                      className={
                                        arrowactive == index &&
                                        currentTab == "clients"
                                          ? "row-arrow active"
                                          : "row-arrow"
                                      }
                                    >
                                      <RxChevronRight />
                                    </span>{" "}
                                    <div className="user-imgbx application-userbx">
                                      <img
                                        src={
                                          item?.profile_picture
                                            ? item?.profile_picture
                                            : item?.client_type == "company"
                                            ? item?.company_logo
                                            : userImg
                                        }
                                        className="user-img"
                                      />
                                    </div>
                                    {item?.name}
                                  </div>
                                </td>
                                <td>
                                  <span className="application-mail">
                                    {item.email}
                                  </span>
                                </td>
                                <td>{item?.phone_number}</td>

                                <td>
                                  {item?.is_profile_completed ? (
                                    <div className="d-flex gap-3">
                                      <RexettButton
                                        icon={
                                          selectedApprovedBtn === index ? (
                                            approvedLoader
                                          ) : (
                                            <IoCheckmark />
                                          )
                                        }
                                        className={`arrow-btn primary-arrow ${
                                          !item?.is_profile_completed &&
                                          "not-allowed"
                                        }`}
                                        variant="transparent"
                                        // disabled={!item?.is_profile_completed}
                                        onClick={(e) =>
                                          handleClick(
                                            e,
                                            item?.id,
                                            "approved",
                                            index
                                          )
                                        }
                                        isLoading={
                                          selectedApprovedBtn === index
                                            ? approvedLoader
                                            : false
                                        }
                                      />
                                      <RexettButton
                                        icon={
                                          selectedRejectedBtn === index ? (
                                            approvedLoader
                                          ) : (
                                            <IoCloseOutline />
                                          )
                                        }
                                        // disabled={!item?.is_profile_completed}
                                        className={`arrow-btn danger-arrow ${
                                          !item?.is_profile_completed &&
                                          "not-allowed"
                                        }`}
                                        variant={"transparent"}
                                        onClick={(e) =>
                                          handleClick(
                                            e,
                                            item?.id,
                                            "rejected",
                                            index
                                          )
                                        }
                                        isLoading={
                                          selectedRejectedBtn === index
                                            ? approvedLoader
                                            : false
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <div className="d-flex gap-3">
                                      <div
                                        onClick={() =>
                                          redirectToWebsiteForm(
                                            "client",
                                            item?.id
                                          )
                                        }
                                      >
                                        <span className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2">
                                          Complete Your Profile{" "}
                                          <FiExternalLink />
                                        </span>
                                      </div>{" "}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <span
                                    className={`white-nowrap ${
                                      item?.is_profile_completed
                                        ? "status-finished"
                                        : "status-progress"
                                    }`}
                                  >
                                    {item?.is_profile_completed
                                      ? "Completed"
                                      : "Incomplete"}
                                  </span>
                                </td>
                              </tr>
                              {expandedRow === index && (
                                <tr
                                  className={`collapsible-row ${
                                    expandedRow === index ? "open" : ""
                                  }`}
                                >
                                  <td colSpan="8">
                                    <div>
                                      <Row>
                                        {item?.client_type == "company" && (
                                          <Col md={3} className="mb-3">
                                            {item?.company_name && (
                                              <div>
                                                <h3 className="application-heading">
                                                  Company Name
                                                </h3>
                                                <p className="application-text">
                                                  {item?.company_name}
                                                </p>
                                              </div>
                                            )}
                                          </Col>
                                        )}
                                        {item?.client_type == "company" && (
                                          <Col md={3} className="mb-3">
                                            {item?.company_address && (
                                              <div>
                                                <h3 className="application-heading">
                                                  Company Address
                                                </h3>
                                                <p className="application-text">
                                                  {item.company_address}
                                                </p>
                                              </div>
                                            )}
                                          </Col>
                                        )}

<Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("city")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.city}
                                            </p>
                                          </div>
                                        </Col>

                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("country")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.country}
                                            </p>
                                          </div>
                                        </Col>

                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("appliedOn")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.created_at?.slice(0, 10)}
                                            </p>
                                          </div>
                                        </Col>

                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("email")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.email}
                                            </p>
                                          </div>
                                        </Col>

                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col>
                                        {item?.client_type == "company" && (
                                          <Col md={3} className="mb-3">
                                            {item?.company_tax_id && (
                                              <div>
                                                <h3 className="application-heading">
                                                  Company Tax id
                                                </h3>
                                                <p className="application-text">
                                                  {item?.company_tax_id}
                                                </p>
                                              </div>
                                            )}
                                          </Col>
                                        )}

                                        {/* <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              Client Type
                                            </h3>
                                            <p className="application-text">
                                              ---
                                            </p>
                                          </div>
                                        </Col> */}
                                        {/* <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Contact Person Email
                                            </h3>
                                            <p className="application-text">
                                              ---
                                            </p>
                                          </div>
                                        </Col> */}
                                      </Row>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))
                        ) : (
                          <td colSpan={8}>
                            <NoDataFound />
                          </td>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              {allApplications?.totalClientPages > 1 ? (
                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                  {currentTab == "clients" ? (
                    <p className="showing-result">
                      {t("showing")} {allApplications?.clients?.length}{" "}
                      {t("results")}
                    </p>
                  ) : (
                    <p className="showing-result">
                      {t("showing")} {allApplications?.vendors?.length}{" "}
                      {t("results")}
                    </p>
                  )}
                  <RexettPagination
                    number={allApplications?.totalClientPages}
                    setPage={setPage}
                    page={page}
                  />
                </div>
              ) : (
                ""
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="vendors" className="py-4">
              <div className="table-responsive">
                <table className="table w-100 engagement-table table-ui-custom">
                  <thead>
                    <tr>
                      <th>{t("clientName")}</th>
                      <th>
                        {t("email")} {t("address")}
                      </th>
                      <th>{t("phoneNumber")}</th>
                      <th>{t("typeOfCompany")}</th>
                      {/* <th>{t("engagements")}</th>
                      <th>
                        {t("engagements")} {t("last")}
                      </th>
                      <th>{t("availability")}</th> */}
                      <th>{t("action")}</th>
                      <th>{t("status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {screenLoader ? (
                      <ScreenLoader />
                    ) : (
                      <>
                        {currentTab == "vendors" && application?.length > 0 ? (
                          application?.map((item, index) => (
                            <React.Fragment key={index}>
                              <tr
                                className="application-row"
                                onClick={() => handleRowClick(index)}
                              >
                                <td className="white-nowrap">
                                  <div className="d-flex align-items-center">
                                    <span
                                      className={
                                        arrowactive == index &&
                                        currentTab == "vendors"
                                          ? "row-arrow active"
                                          : "row-arrow"
                                      }
                                    >
                                      <RxChevronRight />
                                    </span>{" "}
                                    <div className="user-imgbx application-userbx">
                                      <img
                                        src={
                                          item?.company?.logo
                                            ? item?.company?.logo
                                            : userImg
                                        }
                                        className="user-img"
                                      />
                                    </div>
                                    {item?.name}
                                  </div>
                                </td>
                                <td>
                                  <span className="application-mail">
                                    {item?.email}
                                  </span>
                                </td>
                                <td>{item?.phone_number}</td>
                                <td>{item?.company?.type_of_company}</td>
                                {/* <td>{item?.company?.total_employees}</td>
                                <td>{item?.company?.website}</td>
                                <td>{item?.company?.yearly_revenue}</td> */}
                                <td>
                                  {item?.is_profile_completed ? (
                                    <div className="d-flex gap-3">
                                      <RexettButton
                                        icon={
                                          selectedApprovedBtn === index ? (
                                            approvedLoader
                                          ) : (
                                            <IoCheckmark />
                                          )
                                        }
                                        className={`arrow-btn primary-arrow ${
                                          !item?.is_profile_completed &&
                                          "not-allowed"
                                        }`}
                                        variant="transparent"
                                        // disabled={!item?.is_profile_completed}
                                        onClick={(e) =>
                                          handleClick(
                                            e,
                                            item?.id,
                                            "approved",
                                            index
                                          )
                                        }
                                        isLoading={
                                          selectedApprovedBtn === index
                                            ? approvedLoader
                                            : false
                                        }
                                      />
                                      <RexettButton
                                        icon={
                                          selectedRejectedBtn === index ? (
                                            approvedLoader
                                          ) : (
                                            <IoCloseOutline />
                                          )
                                        }
                                        // disabled={!item?.is_profile_completed}
                                        className={`arrow-btn danger-arrow ${
                                          !item?.is_profile_completed &&
                                          "not-allowed"
                                        }`}
                                        variant={"transparent"}
                                        onClick={(e) =>
                                          handleClick(
                                            e,
                                            item?.id,
                                            "rejected",
                                            index
                                          )
                                        }
                                        isLoading={
                                          selectedRejectedBtn === index
                                            ? approvedLoader
                                            : false
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <div className="d-flex gap-3">
                                      <div
                                        onClick={() =>
                                          redirectToWebsiteForm(
                                            "vendor",
                                            item?.id
                                          )
                                        }
                                      >
                                        <span className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2">
                                          Complete Your Profile{" "}
                                          <FiExternalLink />
                                        </span>
                                      </div>{" "}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <span
                                    className={`white-nowrap ${
                                      item?.is_profile_completed
                                        ? "status-finished"
                                        : "status-progress"
                                    }`}
                                  >
                                    {item?.is_profile_completed
                                      ? "Completed"
                                      : "Incomplete"}
                                  </span>
                                </td>{" "}
                              </tr>
                              {expandedRow === index && (
                                <tr
                                  className={`collapsible-row ${
                                    expandedRow === index ? "open" : ""
                                  }`}
                                >
                                  <td colSpan="8">
                                    <div>
                                      <Row>
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("companyName")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.name}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("email")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.email}
                                            </p>
                                          </div>
                                        </Col>
                                        {item?.company?.total_employees && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                {t("totalEmployees")}
                                              </h3>
                                              <p className="application-text">
                                                {item?.company?.total_employees}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        {item?.company?.location && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                {t("location")}
                                              </h3>
                                              <p className="application-text">
                                                {item?.company?.location}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        {item?.address && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                {t("address")}
                                              </h3>
                                              <p className="application-text">
                                                {item?.address}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        {item?.state && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                {t("state")}
                                              </h3>
                                              <p className="application-text">
                                                {item?.state}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              {t("phoneNumber")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.phone_number}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              {t("typeOfCompany")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.type_of_company}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Type of establishment
                                            </h3>
                                            <p className="application-text">
                                              {
                                                item?.company
                                                  ?.type_of_establishment
                                              }
                                            </p>
                                          </div>
                                        </Col>

                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Website
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.website}
                                            </p>
                                          </div>
                                        </Col>

                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Service offering
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.service_offering}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              company Email
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.email}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              company Yearly revenue
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.yearly_revenue}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              company GST number
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.gst_number}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Turn around time to close contract
                                              position
                                            </h3>
                                            <p className="application-text">
                                              {
                                                item?.company
                                                  ?.trun_around_time_to_close_contract_position
                                              }
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Turn around time to close
                                              permanent position
                                            </h3>
                                            <p className="application-text">
                                              {
                                                item?.company
                                                  ?.trun_around_time_to_close_permanent_position
                                              }
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Proprietor contact number
                                            </h3>
                                            <p className="application-text">
                                              {
                                                item?.company
                                                  ?.proprietor_contact_number
                                              }
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Proprietor contact person email
                                            </h3>
                                            <p className="application-text">
                                              {
                                                item?.company
                                                  ?.proprietor_contact_person_email
                                              }
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Proprietor contact person name
                                            </h3>
                                            <p className="application-text">
                                              {
                                                item?.company
                                                  ?.proprietor_contact_person_name
                                              }
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Proprietor email
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.proprietor_email}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              {t("city")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.city}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              {t("country")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.country}
                                            </p>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))
                        ) : (
                          <td colSpan={8}>
                            <NoDataFound />
                          </td>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              {allApplications?.totalVendorPages > 1 ? (
                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                  {currentTab == "clients" ? (
                    <p className="showing-result">
                      {t("showing")} {allApplications?.clients?.length}{" "}
                      {t("results")}
                    </p>
                  ) : (
                    <p className="showing-result">
                      {t("showing")} {allApplications?.vendors?.length}{" "}
                      {t("results")}
                    </p>
                  )}
                  <RexettPagination
                    number={allApplications?.totalVendorPages}
                    setPage={setPage}
                    page={page}
                  />
                </div>
              ) : (
                ""
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="developers" className="py-4">
              <div className="table-responsive">
                <table className="table w-100 engagement-table table-ui-custom">
                  <thead>
                    <tr>
                      <th>{t("developerName")}</th>
                      <th>
                        {t("email")} {t("address")}
                      </th>
                      <th>{t("phoneNumber")}</th>
                      <th>{t("action")}</th>
                      <th>Resume</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {screenLoader ? (
                      <ScreenLoader />
                    ) : (
                      <>
                        {currentTab == "developers" &&
                        application?.length > 0 ? (
                          application?.map((item, index) => (
                            <React.Fragment key={index}>
                              <tr
                                className="application-row"
                                onClick={() => handleRowClick(index)}
                              >
                                <td className="white-nowrap">
                                  <div className="d-flex align-items-center">
                                    <span
                                      className={
                                        arrowactive == index &&
                                        currentTab == "developers"
                                          ? "row-arrow active"
                                          : "row-arrow"
                                      }
                                    >
                                      <RxChevronRight />
                                    </span>{" "}
                                    <div className="user-imgbx application-userbx">
                                      <img
                                        src={
                                          item?.profile_picture
                                            ? item?.profile_picture
                                            : userImg
                                        }
                                        className="user-img"
                                      />
                                    </div>
                                    {item?.name}
                                  </div>
                                </td>
                                <td>
                                  <span className="application-mail">
                                    {item?.email}
                                  </span>
                                </td>
                                <td>{item?.phone_number}</td>
                                <td>
                                  {item?.is_profile_completed ? (
                                    <div className="d-flex gap-3">
                                      <RexettButton
                                        icon={
                                          selectedApprovedBtn === index ? (
                                            approvedLoader
                                          ) : (
                                            <IoCheckmark />
                                          )
                                        }
                                        className={`arrow-btn primary-arrow ${
                                          !item?.is_profile_completed &&
                                          "not-allowed"
                                        }`}
                                        variant="transparent"
                                        // disabled={!item?.is_profile_completed}
                                        onClick={(e) =>
                                          handleClick(
                                            e,
                                            item?.id,
                                            "approved",
                                            index
                                          )
                                        }
                                        isLoading={
                                          selectedApprovedBtn === index
                                            ? approvedLoader
                                            : false
                                        }
                                      />
                                      <RexettButton
                                        icon={
                                          selectedRejectedBtn === index ? (
                                            approvedLoader
                                          ) : (
                                            <IoCloseOutline />
                                          )
                                        }
                                        // disabled={!item?.is_profile_completed}
                                        className={`arrow-btn danger-arrow ${
                                          !item?.is_profile_completed &&
                                          "not-allowed"
                                        }`}
                                        variant={"transparent"}
                                        onClick={(e) =>
                                          handleClick(
                                            e,
                                            item?.id,
                                            "rejected",
                                            index
                                          )
                                        }
                                        isLoading={
                                          selectedRejectedBtn === index
                                            ? approvedLoader
                                            : false
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <div className="d-flex gap-3">
                                      <div
                                        onClick={() =>
                                          redirectToWebsiteForm(
                                            "developer",
                                            item?.id
                                          )
                                        }
                                      >
                                        <span className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2">
                                          Complete Your Profile{" "}
                                          <FiExternalLink />
                                        </span>
                                      </div>{" "}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <RexettButton
                                    onClick={(e) =>
                                      handleDownload(
                                        e,
                                        item?.developer_detail?.resume
                                      )
                                    }
                                    disabled={!item?.developer_detail?.resume}
                                    icon={
                                      selectedRejectedBtn === index ? (
                                        approvedLoader
                                      ) : (
                                        <div ref={targetRef}>
                                          <HiDownload />
                                        </div>
                                      )
                                    }
                                    className={`arrow-btn primary-arrow ${
                                      !item?.developer_detail?.resume &&
                                      "not-allowed"
                                    }`}
                                  />
                                </td>
                                <td>
                                  <span
                                    className={`white-nowrap ${
                                      item?.is_profile_completed
                                        ? "status-finished"
                                        : "status-progress"
                                    }`}
                                  >
                                    {item?.is_profile_completed
                                      ? "Completed"
                                      : "Incomplete"}
                                  </span>
                                </td>
                              </tr>
                              {expandedRow === index && (
                                <tr
                                  className={`collapsible-row ${
                                    expandedRow === index ? "open" : ""
                                  }`}
                                >
                                  <td colSpan="8">
                                    <div>
                                      <Row>
                                        {item?.name && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                {t("developerName")}
                                              </h3>
                                              <p className="application-text">
                                                {item?.name
                                                  ? item?.name
                                                  : "Not Mentioned"}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        {item?.address && (
                                          <Col md={3}>
                                            <div>
                                              <h3 className="application-heading">
                                                Address
                                              </h3>
                                              <p className="application-text">
                                                {item?.address}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        {item?.country && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                {t("country")}
                                              </h3>
                                              <p className="application-text">
                                                {item?.country}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        {item?.state && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                {t("state")}
                                              </h3>
                                              <p className="application-text">
                                                {item?.state}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        {item?.city && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                {t("city")}
                                              </h3>
                                              <p className="application-text">
                                                {item?.city}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col>

                                        {item?.email && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                {t("email")}
                                              </h3>
                                              <p>{item?.email}</p>
                                            </div>
                                          </Col>
                                        )}

                                        {item?.work_preference && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                Work Preference
                                              </h3>
                                              <p>{item?.work_preference}</p>
                                            </div>
                                          </Col>
                                        )}

                                        {item?.ready_to_relocate && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                Ready to relocate
                                              </h3>
                                              <p>{item?.ready_to_relocate}</p>
                                            </div>
                                          </Col>
                                        )}

                                        {item?.time_zone && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                Time Zone
                                              </h3>
                                              <p>{item?.time_zone}</p>
                                            </div>
                                          </Col>
                                        )}

                                        {item?.developer_language && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                Language
                                              </h3>
                                              <p>
                                                {
                                                  item?.developer_language
                                                    ?.language
                                                }
                                              </p>
                                            </div>
                                          </Col>
                                        )}

                                        {item?.developer_detail?.github_url && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                Github Url
                                              </h3>
                                              <p>
                                                {
                                                  item?.developer_detail
                                                    ?.github_url
                                                }
                                              </p>
                                            </div>
                                          </Col>
                                        )}

                                        {item?.other_skills?.length > 0 && (
                                          <Col md={3} className="mb-3 ">
                                            <div>
                                              <h3 className="application-heading">
                                                Skills
                                              </h3>
                                              <ul className="need-skill-list  mb-0">
                                                {item?.other_skills?.map(
                                                  (item, index) => {
                                                    return (
                                                      <>
                                                        <li key={index}>
                                                          {item?.skill}
                                                        </li>
                                                      </>
                                                    );
                                                  }
                                                )}
                                              </ul>
                                            </div>
                                          </Col>
                                        )}

                                        {item?.developer_detail
                                          ?.professional_title && (
                                          <Col md={3}>
                                            <div>
                                              <h3 className="application-heading">
                                                Designation
                                              </h3>
                                              <p className="application-text">
                                                {
                                                  item?.developer_detail
                                                    ?.professional_title
                                                }
                                              </p>
                                            </div>
                                          </Col>
                                        )}

                                        {item?.developer_detail
                                          ?.how_did_you_hear_about_rexett && (
                                          <Col md={3}>
                                            <div>
                                              <h3 className="application-heading">
                                                How Did you hear about rexett?
                                              </h3>
                                              <p className="application-text">
                                                {
                                                  item?.developer_detail
                                                    ?.how_did_you_hear_about_rexett
                                                }
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        {item?.created_at && (
                                          <Col md={3}>
                                            <div>
                                              <h3 className="application-heading">
                                                Created At
                                              </h3>
                                              <p className="application-text">
                                                {moment(
                                                  item?.created_at
                                                ).format("MMMM Do YYYY")}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        {item?.developer_detail
                                          ?.total_experience && (
                                          <Col md={3}>
                                            <div>
                                              <h3 className="application-heading">
                                                Experience
                                              </h3>
                                              <p className="application-text">
                                                {
                                                  item?.developer_detail
                                                    ?.total_experience
                                                }
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                      </Row>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))
                        ) : (
                          <td colSpan={8}>
                            <NoDataFound />
                          </td>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              {allApplications?.totalDeveloperPages > 1 ? (
                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                  {currentTab == "developers" ? (
                    <p className="showing-result">
                      {t("showing")} {allApplications?.developers?.length}{" "}
                      {t("results")}
                    </p>
                  ) : (
                    ""
                  )}
                  <RexettPagination
                    number={allApplications?.totalDeveloperPages}
                    setPage={setPage}
                    page={page}
                  />
                </div>
              ) : (
                ""
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
};
export default Applications;
