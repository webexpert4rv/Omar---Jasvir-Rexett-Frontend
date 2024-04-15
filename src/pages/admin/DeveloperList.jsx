import React, { useEffect, useState } from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { Button, Form, Nav, Tab } from "react-bootstrap";
import { FaCircleCheck } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { adminListAssignedDeveloper } from "../../redux/slices/adminDataSlice";
import NoDataFound from "../../components/atomic/NoDataFound";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { SeeMore } from "../../components/atomic/SeeMore";

const DeveloperList = () => {
    const dispatch = useDispatch()
    const [selectedFilter, setSelectedFilter] = useState({});
    const { assignedDeveloper, screenLoader } = useSelector(state => state.adminData)
    const [count, setCount] = useState(1);
  

    useEffect(() => {
        dispatch(adminListAssignedDeveloper({page:count}))
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
            skill_title: "Select Filter",
            assignment_filter: "Select Developers ",
            experience_years: "Select Experience",

        })
        dispatch(adminListAssignedDeveloper());
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
                                <option value="" onClick={(e) => e.stopPropagation()}>Select Developers</option>
                                <option value="python" onClick={(e) => e.stopPropagation()}>Python</option>
                                <option value="javascript" onClick={(e) => e.stopPropagation()}>JavaScript</option>
                                <option value="full_stack" onClick={(e) => e.stopPropagation()}>Full Stack</option>

                            </Form.Select>
                        </div>
                        <div className="flex-none">
                            {/* <Form.Label className="common-label">Developers</Form.Label> */}
                            <Form.Select className="filter-select shadow-none" value={selectedFilter?.assignment_filter} onChange={(e) => handleAssignment(e)}>
                                <option value="" onClick={(e) => e.stopPropagation()}>Select Developers</option>
                                <option value="assigned" onClick={(e) => e.stopPropagation()} >Assigned</option>
                                <option value="unassigned" onClick={(e) => e.stopPropagation()}>Unassigned</option>
                                <option value="all_developers" onClick={(e) => e.stopPropagation()}>All Developers</option>
                            </Form.Select>
                        </div>
                        <div className="flex-none">
                            {/* <Form.Label className="common-label">Experience</Form.Label> */}
                            <Form.Select className="filter-select shadow-none" value={selectedFilter?.experience_years} onChange={(e) => handleExperience(e)}>
                                <option value="" > Select Experience </option>
                                <option value="1 years" onClick={(e) => e.stopPropagation()}>1 years</option>
                                <option value="2 years" onClick={(e) => e.stopPropagation()}>2 years</option>
                                <option value="3 years" onClick={(e) => e.stopPropagation()}>3 years</option>
                                <option value="5 years" onClick={(e) => e.stopPropagation()}>5 years</option>
                                <option value="10 years" onClick={(e) => e.stopPropagation()}>10 years</option>
                            </Form.Select>
                        </div>
                        <div>
                            <Button variant="transparent" className="main-btn px-3 py-2 " onClick={handleClear}>Clear</Button>
                        </div>
                    </div>
                </Form>
            </div>
            <Tab.Container className="w-100" defaultActiveKey="grid-view">
                <div className="d-flex justify-content-between mb-3 pb-2 border-bottom-grey">
                    <h3 className="section-head-sub mb-0">List of All developers</h3>
                    <Nav variant="pills" className="document-view-pill">
                        <Nav.Item className="document-view-item">
                            <Nav.Link className="document-view-link" eventKey="grid-view"><IoGrid /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="document-view-item">
                            <Nav.Link className="document-view-link" eventKey="list-view"><FaListUl /></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <Tab.Content>
                    <Tab.Pane eventKey="grid-view">
                        <div className="developers-list">
                            {assignedDeveloper.length > 0 ? assignedDeveloper.map((item, index) => {
                                return (
                                    <>
                                        <div className="developer-card" >
                                            <span className="check-icon"><FaCircleCheck /></span>
                                            <div className="user-imgbx">
                                                <img src={item?.profile_picture ? item?.profile_picture  : userImg } className="user-img" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name">{item?.name}</h3>
                                                <p className="designation-user">{item?.developer_detail?.professional_title}</p>
                                                <p className="email-user">{item?.email}</p>
                                                <ul className="social-icons">
                                                    <li>
                                                        <Link to={`${item?.developer_detail?.github_url}`}><FaGithub /></Link>
                                                    </li>
                                                    <li>
                                                        <Link to={`${item?.developer_detail?.linkedin_url}`}><FaLinkedin /></Link>
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
                                        <th><span>Developer Name</span></th>
                                        <th><span>Designation</span></th>
                                        <th><span>Email</span></th>
                                        <th><span>Connects</span></th>
                                    </tr>
                                </thead>
                                {assignedDeveloper.map((value, index) => {
                                    return (
                                        <>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span className="d-flex align-items-center gap-3">
                                                            <img src={value?.profile_picture ? value?.profile_picture  : userImg } />
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
           
            {assignedDeveloper.length >= 5 ? (
                    <div className="text-center mt-3">
                        <SeeMore setCount={setCount} />
                    </div>
                ) : (
                    ""
                )}
        </>
    )
}
export default DeveloperList;