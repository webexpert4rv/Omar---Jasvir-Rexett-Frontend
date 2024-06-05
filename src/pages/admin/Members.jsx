import React, { useEffect, useState } from "react";
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
import CommonApplicationTable from "../../components/common/Admin Application/CommonApplicationTable";
import {
  adminApproveReject,
  allApplicationsList,
  allMemberList,
  getAccountDisableEnable,
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
import ConfirmationModal from "../views/Modals/ConfirmationModal";
import { useNavigate } from "react-router-dom";

let STATUS = [
  {
    name: "Approved",
    key: "approved",
  },
  {
    name: "Rejected",
    key: "rejected",
  },
];

const Members = () => {
  const dispatch = useDispatch();
  const { allApplications, approvedLoader, screenLoader } = useSelector(
    (state) => state.adminData
  );
  const [search, setSearch] = useState("");
  const [timerValue, setTimerValue] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [arrowactive, setArrowActive] = useState(null);
  const [currentTab, setCurrentTab] = useState("clients");
  const [application, setApplication] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("approved");

  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [details, setDetails] = useState({
    role: "",
    id: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setArrowActive(index == arrowactive ? null : index);
  };

  useEffect(() => {
    let data = {
      page: page,
    };
    dispatch(allMemberList(data));
  }, [page]);

  useEffect(() => {
    if (allApplications[currentTab]?.length > 0) {
      let copied = [...allApplications[currentTab]];
      let filterStatus = copied.filter(
        (item) => item.approval_status == currentStatus
      );
      setApplication(filterStatus);
    }
  }, [allApplications]);

  const handleSelect = (key) => {
    setCurrentTab(key);
    let copied = [...allApplications[key]];
    let filterStatus = copied.filter(
      (item) => item.approval_status == currentStatus
    );
    setApplication(filterStatus);
    setArrowActive(null);
    setExpandedRow(null);
  };

  const convertToArray = (arr) => {
    const skillsArray = arr?.split(",");
    return skillsArray;
  };
  const navigate = useNavigate();
  const returnSkills = (sklls) => {
    const skillsArray = sklls.map(({ skill, ...rest }) => skill);
    return skillsArray;
  };

  const approvedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("approve")}
    </Tooltip>
  );
  const rejectedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("reject")}
    </Tooltip>
  );
  const redirectClient = (id) => {
    navigate(`/admin-single-client/${id}`)
  }

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

  const deleteApplication = <Tooltip id="tooltip">Disabled Accounts</Tooltip>;

  const handleToggle = (e, item) => {
    console.log(item, "item");
    e.stopPropagation();
    setShowModal(!showModal);
    setDetails((prevDetails) => ({
      ...prevDetails,
      active: item?.status == "active" ? "inactive" : "active",
      id: item?.id,
    }));
  };

  const handleClose = () => {
    setShowModal(!showModal);
  };

  const handleDeleteAction = async (e) => {
    e.preventDefault();
    let data = {
      user_id: details?.id,
      status: details?.active,
    };
    console.log(details, "dateails");
    await dispatch(getAccountDisableEnable(data));
    let newData = {
      page: page,
    };
    dispatch(allMemberList(newData));
    setShowModal(false);
  };

  const handleStatus = (e) => {
    let k = e.target.value;
    console.log(k, "gg");
    setCurrentStatus(k);
    let copied = [...allApplications[currentTab]];
    let filterStatus = copied.filter((item) => item.approval_status == k);
    setApplication(filterStatus);
  };
  const handleRedirect = (id) => {
    navigate(`/admin-single-developer/${id}`)
  }
    return (
    <>
      <div className="border-bottom-grey pb-3 mb-4 d-md-flex justify-content-between align-items-center">
        <h2 className="section-head border-0 mb-0 pb-0">{t("members")}</h2>

        <div className="d-flex gap-3">
          <Form.Select
            className="filter-select shadow-none"
            onChange={handleStatus}
          >
            <option>Select Status</option>
            {STATUS.map((item, inx) => {
              return (
                <>
                  <option key={inx} value={item.key}>
                    {item.name}
                  </option>
                </>
              );
            })}
          </Form.Select>
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
            {/* {currentTab === "clients" && (
              <CommonApplicationTable
                arrowActive={arrowactive}
                handleRowClick={handleRowClick}
                application={application}
                approvedLoader={approvedLoader}
                expandedRow={expandedRow}
                selectedApprovedBtn={selectedApprovedBtn}
                selectedRejectedBtn={selectedRejectedBtn}
                screenLoader={screenLoader}
                handleClick={handleClick}
                currentTab={currentTab}
                columns={COLUMNS[currentTab]}
              />
            )} */}
            <Tab.Pane eventKey="clients" className="py-4">
              <div className="table-responsive">
                <table className="table w-100 engagement-table table-ui-custom">
                  <thead>
                    <tr>
                      <th>{t("clientName")}</th>
                      <th>
                        {t("email")} {t("address")}
                      </th>
                      <th>{t("phoneNumber")}</th>
                      <th>{t("status")}</th>
                      <th>Disabled/Enabled</th>
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
                                    <div className="user-imgbx application-userbx" onClick={()=>redirectClient(item?.id)}>
                                      <img
                                        src={
                                          item?.profile_picture
                                            ? item?.profile_picture
                                            : "/demo-user.png"
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
                                  <span
                                    className={`${
                                      item?.approval_status == "approved"
                                        ? "status-finished text-capitalize"
                                        : "status-rejected text-capitalize"
                                    }`}
                                  >
                                    {item?.approval_status}
                                  </span>
                                </td>
                                <td>
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={deleteApplication}
                                  >
                                    <div class="form-check form-switch toggle-switch-wrapper">
                                      <input
                                        class="form-check-input toggle-switch-custom"
                                        type="checkbox"
                                        role="switch"
                                        checked={item?.status == "active"}
                                        onClick={(e) => handleToggle(e, item)}
                                      />
                                    </div>
                                  </OverlayTrigger>
                                </td>
                              </tr>
                              {expandedRow === index && (
                                <tr
                                  className={`collapsible-row ${
                                    expandedRow === index ? "open" : ""
                                  }`}
                                >
                                  <td colSpan="8">
                                    <td colSpan="8">
                                      <div>
                                        <Row>
                                          {item?.client_type == "company" && (
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Company Name
                                                </h3>
                                                <p className="application-text">
                                                  {item?.company_name}
                                                </p>
                                              </div>
                                            </Col>
                                          )}
                                          {item?.client_type == "company" &&
                                            (item?.company_address ? (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Company Address
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.company_address}
                                                  </p>
                                                </div>
                                              </Col>
                                            ) : (
                                              ""
                                            ))}

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
                                          {item?.client_type == "company" && (
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Company Tax id
                                                </h3>
                                                <p className="application-text">
                                                  {item?.company_tax_id}
                                                </p>
                                              </div>
                                            </Col>
                                          )}

                                          {/* <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                Contact Person name
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
              {allApplications?.totalClientPages > 1 &&
              application.length > 5 ? (
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

            {/* {currentTab === "vendors" && (
              <CommonApplicationTable
                arrowActive={arrowactive}
                handleRowClick={handleRowClick}
                application={application}
                approvedLoader={approvedLoader}
                expandedRow={expandedRow}
                selectedApprovedBtn={selectedApprovedBtn}
                selectedRejectedBtn={selectedRejectedBtn}
                screenLoader={screenLoader}
                handleClick={handleClick}
                currentTab={currentTab}
                columns={COLUMNS[currentTab]}
              />
            )} */}
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
                      <th>{t("engagements")}</th>
                      <th>
                        {t("engagements")} {t("last")}
                      </th>
                      <th>{t("status")}</th>
                      <th>Enable/Disable</th>
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
                                          item?.profile_picture
                                            ? item?.profile_picture
                                            : "/demo-user.png"
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
                                <td>{item?.company?.total_employees}</td>
                                <td>{item?.company?.website}</td>
                                <td>
                                  <span
                                    className={`${
                                      item?.approval_status == "approved"
                                        ? "status-finished text-capitalize"
                                        : "status-rejected text-capitalize"
                                    }`}
                                  >
                                    {item?.approval_status}
                                  </span>
                                </td>
                                <td>
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={deleteApplication}
                                  >
                                    <div class="form-check form-switch toggle-switch-wrapper">
                                      <input
                                        class="form-check-input toggle-switch-custom"
                                        type="checkbox"
                                        role="switch"
                                        onClick={(e) => handleToggle(e, item)}
                                        checked={item?.status == "active"}
                                      />
                                    </div>
                                  </OverlayTrigger>
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
                                        {
                                          item?.company?.total_employees>0 && (
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
                                          )
                                        }
                                        {
                                          item?.company?.location && (
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
                                          )
                                        }
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
              {allApplications?.totalClientPages > 1 &&
              application.length > 5 ? (
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
            {/* {currentTab === "developers" && (
              <CommonApplicationTable
                arrowActive={arrowactive}
                handleRowClick={handleRowClick}
                application={application}
                approvedLoader={approvedLoader}
                expandedRow={expandedRow}
                selectedApprovedBtn={selectedApprovedBtn}
                selectedRejectedBtn={selectedRejectedBtn}
                screenLoader={screenLoader}
                handleClick={handleClick}
                currentTab={currentTab}
                columns={COLUMNS[currentTab]}
              />
            )} */}
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
                      <th>{t("status")}</th>
                      <th>Enable/Disable</th>
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
                                    <div className="user-imgbx application-userbx"  onClick={()=>{handleRedirect(item?.id)}}>
                                      <img
                                        src={
                                          item?.profile_picture
                                            ? item?.profile_picture
                                            : "/demo-user.png"
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
                                  <span
                                    className={`${
                                      item?.approval_status == "approved"
                                        ? "status-finished text-capitalize"
                                        : "status-rejected text-capitalize"
                                    }`}
                                  >
                                    {item?.approval_status}
                                  </span>
                                </td>
                                <td>
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={deleteApplication}
                                  >
                                    <div class="form-check form-switch toggle-switch-wrapper">
                                      <input
                                        class="form-check-input toggle-switch-custom"
                                        type="checkbox"
                                        role="switch"
                                        onClick={(e) => handleToggle(e, item)}
                                        checked={item?.status == "active"}
                                      />
                                    </div>
                                  </OverlayTrigger>
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
                                                {item?.name}
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
                                        {item?.other_skills?.length > 0 && (
                                          <Col md={3} className="mb-3 ">
                                            <div>
                                              <h3 className="application-heading">
                                                {t("skillsetNeeded")}
                                              </h3>
                                              <ul className="need-skill-list  mb-0">
                                                {returnSkills(
                                                  item?.other_skills
                                                )?.map((item, index) => {
                                                  return (
                                                    <>
                                                      <li key={index}>
                                                        {item}
                                                      </li>
                                                    </>
                                                  );
                                                })}
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
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Experience
                                            </h3>
                                            <p className="application-text">
                                              2 years
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
              {allApplications?.totalClientPages > 1 &&
              application.length > 4 ? (
                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                  {currentTab == "developers" ? (
                    <p className="showing-result">
                      {t("showing")} {allApplications?.developers?.length}{" "}
                      {t("results")}
                    </p>
                  ) : (
                    ""
                  )}
                  {
                    <RexettPagination
                      number={allApplications?.totalDeveloperPages}
                      setPage={setPage}
                      page={page}
                    />
                  }
                </div>
              ) : (
                ""
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <ConfirmationModal
          show={showModal}
          handleClose={handleClose}
          onClick={handleDeleteAction}
          header={"Delete Developer"}
          text={`Are you sure ,you want to ${
            details.active == "active" ? "enable" : "disable"
          } this account?`}
          smallLoader={screenLoader}
        />
      </div>
    </>
  );
};
export default Members;
