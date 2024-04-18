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

const Applications = () => {
  const dispatch = useDispatch();
  const { allApplications, approvedLoader, screenLoader } = useSelector(
    (state) => state.adminData
  );
  const [search, setSearch] = useState('')
  const [timerValue, setTimerValue] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [arrowactive, setArrowActive] = useState(null);
  const [currentTab, setCurrentTab] = useState("clients");
  const [application, setApplication] = useState([]);
  const [selectedApprovedBtn, setSelectedApprovedBtn] = useState(null);
  const [selectedRejectedBtn, setSelectedRejectedBtn] = useState(null);
  const [page, setPage] = useState(1);
  const { t }= useTranslation()

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setArrowActive(index==arrowactive?null:index);
  };

  useEffect(() => {
    let data={
      page:page
    }
    dispatch(allApplicationsList(data));
  }, [page]);

  useEffect(() => {
    setApplication(allApplications[currentTab]);
  }, [allApplications]);

  const handleSelect = (key) => {
    setCurrentTab(key);
    setApplication(allApplications[key]);
  };

  const convertToArray = (arr) => {
    const skillsArray = arr?.split(",");
    return skillsArray;
  };

  const handleClick = (e, clientId, status, index) => {
    e.stopPropagation();
    let payload = {
      user_id: clientId,
      status: status,
      "active-tab": currentTab,
    };
   
    let data={
      page:page,
      "active-tab": currentTab,
    }

    if (status === "approved") {
      setSelectedApprovedBtn(index);
    } else if (status === "rejected") {
      setSelectedRejectedBtn(index);
    }
    dispatch(adminApproveReject(payload));
    dispatch(allApplicationsList(data));
  };
  const approvedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Approve
    </Tooltip>
  );
  const rejectedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Reject
    </Tooltip>
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    clearTimeout(timerValue);
    const timer = setTimeout(() => {
      let data={
        page:page,
        "active-tab": currentTab,
        search:e.target.value
      }
      dispatch(allApplicationsList(data));
    }, 500);
    
    setTimerValue(timer);

}

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
          <Button variant="transparent" className="main-btn px-3 search-btn">
            <IoSearch />
          </Button>
        </div>
      </div>
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
                    <th>{t("clientName")}</th>
                    <th>{t("email")} {t("address")}</th>
                    <th>{t("phoneNumber")}</th>
                    <th>{t("engagement")}</th>
                    <th>{t("engagement")} {t("last")}</th>
                    <th>{t("availability")}</th>
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
                                <span
                                  className={
                                    arrowactive==index && currentTab == "clients"  
                                      ? "row-arrow active"
                                      : "row-arrow"
                                  }
                                >
                                  <RxChevronRight />
                                </span>{" "}
                                {item?.name}
                              </td>
                              <td>
                                <span className="application-mail">
                                  {item.email}
                                </span>
                              </td>
                              <td>{item?.phone_number}</td>
                              <td>{item?.jobs[0]?.engagement_type}</td>
                              <td>{item?.jobs[0]?.project_length}</td>
                              <td>{item?.jobs[0]?.status}</td>
                              <td>
                                <div className="d-flex gap-3">
                                  <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={approvedTooltip}
                                  >
                                    <RexettButton
                                      icon={<IoCheckmark />}
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
                                      icon={<IoCloseOutline />}
                                      className="arrow-btn"
                                      variant={"danger"}
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
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            New Team Member Start{" "}
                                          </h3>
                                          <p className="application-text">
                                            {
                                              item?.jobs[0]
                                                ?.development_should_start_in
                                            }
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Skillset Needed
                                          </h3>
                                          <ul className="need-skill-list">
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
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Applied on
                                          </h3>
                                          <p className="application-text">
                                            {item?.created_at?.slice(0, 10)}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Job Title
                                          </h3>
                                          <p className="application-text">
                                            {item?.jobs[0]?.title}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Project Length
                                          </h3>
                                          <p className="application-text">
                                            {item?.jobs[0]?.project_length}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Experience
                                          </h3>
                                          <p className="application-text">
                                            {item?.jobs[0]?.experience}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Contract type
                                          </h3>
                                          <p className="application-text">
                                            {item?.jobs[0]?.contract_type}
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
            {application?.length > 0 ? (
              <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                {currentTab == "clients" ? (
                  <p className="showing-result">
                    Showing {allApplications?.items_per_page} results
                  </p>
                ) : (
                  <p className="showing-result">
                    Showing {allApplications?.vendors?.length} results
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
                    <th>{t("email")} {t("address")}</th>
                    <th>{t("phoneNumber")}</th>
                    <th>{t("typeOfCompany")}</th>
                    <th>{t("engagements")}</th>
                    <th>{t("engagements")} {t("last")}</th>
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
                                <span
                                  className={
                                    arrowactive==index && currentTab == "vendors" 
                                      ? "row-arrow active"
                                      : "row-arrow"
                                  }
                                >
                                  <RxChevronRight />
                                </span>{" "}
                                {item?.name}
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
                                    icon={<IoCheckmark />}
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
                                    icon={<IoCloseOutline />}
                                    className="arrow-btn"
                                    variant={"danger"}
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
                                            Company Name
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.name}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Email
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.email}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Total Employees
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.total_employees}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Location
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.location}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Phone Number
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.phone_number}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Type Of Company
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.type_of_company}
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
            {application?.length > 0 ? (
              <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                {currentTab == "clients" ? (
                  <p className="showing-result">
                    Showing {allApplications?.items_per_page} results
                  </p>
                ) : (
                  <p className="showing-result">
                    Showing {allApplications?.vendors?.length} results
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
                    <th>Developer Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {screenLoader ? (
                    <ScreenLoader />
                  ) : (
                    <>
                      {currentTab == "developers" && application?.length > 0 ? (
                        application?.map((item, index) => (
                          <React.Fragment key={index}>
                            <tr
                              className="application-row"
                              onClick={() => handleRowClick(index)}
                            >
                               <td className="white-nowrap">
                                <span
                                  className={
                                    arrowactive==index && currentTab == "developers"  
                                      ? "row-arrow active"
                                      : "row-arrow"
                                  }
                                >
                                  <RxChevronRight />
                                </span>{" "}
                                {item?.name}
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
                                    icon={<IoCheckmark />}
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
                                    icon={<IoCloseOutline />}
                                    className="arrow-btn"
                                    variant={"danger"}
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
                                           Company Name
                                          </h3>
                                          <p className="application-text">
                                            {item?.developer_experiences[0]?.company_name}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Job Title
                                          </h3>
                                          <p className="application-text">
                                            {item?.developer_experiences[0]?.job_title}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Skillset Needed
                                          </h3>
                                          <ul className="need-skill-list">
                                            {convertToArray(
                                              item?.developer_skills?.skills
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
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Marital Status
                                          </h3>
                                          <p className="application-text">
                                            {item?.marital_status}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                          Professtional Title
                                          </h3>
                                          <p className="application-text">
                                            {item?.developer_detail?.professional_title}
                                          </p>
                                        </div>
                                      </Col>
                                      {/* <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Type Of Company
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.type_of_company}
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
            {application?.length > 0 ? (
              <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                {currentTab == "clients" ? (
                  <p className="showing-result">
                    Showing {allApplications?.items_per_page} results
                  </p>
                ) : (
                  <p className="showing-result">
                    Showing {allApplications?.vendors?.length} results
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
        </Tab.Content>
      </Tab.Container>
    </>
  );
};
export default Applications;
