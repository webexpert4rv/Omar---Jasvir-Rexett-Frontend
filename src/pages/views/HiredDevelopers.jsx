import React, { useEffect, useState } from "react";
import { developerAssignList } from "../../redux/slices/clientDataSlice";
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
import { Link } from "react-router-dom";
const HiredDevelopers = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const { assignedDeveloperList, screenLoader } = useSelector(
    (state) => state.clientData
  );

  useEffect(() => {
    dispatch(developerAssignList(count));
  }, [dispatch, count]);

  return (
    <>
      <Tab.Container className="w-100" defaultActiveKey="grid-view">
        <div className="d-flex justify-content-between mb-3 pb-2 border-bottom-grey">
          <h3 className="section-head-sub mb-0">List of assigned developers</h3>
          <Nav variant="pills" className="document-view-pill">
            <Nav.Item className="document-view-item">
              <Nav.Link className="document-view-link" eventKey="grid-view">
                <IoGrid />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="document-view-item">
              <Nav.Link className="document-view-link" eventKey="list-view">
                <FaListUl />
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
              <Tab.Pane eventKey="grid-view">
                <div className="developers-list">
                  {assignedDeveloperList?.map((item, index) => {
                    return (
                      <>
                        <Cards item={item} />
                      </>
                    );
                  })}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="list-view">
                <div className="table-responsive">
                  <table className="table developer-table">
                    <thead>
                      <tr>
                        <th>
                          <span>Developer Name</span>
                        </th>
                        <th>
                          <span>Designation</span>
                        </th>
                        <th>
                          <span>Email</span>
                        </th>
                        {/* <th>
                          <span>Connects</span>
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {assignedDeveloperList?.map((item, index) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <span className="d-flex align-items-center gap-3">
                                  <img src={item?.developer?.profile_picture} />
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
                                <ul className="social-icons mb-0 justify-content-start d-none">
                                  <li>
                                    <Link
                                      to={
                                        item?.developer?.developer_detail
                                          ?.github_url
                                      }
                                    >
                                      <FaGithub />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to={
                                        item?.developer?.developer_detail
                                          ?.github_url
                                      }
                                    >
                                      <FaLinkedin />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to={
                                        item?.developer?.developer_detail
                                          ?.github_url
                                      }
                                    >
                                      <MdEmail />
                                    </Link>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Tab.Pane>
            </Tab.Content>
            {assignedDeveloperList.length >= 5 ? (
              <div className="text-center mt-3">
                <SeeMore setCount={setCount} />
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </Tab.Container>
    </>
  );
};
export default HiredDevelopers;
