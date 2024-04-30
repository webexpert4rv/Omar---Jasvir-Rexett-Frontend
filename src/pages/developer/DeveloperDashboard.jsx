import React, { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import img from "../../assets/img/user-img.jpg"
import { useDispatch, useSelector } from "react-redux";
import { getDeveloperDashboard } from "../../redux/slices/developerDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import NoDataFound from "../../components/atomic/NoDataFound"
import { useTranslation } from "react-i18next";

const DeveloperDashboard = () => {
    const {developerDashboard , screenLoader}=useSelector(state=>state.developerData)
    const dispatch=useDispatch()

    const { t } = useTranslation()

    useEffect(()=>{
     dispatch(getDeveloperDashboard())
    },[])
    return (
        <>
       { screenLoader ? <ScreenLoader/> : <div>
            <h2 className="section-head mb-4">{t("overview")}</h2>
            <div className="overview-card-wrapper mb-5">
                <div className="overview-card active">
                    <div>
                        <h4 className="overview-card-subhead">{t("totalHours")}</h4>
                        <h3 className="overview-card-heading mb-0">{developerDashboard?.thisMonthHours ?( developerDashboard?.thisMonthHours).toFixed(2):'0'} hrs</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
                <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">{t("thisWeekHours")}</h4>
                        <h3 className="overview-card-heading mb-0">{developerDashboard?.thisWeekHours ? (developerDashboard?.thisWeekHours).toFixed(2):'0'} hrs</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
                <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">{t("activeProjects")}</h4>
                        <h3 className="overview-card-heading mb-0">0</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
                <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">{t("thisMonthHours")}</h4>
                        <h3 className="overview-card-heading mb-0">{developerDashboard?.totalHours ? (developerDashboard?.totalHours).toFixed(2):'0'} hrs</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
            </div>
            <Row>
                <Col md={3}>
                    <div className="developers-list mb-md-0 mb-3">
                        <div className="developer-card">
                            <div className="user-imgbx">
                                <img src={developerDashboard?.developerDetails?.profile_picture?developerDashboard?.developerDetails?.profile_picture:img } alt="developer" className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">{developerDashboard?.developerDetails?.name?developerDashboard?.developerDetails?.name:"Dev" }</h3>
                                <p className="designation-user">{developerDashboard?.developerDetails?.developer_detail?.professional_title}</p>
                                <p className="email-user">{developerDashboard?.developerDetails?.email}</p>
                                <ul className="social-icons">
                                    <li>
                                        {developerDashboard?.developerDetails?.developer_detail?.github_url ? <Link to={developerDashboard?.developerDetails?.developer_detail?.github_url}><FaGithub /></Link> : ""}
                                    </li>
                                    <li>
                                        {developerDashboard?.developerDetails?.developer_detail?.linkedin_url ? <Link to={developerDashboard?.developerDetails?.developer_detail?.linkedin_url}><FaLinkedin /></Link> : ""}
                                    </li>
                                    {/* <li>
                                        <Link to={developerDashboard?.developerDetails?.developer_detail?.resume}><MdEmail /></Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={9}>
                    <div>
                        <h2 className="section-head-sub mb-4">{t("listOfClients")}</h2>

                        <div>
                            <div className="table-responsive">
                                <table className="table time-table table-bordered table-ui-custom">
                                    <thead>
                                        <th className="time-table-head">
                                            {t("clientName")}
                                        </th>
                                        <th className="time-table-head">
                                            {t("contract")}
                                        </th>
                                        <th className="time-table-head">
                                            {t("totalHours")}
                                        </th>
                                        <th className="time-table-head">
                                            {t("location")}
                                        </th>
                                        <th className="time-table-head">
                                            {t("status")}
                                        </th>
                                
                                    </thead>
                                    <tbody>
                                       
                                            {
                                                developerDashboard?.clientList?.length>0? developerDashboard?.clientList?.map((item,index)=>{
                                                    return(
                                                        <React.Fragment key={index}>
                                                             <tr>
                                                        <td className="time-table-data">{item.clientName}</td>
                                                        <td className="time-table-data">{item.contractType}</td>
                                                        <td className="time-table-data">{(item.totalHours).toFixed(2)} </td>
                                                        <td className="time-table-data">{item.location}</td>
                                                        <td className="time-table-data"><span className="status-finished">{item?.status?"Finished":"Progress"}</span></td>
                                                        </tr></React.Fragment>
                                                    )
                                                })

                                           :<td colSpan={10}> <NoDataFound/>  </td> }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            </div>}
        </>
    )
}
export default DeveloperDashboard;