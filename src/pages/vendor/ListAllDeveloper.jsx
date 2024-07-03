import React, { useEffect, useState } from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Nav, OverlayTrigger, Tab, Tooltip } from "react-bootstrap";
import { FaCircleCheck, FaTrashCan } from "react-icons/fa6";
import { IoCloseOutline, IoGrid, IoTrash } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getDeleteDeveloper, getDevelopersList } from "../../redux/slices/vendorDataSlice";
import NoDataFound from "../../components/atomic/NoDataFound";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { SeeMore } from "../../components/atomic/SeeMore";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import { useTranslation } from "react-i18next";
import ConfirmationModal from ".././views/Modals/ConfirmationModal";


const AllDeveloperList = () => {
    const { allDevelopersList, screenLoader, smallLoader } = useSelector(state => state.vendorData)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState({});
    const [count, setCount] = useState(1);
    const [devId, setDevId] = useState()
    const [timerValue, setTimerValue] = useState("");
    const [search, setSearch] = useState()
    const navigate = useNavigate()
    const { t } = useTranslation()


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

    const handleExperience = (e) => {
        let filterData = {
            ...selectedFilter,
            experience_years: +e.target.value
        }
        setSelectedFilter(filterData)
        dispatch(getDevelopersList(filterData))
    };

    const handleClear = () => {
        setSelectedFilter({
            skill_title: "Select Skills",
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

    const handleClose = () => {
        setShowModal(!showModal)
    }
    const handleDelete = (e, id) => {
        e.stopPropagation()
        setDevId(id)
        setShowModal(!showModal)
    }
    const handleDeleteAction = async (e) => {
        e.preventDefault()
        await dispatch(getDeleteDeveloper(devId))
        setShowModal(!showModal)
        dispatch(getDevelopersList({ page: count }))
    }
    const handleSearchChange = (e) => {
        clearTimeout(timerValue);
        setSearch(e.target.value)
        const timer = setTimeout(() => {
            let filterData = {
                ...selectedFilter,
                search: e.target.value
            }
            dispatch(getDevelopersList(filterData))
        }, 500);
        setTimerValue(timer);

    }
    const disabledText = (
        <Tooltip>Disable Account</Tooltip>
    )

    return (
        <>
            <Tab.Container className="w-100" defaultActiveKey="list-view">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom-grey">
                    <h3 className="section-head-sub mb-0">{t("listOfAllDevelopers")}</h3>
                    {/* <Nav variant="pills" className="document-view-pill">
                        <Nav.Item className="document-view-item">
                            <Nav.Link className="document-view-link" eventKey="list-view"><FaListUl /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="document-view-item">
                            <Nav.Link className="document-view-link" eventKey="grid-view"><IoGrid /></Nav.Link>
                        </Nav.Item>
                    </Nav> */}
                </div>
                <div className="filter-section">
                    <Form>
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <div className="d-flex gap-3">
                                <div className="flex-none">
                                    <Form.Select className="filter-select shadow-none">
                                        <option selected>Status</option>
                                        <option>Active</option>
                                        <option>Disabled</option>
                                    </Form.Select>
                                </div>
                                <div className="flex-none">
                                    <Form.Select className="filter-select shadow-none">
                                        <option>Sort by name</option>
                                        <option>Ascending</option>
                                        <option>Descending</option>
                                    </Form.Select>
                                </div>
                            </div>
                            <div className="flex-none">
                                <Form.Control type="email" placeholder="Search Developer" className="common-field font-14" value={search} onChange={handleSearchChange} />
                            </div>
                        </div>
                    </Form>
                </div>
                <Tab.Content>
                    <Tab.Pane eventKey="grid-view">
                        <div className="developers-list">
                            <div className="developer-card">
                                <div className="user-imgbx">
                                    <img src={userImg} className="user-img" />
                                </div>
                                <div className="text-center">
                                    <h3 className="user-name">John Doe</h3>
                                    <p className="designation-user">Web developer</p>
                                    <p className="email-user">johndoe123@gmail.com</p>
                                </div>
                            </div>
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
                                        <th><span>Status</span></th>
                                        <th className="text-center"><span>Restrict Action</span></th>
                                        <th className="text-center"><span>Delete Account</span></th>

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
                                                <p className="designation-user color-121212 mb-0">Web Developer</p>
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                <p className="email-user color-121212 mb-0">johndoe123@gmail.com</p>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="status-finished">
                                                Active
                                            </span>
                                        </td>
                                        <td>
                                            <div className="text-center">
                                                <OverlayTrigger placement="bottom" overlay={disabledText}>
                                                    <div class="form-check form-switch toggle-switch-wrapper d-inline-block ps-0">
                                                        <input
                                                            class="form-check-input toggle-switch-custom shadow-none  cursor-pointer"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="candidate-reminder"
                                                        />
                                                    </div>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Button className="arrow-btn danger-arrow mx-auto">
                                                <IoTrash />
                                            </Button>
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
                                                <p className="designation-user color-121212 mb-0">Web Developer</p>
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                <p className="email-user color-121212 mb-0">johndoe123@gmail.com</p>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="status-rejected">
                                                Disbaled
                                            </span>
                                        </td>
                                        <td>
                                            <div className="text-center">
                                                <OverlayTrigger placement="bottom" overlay={disabledText}>
                                                    <div class="form-check form-switch toggle-switch-wrapper d-inline-block ps-0">
                                                        <input
                                                            class="form-check-input toggle-switch-custom shadow-none  cursor-pointer"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="candidate-reminder"
                                                            checked
                                                        />
                                                    </div>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Button className="arrow-btn danger-arrow mx-auto">
                                                <IoTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <ConfirmationModal show={showModal} handleClose={handleClose} onClick={handleDeleteAction} header={"Delete developer"} text={"Are you sure you want to delete this developer ?"} smallLoader={smallLoader} />
        </>
    )
}
export default AllDeveloperList;