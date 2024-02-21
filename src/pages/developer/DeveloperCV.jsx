import React, { useState } from "react";
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
const DeveloperCV = () => {
    const [showModal, setShowModal] = useState(false);
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
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleTemplateChange = (templateName) => {
        setSelectedTemplate(templateName);
    };
    return (
        <>
            <section className="overview-cv">
                <div className="cv-template-option mt-4 mb-2">
                    <div className="flex-none">
                        <input type="radio" className="cv-radio" name="cv-template" id="cv-template1" onChange={() => handleTemplateChange('cv-template1')} />
                        <label htmlFor="cv-template1" className="cv-template">
                            <img src={cvTemplate1} />
                        </label>
                    </div>
                    <div className="flex-none">
                        <input type="radio" className="cv-radio" name="cv-template" id="cv-template2" onChange={() => handleTemplateChange('cv-template2')} />
                        <label htmlFor="cv-template2" className="cv-template">
                            <img src={cvTemplate1} />
                        </label>
                    </div>
                    <div className="flex-none">
                        <input type="radio" className="cv-radio" name="cv-template" id="cv-template3" onChange={() => handleTemplateChange('cv-template3')} />
                        <label htmlFor="cv-template3" className="cv-template">
                            <img src={cvTemplate1} />
                        </label>
                    </div>
                </div>
                <div className={selectedTemplate === 'cv-template1' ? 'cv-template-section cv-template1' : 'cv-template-section cv-template1 d-none'}>
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
                                            <p className="cv-text">1234567890</p>
                                        </li>
                                        <li className="cv-side-link">
                                            <h4 className="cv-subheading">Email</h4>
                                            <p className="cv-text">loremipsum2798@gmail.com</p>
                                        </li>
                                        <li className="cv-side-link">
                                            <h4 className="cv-subheading">Address</h4>
                                            <p className="cv-text">123 Anywhere St.. Any City</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="contact-dev-info">
                                    <h3 className="cv-heading">Education</h3>
                                    <ul className="cv-listing">
                                        <li className="cv-education-link">
                                            <p className="cv-text education-year mb-1">2008</p>
                                            <h4 className="cv-subheading mb-1">Enter your Degree</h4>
                                            <p className="cv-text">University/College</p>
                                        </li>
                                        <li className="cv-education-link">
                                            <p className="cv-text education-year mb-1">2008</p>
                                            <h4 className="cv-subheading mb-1">Enter your Degree</h4>
                                            <p className="cv-text">University/College</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="contact-dev-info">
                                    <h3 className="cv-heading">Skills</h3>
                                    <ul className="cv-listing cv-skills-listing">
                                        <li className="skills-item">HTML</li>
                                        <li className="skills-item">CSS</li>
                                        <li className="skills-item">JavaScript</li>
                                        <li className="skills-item">jQuery</li>
                                        <li className="skills-item">ReactJS</li>
                                        <li className="skills-item">VueJS</li>
                                        <li className="skills-item">Adobe Photoshop</li>
                                        <li className="skills-item">Adobe Illustrator</li>
                                        <li className="skills-item">Adobe After Effects</li>
                                        <li className="skills-item">Adobe XD</li>
                                        <li className="skills-item">Figma</li>
                                        <li className="skills-item">Blender</li>
                                        <li className="skills-item">Webflow</li>
                                        <li className="skills-item">Unbounce</li>
                                        <li className="skills-item">Sass</li>
                                        <li className="skills-item">Less</li>
                                        <li className="skills-item">Tailwind CSS</li>
                                        <li className="skills-item">Bootstrap</li>
                                        <li className="skills-item">Material UI</li>
                                        <li className="skills-item">Shopify</li>
                                        <li className="skills-item">Wordpress</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col md="8">
                            <div className="profession-section">
                                <div className="personal-details">
                                    <h2 className="developer-name"><b>Mariana</b> Anderson</h2>
                                    <h4 className="developer-position">Frontend Developer</h4>
                                    <p className="about-bio-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                                </div>
                                <div className="connect-details">
                                    <h2 className="cv-heading cv-dark-text">Connect with me</h2>
                                    <ul className="connect-listing">
                                        <li className="connect-list-item">
                                            <Link to="www.facebook.com" target="__blank">
                                                <FaFacebookF />
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
                                            <Link to="www.linkedin.com" target="__blank">
                                                <FaLinkedinIn />
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.github.com" target="__blank">
                                                <FaGithub />
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.gitlab.com" target="__blank">
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
                                        <li className="exper-timeline-item">
                                            <p className="exper-year">2019 - 2022</p>
                                            <p className="company-name-text">Company Name | <span>123 Anywhere St... Any City</span></p>
                                            <h3 className="cv-subheading cv-dark-text">React Js Developer</h3>
                                        </li>
                                        <li className="exper-timeline-item">
                                            <p className="exper-year">2019 - 2022</p>
                                            <p className="company-name-text">Company Name | <span>123 Anywhere St... Any City</span></p>
                                            <h3 className="cv-subheading cv-dark-text">React Js Developer</h3>
                                        </li>
                                        <li className="exper-timeline-item">
                                            <p className="exper-year">2019 - 2022</p>
                                            <p className="company-name-text">Company Name | <span>123 Anywhere St... Any City</span></p>
                                            <h3 className="cv-subheading cv-dark-text">React Js Developer</h3>
                                        </li>
                                        <li className="exper-timeline-item">
                                            <p className="exper-year">2019 - 2022</p>
                                            <p className="company-name-text">Company Name | <span>123 Anywhere St... Any City</span></p>
                                            <h3 className="cv-subheading cv-dark-text">React Js Developer</h3>
                                        </li>
                                        <li className="exper-timeline-item">
                                            <p className="exper-year">2019 - 2022</p>
                                            <p className="company-name-text">Company Name | <span>123 Anywhere St... Any City</span></p>
                                            <h3 className="cv-subheading cv-dark-text">React Js Developer</h3>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={selectedTemplate === 'cv-template2' ? 'cv-template-section cv-template2' : 'cv-template-section cv-template2 d-none'}>
                    <Row>
                        <Col md="12">
                            <div className="personal-info d-flex justify-content-between align-items-center">
                                <div className="personal-details px-4">
                                    <h2 className="developer-name"><b>Mariana</b> Anderson</h2>
                                    <h4 className="developer-position">Frontend Developer</h4>
                                    <p className="about-bio-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                                </div>
                                <div className="dev-imgbx flex-none">
                                    <img src={resumeImg} className="dev-img" />
                                </div>
                            </div>
                            <div className="contact-dev-info contact-information py-4 ">
                                <h3 className="cv-heading text-center mb-4 border-0">Contact</h3>
                                <ul className="cv-listing d-flex justify-content-around">
                                    <li className="cv-side-link">
                                        <h4 className="cv-subheading">Phone</h4>
                                        <p className="cv-text">1234567890</p>
                                    </li>
                                    <li className="cv-side-link">
                                        <h4 className="cv-subheading">Email</h4>
                                        <p className="cv-text">loremipsum2798@gmail.com</p>
                                    </li>
                                    <li className="cv-side-link">
                                        <h4 className="cv-subheading">Address</h4>
                                        <p className="cv-text">123 Anywhere St.. Any City</p>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="py-5">
                                <div className="mb-4">
                                    <div className="contact-dev-info ps-0">
                                        <h3 className="cv-heading">Education</h3>
                                        <ul className="cv-listing education-listing">
                                            <li className="cv-education-link">
                                                <p className="cv-text education-year mb-1">2008</p>
                                                <h4 className="cv-subheading mb-1">Enter your Degree</h4>
                                                <p className="cv-text">University/College</p>
                                            </li>
                                            <li className="cv-education-link">
                                                <p className="cv-text education-year mb-1">2008</p>
                                                <h4 className="cv-subheading mb-1">Enter your Degree</h4>
                                                <p className="cv-text">University/College</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="profession-section">
                                    <div className="experience-detiails ps-0">
                                        <h3 className="cv-heading cv-dark-text">Experience</h3>
                                        <ul className="exper-listing">
                                            <li className="exper-item">
                                                <h3 className="cv-subheading cv-dark-text">React Js Developer</h3>
                                                <p className="company-name-text">Company Name | <span>123 Anywhere St... Any City</span></p>
                                                <p className="exper-year">2019 - 2022</p>
                                            </li>
                                            <li className="exper-item">
                                                <h3 className="cv-subheading cv-dark-text">React Js Developer</h3>
                                                <p className="company-name-text">Company Name | <span>123 Anywhere St... Any City</span></p>
                                                <p className="exper-year">2019 - 2022</p>
                                            </li>
                                            <li className="exper-item">
                                                <h3 className="cv-subheading cv-dark-text">React Js Developer</h3>
                                                <p className="company-name-text">Company Name | <span>123 Anywhere St... Any City</span></p>
                                                <p className="exper-year">2019 - 2022</p>
                                            </li>
                                            <li className="exper-item">
                                                <h3 className="cv-subheading cv-dark-text">React Js Developer</h3>
                                                <p className="company-name-text">Company Name | <span>123 Anywhere St... Any City</span></p>
                                                <p className="exper-year">2019 - 2022</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="py-5">
                                <div className="contact-dev-info ps-4">
                                    <h3 className="cv-heading">Skills</h3>
                                    <ul className="cv-listing cv-skills-listing">
                                        <li className="skills-item">HTML</li>
                                        <li className="skills-item">CSS</li>
                                        <li className="skills-item">JavaScript</li>
                                        <li className="skills-item">jQuery</li>
                                        <li className="skills-item">ReactJS</li>
                                        <li className="skills-item">VueJS</li>
                                        <li className="skills-item">Adobe Photoshop</li>
                                        <li className="skills-item">Adobe Illustrator</li>
                                        <li className="skills-item">Adobe After Effects</li>
                                        <li className="skills-item">Adobe XD</li>
                                        <li className="skills-item">Figma</li>
                                        <li className="skills-item">Blender</li>
                                        <li className="skills-item">Webflow</li>
                                        <li className="skills-item">Unbounce</li>
                                        <li className="skills-item">Sass</li>
                                        <li className="skills-item">Less</li>
                                        <li className="skills-item">Tailwind CSS</li>
                                        <li className="skills-item">Bootstrap</li>
                                        <li className="skills-item">Material UI</li>
                                        <li className="skills-item">Shopify</li>
                                        <li className="skills-item">Wordpress</li>
                                    </ul>
                                </div>
                                <div className="connect-details ps-4">
                                    <h2 className="cv-heading mb-4 cv-dark-text">Connect with me</h2>
                                    <ul className="connect-listing">
                                        <li className="connect-list-item">
                                            <Link to="www.facebook.com" target="__blank">
                                                <FaFacebookF /> Facebook
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.twitter.com" target="__blank">
                                                <FaTwitter /> Twitter
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.instagram.com" target="__blank">
                                                <FaInstagram /> Instagram
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.linkedin.com" target="__blank">
                                                <FaLinkedinIn /> Linkedin
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.github.com" target="__blank">
                                                <FaGithub /> Github
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.gitlab.com" target="__blank">
                                                <FaGitlab /> Gitlab
                                            </Link>
                                        </li>
                                        <li className="connect-list-item">
                                            <Link to="www.pinterest.com" target="__blank">
                                                <FaPinterest /> Pinterest
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={selectedTemplate === 'cv-template3' ? 'cv-template-section cv-template3' : 'cv-template-section cv-template3 d-none'}>

                    <div className="d-flex justify-content-between align-items-center mb-4">
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
                                            <FaFacebookF />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'#'} className="social-media-link">
                                            <FaLinkedinIn />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'#'} className="social-media-link">
                                            <FaTwitter />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'#'} className="social-media-link">
                                            <FaInstagram />
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
            </section>
            <AboutCV show={showModal} handleClose={handleCloseModal} />
            <ExperienceCV show={showExperienceModal} handleClose={handleCloseExperienceModal} />
            <EducationCV show={showEducationModal} handleClose={handleCloseEducationModal} />
            <SkillsModal show={showSkillsModal} handleClose={handleCloseSkillsModal} />
            <SocialMediaModal show={showSocialMediaModal} handleClose={handleCloseSocialMediaModal} />
        </>
    )
}
export default DeveloperCV;
