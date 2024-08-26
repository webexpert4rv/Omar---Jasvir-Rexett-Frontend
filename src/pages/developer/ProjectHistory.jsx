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
