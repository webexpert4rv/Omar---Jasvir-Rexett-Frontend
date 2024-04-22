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
import { useDispatch, useSelector } from "react-redux";
import { getDeleteDeveloper, getDevelopersList } from "../../redux/slices/vendorDataSlice";
import NoDataFound from "../../components/atomic/NoDataFound";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import RexettPagination from "../../components/atomic/RexettPagination";
import { SeeMore } from "../../components/atomic/SeeMore";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import { useTranslation } from "react-i18next";
import ConfirmationModal from ".././views/Modals/ConfirmationModal";


const AllDeveloperList = () => {
    const { allDevelopersList, screenLoader } = useSelector(state => state.vendorData)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState({});
    const [count, setCount] = useState(1);
    const [devId , setDevId] =  useState()
    const navigate = useNavigate()
    const { t } = useTranslation()

    console.log(allDevelopersList,"allDevelopersList")
    // console.log(allDevelopersList?.data?.developers[0]?.developer_skills?.developer_id, "allDevelopersList-----")

    useEffect(() => {
        dispatch(getDevelopersList({ page: count }))
    }, [count])



    const handleSkill = (e) => {
        let filterData = {
            ...selectedFilter,
            skill_title: e.target.value
        }
        setSelectedFilter(filterData)
        dispatch(getDevelopersList(filterData))
    };

    const handleAssignment = (e) => {
        let filterData = {
            ...selectedFilter,
            assignment_filter: e.target.value
        }
        setSelectedFilter(filterData)
        dispatch(getDevelopersList(filterData))
    };
    const handleExperience = (e) => {
        let filterData = {
            ...selectedFilter,
            experience_years: e.target.value
        }
        setSelectedFilter(filterData)
        dispatch(getDevelopersList(filterData))
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

    const handleClose=()=>{
        setShowModal(!showModal)
    }
    const handleDelete = (e,id) => {
        e.stopPropagation()
        setDevId(id)
        setShowModal(!showModal)
    }
    console.log(devId , "devId")
    const handleDeleteAction=()=>{
        dispatch(getDeleteDeveloper(devId))
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
                    <div className="filter-section mb-4">
                        <Form className="mb-4 filter-section">
                            <div className="d-flex gap-3">
                                <div className="flex-none">
                                    {/* <Form.Label className="common-label">Category</Form.Label> */}
                                    <Form.Select className="filter-select shadow-none" value={selectedFilter?.skill_title} onChange={(e) => handleSkill(e)}>
                                        <option value="" onClick={(e) => e.stopPropagation()}>{t("selectSkills")}</option>
                                        {allDevelopersList?.data?.skills?.map((item , index)=>{
                                            return(
                                            <option  key = {index} >{item?.title}</option>
                                       ) })}

                                    </Form.Select>
                                </div>
                                <div className="flex-none">
                                    {/* <Form.Label className="common-label">Developers</Form.Label> */}
                                    {/* <Form.Select className="filter-select shadow-none" value={selectedFilter?.assignment_filter} onChange={(e) => handleAssignment(e)}>
                                        <option value="" onClick={(e) => e.stopPropagation()}>{t("selectDevelopers")}</option>
                                        <option value="assigned" onClick={(e) => e.stopPropagation()} >{t("assigned")}</option>
                                        <option value="unassigned" onClick={(e) => e.stopPropagation()}>{t("unassigned")}</option>
                                        <option value="all_developers" onClick={(e) => e.stopPropagation()}>{t("allDevelopers")}</option>
                                    </Form.Select> */}
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
                    </div>
                    <Tab.Content>
                        <Tab.Pane eventKey="grid-view">
                            <div className="developers-list">
                                {allDevelopersList?.data?.developers.length > 0 ? allDevelopersList?.data?.developers.map((item, index) => {
                                    return (
                                        <>

                                            <div className="developer-card" onClick={() => handleCardClick(item?.id)}>
                                                <div className="user-imgbx">
                                                    <img src={item?.profile_picture ? item?.profile_picture : userImg} className="user-img" />
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
                                    {allDevelopersList?.data?.developers?.map((value, index) => {
                                        return (
                                            <>
                                                <tbody>
                                                    <tr onClick={() => handleRowClick(value?.id)} >
                                                        <td>
                                                            <span className="d-flex align-items-center gap-3">
                                                                <img src={value?.profile_picture ? value?.profile_picture : userImg} />
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


                                                        <Button onClick={(e)=>handleDelete(e,value?.id)}><FaTrashCan /></Button>
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
                {allDevelopersList?.data?.developers?.length >= 5 ? (
                    <div className="text-center mt-3">
                        <SeeMore setCount={setCount} />
                    </div>
                ) : (
                    ""
                )}
                <ConfirmationModal show={showModal} handleClose={handleClose} onClick={handleDeleteAction} header={"Delete developer"} text={"Are you sure ,you want to delete this developer"} />
            </>
            }
        </>
    )
}
export default AllDeveloperList;