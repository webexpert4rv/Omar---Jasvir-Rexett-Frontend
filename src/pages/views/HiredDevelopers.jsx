import React, { useEffect, useState } from "react";
import { developerAssignList, getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/atomic/Cards";
import { SeeMore } from "../../components/atomic/SeeMore";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import userImg from "../../assets/img/user-img.jpg";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { Nav, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NoDataFound from "../../components/atomic/NoDataFound";
import { useTranslation } from "react-i18next";


const HiredDevelopers = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const navigate = useNavigate()
  const { t } = useTranslation();
  const { assignedDeveloperList, screenLoader } = useSelector(
    (state) => state.clientData
  );

  useEffect(() => {
    dispatch(developerAssignList(count));
  }, [dispatch, count]);


  const handleCardClick = (devId) => {
    dispatch(getDeveloperDetails(devId))
    navigate(`/client/client-single-developer/${devId}`)
  }

  const handleRowClick = (id) => {
    dispatch(getDeveloperDetails(id))
    navigate(`/client/client-single-developer/${id}`)
  }


  return (
    <>
      <Tab.Container className="w-100" defaultActiveKey="list-view">
        <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom-grey">
          <h3 className="section-head-sub mb-0">{t("listOfAssignedDevelopers")}</h3>
          <Nav variant="pills" className="document-view-pill">
            <Nav.Item className="document-view-item">
              <Nav.Link className="document-view-link" eventKey="list-view">
                <FaListUl />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="document-view-item">
              <Nav.Link className="document-view-link" eventKey="grid-view">
                <IoGrid />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        {screenLoader ? (
          <ScreenLoader />
        ) : (
          <>
            {" "}
            <Tab.Content>

              <Tab.Pane eventKey="list-view">
                <div className="table-responsive">
                  <table className="table developer-table">
                    <thead>
                      <tr>
                        <th>
                          <span>{t("developerName")}</span>
                        </th>
                        <th>
                          <span>{t("designation")}</span>
                        </th>
                        <th>
                          <span>{t("email")}</span>
                        </th>
                        <th>
                          <span>Project start date</span>
                        </th>
                        <th>
                          <span>Project name</span>
                        </th>
                        <th>
                          <span>Hiring Price</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedDeveloperList?.assigned_developers?.length > 0 ? assignedDeveloperList?.assigned_developers?.map((item, index) => {
                        return (
                          <>
                            <tr onClick={() => handleRowClick(item?.developer_id)} key={item?.developer_id}>
                              <td>
                                <span className="d-flex align-items-center gap-3">
                                  <img src={item?.developer?.profile_picture ? item?.developer?.profile_picture : userImg} />
                                  <h3 className="user-name color-121212 mb-0">
                                    {item?.developer?.name}
                                  </h3>
                                </span>
                              </td>
                              <td>
                                <span>
                                  <p className="designation-user color-121212 mb-0">
                                    {
                                      item?.developer?.developer_detail
                                        ?.professional_title
                                    }
                                  </p>
                                </span>
                              </td>
                              <td>
                                <span>
                                  <p className="designation-user color-121212 mb-0">
                                    {item?.developer?.email}
                                  </p>
                                </span>
                              </td>
                              <td>
                                <span><p className="designation-user color-121212 mb-0">12-05-2024</p></span>
                              </td>
                              <td>
                                <span><p className="designation-user color-121212 mb-0">Build AI Bot</p></span>
                              </td>
                              <td>
                                <span><p className="designation-user color-121212 mb-0">$1240.00</p></span>
                              </td>
                      
                            </tr>
                          </>
                        );
                      }) :<td colSpan={10}> <div className="simple-no-data"><NoDataFound /></div>  </td>}
                    </tbody>
                  </table>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="grid-view">
                <div className="developers-list">
                  {assignedDeveloperList?.assigned_developers?.length > 0 ? assignedDeveloperList?.assigned_developers?.map((item, index) => {
                    return (
                      <>
                        <Cards item={item} handleCardClick={() => handleCardClick(item?.developer_id)} />
                      </>
                    );
                  }) : <td colSpan={10}> <div className="simple-no-data"><NoDataFound /></div>  </td>}
                </div>
              </Tab.Pane>
            </Tab.Content>
            {
              assignedDeveloperList?.total_developer_count > 5 &&  assignedDeveloperList?.assigned_developers?.length !==assignedDeveloperList.total_developer_count  ? (
                <div className="text-center mt-3">
                  <SeeMore setCount={setCount} />
                </div>
              ) : ("")}
          </>
        )}
      </Tab.Container>
    </>
  );
};
export default HiredDevelopers;
