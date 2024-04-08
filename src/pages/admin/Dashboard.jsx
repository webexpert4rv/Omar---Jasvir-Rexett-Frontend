import React, { useEffect } from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { adminListAssignedDeveloper, adminListClients, getAdminDashboard } from "../../redux/slices/adminDataSlice";
import { useDispatch, useSelector } from "react-redux";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import NoDataFound from "../../components/atomic/NoDataFound"



const AdminDashboard = () => {
    const dispatch = useDispatch()
    const { listOfClients, adminDashboard, screenLoader } = useSelector(state => state.adminData)
    const { developerDetails } = useSelector(state => state.adminData)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAdminDashboard())
    }, [])

    const handleCardClick = (id) => {
        dispatch(getDeveloperDetails(id))
        navigate(`/admin-single-developer/${id}`)
    }
    return (
        <>
            {screenLoader ? <ScreenLoader /> : <div>
                <h2 className="section-head mb-4">Overview</h2>
                <div className="overview-card-wrapper mb-5">
                    {/* <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">Fund</h4>
                        <h3 className="overview-card-heading mb-0">Spent</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div> */}
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Income</h4>
                            <h3 className="overview-card-heading mb-0">Earned</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Client Joined</h4>
                            <h3 className="overview-card-heading mb-0">{adminDashboard?.data?.numberOfClientsJoined}</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Vendor Joined</h4>
                            <h3 className="overview-card-heading mb-0">{adminDashboard?.data?.numberOfVendorsJoined}</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Total Jobs Posted</h4>
                            <h3 className="overview-card-heading mb-0">{adminDashboard?.data?.totalJobsPosted}</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                </div>
                <Row className="mb-5">
                    <Col md={12}>
                        <div className="d-flex justify-content-between mb-4 ">
                            <h2 className="section-head-sub">List of clients</h2>
                        </div>
                        <div className="developers-list">
                            {adminDashboard?.data?.clients.length>0?adminDashboard?.data?.clients.map((item, index) => {
                                return (
                                    <>
                                        <div className="developer-card client-card" >
                                            <div className="user-imgbx ">
                                                <img src={item?.profile_picture? item?.profile_picture: userImg} className="user-img" alt="developer" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name ">{item?.name}</h3>
                                                <p className="email-user">{item?.email}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            }):<NoDataFound/>}
                        </div>
                    </Col>
                </Row>
                <h2 className="section-head-sub mb-4">List of assigned developers</h2>
                <div className="developers-list">

                    {adminDashboard?.data?.assignedDevelopers.length>0? adminDashboard?.data?.assignedDevelopers.map((item, index) => {
                        return (
                            <>
                                <div className="developer-card" onClick={() => handleCardClick(item?.developer_id)}>
                                    <div className="user-imgbx">
                                        <img src={item?.developer?.profile_picture ? item?.developer?.profile_picture :userImg} alt="developer" className="user-img" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="user-name">{item?.developer?.name}</h3>
                                        <p className="designation-user">{item?.developer?.developer_detail?.professional_title}</p>
                                        <p className="email-user">{item?.developer?.email}</p>
                                        <ul className="social-icons">
                                            <li>
                                                <Link to={`${item?.developer?.developer_detail?.github_url}`}><FaGithub /></Link>
                                            </li>
                                            <li>
                                                <Link to={`${item?.developer?.developer_detail?.linkedin_url}`}><FaLinkedin /></Link>
                                            </li>
                                            <li>
                                                <Link to={`${item?.developer?.email}`}><MdEmail /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )
                    })
                    :<NoDataFound/>}
                </div>
                {adminDashboard?.data?.assignedDevelopers.length>0?<div className="text-center mt-3">
                    <Link to={"/developer-list"} className="link-text-dark">See All</Link>
                </div>:""}
            </div>}
        </>
    )
}
export default AdminDashboard;