import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  active_COLUMNS,
  ACTIVE_PROJECT_COLUMNS,
  completed_COLUMNS,
  COMPLETED_PROJECT_COLUMNS,
  PROJECT_HISTORY_PER_PAGE,
  PROJECT_HISTORY_TABS,
} from "./developerConstant";
import SimpleTableComponent from "../../components/atomic/SimpleTableComponent";
import { useDispatch, useSelector } from "react-redux";
import { getProjectHistoryDetail } from "../../redux/slices/developerDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import CommonFilterSection from "../../components/atomic/CommonFilterSection";
const ProjectHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectHistoryDetail, projectHistoryPagination, screenLoader } =
    useSelector((state) => state.developerData);
  const [activeTab, setActiveTab] = useState(
    PROJECT_HISTORY_TABS.activeProject
  );
  const [page, setPage] = useState(1);
  // const [filters,setFilters] = useState({
  // });
  useEffect(() => {
    const filters = {
      page: page,
      tab: activeTab,
      perPage: PROJECT_HISTORY_PER_PAGE,
    };
    dispatch(getProjectHistoryDetail(filters));
  }, [page, activeTab]);
  const redirectToProject = (id) => {
    navigate(`/developer/project-detail/${id}`);
  };
  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <div className="card-box">
          <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
            <h2 className="section-head-sub mb-0 border-0">Project History</h2>
          </div>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="active"
            activeKey={activeTab}
            onSelect={(selectedKey) => setActiveTab(selectedKey)}
          >
            <div className="d-flex">
              <Nav variant="pills" className="application-pills">
                <Nav.Item className="application-item">
                  <Nav.Link eventKey="active" className="application-link">
                    Active Project
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="application-item">
                  <Nav.Link eventKey="completed" className="application-link">
                    Completed Projects
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="active" className="pb-4">
                {/* <div>
                <div className="table-responsive">
                  <table className="table table-ui-custom">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Client Name</th>
                        <th>Start Date</th>
                        <th>Total Hours Spend</th>
                        <th>Total Invoice Raised</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className="application-row"
                        onClick={redirectToProject}
                      >
                        <td className="font-14 align-middle">
                          Frontend developer
                        </td>
                        <td className="font-14 align-middle">Amazon</td>
                        <td className="font-14 align-middle">02 May 2024</td>
                        <td className="font-14 align-middle">130hrs</td>
                        <td className="font-14 align-middle">2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}
                <SimpleTableComponent
                  columns={ACTIVE_PROJECT_COLUMNS}
                  data={projectHistoryDetail}
                  page={page}
                  setPage={setPage}
                  totalPages={projectHistoryPagination?.totalPages}
                  onClick={redirectToProject}
                  keyToSendOnClick={"id"}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="completed">
                {/* <div>
                  <div className="table-responsive">
                    <table className="table table-ui-custom">
                      <thead>
                        <tr>
                          <th>Project Name</th>
                          <th>Client Name</th>
                          <th>Start Date</th>
                          <th>Completion Date</th>
                          <th>Total Hours Spend</th>
                          <th>Total Invoice Raised</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          className="application-row"
                          onClick={redirectToProject}
                        >
                          <td className="font-14 align-middle">AI Chat Bot</td>
                          <td className="font-14 align-middle">Google</td>
                          <td className="font-14 align-middle">12 Dec 2023</td>
                          <td className="font-14 align-middle">13 Apr 2024</td>
                          <td className="font-14 align-middle">3000hrs</td>
                          <td className="font-14 align-middle">12</td>
                        </tr>
                        <tr
                          className="application-row"
                          onClick={redirectToProject}
                        >
                          <td className="font-14 align-middle">Figma to UI</td>
                          <td className="font-14 align-middle">
                            RV Technologies
                          </td>
                          <td className="font-14 align-middle">10 Nov 2023</td>
                          <td className="font-14 align-middle">08 Oct 2023</td>
                          <td className="font-14 align-middle">528hrs</td>
                          <td className="font-14 align-middle">4</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div> */}
                {/* <CommonFilterSection
                  filters={filters}
                  setFilters={setFilters}
                  filterFields={APPLICANT_FILTER_FIELDS}
                  // text={t("applications")}
                /> */}
                <SimpleTableComponent
                  columns={COMPLETED_PROJECT_COLUMNS}
                  data={projectHistoryDetail}
                  page={page}
                  setPage={setPage}
                  totalPages={projectHistoryPagination?.totalPages}
                  onClick={redirectToProject}
                  keyToSendOnClick={"id"}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      )}
    </>
  );
};
export default ProjectHistory;
