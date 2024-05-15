import React, { useEffect, useState } from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import clientLogo from '../../assets/img/facebook.png'
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { adminListClients, getSingleClient } from "../../redux/slices/adminDataSlice";
import { useDispatch, useSelector } from "react-redux";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { SeeMore } from "../../components/atomic/SeeMore";
import { useTranslation } from "react-i18next";




const ListClient = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { listOfClients, assignedDeveloper, screenLoader } = useSelector(state => state.adminData)
    const [count, setCount] = useState(1)
    const{ t } =useTranslation()


    useEffect(() => {
        dispatch(adminListClients(count))
    }, [dispatch, count])

    const handleClientCardClick = (client_id) => {
        dispatch(getSingleClient(client_id))
        navigate(`/admin-single-client/${client_id}`)
    }

    const handleClientRowClick = (client_id) => {
        dispatch(getSingleClient(client_id))
        navigate(`/admin-single-client/${client_id}`)
    }

    return (
        <>
            {screenLoader ? <ScreenLoader /> : <div>
                {/* <h2 className="section-head mb-4">{t("overview")}</h2>
                <div className="overview-card-wrapper mb-5">
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">{t("income")}</h4>
                            <h3 className="overview-card-heading mb-0">{t("earned")}</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                </div> */}
                <Tab.Container className="w-100" defaultActiveKey="list-view">
                    <div className="d-flex justify-content-between mb-3 pb-2 border-bottom-grey">
                        <h2 className="section-head border-0 mb-0 pb-0">{t("listOfClients")}</h2>
                        {/* <h2 className="section-head-sub mb-0">List of clients who hire developers from Rexett</h2> */}
                        <Nav variant="pills" className="document-view-pill">
                            <Nav.Item className="document-view-item">
                                <Nav.Link className="document-view-link" eventKey="list-view"><FaListUl /></Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="document-view-item">
                                <Nav.Link className="document-view-link" eventKey="grid-view"><IoGrid /></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <Tab.Content>
                        <Tab.Pane eventKey="list-view">
                            <div className="table-responsive">
                                <table className="table developer-table">
                                    <thead>
                                        <tr>
                                          <th><span>{t("client/comapanyname")}</span></th>
                                          <th><span>Company/Individual</span></th>
                                            <th><span>Phone Number</span></th>
                                            <th><span>Address</span></th>
                                            <th><span>{t("email")}</span></th>
                                        </tr>
                                    </thead>
                                    {listOfClients?.map((val, index) => {
                                        return (
                                            <>
                                                <tbody>
                                                    <tr  onClick={() => handleClientRowClick(val?.id)}>
                                                        <td>
                                                            <span className="d-flex align-items-center gap-3">
                                                                <img src={val.profile_picture ? val.profile_picture : val?.client_type=="company"?val?.company_logo :userImg} />
                                                                <h3 className="user-name color-121212 mb-0">{val?.client_type=="company"? val?.company_name: val?.name }</h3>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="associate-text">
                                                                <span className="associate">{val?.client_type}</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="font-14">+1234567890</span>
                                                        </td>
                                                        <td>
                                                            <span className="font-14">{val?.client_type=="company"? val?.company_address:"-"}</span>
                                                        </td>
                                                        <td>
                                                            <span>
                                                                <p className="designation-user color-121212 mb-0">{val?.email}</p>
                                                            </span>
                                                        </td>
                                                      
                                                    </tr>

                                                </tbody>
                                            </>)
                                    })}
                                </table>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="grid-view">
                            <div className="developers-list">
                                {listOfClients?.map((item, index) => {

                                    return (<>
                                        <div className="developer-card" onClick={() => handleClientCardClick(item?.id)}>
                                            <div className="user-imgbx">
                                                <img src={item.profile_picture ? item.profile_picture : userImg} className="user-img client-logo" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name">{item.name}</h3>
                                                <p className="email-user">{item?.email}</p>
                                                
                                            </div>
                                        </div>
                                    </>)
                                })}
                            </div>
                        </Tab.Pane>

                    </Tab.Content>
                </Tab.Container>
                {
              listOfClients?.total_clients > 5  ? (
                <div className="text-center mt-3">
                  <SeeMore setCount={setCount} />
                </div>
              ) : ("")}

              
            </div>}
        </>
    )
}
export default ListClient;