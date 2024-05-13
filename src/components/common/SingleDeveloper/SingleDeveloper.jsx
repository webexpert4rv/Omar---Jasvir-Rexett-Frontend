import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import resumeImg from "../../../assets/img/user-img.jpg";
import { Link } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa6";
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
import { getSkillList } from "../../../redux/slices/clientDataSlice";
import ProjectsModal from "../Modals/ProjectModal";

const SingleDeveloper = ({ data, role }) => {
  const dispatch = useDispatch();
  const { screenLoader, smallLoader } = useSelector(
    (state) => state.clientData
  );
  const [selectedTemplate, setSelectedTemplate] = useState("cv-template1");
  const [developerDetails, setDeveloperDetails] = useState(false);
  const [readmore, setReadMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getSkillList());
  }, []);

  const splitSkills = (data) => {
    let skills = data?.skills?.split(",");
    return skills;
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const readMoreLess = () => {
    setReadMore(!readmore);
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
  const [showProjectModal, setShowProjectModal] = useState(false);
  const handleProjectModal = () => {
    setShowProjectModal(true);
  };
  const handleCloseProjectModal = () => {
    setShowProjectModal(false);
  };

  const handleCloseExpertiseModal = () => {
    setShowExpertiseModal(false);
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


  console.log(data?.developer_projects,"projectssss----------")
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
                    <ul className="skills-pill text-center">
                      {splitSkills(data?.developer_skills)?.map(
                        (item, index) => {
                          return (
                            <>
                              <li key={index}>
                                <span>{item}</span>{" "}
                              </li>
                            </>
                          );
                        }
                      )}
                    </ul>
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
                    {/* <ul className="social-media">
                                    {developerDetails?.social_links?.map((item)=>{
                                        return(
                                            <>
                                             <li>
                                        <Link to={item.url} className="social-media-link">
                                            {generateSocailLinks(item.slug)}
                                        </Link>
                                    </li>
                                            </>
                                        )
                                    })
                                       }

                                </ul> */}

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
                      {/* <li>
                                            <Link to={developerDetails?.developer_detail?.email}><MdEmail /></Link>
                                        </li> */}
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
                        <p className="resume-text">
                          {readmore &&
                          developerDetails?.developer_detail?.bio?.length >
                            300 ? (
                            <>
                              {data?.developer_detail?.bio.slice(0, 300)}
                              <span className="readLess" onClick={readMoreLess}>
                                {" "}
                                {readmore
                                  ? "[Read more...]"
                                  : "[Read Less]"}{" "}
                              </span>
                            </>
                          ) : (
                            <>
                              {data?.developer_detail?.bio}
                              <span className="readLess" onClick={readMoreLess}>
                                {" "}
                                {readmore
                                  ? "[Read more...]"
                                  : "[Read Less]"}{" "}
                              </span>
                            </>
                          )}
                        </p>
                      ) : (
                        <> {data?.developer_detail?.bio}</>
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
                    {data?.developer_experiences?.map((item) => {
                      return (
                        <>
                          <div className="exp-wrapper">
                            <p className="exp-year">
                              {`${item?.start_date?.slice(0, 4)}-${
                                item?.is_still_working
                                  ? "Present"
                                  : item?.end_date?.slice(0, 4)
                              }`}{" "}
                              | {item?.job_title}{" "}
                            </p>
                            <ul className="exp-role">
                              <li className="resume-text">
                                {item?.company_name} |{" "}
                                <span>{item?.description}</span>
                              </li>
                            </ul>
                          </div>
                        </>
                      );
                    })}
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
                              <div className="exp-wrapper">
                                <p className="exp-year">
                                  {item?.start_year} -{" "}
                                  {item?.end_year ? item?.end_year : "Present"}{" "}
                                  | {item?.Degree?.title}
                                </p>
                                <ul className="exp-role">
                                  <li className="resume-text">
                                    {item?.university_name}
                                  </li>
                                  <li className="resume-text">
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
                    {data?.developer_skill_and_experience ? (
                      <>
                        {data?.developer_skill_and_experience?.map(
                          ({ experience, skill, skill_icon }, index) => {
                            return (
                              <React.Fragment key={index}>
                                <div className="exp-wrapper expertise-card">
                                  {/* <p className="exp-year">{} - {} | {}</p> */}
                                  <img src={skill_icon?.icon_url} />
                                  <p className="expertise-skill">{skill}</p>
                                  <p className="expertise-exp">{experience}</p>

                                  {/* <ul className="exp-role">
                                                            <li className="resume-text">{}</li>
                                                            <li className="resume-text">{}</li>
                                                        </ul> */}
                                </div>

                                {/* <div className="about-info px-4 pt-4"> */}
                              </React.Fragment>
                            );
                          }
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                    <h3 className="subheading-resume mb-0">{t("projects")}</h3>
                    {role !== "client" && (
                      <div
                        className="add_more_section_education pointer"
                        onClick={handleProjectModal}
                      >
                        <MdEditNote size={25} />
                      </div>
                    )}
                    {/* </div> */}
                  </div>
                  {data?.developer_projects ? (
                      <>
                        {data?.developer_projects?.map(
                          ({ project_title, project_link,project_start_date,role_in_project ,project_end_date ,tech_stacks_used}, index) => {
                            return (
                              <React.Fragment key={index}>
                                {/* <div className="exp-wrapper expertise-card"> */}
                                  {/* <p className="exp-year">{} - {} | {}</p> */}
                                  {/* <img src={skill_icon?.icon_url} /> */}
                                  <label  >Project Name</label><br></br>
                                   <p className="expertise-skill">{project_title}</p>
                                   <label>Project Link</label>
                                  <p className="expertise-exp">{project_link}</p>
                                  <label>Project start date</label>
                                  <p className="expertise-exp">{`${project_start_date?.slice(0, 10)}`}</p>
                                  <label>Project end date</label>
                                  <p className="expertise-exp">{`${project_end_date?.slice(0, 10)}`}</p>
                                  <label>Role in project</label>
                                  <p className="expertise-exp">{role_in_project}</p>
                                  <label>Tech Skill Used</label>
                                  <p className="expertise-exp">{tech_stacks_used}</p> 
                                  

                                  {/* <ul className="exp-role">
                                                            <li className="resume-text">{}</li>
                                                            <li className="resume-text">{}</li>
                                                        </ul> */}
                                {/* </div> */}

                                {/* <div className="about-info px-4 pt-4"> */}
                              </React.Fragment>
                            );
                          }
                        )}
                      </>
                    ) : (
                      ""
                    )}

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
              data={data?.developer_skills?.skills}
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
              data={data.developer_skill_and_experience}
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
          />
          {showProjectModal ? (
            <ProjectsModal
              data={data.developer_projects}
              show={showProjectModal}
              handleClose={handleCloseProjectModal}
              id={data?.id}
              role={role}
            />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};
export default SingleDeveloper;
