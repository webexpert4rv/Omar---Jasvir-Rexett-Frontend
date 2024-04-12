import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cards from "../../components/atomic/Cards";
import OverViewCard from "../../components/atomic/OverViewCard";
import { useDispatch, useSelector } from "react-redux";
import { developerAssignList, getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import userImg from '../../assets/img/user-img.jpg'
import { Nav, Tab } from "react-bootstrap";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import NoDataFound from "../../components/atomic/NoDataFound";

const Dashboard = (cardDetails) => {
    const dispatch = useDispatch();
    const { assignedDeveloperList, screenLoader } = useSelector(state => state.clientData)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(developerAssignList(1));
    }, [dispatch])

    const handleCardClick = (id) => {
        dispatch(getDeveloperDetails(id))
        navigate(`/client-single-developer/${id}`)

    }
    return (
        <>
            <h2 className="section-head">Overview</h2>
            <p className="mb-4">Monitor and manage your developer team</p>
            {screenLoader ? <ScreenLoader /> : <>
                <div className="overview-card-wrapper mb-5">
                    <OverViewCard head="Fund" value="Spent" />
                    <OverViewCard head="Earned Back" value={assignedDeveloperList?.earned_back_hours ? assignedDeveloperList?.earned_back_hours : '0'} />
                    <OverViewCard head="Job Posted" value={assignedDeveloperList?.total_jobs_posted ? assignedDeveloperList?.total_jobs_posted : "0"} />
                    <OverViewCard head="Developer Assigned" value={assignedDeveloperList?.num_assigned_developers ? assignedDeveloperList?.num_assigned_developers : '0'} />
                </div>

                <Tab.Container className="w-100" defaultActiveKey="grid-view">
                    <div className="d-flex justify-content-between mb-3 pb-2 border-bottom-grey">
                        <h3 className="section-head-sub mb-0">List of assigned developers</h3>
                        <Nav variant="pills" className="document-view-pill">
                            <Nav.Item className="document-view-item">
                                <Nav.Link className="document-view-link" eventKey="grid-view"><IoGrid /></Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="document-view-item">
                                <Nav.Link className="document-view-link" eventKey="list-view"><FaListUl /></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    {assignedDeveloperList?.assigned_developers?.length > 0 ?
                        <Tab.Content>
                            <Tab.Pane eventKey="grid-view" >
                                <div className="developers-list pt-3" >

                                    {
                                        assignedDeveloperList?.assigned_developers?.map((item, index) => {
                                            return (
                                                <>
                                                    <Cards item={item} handleCardClick={() => handleCardClick(item?.developer?.id)} />
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="list-view">
                                <div className="table-responsive">
                                    <table className="table developer-table">
                                        <thead>
                                            <tr>
                                                <th><span>Developer Name</span></th>    
                                                <th><span>Designation</span></th>
                                                <th><span>Email</span></th>
                                                {/* <th><span>Connects</span></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignedDeveloperList?.assigned_developers?.map((item, index) => {
                                                return (
                                                    <>
                                                        <tr onClick={() => handleCardClick(item?.developer?.id)}>
                                                            <td>
                                                                <span className="d-flex align-items-center gap-3">
                                                                    <img src={item?.developer?.profile_picture ? item?.developer?.profile_picture : userImg} />
                                                                    <h3 className="user-name color-121212 mb-0">{item?.developer?.name}</h3>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    <p className="designation-user color-121212 mb-0">{item?.developer?.developer_detail?.professional_title}</p>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    <p className="designation-user color-121212 mb-0">{item?.developer?.email}</p>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <ul className="social-icons mb-0 justify-content-start d-none">
                                                                    <li>
                                                                        <Link to={item?.developer?.developer_detail?.github_url}><FaGithub /></Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={item?.developer?.developer_detail?.linkedin_url}><FaLinkedin /></Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={item?.developer?.email}><MdEmail /></Link>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                            </Tab.Pane>
                            <>
                                <div className="text-center mt-5">
                                    <Link to={"/hired-developers"} className="link-text-dark">See All</Link>
                                </div>
                            </>
                        </Tab.Content>
                        : <div><NoDataFound /></div>}
                </Tab.Container>
            </>}
        </>
    )
}
export default Dashboard;