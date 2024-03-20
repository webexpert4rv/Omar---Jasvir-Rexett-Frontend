import React, { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDeveloperDashboard } from "../../redux/slices/developerDataSlice";
const DeveloperDashboard = () => {
    const {developerDashboard}=useSelector(state=>state.developerData)
    const dispatch=useDispatch()
    useEffect(()=>{
     dispatch(getDeveloperDashboard())
    },[])
    return (
        <>
            <h2 className="section-head mb-4">Overview</h2>
            <div className="overview-card-wrapper mb-5">
                <div className="overview-card active">
                    <div>
                        <h4 className="overview-card-subhead">Total hours</h4>
                        <h3 className="overview-card-heading mb-0">{developerDashboard?.totalHours} hrs</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
                <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">This Week Hours</h4>
                        <h3 className="overview-card-heading mb-0">{developerDashboard?.totalHours} hrs</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
                <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">Active Projects</h4>
                        <h3 className="overview-card-heading mb-0">10</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
                <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">This Month Hours</h4>
                        <h3 className="overview-card-heading mb-0">{developerDashboard?.totalHours} hrs</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
            </div>
            <Row>
                <Col md={3}>
                    <div className="developers-list">
                        <div className="developer-card">
                            <div className="user-imgbx">
                                <img src={developerDashboard?.developerDetails?.profile_picture} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">{developerDashboard?.developerDetails?.name}</h3>
                                <p className="designation-user">{developerDashboard?.developerDetails?.developer_detail?.professional_title}</p>
                                <p className="email-user">{developerDashboard?.developerDetails?.email}</p>
                                <ul className="social-icons">
                                    <li>
                                        <Link to={developerDashboard?.developerDetails?.developer_detail?.github_url}><FaGithub /></Link>
                                    </li>
                                    <li>
                                        <Link to={developerDashboard?.developerDetails?.developer_detail?.linkedin_url}><FaLinkedin /></Link>
                                    </li>
                                    <li>
                                        <Link to={"#"}><MdEmail /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={9}>
                    <div>
                        <h2 className="section-head-sub mb-4">List of Clients</h2>

                        <div>
                            <div className="table-responsive">
                                <table className="table time-table table-bordered table-ui-custom">
                                    <thead>
                                        <th className="time-table-head">
                                            Client Name
                                        </th>
                                        <th className="time-table-head">
                                            Contract
                                        </th>
                                        <th className="time-table-head">
                                            Total Hours
                                        </th>
                                        <th className="time-table-head">
                                            Location
                                        </th>
                                        <th className="time-table-head">
                                            Status
                                        </th>
                                    </thead>
                                    <tbody>
                                       
                                            {
                                                developerDashboard?.clientList?.map((item,index)=>{
                                                    return(
                                                        <React.Fragment key={index}>
                                                             <tr>
                                                        <td className="time-table-data">{item.clientName}</td>
                                                        <td className="time-table-data">{item.contractType}</td>
                                                        <td className="time-table-data">{item.totalHours}</td>
                                                        <td className="time-table-data">{item.location}</td>
                                                        <td className="time-table-data"><span className="status-finished">Finished</span></td>
                                                        </tr></React.Fragment>
                                                    )
                                                })

                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        </>
    )
}
export default DeveloperDashboard;