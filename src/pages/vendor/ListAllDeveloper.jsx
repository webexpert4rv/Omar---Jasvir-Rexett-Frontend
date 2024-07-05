import React, { useEffect, useState } from "react";
import userImg from "../../assets/img/user-img.jpg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Nav,
  OverlayTrigger,
  Tab,
  Tooltip,
} from "react-bootstrap";
import { FaCircleCheck, FaTrashCan } from "react-icons/fa6";
import { IoCloseOutline, IoGrid, IoTrash } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeleteDeveloper,
  getDevelopersList,
} from "../../redux/slices/vendorDataSlice";
import NoDataFound from "../../components/atomic/NoDataFound";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { SeeMore } from "../../components/atomic/SeeMore";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import { useTranslation } from "react-i18next";
import ConfirmationModal from ".././views/Modals/ConfirmationModal";
import { getAccountDisableEnable } from "../../redux/slices/adminDataSlice";

const AllDeveloperList = () => {
  const { allDevelopersList, screenLoader } = useSelector(
    (state) => state.vendorData
  );
  const { smallLoader } = useSelector((state) => state.adminData);
  const { data } = allDevelopersList;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({
    modalName: "",
    isTrue: false,
  });
  const [selectedFilter, setSelectedFilter] = useState({});
  const [count, setCount] = useState(1);
  const [devId, setDevId] = useState();
  const [timerValue, setTimerValue] = useState("");
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDevelopersList({ page: count }));
  }, [count]);

  const handleSkill = (e) => {
    let filterData = {
      ...selectedFilter,
      skill_title: e.target.value,
    };
    setSelectedFilter(filterData);
    dispatch(getDevelopersList(filterData));
  };

  const handleExperience = (e) => {
    let filterData = {
      ...selectedFilter,
      experience_years: +e.target.value,
    };
    setSelectedFilter(filterData);
    dispatch(getDevelopersList(filterData));
  };


  const handleRowClick = (e, id) => {
    e.stopPropagation();
    dispatch(getDeveloperDetails(id));
    navigate(`/vendor-single-developer/${id}`);
  };

  const handleClose = () => {
    setShowModal(!showModal);
  };

  const handleAction = async (e) => {
    e.preventDefault();
    let data = {
      user_id: showModal?.id,
      status: showModal?.active,
    };
    if (showModal.modalName == "toggle") {
      await dispatch(getAccountDisableEnable(data));
    } else {
      await dispatch(getDeleteDeveloper(showModal?.id));
    }
    dispatch(getDevelopersList({ page: count }));
    setShowModal({
      modalName: "",
      isTrue: false,
    });
  };
  const handleSearchChange = (e) => {
    clearTimeout(timerValue);
    setSearch(e.target.value);
    const timer = setTimeout(() => {
      let filterData = {
        ...selectedFilter,
        search: e.target.value,
      };
      dispatch(getDevelopersList(filterData));
    }, 500);
    setTimerValue(timer);
  };
  const disabledText = <Tooltip>Disable Account</Tooltip>;

  const handleBtnAction = (e, data) => {
    e.stopPropagation();
    setShowModal(data);
  };        

  const handleFilter=(e,name)=>{
   let filterData = {
    ...selectedFilter,
    [name]: e.target.value,
  };
  dispatch(getDevelopersList(filterData));
  }

  const statusOptions = [
    { label: "Status", value: "status" },
    { label: "Active", value: "active" },
    { label: "Disabled", value: "disabled" }
  ];
  
  const sortOptions = [
    { label: "Sort by name", value: "sort_by_name" },
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" }
  ];
  
  const developerOptions = [
    { label: "Select Developer", value: "select_developer" },
    { label: "Assigned", value: "assigned" },
    { label: "UnAssigned", value: "unassigned" }
  ];

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
                  <Form.Select className="filter-select shadow-none" onChange={(e)=>handleFilter(e,"status")}>
                    {statusOptions.map((option, idx) => (
                      <option key={idx} disabled={idx===0} value={option.value} selected={idx === 0}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div className="flex-none">
                  <Form.Select className="filter-select shadow-none" onChange={(e)=>handleFilter(e,"sort_by_name")}>
                    {sortOptions.map((option, idx) => (
                      <option key={idx} disabled={idx===0}  value={option.value} selected={idx === 0}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div className="flex-none">
                  <Form.Select className="filter-select shadow-none" onChange={(e)=>handleFilter(e,"assignment_filter")}>
                    {developerOptions.map((option, idx) => (
                      <option key={idx} disabled={idx===0}  value={option.value}  selected={idx === 0}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
              <div className="flex-none">
                <Form.Control
                  type="email"
                  placeholder="Search Developer"
                  className="common-field font-14"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </Form>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey="grid-view">
            {/* <div className="developers-list">
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
                        </div> */}
          </Tab.Pane>
          <Tab.Pane eventKey="list-view">
            <div className="table-responsive">
              <table className="table developer-table">
                <thead>
                  <tr>
                    <th>
                      <span>{t("developerName")}</span>
                    </th>
                    <th>
                      <span>{t("designation")}</span>
                    </th>
                    <th>
                      <span>{t("email")}</span>
                    </th>
                    <th>
                      <span>Status</span>
                    </th>
                    <th className="text-center">
                      <span>Restrict Action</span>
                    </th>
                    <th className="text-center">
                      <span>Delete Account</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {screenLoader ? (
                    <ScreenLoader />
                  ) : data?.developers?.length > 0 ? (
                    data?.developers?.map((item, index) => {
                      return (
                        <>
                          <tr onClick={(e) => handleRowClick(e, item?.id)}>
                            <td>
                              <span className="d-flex align-items-center gap-3">
                                <img src={item?.profile_picture} />
                                <h3 className="user-name color-121212 mb-0">
                                  {item?.name}
                                </h3>
                              </span>
                            </td>
                            <td>
                              <span>
                                <p className="designation-user color-121212 mb-0">
                                  {item?.developer_detail?.professional_title}
                                </p>
                              </span>
                            </td>
                            <td>
                              <span>
                                <p className="email-user color-121212 mb-0">
                                  {item?.email}
                                </p>
                              </span>
                            </td>
                            <td>
                              <span className="status-finished">
                                {item?.status == "active"
                                  ? "Active"
                                  : "InActive"}
                              </span>
                            </td>
                            <td>
                              <div className="text-center">
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={disabledText}
                                >
                                  <div class="form-check form-switch toggle-switch-wrapper d-inline-block ps-0">
                                    <input
                                      onClick={(e) => {
                                        let data = {
                                          modalName: "toggle",
                                          id: item.id,
                                          isTrue: true,
                                          active:
                                            item?.status == "active"
                                              ? "inactive"
                                              : "active",
                                          status:
                                            item?.status == "active"
                                              ? "Disable"
                                              : "Enable",
                                        };

                                        handleBtnAction(e, data);
                                      }}
                                      class="form-check-input toggle-switch-custom shadow-none  cursor-pointer"
                                      type="checkbox"
                                      role="switch"
                                      checked={item?.status == "active"}
                                      id="candidate-reminder"
                                    />
                                  </div>
                                </OverlayTrigger>
                              </div>
                            </td>
                            <td
                              className="text-center"
                              onClick={(e) => {
                                let data = {
                                  modalName: "delete",
                                  id: item.id,
                                  isTrue: true,
                                };
                                handleBtnAction(e, data);
                              }}
                            >
                              <Button className="arrow-btn danger-arrow mx-auto">
                                <IoTrash />
                              </Button>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <td colSpan={10}>
                      {" "}
                      <div className="simple-no-data">
                        {" "}
                        <NoDataFound />
                      </div>{" "}
                    </td>
                  )}
                </tbody>
              </table>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <ConfirmationModal
        show={showModal?.isTrue}
        handleClose={handleClose}
        handleAction={handleAction}
        text={`Are you sure you want to ${
          showModal.modalName == "toggle" ? showModal?.status : "Delete"
        } this developer ?`}
        smallLoader={smallLoader}
      />
    </>
  );
};
export default AllDeveloperList;
