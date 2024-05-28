import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import resumeImg from "../../../assets/img/user-img.jpg";
import { Link, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { MdEditNote, MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaLinkedin } from "react-icons/fa";
import ScreenLoader from "../../atomic/ScreenLoader";
import { useTranslation } from "react-i18next";
import AboutCV from "../Modals/AboutCVModal";
import ExperienceCV from "../Modals/ExperienceCVModal";
import EducationCV from "../Modals/EducationModal";
import SkillsModal from "../Modals/SkillsCVModal";
import SocialMediaModal from "../Modals/SocialMediaModal";
import DeveloperDetails from "../Modals/DeveloperDetails";
import ExpertiseModal from "../Modals/ExpertiseModal";
import {
  getDeveloperDetails,
  getSkillList,
} from "../../../redux/slices/clientDataSlice";
import RexettButton from "../../atomic/RexettButton";
import { FiExternalLink } from "react-icons/fi";
import {
  approvedEditAction,
  rejectEditAction,
} from "../../../redux/slices/adminDataSlice";
import SingleExperienceCard from "./SingleExperienceCard";
import ProjectsModal from "../Modals/ProjectModal";

const SingleDeveloper = ({ data, role }) => {
  const dispatch = useDispatch();
  const { screenLoader,  smallLoader  } = useSelector(
    (state) => state.clientData
  );
  const [selectedTemplate, setSelectedTemplate] = useState("cv-template1");
  const [developerDetails, setDeveloperDetails] = useState(false);
  const [readmore, setReadMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  let { pathname } = useLocation();
  let userId = pathname.split("/")[2];
  console.log(pathname.split("/")[2], "pathj");

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getSkillList());
  }, []);

  console.log(data?.isEdit, "data---------------");

  const splitSkills = (data) => {
    let skills = data?.skills?.split(",") || data?.split(",");
    return skills;
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

    const [showExperienceModal, setShowExperienceModal] = useState(false);
    const handleShowExperienceModal = () => {
        setShowExperienceModal(true);
    };

    const handleCloseExperienceModal = () => {
        setShowExperienceModal(false);
    };

    const [showEducationModal, setShowEducationModal] = useState(false);
    const handleShowEducationModal = () => {
        setShowEducationModal(true);
    };

    const [showExpertiseModal, setShowExpertiseModal] = useState(false);
    const handleShowExpertiseModal = () => {
        setShowExpertiseModal(true);
    };

    const handleCloseExpertiseModal = () => {
        setShowExpertiseModal(false);
    };

    const [showProjectModal, setShowProjectModal] = useState(false);
    const handleProjectModal = () => {
        setShowProjectModal(true);
    };
    const handleCloseProjectModal = () => {
        setShowProjectModal(false);
    };

    const handleCloseEducationModal = () => {
        setShowEducationModal(false);
    };

    const [showSkillsModal, setShowSkillsModal] = useState(false);
    const handleShowSkillsModal = () => {
        setShowSkillsModal(true);
    };

    const handleCloseSkillsModal = () => {
        setShowSkillsModal(false);
    };

    const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);
    const handleShowSocialMediaModal = () => {
        setShowSocialMediaModal(true);
    };

    const handleCloseSocialMediaModal = () => {
        setShowSocialMediaModal(false);
    };

    const handleDeveloperDetails = () => {
        setDeveloperDetails(true);
    };
    const handleClosDeveloperDetails = () => {
        setDeveloperDetails(false);
    };

  const approvedEdit = async () => {
    await dispatch(approvedEditAction(userId));
    dispatch(getDeveloperDetails(userId));
  };

    const rejectEdit = async () => {
       await dispatch(rejectEditAction(userId));
        dispatch(getDeveloperDetails(userId));
    };

    return (
        <>
            {screenLoader ? (
                <ScreenLoader />
            ) : (
                <>
                    <section className="overview-cv card-box">
                        <div
                            className={
                                selectedTemplate === "cv-template1"
                                    ? "cv-template-section cv-template3"
                                    : "cv-template-section cv-template3 d-none"
                            }
                        >
                            {role=="admin" && data?.isEdit ? <div className="d-flex justify-content-end align-items-center gap-2 mb-3">
                                <RexettButton
                                    type="submit"
                                    text={t("Approve")}
                                    className="main-btn px-4 font-14 fw-semibold"
                                    variant="transparent"
                                    onClick={approvedEdit}
                                  disabled={smallLoader}
                                  isLoading={smallLoader}
                                />
                                <RexettButton
                                    type="submit"
                                    text={t("Reject")}
                                    className="red-btn px-4 font-14 fw-semibold"
                                    variant="transparent"
                                    onClick={rejectEdit}
                                  disabled={smallLoader}
                                  isLoading={smallLoader}
                                />
                            </div>:""}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="section-head mb-0 border-0">{t("overview")}</h2>
                                {/* <button className="main-btn px-xxl-5 px-4" onClick={()=>downloadResume(data?.developer_detail?.resume)}>Download Resume</button> */}
                            </div>
                            <Row>
                                <Col lg={6} className="px-0">
                                    <div className="resume-basic-info text-center">
                                        <div className="resume-imgbx mx-auto mb-4">
                                            <img
                                                src={
                                                    data?.profile_picture
                                                        ? data?.profile_picture
                                                        : resumeImg
                                                }
                                                className="resume-img"
                                            />
                                        </div>
                                        <h3 className="resume-name">{data?.name}</h3>
                                        <p className="resume-designation">
                                            {data?.developer_detail?.professional_title}
                                        </p>
                                        {role !== "client" && (
                                            <div
                                                className="add_more_section_detail"
                                                onClick={handleDeveloperDetails}
                                            >
                                                <MdEditNote size={25} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="connect-social-media px-3">
                                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                                            <h3 className="subheading-resume text-center mb-0">
                                                {t("skills")}
                                            </h3>
                                            {role !== "client" && (
                                                <div
                                                    className="add_more_section"
                                                    onClick={handleShowSkillsModal}
                                                >
                                                    <MdEditNote size={25} />
                                                </div>
                                            )}
                                        </div>
                                        <ul className={`skills-pill text-center }`}>
                                            {data?.other_skills?.map(
                                                (item, index) => {
                                                    return (
                                                        <>
                                                            <li key={index} className={`${item?.is_edited && "resume-edit"}`}>
                                                                <span>{item?.skill}</span>{" "}
                                                            </li>
                                                        </>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                    <div className="connect-social-media px-3">
                                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                                            <h3 className="subheading-resume mb-0">
                                                {t("expertise")}
                                            </h3>
                                            {role !== "client" && (
                                                <div
                                                    className="add_more_section_education pointer"
                                                    onClick={handleShowExpertiseModal}
                                                >
                                                    <MdEditNote size={25} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="">
                                            {data?.expertises ? (
                                                <>
                                                    {data?.expertises?.map(
                                                        ({ experience, skill, skill_icon,is_edited }, index) => {
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <div className={`exp-wrapper expertise-card ${is_edited && "resume-edit"} `}>
                                                                        <img src={skill_icon?.icon_url} />
                                                                        <p className="expertise-skill">{skill}</p>
                                                                        <p className="expertise-exp">
                                                                            {experience ? experience : "1 year"}
                                                                        </p>
                                                                    </div>
                                                                </React.Fragment>
                                                            );
                                                        }
                                                    )}
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="connect-social-media px-3">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-3">
                                                <h3 className="subheading-resume mb-0">
                                                    {t("projects")}
                                                </h3>
                                                {role !== "client" && (
                                                    <div
                                                        className="add_more_section_education pointer"
                                                        onClick={handleProjectModal}
                                                    >
                                                        <MdEditNote size={25} />
                                                    </div>
                                                )}
                                            </div>
                                            {/* </div> */}
                                            <div>
                                                {data?.developer_projects ? (
                                                    <>
                                                        {data?.developer_projects?.map(
                                                            (
                                                                {
                                                                    project_title,
                                                                    project_link,
                                                                    project_start_date,
                                                                    role_in_project,
                                                                    project_end_date,
                                                                    tech_stacks_used,
                                                                    is_edited
                                                                },
                                                                index
                                                            ) => {
                                                                return (
                                                                    <React.Fragment key={index}>
                                                                        <div className={`project-wrapper  ${(is_edited) && "resume-edit"}`}>
                                                                            {/* <div className="exp-wrapper expertise-card"> */}
                                                                            {/* <p className="exp-year">{} - {} | {}</p> */}
                                                                            {/* <img src={skill_icon?.icon_url} /> */}
                                                                            <div className={`flex justify-content-between align-items-start mb-1`}>
                                                                                <div>
                                                                                    <p className="project-title mb-0">
                                                                                        {project_title}
                                                                                    </p>
                                                                                    <p className="project-role p-0 bg-transparent mb-0 d-block mb-2">
                                                                                        {role_in_project}
                                                                                    </p>
                                                                                    <p className="project-role mb-1">
                                                                                        Healthcare
                                                                                    </p>
                                                                                </div>
                                                                                <div className="d-flex align-items-center gap-2 project-date-wrapper status-finished">
                                                                                    <p className="project-date mb-0">{`${project_start_date?.slice(
                                                                                        0,
                                                                                        10
                                                                                    )}`}</p>{" "}
                                                                                    -
                                                                                    <p className="project-date mb-0">{`${project_end_date?.slice(
                                                                                        0,
                                                                                        10
                                                                                    )}`}</p>
                                                                                </div>
                                                                            </div>
                                                                            <label className="font-14 mb-1">Tech Skill Used</label>
                                                                            <div className="d-flex justify-content-between align-items-start">
                                                                                <div>

                                                                                    <ul className="skills-pill text-start">
                                                                                        {splitSkills(tech_stacks_used)?.map(
                                                                                            (item, index) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <li key={index}>
                                                                                                            <span>{item}</span>
                                                                                                        </li>
                                                                                                    </>
                                                                                                );
                                                                                            }
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                                <div>
                                                                                    <a
                                                                                        href={project_link}
                                                                                        className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2"
                                                                                    >
                                                                                        Show Project <FiExternalLink />
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </React.Fragment>
                                                                );
                                                            }
                                                        )}
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="connect-social-media px-3">
                                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                                            <h3 className="subheading-resume text-center mb-0">
                                                {t("connectWithMe")}
                                            </h3>
                                            {role !== "client" && (
                                                <div
                                                    className="add_more_section"
                                                    onClick={handleShowSocialMediaModal}
                                                >
                                                    <MdEditNote size={25} />
                                                </div>
                                            )}
                                        </div>

                                        <ul className="social-media">
                                            <li>
                                                {data?.developer_detail?.github_url ? (
                                                    <Link
                                                        className="social-media-link"
                                                        to={data?.developer_detail?.github_url}
                                                    >
                                                        <FaGithub />
                                                    </Link>
                                                ) : (
                                                    ""
                                                )}
                                            </li>
                                            <li>
                                                {data?.developer_detail?.linkedin_url ? (
                                                    <Link
                                                        className="social-media-link"
                                                        to={data?.developer_detail?.linkedin_url}
                                                    >
                                                        <FaLinkedin />
                                                    </Link>
                                                ) : (
                                                    ""
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col lg={6} className="px-0 h-100">
                                    <div className="about-info px-4">
                                        <div className="">
                                            <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                                                <h3 className="subheading-resume mb-0">
                                                    {t("aboutMe")}
                                                </h3>
                                                {/* <h2 className="mainheading-resume">Art Changes Us</h2> */}
                                                {role !== "client" && (
                                                    <div
                                                        className="add_more_section"
                                                        onClick={handleShowModal}
                                                    >
                                                        <MdEditNote size={25} />
                                                    </div>
                                                )}
                                            </div>
                                            {data?.developer_detail?.bio?.length > 300 ? (
                                                <p
                                                    className={`resume-text ${data?.developer_detail?.is_edited ? "resume-edit" : ""
                                                        }  `}
                                                >
                                                    {readmore &&
                                                        developerDetails?.developer_detail?.bio?.length >
                                                        300 ? (
                                                        <>
                                                            {data?.developer_detail?.bio.slice(0, 300)}
                                                            {/* <span className="readLess" onClick={readMoreLess}> {readmore ? '[Read more...]' : '[Read Less]'} </span> */}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {data?.developer_detail?.bio}
                                                            {/* <span className="readLess" onClick={readMoreLess}> {readmore ? '[Read more...]' : '[Read Less]'} </span> */}
                                                        </>
                                                    )}
                                                </p>
                                            ) : (
                                                < p className={`resume-text ${data?.developer_detail?.is_edited ? "resume-edit" : ""
                                            }  `}> {data?.developer_detail?.bio}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="about-info px-4 pt-4">
                                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                                            <h3 className="subheading-resume mb-0">
                                                {t("experience")}
                                            </h3>
                                            {role !== "client" && (
                                                <div
                                                    className="add_more_section"
                                                    onClick={handleShowExperienceModal}
                                                >
                                                    <MdEditNote size={25} />
                                                </div>
                                            )}
                                        </div>
                                        {data?.user_experience &&
                                            Object.keys(data?.user_experience).length > 0 &&
                                            Object.keys(data?.user_experience).map((key) => (
                                                <div className={`exp-timeline` }>
                                                    <SingleExperienceCard
                                                        companyName={key}
                                                        totalExperience={
                                                            data?.user_experience[key]["total_experience"]
                                                        }
                                                        experienceData={
                                                            data?.user_experience[key]["experiences"]
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        {data?.developer_educations ? (
                                            <>
                                                <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                                                    <h3 className="subheading-resume mb-0">
                                                        {t("education")}
                                                    </h3>
                                                    {role !== "client" && (
                                                        <div
                                                            className="add_more_section_education pointer"
                                                            onClick={handleShowEducationModal}
                                                        >
                                                            <MdEditNote size={25} />
                                                        </div>
                                                    )}
                                                </div>
                                                {data?.developer_educations?.map((item) => {
                                                    return (
                                                        <React.Fragment key={item.id}>
                                                            <div className={`exp-wrapper ${item?.is_edited && "resume-edit"}`}>
                                                                <p
                                                                    
                                                                >
                                                                    {item?.start_year} -{" "}
                                                                    {item?.end_year ? item?.end_year : "Present"}{" "}
                                                                    | {item?.Degree?.title}
                                                                </p>
                                                                <ul className="exp-role">
                                                                    <li
                                                                      
                                                                    >
                                                                        {item?.university_name}
                                                                    </li>
                                                                    <li
                                                                       
                                                                    >
                                                                        {item?.Degree?.title}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </section>
                    <AboutCV
                        show={showModal}
                        handleClose={handleCloseModal}
                        data={data?.developer_detail?.bio}
                        id={data?.id}
                        role={role}
                        isEdited={data?.developer_detail?.is_edited}
                    />
                    {showExperienceModal ? (
                        <ExperienceCV
                            show={showExperienceModal}
                            handleClose={handleCloseExperienceModal}
                            data={data?.developer_experiences}
                            smallLoader={smallLoader}
                            id={data?.id}
                            role={role}
                        />
                    ) : (
                        ""
                    )}
                    {showEducationModal ? (
                        <EducationCV
                            show={showEducationModal}
                            handleClose={handleCloseEducationModal}
                            data={data?.developer_educations}
                            smallLoader={smallLoader}
                            id={data?.id}
                            role={role}
                        />
                    ) : (
                        ""
                    )}
                    {showSkillsModal ? (
                        <SkillsModal
                            show={showSkillsModal}
                            handleClose={handleCloseSkillsModal}
                            data={data?.other_skills}
                            id={data?.id}
                            role={role}
                        />
                    ) : (
                        ""
                    )}
                    {showSocialMediaModal ? (
                        <SocialMediaModal
                            show={showSocialMediaModal}
                            handleClose={handleCloseSocialMediaModal}
                            data={data?.social_links}
                            id={data?.id}
                            role={role}
                        />
                    ) : (
                        ""
                    )}
                    {showExpertiseModal ? (
                        <ExpertiseModal
                            data={data?.expertises}
                            show={showExpertiseModal}
                            handleClose={handleCloseExpertiseModal}
                            id={data?.id}
                            role={role}
                        />
                    ) : (
                        ""
                    )}
                    <DeveloperDetails
                        show={developerDetails}
                        handleClose={handleClosDeveloperDetails}
                        position={data?.developer_detail?.professional_title}
                        name={data?.name}
                        profile={data?.profile_picture}
                        experience={data?.developer_detail?.total_experience}
                        smallLoader={smallLoader}
                        id={data?.id}
                        role={role}
                        isEdited={data?.developer_detail?.is_edited}
                    />
                </>
            )}
            {showProjectModal && (
                <ProjectsModal
                    data={data.developer_projects}
                    show={showProjectModal}
                    handleClose={handleCloseProjectModal}
                    id={data?.id}
                    role={role}
                />
            )}
        </>
    );
};
export default SingleDeveloper;
