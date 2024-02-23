import React, {useEffect, useState} from "react";
import { Button, Col, Row } from "react-bootstrap";
import resumeImg from '../../assets/img/user-img.jpg'
import AboutCV from "./Modals/AboutCVModal";
import ExperienceCV from "./Modals/ExperienceCVModal";
import EducationCV from "./Modals/EducationModal";
import SkillsModal from "./Modals/SkillsCVModal";
import SocialMediaModal from "./Modals/SocialMediaModal";
import cvTemplate1 from '../../assets/img/cv-template1.png'
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaGitlab } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeveloperCv } from "../../redux/slices/developerDataSlice";
const DeveloperCV = () => {
    const dispatch =useDispatch()
    const {developerCvData}=useSelector(state=>state.developerData)
    const [showModal, setShowModal] = useState(false);
    console.log(developerCvData,"developerCvData")
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

    useEffect(()=>{
        dispatch(fetchDeveloperCv())
    },[dispatch])

    const splitSkills=(data)=>{
      let skills=  data?.skills?.split(",")
      return skills

    }
    return(
        <>
            <section className="overview-cv">
                <div className="text-center">
                    <Button variant="transparent" className="main-btn px-5">Create CV</Button>
                </div>
                <div className="cv-template-option mt-4 mb-2">
                    <div className="flex-none">
                        <input type="radio" className="cv-radio" name="cv-template" id="cv-template1" />
                        <label htmlFor="cv-template1" className="cv-template">
                            <img src={cvTemplate1} />
                        </label>
                    </div>
                    <div className="flex-none">
                        <input type="radio" className="cv-radio" name="cv-template" id="cv-template2" />
                        <label htmlFor="cv-template2" className="cv-template">
                            <img src={cvTemplate1} />
                        </label>
                    </div>
                    <div className="flex-none">
                        <input type="radio" className="cv-radio" name="cv-template" id="cv-template3" />
                        <label htmlFor="cv-template3" className="cv-template">
                            <img src={cvTemplate1} />
                        </label>
                    </div>
                </div>
                <div className="cv-template-section cv-template1">
                    <Row>
                        <Col md="4">
                            <div className="personal-info">
                                <div className="dev-imgbx mb-4">
                                    <img src={resumeImg} className="dev-img" />
                                </div>
                                <div className="contact-dev-info">
                                    <h3 className="cv-heading">Contact</h3>
                                    <ul className="cv-listing">
                                        <li className="cv-side-link">
                                            <h4 className="cv-subheading">Phone</h4>
                                            <p className="cv-text">{developerCvData?.phone_number}</p>
                                        </li>
                                        <li className="cv-side-link">
                                            <h4 className="cv-subheading">Email</h4>
                                            <p className="cv-text">{developerCvData?.email}</p>
                                        </li>
                                        <li className="cv-side-link">
                                            <h4 className="cv-subheading">Address</h4>
                                            <p className="cv-text">{developerCvData?.address}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="contact-dev-info">
                                    <h3 className="cv-heading">Education</h3>
                                    <ul className="cv-listing">
                                      { developerCvData?.developer_educations?.map((item,index)=>{
                                        return (
                                            <React.Fragment key={index}>
                                            <li className="cv-education-link">
                                            <p className="cv-text education-year mb-1">{item?.graduation_date?.slice(0,4)}</p>
                                            <h4 className="cv-subheading mb-1">{item?.Degree?.title}</h4>
                                            <p className="cv-text">{item?.school_name}</p>
                                            <p className="cv-text">{item?.FieldOfStudy?.title}</p>
                                        </li>
                                            </React.Fragment>
                                        )
                                      })
                                    }
                                       
                                    </ul>
                                </div>
                                <div className="contact-dev-info">
                                    <h3 className="cv-heading">Skills</h3>
                                    <ul className="cv-listing cv-skills-listing">
                                        {
                                          splitSkills(developerCvData?.developer_skills)?.map((item,index)=>{
                                                return (
                                                    <>
                                                      <li className="skills-item" key={index}>{item}</li>
                                                    </>
                                                )
                                            })
                                        }
                                      
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col md="8">
                            <div className="profession-section">
                                <div className="personal-details">
                                    <h2 className="developer-name"><b>{developerCvData?.name}</b></h2>
                                    <h4 className="developer-position">{developerCvData?.developer_detail?.professional_title}</h4>
                                    <p className="about-bio-text">{developerCvData?.developer_detail?.bio}</p>
                                </div>
                                <div className="connect-details">
                                    <h2 className="cv-heading cv-dark-text">Connect with me</h2>
                                    <ul className="connect-listing">
                                        <li className="connect-list-item">
                                            <Link to="www.facebook.com" target="__blank">
                                                <FaFacebookF/>
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.twitter.com" target="__blank">
                                                <FaTwitter />
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.instagram.com" target="__blank">
                                                <FaInstagram />
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to={developerCvData?.developer_detail?.linkedin_url} target="__blank">
                                                <FaLinkedinIn />
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.github.com" target="__blank">
                                                <FaGithub />
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to={developerCvData?.developer_detail?.github_url} target="__blank">
                                                <FaGitlab />
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.pinterest.com" target="__blank">
                                                <FaPinterest />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="experience-detiails">
                                    <h3 className="cv-heading cv-dark-text">Experience</h3>
                                    <ul className="experience-timeline">
                                        {developerCvData?.developer_experiences?.map((item,index)=>{
                                            return (
                                                <>
                                                <li className="exper-timeline-item">
                                                <p className="exper-year">{`${item?.start_date?.slice(0,4)}-${item?.end_date ? item?.end_date?.slice(0,4):"FullTime"}`}</p>
                                                <p className="company-name-text">{item?.company_name} | <span>{item?.description}</span></p>
                                                <h3 className="cv-subheading cv-dark-text">{item?.job_title}r</h3>
                                            </li>
                                            </>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="create-cv-section">
                    <div className="cv-section about-section" onClick={handleShowModal}>
                        <h2 className="d-flex justify-content-between align-items-center"><span>Add About Section</span><span>+</span></h2>
                    </div>
                    <div className="cv-section experience-section" onClick={handleShowExperienceModal}>
                        <h2 className="d-flex justify-content-between align-items-center"><span>Add Experience Section</span><span>+</span></h2>
                    </div>
                    <div className="cv-section education-section" onClick={handleShowEducationModal}>
                        <h2 className="d-flex justify-content-between align-items-center"><span>Add Education Section</span><span>+</span></h2>
                    </div>
                    <div className="cv-section skills-section" onClick={handleShowSkillsModal}>
                        <h2 className="d-flex justify-content-between align-items-center"><span>Add Skills Section</span><span>+</span></h2>
                    </div>
                    <div className="cv-section social-media-section" onClick={handleShowSocialMediaModal}>
                        <h2 className="d-flex justify-content-between align-items-center"><span>Add Social Media Section</span><span>+</span></h2>
                    </div>
                </div>
                {/* <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="section-head mb-0">Overview</h2>
                    <button className="main-btn px-5">Download Resume</button>
                </div>
                <Row>
                    <Col lg={6} className="px-0">
                        <div className="resume-basic-info text-center">
                            <div className="resume-imgbx mx-auto mb-4">
                                <img src={resumeImg} className="resume-img" />
                            </div>
                            <h3 className="resume-name">Alfredo Smith</h3>
                            <p className="resume-designation">Software Developer</p>
                        </div>
                        <div className="connect-social-media">
                            <h3 className="subheading-resume text-center mb-3">Skills</h3>
                            <ul className="skills-pill text-center">
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                            </ul>
                        </div>
                        <div className="connect-social-media">
                            <h3 className="subheading-resume text-center mb-3">Connect With Me</h3>
                            <ul className="social-media">
                                <li>
                                    <Link to={'#'} className="social-media-link">
                                        <FaFacebookF/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'#'} className="social-media-link">
                                        <FaLinkedinIn/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'#'} className="social-media-link">
                                        <FaTwitter/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'#'} className="social-media-link">
                                        <FaInstagram/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col lg={6} className="px-0 h-100">
                        <div className="about-info px-4">
                            <h3 className="subheading-resume mb-4">About Me</h3>
                            <h2 className="mainheading-resume">Art Changes Us</h2>
                            <p className="resume-text">Experienced software developer with a passion for creating efficient and innovative solutions. Seeking a challenging position where I can contribute my technical skills and creativity to develop cutting-edge software applications.</p>
                        </div>
                        <div className="about-info px-4 pt-4">
                            <h3 className="subheading-resume mb-4">Experience</h3>
                            <div className="exp-wrapper">
                                <p className="exp-year">2018 - 2023 Software Developer Google</p>
                                <ul className="exp-role">
                                    <li className="resume-text">Collaborated with cross-functional teams to design, develop, and deploy software solutions.</li>
                                    <li className="resume-text">Collaborated with cross-functional teams to design, develop, and deploy software solutions.</li>
                                    <li className="resume-text">Collaborated with cross-functional teams to design, develop, and deploy software solutions.</li>
                                </ul>
                            </div>
                            <h3 className="subheading-resume mb-4">Education</h3>
                            <div className="exp-wrapper">
                                <p className="exp-year">2006 Bachelor of Science in Computer Science</p>
                                <ul className="exp-role">
                                    <li className="resume-text">Tresswood University</li>
                                    <li className="resume-text">Phyllis Schwaiger Memorial Award</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row> */}
            </section>
            <AboutCV show={showModal} handleClose={handleCloseModal}/>
            <ExperienceCV show={showExperienceModal} handleClose={handleCloseExperienceModal}/>
            <EducationCV show={showEducationModal} handleClose={handleCloseEducationModal} />
            <SkillsModal show={showSkillsModal} handleClose={handleCloseSkillsModal} />
            <SocialMediaModal show={showSocialMediaModal} handleClose={handleCloseSocialMediaModal} />
        </>
    )
}
export default DeveloperCV;
