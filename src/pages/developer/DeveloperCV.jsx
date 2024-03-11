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
import { MdEditNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeveloperCv } from "../../redux/slices/developerDataSlice";
const DeveloperCV = () => {
    const dispatch =useDispatch()
    const {developerCvData}=useSelector(state=>state.developerData)
    const [selectedTemplate,setSelectedTemplate]=useState('cv-template1')
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

    useEffect(()=>{
        dispatch(fetchDeveloperCv())
    },[dispatch])

    const splitSkills=(data)=>{
      let skills=  data?.skills?.split(",")
      return skills

    }

    const handleTemplateChange=(data)=>{
        setSelectedTemplate(data)
    }
    const generateSocailLinks=(link)=>{
        switch(link){
            case "Facebook":
                return  <FaFacebookF />
            case "LinkedIn":
            return   <FaLinkedinIn />
            case "Twitter":
            return   <FaTwitter/>
            case "GitHub":
            return <FaGithub/>
            case "Instagram":
            return <FaInstagram />
            default:
        }
    }

    const downloadResume = (url) => {
        const newTab = window.open(url, '_blank');
        if (newTab) {
            newTab.focus();
        } else {
            // If the popup blocker prevents opening the new tab
            alert('Please allow pop-ups for this site to download the file in a new tab.');
        }
    };
    return(
        <>
            <section className="overview-cv">
                <div className={selectedTemplate === 'cv-template1' ? 'cv-template-section cv-template3' : 'cv-template-section cv-template3 d-none'}>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="section-head mb-0">Overview</h2>
                        <button className="main-btn px-5" onClick={()=>downloadResume(developerCvData?.developer_detail?.resume)}>Download Resume</button>
                    </div>
                    <Row>
                        <Col lg={6} className="px-0">
                            <div className="resume-basic-info text-center">
                                <div className="resume-imgbx mx-auto mb-4">
                                    <img src={developerCvData?.profile_picture} className="resume-img" />
                                </div>
                                <h3 className="resume-name">{developerCvData?.name}</h3>
                                <p className="resume-designation">{developerCvData?.developer_detail?.professional_title}</p>
                                <div className="add_more_section" onClick={handleShowSkillsModal}><MdEditNote size={25}/></div>
                            </div>
                            <div className="connect-social-media">
                                <h3 className="subheading-resume text-center mb-3">Skills</h3>
                                <div className="add_more_section" onClick={handleShowSkillsModal}><MdEditNote size={25}/></div>
                                <ul className="skills-pill text-center">
                                 
                                    {
                                          splitSkills(developerCvData?.developer_skills)?.map((item,index)=>{
                                                return (
                                                    <>
                                                      <li key={index}><span>{item}</span> </li>
                                                    </>
                                                )
                                            })
                                        }
                                </ul>
                            </div>
                            <div className="connect-social-media">
                                <h3 className="subheading-resume text-center mb-3">Connect With Me</h3>
                                <div className="add_more_section" onClick={handleShowSocialMediaModal}><MdEditNote size={25}/></div>
                                <ul className="social-media">
                                    {developerCvData?.social_links?.map((item)=>{
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

                                </ul>
                            </div>
                        </Col>
                        <Col lg={6} className="px-0 h-100">
                            <div className="about-info px-4">
                                <h3 className="subheading-resume mb-4">About Me</h3>
                                {/* <h2 className="mainheading-resume">Art Changes Us</h2> */}
                                <div className="add_more_section" onClick={handleShowModal}><MdEditNote size={25}/></div>
                                <p className="resume-text">{developerCvData?.developer_detail?.bio}</p>
                            </div>
                            <div className="about-info px-4 pt-4">
                            <div className="add_more_section" onClick={handleShowExperienceModal}><MdEditNote size={25}/></div>
                                <h3 className="subheading-resume mb-4">Experience</h3>
                                {developerCvData?.developer_experiences?.map((item)=>{
                                    return (
                                        <>
                                        <div className="exp-wrapper">
                                    <p className="exp-year">{`${item?.start_date?.slice(0,4)}-${item?.is_still_working ?"Present": item?.end_date?.slice(0,4)}`} {item?.job_title} </p>
                                    <ul className="exp-role">
                                        <li className="resume-text">{item?.company_name} | <span>{item?.description}</span></li>
                                    </ul>
                                </div>
                                        </>
                                    )
                                })}
                                <h3 className="subheading-resume mb-4">Education</h3>
                                <div className="add_more_section_education" onClick={handleShowEducationModal}><MdEditNote size={25}/></div>
                               {developerCvData?.developer_educations?.map((item)=>{
                                return(
                                    <React.Fragment key={item.id}>
                                    <div className="exp-wrapper">
                                    <p className="exp-year">{item?.start_year} - {item?.end_year} | {item?.Degree?.title}</p>
                                    <ul className="exp-role">
                                        <li className="resume-text">{item?.university_name}</li>
                                        <li className="resume-text">{item?.Degree?.description}</li>
                                    </ul>
                                </div>
                                    </React.Fragment>
                                )
                               }) }
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <AboutCV show={showModal} handleClose={handleCloseModal} data={developerCvData?.developer_detail?.bio} />
           {showExperienceModal? <ExperienceCV show={showExperienceModal} handleClose={handleCloseExperienceModal} data={developerCvData?.developer_experiences} />:""}
            {showEducationModal?<EducationCV show={showEducationModal} handleClose={handleCloseEducationModal} data={developerCvData?.developer_educations} />:""}
           {showSkillsModal? <SkillsModal show={showSkillsModal} handleClose={handleCloseSkillsModal} data={developerCvData?.developer_skills?.skills} />:""}
            {showSocialMediaModal?<SocialMediaModal show={showSocialMediaModal} handleClose={handleCloseSocialMediaModal} data={developerCvData?.social_links}/>:""}
        </>
    )
}
export default DeveloperCV;
