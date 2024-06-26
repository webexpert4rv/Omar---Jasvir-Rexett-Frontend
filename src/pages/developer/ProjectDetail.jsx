import React, { useEffect, useState } from "react";
import companyLogo from "../../assets/img/amazon.png";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { FiCalendar } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetail } from "../../redux/slices/developerDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { PROJECT_DETAIL_SECTION_1_FIELDS } from "./developerConstant";
import { useTranslation } from "react-i18next";
import { getDateInRequiredFormat } from "../../components/utils";
import SimpleTableComponent from "../../components/atomic/SimpleTableComponent";
const ProjectDetail = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("timesheet_project");
  const [tabData, setTabData] = useState([]);
  const [page,setPage] = useState(1);
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [filters,setFilters] = useState({});
  const { screenLoader, projectDetail } = useSelector(
    (state) => state.developerData
  );
  useEffect(() => {
    dispatch(
      getProjectDetail(projectId, (data) => {
        // add proper keys here
        const activeTabDataKey =
        activeTab === "timesheet_project" ? "timeReports" : "";
        setTabData(data?.[activeTabDataKey]);
      })
    );
  }, [activeTab]);

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <div className="detail-view">
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="timesheet_project"
            activeKey={activeTab}
          >
            <div className="card-box mb-4 p-3">
              <div className="detail-view">
                <Row className="flex-wrap gy-3">
                  {PROJECT_DETAIL_SECTION_1_FIELDS?.map(
                    ({ label, key, isDate, format, isStatus }) => (
                      <Col md={3}>
                        <div className="client-info p-0 bg-transparent">
                          <h3 className="font-15 fw-bold mb-2 text-capitalize">
                            {t(label)}
                          </h3>
                          <p
                            className={`client-name-heading mb-0 ${
                              isDate &&
                              "d-flex gap-1  align-items-center fw-bold"
                            }`}
                          >
                            {isDate && (
                              <span className="d-flex align-items-center gap-1 text-green">
                                <FiCalendar />
                                {getDateInRequiredFormat(
                                  projectDetail?.contractDetails?.[key],
                                  format
                                )}
                              </span>
                            )}
                            {isStatus && (
                              <span className="status-finished white-nowrap">
                                {projectDetail?.contractDetails?.[key] === true
                                  ? "Completed"
                                  : projectDetail?.contractDetails?.[key] ===
                                    false
                                  ? "In progress"
                                  : ""}
                              </span>
                            )}
                            {!isDate &&
                              !isStatus &&
                              projectDetail?.contractDetails?.[key]}
                          </p>
                        </div>
                      </Col>
                    )
                  )}
                </Row>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <Nav variant="pills" className="application-pills">
                  <Nav.Item className="application-item">
                    <Nav.Link
                      eventKey="timesheet_project"
                      className="application-link"
                    >
                      Timesheets
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="application-item">
                    <Nav.Link
                      eventKey="invoice_project"
                      className="application-link"
                    >
                      Invoices
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
            <Tab.Pane eventKey="timesheet_project">
              <div>
                {/* <SimpleTableComponent data={tabData} columns={} /> */}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="invoice_project">
              <div>
                {/* <SimpleTableComponent data={tabData} columns={}  /> */}
              </div>
            </Tab.Pane>
          </Tab.Container>
        </div>
      )}
    </>
  );
};
export default ProjectDetail;
