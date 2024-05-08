import React, { useEffect, useState } from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Nav, Tab } from "react-bootstrap";
import { FaCircleCheck, FaTrashCan } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { getDeleteDeveloper, getDevelopersList, getRentedDevelopers } from "../../redux/slices/vendorDataSlice";
import { useDispatch, useSelector } from "react-redux";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { SeeMore } from "../../components/atomic/SeeMore";
import NoDataFound from "../../components/atomic/NoDataFound";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import { useTranslation } from "react-i18next";
import ConfirmationModal from ".././views/Modals/ConfirmationModal";

const RentedDevelopers = () => {
    const { allDevelopersList, rentedDevelopers, screenLoader } = useSelector(state => state.vendorData)
    const dispatch = useDispatch()
    const [selectedFilter, setSelectedFilter] = useState({});
    const [showModal, setShowModal] = useState(false)
    const [count, setCount] = useState(1);
    const navigate = useNavigate()
    const { t } = useTranslation()



    useEffect(() => {
        dispatch(getRentedDevelopers({ page: count }))
    }, [count])



   
    const handleSkill = (e) => {
        let filterData = {
            ...selectedFilter,
            skill_title: e.target.value
        }
        setSelectedFilter(filterData)
        dispatch(getRentedDevelopers(filterData))
    };

    // const handleAssignment = (e) => {
    //     let filterData = {
    //         ...selectedFilter,
    //         assignment_filter: e.target.value
    //     }
    //     setSelectedFilter(filterData)
    //     dispatch(getRentedDevelopers(filterData))
    // };
    const handleExperience = (e) => {
        let filterData = {
            ...selectedFilter,
            experience_years: e.target.value
        }
        setSelectedFilter(filterData)
        dispatch(getRentedDevelopers(filterData))
    };

    const handleClear = () => {
        setSelectedFilter({
            skill_title: "Select Filter",
            assignment_filter: "Select Developers ",
            experience_years: "Select Experience",

        })
        dispatch(getDevelopersList());
    }
    const handleCardClick = (devId) => {
        dispatch(getDeveloperDetails(devId))
        navigate(`/vendor-single-developer/${devId}`)
    }
    const handleRowClick = (id) => {
        dispatch(getDeveloperDetails(id))
        navigate(`/vendor-single-developer/${id}`)
    }
    const handleDelete = (e,devId) => {
        e.stopPropagation()
        setShowModal(!showModal)
    }
    const handleDeleteAction=(e)=>{
        e.preventDefault()
        dispatch(getDeleteDeveloper())
    }
    const handleClose=()=>{
        setShowModal(!showModal)
    }
    return (
        <>
            {screenLoader ? <ScreenLoader /> : <>
                <Tab.Container className="w-100" defaultActiveKey="list-view">
                    <div className="d-flex justify-content-between mb-3 pb-2 border-bottom-grey">
                        <h3 className="section-head-sub mb-0">{t("listOfAllDevelopers")}</h3>
                        <Nav variant="pills" className="document-view-pill">
                            <Nav.Item className="document-view-item">
                                <Nav.Link className="document-view-link" eventKey="list-view"><FaListUl /></Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="document-view-item">
                                <Nav.Link className="document-view-link" eventKey="grid-view"><IoGrid /></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                  { false&& <div className="filter-section mb-4">
                        <Form className="mb-4 filter-section">
                            <div className="d-flex gap-3">
                                <div className="flex-none">
                                    {/* <Form.Label className="common-label">Category</Form.Label> */}
                                    <Form.Select className="filter-select shadow-none" value={selectedFilter?.skill_title} onChange={(e) => handleSkill(e)}>
                                        <option value="" onClick={(e) => e.stopPropagation()}>{t("selectSkills")}</option>
                                        {rentedDevelopers?.data?.skills?.map((item, index) => {
                                            return (
                                                <>

                                                </>
                                            )
                                        })}
                                        {/* <option value="python" onClick={(e) => e.stopPropagation()}>Python</option>
                                        <option value="javascript" onClick={(e) => e.stopPropagation()}>JavaScript</option>
                                        <option value="full_stack" onClick={(e) => e.stopPropagation()}>Full Stack</option> */}

                                    </Form.Select>
                                </div>
                                <div className="flex-none">
                                    {/* <Form.Label className="common-label">Experience</Form.Label> */}
                                    <Form.Select className="filter-select shadow-none" value={selectedFilter?.experience_years} onChange={(e) => handleExperience(e)}>
                                        <option value="" > {t("selectExperience")} </option>
                                        <option value="1 years" onClick={(e) => e.stopPropagation()}>1 {t("years")}</option>
                                        <option value="2 years" onClick={(e) => e.stopPropagation()}>2 {t("years")}</option>
                                        <option value="3 years" onClick={(e) => e.stopPropagation()}>3 {t("years")}</option>
                                        <option value="5 years" onClick={(e) => e.stopPropagation()}>5 {t("years")}</option>
                                        <option value="10 years" onClick={(e) => e.stopPropagation()}>10 {t("years")}</option>
                                    </Form.Select>
                                </div>
                                <div>
                                    <Button variant="transparent" className="main-btn px-3 py-2 " onClick={handleClear}>{t("clear")}</Button>
                                </div>
                            </div>
                        </Form>
                    </div>}
                    <Tab.Content>
                        <Tab.Pane eventKey="grid-view">
                            <div className="developers-list">
                                {rentedDevelopers?.data?.developers.length > 0 ? rentedDevelopers?.data?.developers.map((item, index) => {
                                    return (
                                        <>

                                            <div className="developer-card" onClick={() => handleCardClick(item?.id)}>
                                                <div className="user-imgbx">
                                                    <img src={item?.profile_picture} className="user-img" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="user-name">{item.name}</h3>
                                                    <p className="designation-user">{item?.developer_detail?.professional_title}</p>
                                                    <p className="email-user">{item?.email}</p>
                                                    <ul className="social-icons">
                                                        <li>
                                                            <Link to={item?.developer_detail?.github_url}><FaGithub /></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={item?.developer_detail?.linkedin_url}><FaLinkedin /></Link>
                                                        </li>
                                                        {/* <li>
                                                            <Link to={item?.email}><MdEmail /></Link>
                                                        </li> */}
                                                    </ul>
                                                </div>
                                            </div>


                                        </>
                                    )
                                }) : <NoDataFound />}

                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="list-view">
                            <div className="table-responsive">
                                <table className="table developer-table">
                                    <thead>
                                        <tr>
                                            <th><span>{t("developerName")}</span></th>
                                            <th><span>{t("designation")}</span></th>
                                            <th><span>{t("email")}</span></th>
                                            <th><span>{t("connects")}</span></th>
                                            <th><span>{t("action")}</span></th>

                                        </tr>
                                    </thead>
                                    {rentedDevelopers?.data?.developers?.map((value, index) => {
                                        return (
                                            <>
                                                <tbody>
                                                    <tr onClick={() => handleRowClick(value?.id)}>
                                                        <td>
                                                            <span className="d-flex align-items-center gap-3">
                                                                <img src={value?.profile_picture} />
                                                                <h3 className="user-name color-121212 mb-0">{value?.name}</h3>
                                                                <span className="check-icon list-dev-check position-static"><FaCircleCheck /></span>
                                                            </span>

                                                        </td>
                                                        <td>
                                                            <span>
                                                                <p className="designation-user color-121212 mb-0">{value?.developer_detail?.professional_title}</p>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span>
                                                                <p className="email-user color-121212 mb-0">{value?.email}</p>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <ul className="social-icons mb-0 justify-content-start">
                                                                <li>
                                                                    <Link to={`${value?.developer_detail?.github_url}`}><FaGithub /></Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`${value?.developer_detail?.linkedin_url}`}><FaLinkedin /></Link>
                                                                </li>
                                                                {/* <li>
                                                                    <Link to={`${value?.email}`}><MdEmail /></Link>
                                                                </li> */}
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <Button className="delete-btn" onClick={(e)=>handleDelete(e,value?.id)}><FaTrashCan /></Button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </>
                                        )
                                    })}
                                </table>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

                {rentedDevelopers?.pagination?.totalDevelopers >= 5 && rentedDevelopers?.pagination?.totalDevelopers !==rentedDevelopers?.data?.developers.length ? (
                    <div className="text-center mt-3">
                        <SeeMore setCount={setCount} />
                    </div>
                ) : (
                    ""
                )}
                <ConfirmationModal show={showModal} handleClose={handleClose} onClick={handleDeleteAction} header={"Delete Developer"} text={"Are you sure ,you want to delete this developer"} />
            </>
            }
        </>
    )
}
export default RentedDevelopers;