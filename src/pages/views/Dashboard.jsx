import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cards from "../../components/atomic/Cards";
import OverViewCard from "../../components/atomic/OverViewCard";
import { useDispatch, useSelector } from "react-redux";
import { developerAssignList } from "../../redux/slices/clientDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import userImg from '../../assets/img/user-img.jpg'

const Dashboard = (cardDetails) => {
    const dispatch = useDispatch();
    const { assignedDeveloperList, screenLoader } = useSelector(state => state.clientData)

    useEffect(() => {
        dispatch(developerAssignList(1));
    }, [dispatch])

    return (
        <>
            <h2 className="section-head">Overview</h2>
            <p className="mb-4">Monitor and manage your developer team</p>
            {screenLoader ? <ScreenLoader /> : <>
                <div className="overview-card-wrapper mb-5">
                    <OverViewCard head="Fund" value="Spent" />
                    <OverViewCard head="Earned Back" value="500" />
                    <OverViewCard head="Job Posted" value="5" />
                    <OverViewCard head="Developer Assigned" value="15" />
                </div>
                <h2 className="section-head-sub mb-5">List of assigned developers</h2>
                <div className="developers-list">
                    {
                        assignedDeveloperList?.map((item, index) => {
                            return (
                                <>
                                    <Cards item={item} />
                                </>
                            )
                        })
                    }
                </div>
                <div className="table-responsive">
                    <table className="table developer-table mt-4">
                        <thead>
                            <tr>
                                <th><span>Developer Name</span></th>
                                <th><span>Designation</span></th>
                                <th><span>Email</span></th>
                                <th><span>Connects</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="d-flex align-items-center gap-3">
                                        <img src={userImg} />
                                        <h3 className="user-name color-121212 mb-0">John Doe</h3>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <p className="designation-user color-121212 mb-0">Full stack developer</p>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <p className="email-user color-121212 mb-0">Full stack developer</p>
                                    </span>
                                </td>
                                <td>
                                    <ul className="social-icons mb-0 justify-content-start">
                                        <li>
                                            <Link to={cardDetails?.item?.developer?.developer_detail?.github_url}><FaGithub /></Link>
                                        </li>
                                        <li>
                                            <Link to={cardDetails?.item?.developer?.developer_detail?.linkedin_url}><FaLinkedin /></Link>
                                        </li>
                                        <li>
                                            <Link to={cardDetails?.item?.developer?.developer_detail?.email}><MdEmail /></Link>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="d-flex align-items-center gap-3">
                                        <img src={userImg} />
                                        <h3 className="user-name color-121212 mb-0">John Doe</h3>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <p className="designation-user color-121212 mb-0">Full stack developer</p>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <p className="email-user color-121212 mb-0">Full stack developer</p>
                                    </span>
                                </td>
                                <td>
                                    <ul className="social-icons mb-0 justify-content-start">
                                        <li>
                                            <Link to={cardDetails?.item?.developer?.developer_detail?.github_url}><FaGithub /></Link>
                                        </li>
                                        <li>
                                            <Link to={cardDetails?.item?.developer?.developer_detail?.linkedin_url}><FaLinkedin /></Link>
                                        </li>
                                        <li>
                                            <Link to={cardDetails?.item?.developer?.developer_detail?.email}><MdEmail /></Link>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-3">
                    <Link to={"/hired-developers"} className="link-text-dark">See All</Link>
                </div>
            </>}
        </>
    )
}
export default Dashboard;