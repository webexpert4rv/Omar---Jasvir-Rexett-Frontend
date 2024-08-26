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
  addToFeature,
  adminApproveReject,
  allApplicationsList,
  allMemberList,
  getAccountDisableEnable,
  setBtnLoader,
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
import ConfirmationModal from "../../components/common/Modals/ConfirmationModal";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import CommonFilterSection from "../../components/atomic/CommonFilterSection";
import { MEMBERS_FILTER_FIELDS, buildQueryFromObjects } from "./adminConstant";
import { TiUserAdd } from "react-icons/ti";
import AssignEmployee from "./Modals/AssignEmployee";
import { FaRotateRight } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

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
  const { allApplications, approvedLoader, screenLoader, smallLoader } =
    useSelector((state) => state.adminData);
  const [search, setSearch] = useState("");
  const [timerValue, setTimerValue] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [arrowactive, setArrowActive] = useState(null);
  const [currentTab, setCurrentTab] = useState("clients");
  const [application, setApplication] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("approved");
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [featureModalDetails, setFeaturedModalDetails] = useState({
    userId: null,
    isFeaturedMember: false,
  });
  const [showTrustedModal, setShowTrustedModal] = useState(false);
  const [trustedModalDetails, setTrustedModalDetails] = useState({
    userId: null,
    isTrustedTech: false,
  });
  const [searchText, setSearchText] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [sortByOption, setSortByOption] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    order_alphabetically: "asc",
    order_created_at: "",
    approval_status: "",
    created_at: "",
  });

  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [details, setDetails] = useState({
    role: "",
    id: "",
  });
  const [showModal, setShowModal] = useState(false);
  const handleFeature = (e, userId) => {
    e.stopPropagation();
    const { checked } = e.target;
    setShowFeatureModal(!showFeatureModal);
    setFeaturedModalDetails({
      userId: userId,
      isFeaturedMember: checked,
    });
  };

  const handleIsTrustedTech = (e, userId) => {
    e.stopPropagation();
    const { checked } = e.target;
    setShowTrustedModal(!showTrustedModal);
    setTrustedModalDetails({
      userId: userId,
      isTrustedTech: checked,
    });
  };
  
  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setArrowActive(index == arrowactive ? null : index);
  };

  // useEffect(() => {
  //   let data = {
  //     page: page,
  //     active_tab: currentTab,
  //     search: searchFilter,
  //   };
  //   dispatch(allMemberList(data));
  // }, [page, currentTab, search, searchFilter]);

  useEffect(() => {
    const queryFilters = {
      ...filters,
      page: page,
      active_tab: currentTab,
    };
    dispatch(allMemberList(queryFilters));
  }, [filters, page, currentTab]);

  useEffect(() => {
    if (allApplications[currentTab]?.length > 0) {
      let copied = [...allApplications[currentTab]];
      let filterStatus = copied.filter(
        (item) => item.approval_status == currentStatus
      );
      // setApplication(filterStatus);
      setApplication(copied);
    } else {
      setApplication([]);
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
    setPage(1);
    setSearch("");
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
    navigate(`/admin-single-client/${id}`);
  };

  const deleteApplication = <Tooltip id="tooltip">Disabled Accounts</Tooltip>;
  const addToFeaturedMembers = (
    <Tooltip id="tooltip">Add to featured members</Tooltip>
  );
  const removeFromFeaturedMembers = (
    <Tooltip id="tooltip">Remove from featured members</Tooltip>
  );

  const addToTrustedTech = () => (
    <Tooltip id="tooltip">Add to trusted tech expert </Tooltip>
  );
  const removeFromTrustedTech = () => (
    <Tooltip id="tooltip">Remove from trusted tech expert </Tooltip>
  );

  const handleToggle = (e, item) => {
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
    await dispatch(getAccountDisableEnable(data));
    let newData = {
      page: page,
    };
    dispatch(allMemberList(newData));
    setShowModal(false);
  };

  const handleStatus = (e) => {
    let k = e.target.value;
    setCurrentStatus(k);
    let copied = [...allApplications[currentTab]];
    let filterStatus = copied.filter((item) => item.approval_status == k);
    setApplication(filterStatus);
  };
  const handleRedirect = (id) => {
    navigate(`/admin-single-developer/${id}`);
  };
  const getFeatureText = (type) => {
    if (type === "featuredMember") {
      if (featureModalDetails?.isFeaturedMember) {
        return "Are you sure you want to add this developer to featured members";
      } else {
        return "Are you sure you want to remove this developer from featured members";
      }
    } else {
      if (trustedModalDetails?.isTrustedTech) {
        return "Are you sure you want to add this developer to trusted tech expert";
      } else {
        return "Are you sure you want to remove this developer from trusted tech expert";
      }
    }
  };
  const handleAddToFeature = () => {
    let data = {
      ...filters,
      page: page,
      active_tab: currentTab,
    };
    const query = `${featureModalDetails?.userId}?isFeaturedMember=${featureModalDetails?.isFeaturedMember}`;
    const toastMessage = featureModalDetails?.isFeaturedMember
      ? "Developer added to featured members successfully"
      : "Developer removed from featured members successfully";
    dispatch(
      addToFeature(
        query,
        handleCloseFeature,
        data,
        toastMessage
      )
    );
  };
  const handleAddToTrustedTech = () => {
    let data = {
      ...filters,
      page: page,
      active_tab: currentTab,
    };
    const query = `${trustedModalDetails?.userId}?isTrustedTechExpert=${trustedModalDetails?.isTrustedTech}`;
    const toastMessage = trustedModalDetails?.isTrustedTech
      ? "Developer added to trusted tech expert successfully"
      : "Developer removed from trusted tech expert successfully";
    dispatch(
      addToFeature(
        query,
        handleCloseTrustedModal,
        data,
        toastMessage
      )
    );
  };
  const [assignemployee, showAssignEmployee] = useState(false);
  const handleShowAssignEmployee = () => {
    showAssignEmployee(!assignemployee);  
  }
  const handleCloseAssignEmployee = () => {
    showAssignEmployee(false);
  }
  const assignEmployeeText = (
    <Tooltip>Assign Team Member</Tooltip>
  )
  const handleCloseFeature = () => setShowFeatureModal(!showFeatureModal);
  const handleCloseTrustedModal = () => setShowTrustedModal(!showTrustedModal);
  const reassignEmployee = (
    <Tooltip>Reassign Team Member</Tooltip>
  )

  const featuredMember = (
    <Tooltip>Feature developer on website</Tooltip>
  )
  return (
    <>
      <CommonFilterSection
        filters={filters}
        setFilters={setFilters}
        filterFields={MEMBERS_FILTER_FIELDS}
        text={t("members")}
      />
      {/* <div className="border-bottom-grey pb-3 mb-4 d-md-flex justify-content-between align-items-center">
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
          <Form.Select
            className="filter-select shadow-none"
            onChange={(e) => setSortByOption(e.target.value)}
          >
            <option selected disabled>
              Sort By Name
            </option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </Form.Select>
          <Form.Select
            className="filter-select shadow-none"
            onChange={(e) => setSortByOption(e.target.value)}
          >
            <option selected disabled>
              Sort By Date
            </option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </Form.Select>
          <Form.Control
            type="text"
            className="form-field font-14 shadow-none"
            placeholder={t("enterSearchKeywords")}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <Button
            onClick={() => setSearchFilter(searchText)}
            variant="transparent"
            className="main-btn search-btn"
          >
            <IoSearch />
          </Button>
        </div>
      </div> */}
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
                Partners{" "}
                <span className="new-app">
                  {allApplications?.vendors?.length}
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="application-item">
              <Nav.Link eventKey="developers" className="application-link">
                Candidates{" "}
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
                      <th>Name</th>
                      <th>
                        {t("email")}
                      </th>
                      <th>Phone Number</th>
                      <th>Company Type</th>
                      <th>Tax Id</th>
                      <th>Applied on</th>
                      <th>{t("status")}</th>
                      <th className="text-center">Action</th>
                      <th className="text-center">Assign Team Member</th>
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
                                    <div
                                      className="user-imgbx application-userbx"
                                      onClick={() => redirectClient(item?.id)}
                                    >
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
                                <td className="text-capitalize">{item?.client_type}</td>
                                <td>{item?.company_tax_id}</td>
                                <td>{item?.created_at?.slice(0, 10)}</td>
                                <td>
                                  <span
                                    className={`${item?.approval_status == "approved"
                                      ? "status-finished text-capitalize"
                                      : "status-rejected text-capitalize"
                                      }`}
                                  >
                                    {item?.approval_status}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={deleteApplication}
                                  >
                                    <div class="form-check form-switch toggle-switch-wrapper d-inline-block ps-0 d-inline-block">
                                      <input
                                        class="form-check-input toggle-switch-custom mx-auto"
                                        type="checkbox"
                                        role="switch"
                                        checked={item?.status == "active"}
                                        onClick={(e) => handleToggle(e, item)}
                                      />
                                    </div>
                                  </OverlayTrigger>
                                </td>
                                <td>
                                  <div>
                                    <OverlayTrigger placement="bottom" overlay={assignEmployeeText}>
                                      <Button variant="transparent" onClick={handleShowAssignEmployee} className="arrow-btn primary-arrow mx-auto mb-1">
                                        <TiUserAdd />
                                      </Button>
                                    </OverlayTrigger>
                                    <span className="associate-text d-inline-flex align-items-center gap-2">
                                      <span className="associate white-nowrap">johndoe123@gmail.com</span>
                                      <OverlayTrigger placement="bottom" overlay={reassignEmployee}>
                                        <span onClick={handleShowAssignEmployee} className="reschedule-btn flex-none">
                                          <FaRotateRight />
                                        </span>
                                      </OverlayTrigger>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              {expandedRow === index && (
                                <tr
                                  className={`collapsible-row ${expandedRow === index ? "open" : ""
                                    }`}
                                >
                                  <td colSpan="9">
                                    <div>
                                      <Row>
                                        {/* {item?.client_type == "company" && ( */}
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
                                        {/* )} */}
                                        {/* {item?.client_type == "company" && */}
                                        {/* (item?.company_address ? ( */}
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
                                        {/* ) : (
                                              ""
                                            ))} */}
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
                                              Company Name
                                            </h3>
                                            <p className="application-text">
                                              {item?.company_name}
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

                                        {/* {item?.jobs?.length > 0 && ( */}
                                        <Col md={3} className="mb-3 ">
                                          <div>
                                            <h3 className="application-heading">
                                              Skillset Needed
                                            </h3>
                                            <ul className="need-skill-list  mb-0">
                                              {convertToArray(
                                                item?.jobs[0]?.skills
                                              )?.map((item, index) => {
                                                return (
                                                  <>
                                                    <li key={index}>{item}</li>
                                                  </>
                                                );
                                              })}
                                            </ul>
                                          </div>
                                        </Col>
                                        {/* )} */}

                                        {/* <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col> */}
                                        {/* {item?.client_type == "company" && ( */}
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
                                        {/* )} */}

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
                application.length > 0 ? (
                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                  {currentTab == "clients" && (
                    <p className="showing-result">
                      {/* {t("showing")} {allApplications?.clients?.length}{" "} */}
                      {t("showing")} {application?.length} {t("results")}
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
                      <th>Vendor Name</th>
                      <th>
                        {t("email")}
                      </th>
                      <th>{t("phoneNumber")}</th>
                      <th>{t("typeOfCompany")}</th>
                      <th>{t("engagements")}</th>
                      <th>
                        {t("engagements")} {t("last")}
                      </th>
                      <th>{t("status")}</th>
                      <th className="text-center">Action</th>
                      <th className="text-center">Assign Team Member</th>
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
                                <td><p className="application-mail mb-0">{item?.company?.website}</p></td>
                                <td>
                                  <span
                                    className={`${item?.approval_status == "approved"
                                      ? "status-finished text-capitalize"
                                      : "status-rejected text-capitalize"
                                      }`}
                                  >
                                    {item?.approval_status}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={deleteApplication}
                                  >
                                    <div class="form-check form-switch toggle-switch-wrapper d-inline-block ps-0 d-inline-block">
                                      <input
                                        class="form-check-input toggle-switch-custom mx-auto"
                                        type="checkbox"
                                        role="switch"
                                        onClick={(e) => handleToggle(e, item)}
                                        checked={item?.status == "active"}
                                      />
                                    </div>
                                  </OverlayTrigger>
                                </td>
                                <td>
                                  <div>
                                    <OverlayTrigger placement="bottom" overlay={assignEmployeeText}>
                                      <Button variant="transparent" onClick={handleShowAssignEmployee} className="arrow-btn primary-arrow mx-auto mb-1">
                                        <TiUserAdd />
                                      </Button>
                                    </OverlayTrigger>
                                    <span className="associate-text d-inline-flex align-items-center gap-2">
                                      <span className="associate white-nowrap">johndoe123@gmail.com</span>
                                      <OverlayTrigger placement="bottom" overlay={reassignEmployee}>
                                        <span onClick={handleShowAssignEmployee} className="reschedule-btn flex-none">
                                          <FaRotateRight />
                                        </span>
                                      </OverlayTrigger>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              {expandedRow === index && (
                                <tr
                                  className={`collapsible-row ${expandedRow === index ? "open" : ""
                                    }`}
                                >
                                  <td colSpan="9">
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
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("phoneNumber")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.phone_number}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("typeOfCompany")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.type_of_company}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3} className="mb-3">
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

                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              Website
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.website}
                                            </p>
                                          </div>
                                        </Col>

                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              Service offering
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.service_offering}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              company Email
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.email}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              company Yearly revenue
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.yearly_revenue}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              company GST number
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.gst_number}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3} className="mb-3">
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
                                        <Col md={3} className="mb-3">
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
                                        <Col md={3} className="mb-3">
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
                                        <Col md={3} className="mb-3">
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
                                        <Col md={3} className="mb-3">
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
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              Proprietor email
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.proprietor_email}
                                            </p>
                                          </div>
                                        </Col>
                                        {/* <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col> */}
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
              {allApplications?.totalVendorPages > 1 &&
                application.length > 0 ? (
                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                  {currentTab == "vendors" && (
                    <p className="showing-result">
                      {/* {t("showing")} {allApplications?.vendors?.length}{" "} */}
                      {t("showing")} {application?.length} {t("results")}
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
                      <th>{t("status")}</th>
                      <th>Action</th>
                      <th><span className="d-flex align-items-center gap-1">Featured 
                      <OverlayTrigger placement="bottom" overlay={featuredMember}>
                      <span><FaInfoCircle /></span></OverlayTrigger></span> </th>
                      <th>Trusted Tech Expert</th>
                      <th className="text-center">Assign Team Member</th>
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
                                    <div
                                      className="user-imgbx application-userbx"
                                      onClick={() => {
                                        handleRedirect(item?.id);
                                      }}
                                    >
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
                                    className={`${item?.approval_status == "approved"
                                      ? "status-finished text-capitalize"
                                      : "status-rejected text-capitalize"
                                      }`}
                                  >
                                    {item?.approval_status}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={deleteApplication}
                                  >
                                    <div class="form-check form-switch toggle-switch-wrapper ps-0 d-inline-block">
                                      <input
                                        class="form-check-input toggle-switch-custom mx-auto"
                                        type="checkbox"
                                        role="switch"
                                        onClick={(e) => handleToggle(e, item)}
                                        checked={item?.status == "active"}
                                      />
                                    </div>
                                  </OverlayTrigger>
                                </td>
                                <td className="text-center">
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                      item?.featured_member
                                        ? removeFromFeaturedMembers
                                        : addToFeaturedMembers
                                    }
                                  >
                                    <div class="form-check form-switch toggle-switch-wrapper ps-0 d-inline-block">
                                      <input
                                        class="form-check-input mx-auto toggle-switch-custom pointer"
                                        type="checkbox"
                                        role="switch"
                                        checked={item?.featured_member}
                                        onClick={(e) =>
                                          handleFeature(e, item.id)
                                        }
                                      />
                                    </div>
                                  </OverlayTrigger>
                                </td>
                                <td className="text-center">
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                      item?.trusted_tech_expert
                                        ? removeFromTrustedTech
                                        : addToTrustedTech
                                    }
                                  >
                                    <div class="form-check form-switch toggle-switch-wrapper ps-0 d-inline-block">
                                      <input
                                        class="form-check-input toggle-switch-custom pointer mx-auto"
                                        type="checkbox"
                                        role="switch"
                                        checked={item?.trusted_tech_expert}
                                        onClick={(e) =>
                                          handleIsTrustedTech(e, item.id)
                                        }
                                      />
                                    </div>
                                  </OverlayTrigger>
                                </td>
                                <td>
                                  <div>
                                    <OverlayTrigger placement="bottom" overlay={assignEmployeeText}>
                                      <Button variant="transparent" onClick={handleShowAssignEmployee} className="arrow-btn primary-arrow mx-auto mb-1">
                                        <TiUserAdd />
                                      </Button>
                                    </OverlayTrigger>
                                    <span className="associate-text d-inline-flex gap-2 align-items-center">
                                      <span className="associate white-nowrap">johndoe123gmail.com</span>
                                      <OverlayTrigger placement="bottom" overlay={reassignEmployee}>
                                        <span onClick={handleShowAssignEmployee} className="reschedule-btn flex-none">
                                          <FaRotateRight />
                                        </span>
                                      </OverlayTrigger>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              {expandedRow === index && (
                                <tr
                                  className={`collapsible-row ${expandedRow === index ? "open" : ""
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
                                        {/* <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col> */}

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
              {allApplications?.totalDeveloperPages > 1 &&
                application?.length > 0 ? (
                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                  {currentTab == "developers" && (
                    <p className="showing-result">
                      {/* {t("showing")} {allApplications?.developers?.length}{" "} */}
                      {t("showing")} {application?.length} {t("results")}
                    </p>
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
          text={`Are you sure ,you want to ${details.active == "active" ? "enable" : "disable"
            } this account?`}
          smallLoader={screenLoader}
        />
        {showFeatureModal && (
          <ConfirmationModal
            show={showFeatureModal}
            handleClose={handleCloseFeature}
            smallLoader={smallLoader}
            text={getFeatureText("featuredMember")}
            handleAction={handleAddToFeature}
          />
        )}
        {showTrustedModal && (
          <ConfirmationModal
            show={showTrustedModal}
            handleClose={handleCloseTrustedModal}
            smallLoader={smallLoader}
            text={getFeatureText()}
            handleAction={handleAddToTrustedTech}
          />
        )}
      </div>
      <AssignEmployee show={assignemployee} handleClose={handleCloseAssignEmployee} />
    </>
  );
};
export default Members;
