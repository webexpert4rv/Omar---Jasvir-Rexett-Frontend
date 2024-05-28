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
const COLUMNS = {
  vendors: [
    { header: "clientName", key: "name" },
    { header: "emailAddress", key: "email" },
    { header: "phoneNumber", key: "phone_number" },
    { header: "typeOfCompany", key: "company",subKey:"type_of_company" },
    { header: "engagements", key: "company",subKey:"total_employees"},
    { header: "engagementsLast", key: "company",subkey:"website" },
    { header: "availablity", key: "company",subkey:"yearly_revenue" },
    { header: "action",type:"action" },

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
  const [selectedApprovedBtn, setSelectedApprovedBtn] = useState(null);
  const [selectedRejectedBtn, setSelectedRejectedBtn] = useState(null);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setArrowActive(index == arrowactive ? null : index);
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
    console.log(index, "index");
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
                                  <div className="d-flex gap-3">
                                    <OverlayTrigger
                                      placement="top"
                                      delay={{ show: 250, hide: 400 }}
                                      overlay={approvedTooltip}
                                    >
                                      <RexettButton
                                        icon={
                                          selectedApprovedBtn === index ? (
                                            approvedLoader
                                          ) : (
                                            <IoCheckmark />
                                          )
                                        }
                                        className="arrow-btn primary-arrow"
                                        variant="transparent"
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
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={rejectedTooltip}
                                    >
                                      <RexettButton
                                        icon={
                                          selectedRejectedBtn === index ? (
                                            approvedLoader
                                          ) : (
                                            <IoCloseOutline />
                                          )
                                        }
                                        className="arrow-btn danger-arrow"
                                        variant="transparent"
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
                                    </OverlayTrigger>
                                  </div>
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
                                            <div>
                                              <h3 className="application-heading">
                                                Company Name
                                              </h3>
                                              <p className="application-text">
                                                {item?.company_name
                                                  ? item?.company_name
                                                  : "Not Mentioned"}
                                              </p>
                                            </div>
                                          </Col>
                                        )}
                                        {item?.client_type == "company" && (
                                          <Col md={3} className="mb-3">
                                            <div>
                                              <h3 className="application-heading">
                                                Company Address
                                              </h3>
                                              <p className="application-text">
                                                {item?.company_address
                                                  ? item?.company_address
                                                  : "Not Mentioned"}
                                              </p>
                                            </div>
                                          </Col>
                                        )}

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
                      <th>{t("engagements")}</th>
                      <th>
                        {t("engagements")} {t("last")}
                      </th>
                      <th>{t("availability")}</th>
                      <th>{t("action")}</th>
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
                                <td>{item?.company?.total_employees}</td>
                                <td>{item?.company?.website}</td>
                                <td>{item?.company?.yearly_revenue}</td>
                                <td>
                                  <div className="d-flex gap-3">
                                    <RexettButton
                                      icon={
                                        selectedApprovedBtn === index ? (
                                          approvedLoader
                                        ) : (
                                          <IoCheckmark />
                                        )
                                      }
                                      className="arrow-btn primary-arrow"
                                      variant="transparent"
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
                                      className="arrow-btn danger-arrow"
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
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("totalEmployees")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.total_employees
                                                ? item?.company?.total_employees
                                                : " ----"}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("location")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.company?.location
                                                ? item?.company?.location
                                                : "----"}
                                            </p>
                                          </div>
                                        </Col>
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
                      <th>{t("action")}</th>
                      <th>Resume</th>
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
                                  <div className="d-flex gap-3">
                                    <RexettButton
                                      icon={
                                        selectedApprovedBtn === index ? (
                                          approvedLoader
                                        ) : (
                                          <IoCheckmark />
                                        )
                                      }
                                      className="arrow-btn primary-arrow"
                                      variant="transparent"
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
                                      className="arrow-btn danger-arrow"
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
                               
                                  
                                </td>
                                <td> <RexettButton
                                      icon={
                                        selectedRejectedBtn === index ? (
                                          approvedLoader
                                        ) : (
                                          <HiDownload />
                                        )
                                      }
                                      className="arrow-btn primary-arrow"
                                    /></td>
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
                                              {t("developerName")}
                                            </h3>
                                            <p className="application-text">
                                              {item?.name
                                                ? item?.name
                                                : "Not Mentioned"}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Address
                                            </h3>
                                            <p className="application-text">
                                              Not Mentioned
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
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col>

                                        <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("skillsetNeeded")}
                                            </h3>
                                            <ul className="need-skill-list">
                                              {item?.developer_skills?.skills
                                                ? convertToArray(
                                                    item?.developer_skills
                                                      ?.skills
                                                  )?.map((item, index) => {
                                                    return (
                                                      <>
                                                        <li key={index}>
                                                          {item}
                                                        </li>
                                                      </>
                                                    );
                                                  })
                                                : "Not Mentioned"}
                                            </ul>
                                          </div>
                                        </Col>

                                        <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Designation
                                            </h3>
                                            <p className="application-text">
                                              {item?.developer_detail
                                                ?.professional_title
                                                ? item?.developer_detail
                                                    ?.professional_title
                                                : "Not mentioned"}
                                            </p>
                                          </div>
                                        </Col>
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
