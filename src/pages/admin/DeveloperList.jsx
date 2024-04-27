import React, { useEffect, useState } from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Nav, Tab } from "react-bootstrap";
import { FaCircleCheck } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { adminListAssignedDeveloper, getSingleClient } from "../../redux/slices/adminDataSlice";
import NoDataFound from "../../components/atomic/NoDataFound";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { SeeMore } from "../../components/atomic/SeeMore";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import { useTranslation } from "react-i18next";

const DeveloperList = () => {
    const dispatch = useDispatch()
    const [selectedFilter, setSelectedFilter] = useState({});
    const { assignedDeveloper, screenLoader } = useSelector(state => state.adminData)
    const [count, setCount] = useState(1);
    const [search,setSearch]=useState()
    const [timerValue, setTimerValue] = useState("");
    const { t }= useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(adminListAssignedDeveloper({ page: count }))
    }, [count])

    const handleSkill = (e) => {
        let filterData = {
            ...selectedFilter,
            skill_title: e.target.value
        }
        setSelectedFilter(filterData)
        dispatch(adminListAssignedDeveloper(filterData))
    };

    const handleAssignment = (e) => {
        let filterData = {
            ...selectedFilter,
            assignment_filter: e.target.value
        }
        setSelectedFilter(filterData)
        dispatch(adminListAssignedDeveloper(filterData))
    };
    const handleExperience = (e) => {
        let filterData = {
            ...selectedFilter,
            experience_years: e.target.value
        }
        setSelectedFilter(filterData)
        dispatch(adminListAssignedDeveloper(filterData))
    };

    const handleClear = () => {
        setSelectedFilter({
            skill_title: "Select Skills",
            assignment_filter: "Select Developers",
            experience_years: "Select Experience",

        })
        setSearch()
        dispatch(adminListAssignedDeveloper());
    }
    const handleCardClick = (devId) => {
        dispatch(getDeveloperDetails(devId))
        navigate(`/admin-single-developer/${devId}`)


    }
    const handleRowClick = (id) => {
        dispatch(getDeveloperDetails(id))
        navigate(`/admin-single-developer/${id}`)


    }

    const handleSearchChange = (e) => {
        clearTimeout(timerValue);
        setSearch(e.target.value)
        const timer = setTimeout(() => {
            let filterData = {
                ...selectedFilter,
                search:e.target.value
            }
            dispatch(adminListAssignedDeveloper(filterData))
        }, 500);
        setTimerValue(timer);

    }


    return (
        <>
          
                <div>
                    {/* <h3 className="section-head-sub">Filter By</h3> */}
                    <Form className="mb-4 filter-section">
                        <div className="d-flex gap-3">
                            <div className="flex-none">
                                {/* <Form.Label className="common-label">Category</Form.Label> */}
                                <Form.Select className="filter-select shadow-none" value={selectedFilter?.skill_title} onChange={(e) => handleSkill(e)}>
                                    <option value="" onClick={(e) => e.stopPropagation()}>{t("selectSkills")}</option>
                                    {assignedDeveloper?.skills?.map((item, index) => {
                                        return (
                                            <>
                                                <option key={index} >{item?.title}</option>
                                            </>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className="flex-none">
                                {/* <Form.Label className="common-label">Developers</Form.Label> */}
                                <Form.Select className="filter-select shadow-none" value={selectedFilter?.assignment_filter} onChange={(e) => handleAssignment(e)}>
                                    <option value="" onClick={(e) => e.stopPropagation()}>{t("selectDevelopers")}</option>
                                    <option value="assigned" onClick={(e) => e.stopPropagation()} >{t("assigned")}</option>
                                    <option value="unassigned" onClick={(e) => e.stopPropagation()}>{t("unAssigned")}</option>
                                    <option value="all_developers" onClick={(e) => e.stopPropagation()}>{t("allDevelopers")}</option>
                                </Form.Select>
                            </div>
                            <div className="flex-none">
                                {/* <Form.Label className="common-label">Experience</Form.Label> */}
                                <Form.Select className="filter-select shadow-none" value={selectedFilter?.experience_years} onChange={(e) => handleExperience(e)}>
                                    <option value="" > {t("selectExperience")} </option>
                                    <option value="1" onClick={(e) => e.stopPropagation()}>1 {t("years")}</option>
                                    <option value="2" onClick={(e) => e.stopPropagation()}>2 {t("years")}</option>
                                    <option value="3" onClick={(e) => e.stopPropagation()}>3 {t("years")}</option>
                                    <option value="5" onClick={(e) => e.stopPropagation()}>5 {t("years")}</option>
                                    <option value="10" onClick={(e) => e.stopPropagation()}>10 {t("years")}</option>
                                </Form.Select>
                            </div>

                            <div className="flex-none">
                                <Form.Control type="email" placeholder="Search Developer" value={search}  onChange={handleSearchChange} />
                                </div>
                            <div>
                                <Button variant="transparent" className="main-btn px-3 py-2 " onClick={handleClear}>{t("clear")}</Button>
                            </div>
                        </div>
                    </Form>
                </div>
               
                { screenLoader ? <ScreenLoader />:   <Tab.Container className="w-100" defaultActiveKey="list-view">
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
                        <Tab.Content>
                            <Tab.Pane eventKey="grid-view">
                                <div className="developers-list">
                                    {assignedDeveloper?.developers?.length > 0 ? assignedDeveloper?.developers?.map((item, index) => {
                                        console.log(item, "item")
                                        return (
                                            <>
                                                <div className="developer-card" onClick={() => handleCardClick(item?.id)}>
                                                    <span className="check-icon"><FaCircleCheck /></span>
                                                    <div className="user-imgbx">
                                                        <img src={item?.profile_picture ? item?.profile_picture : userImg} className="user-img" />
                                                    </div>
                                                    <div className="text-center">
                                                        <h3 className="user-name">{item?.name}</h3>
                                                        <p className="designation-user">{item?.developer_detail?.professional_title}</p>
                                                        <p className="email-user">{item?.email}</p>
                                                        <ul className="social-icons">
                                                            <li>
                                                                {item?.developer_detail?.github_url ? <Link to={`${item?.developer_detail?.github_url}`}><FaGithub /></Link> : ""}
                                                            </li>
                                                            <li>
                                                               {item?.developer_detail?.linkedin_url ?  <Link to={`${item?.developer_detail?.linkedin_url}`}><FaLinkedin /></Link> : ""}
                                                            </li>
                                                            {/* <li>
                                                        <Link to={`${item?.email}`}><MdEmail /></Link>
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
                                            </tr>
                                        </thead>
                                        {assignedDeveloper?.developers?.length > 0 ? assignedDeveloper?.developers?.map((value, index) => {
                                            return (
                                                <>
                                                    <tbody>
                                                        <tr onClick={() => handleRowClick(value.id)}>
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
                                                                    {value?.developer_detail?.github_url ? <Link to={`${value?.developer_detail?.github_url}`}><FaGithub /></Link> : ""}
                                                                    </li>
                                                                    <li>
                                                                    {value?.developer_detail?.linkedin_url ?  <Link to={`${value?.developer_detail?.linkedin_url}`}><FaLinkedin /></Link> : ""}
                                                                    </li>
                                                                    {/* <li>
                                                                <Link to={`${value?.email}`}><MdEmail /></Link>
                                                            </li> */}
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </>
                                            )
                                            // })}
                                        }) : <NoDataFound />}
                                    </table>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>}
               
                {
                   !screenLoader && assignedDeveloper?.total_developers_count > 5 && assignedDeveloper?.developers?.length !== assignedDeveloper.total_developers_count ? (
                        <div className="text-center mt-3">
                            <SeeMore setCount={setCount} />
                        </div>
                    ) : ("")}
        </>
    )
}
export default DeveloperList;