import React, { useEffect } from "react";
// import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVendorDashboard } from "../../redux/slices/vendorDataSlice";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import NoDataFound from "../../components/atomic/NoDataFound";




const VendorDashboard = () => {
    const dispatch = useDispatch()
    const { vendorDashboard, smallLoader, screenLoader } = useSelector(state => state.vendorData)
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getVendorDashboard())
    }, [])

    const handleCardClick = (id) => {
        dispatch(getDeveloperDetails(id))
        navigate(`/vendor-single-developer/${id}`)
    }



    return (
        <>
            {screenLoader ? <ScreenLoader /> : <><h2 className="section-head mb-4">Overview</h2>
                <div className="overview-card-wrapper mb-5">
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Income</h4>
                            <h3 className="overview-card-heading mb-0">{vendorDashboard?.revenue_total}</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom-grey">
                    <h2 className="section-head-sub">List of all register developers</h2>

                </div>
                <div className="developers-list mb-5">
                    {vendorDashboard?.all_developers?.length > 0 ? <>
                        {vendorDashboard?.all_developers?.map((item, index) => {
                            return (
                                <div className="developer-card" key={index} onClick={() => handleCardClick(item?.id)}>
                                    <div className="user-imgbx">
                                        <img src={item?.profile_picture} className="user-img" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="user-name">{item?.name}</h3>
                                        {/* <p className="designation-user">Front End Designer</p> */}
                                        <p className="email-user">{item?.email}</p>
                                        {/* <ul className="social-icons">
                                            <li>
                                                <Link to={"#"}><FaGithub /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><FaLinkedin /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><MdEmail /></Link>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="mt-2 ">
                            <Link to={"/list-all-developers"} className="link-text-dark">See All</Link>
                        </div>

                    </> : <NoDataFound />}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom-grey">
                    <h2 className="section-head-sub">List of rented developers</h2>

                </div>
                <div className="developers-list">
                    {vendorDashboard?.rented_developers?.length > 0 ? <>
                        {vendorDashboard?.rented_developers?.map((value, index) => {
                            return (

                                <div className="developer-card" key={index} onClick={() => handleCardClick(value?.id)}>
                                    <div className="user-imgbx"> 
                                    <img src={value?.profile_picture} className="user-img" />
                                    </div>   
                                    <div className="text-center">
                                        <h3 className="user-name">{value?.name}</h3>
                                        {/* <p className="designation-user">Front End Designer</p> */}
                                        <p className="email-user">{value?.email}</p>
                                        {/* <ul className="social-icons">
                            <li>
                                <Link to={"#"}><FaGithub /></Link>
                            </li>
                            <li>
                                <Link to={"#"}><FaLinkedin /></Link>
                            </li>
                            <li>
                                <Link to={"#"}><MdEmail /></Link>
                            </li>
                        </ul> */}
                                    </div>
                                </div>
                            )
                        })}

                        <div className="text-center ">
                            <Link to={"/all-rented-developers"} className="link-text-dark">See All</Link>
                        </div>
                    </>
                        : <NoDataFound />}
                </div>

            </>}
        </>
    )
}
export default VendorDashboard;