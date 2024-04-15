import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import resumeImg from '../../../assets/img/user-img.jpg'
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaGitlab } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa6";
import { MdEditNote, MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaLinkedin } from "react-icons/fa";
import ScreenLoader from "../../atomic/ScreenLoader";


const SingleDeveloper = ({ developerDetails }) => {
    const dispatch = useDispatch()
    const { screenLoader } = useSelector(state => state.clientData)
    const [selectedTemplate, setSelectedTemplate] = useState('cv-template1')
    const [readmore, setReadMore] = useState(true)
    const [showModal, setShowModal] = useState(false);



    const splitSkills = (data) => {
        let skills = data?.skills?.split(",")
        return skills

    }
    // const handleShowModal = () => {
    //     setShowModal(true);
    // };

    const readMoreLess = () => {
        setReadMore(!readmore)
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const generateSocailLinks = (link) => {
        switch (link) {
            // case "Facebook":
            //     return <FaFacebookF />
            case "LinkedIn":
                return <FaLinkedinIn />
            // case "Twitter":
            //     return <FaTwitter />
            case "GitHub":
                return <FaGithub />
            // case "Instagram":
            //     return <FaInstagram />
            default:
        }
    }
    return (
        <>
            {screenLoader ? <ScreenLoader /> : <>
                <section className="overview-cv card-box">
                    <div className={selectedTemplate === 'cv-template1' ? 'cv-template-section cv-template3' : 'cv-template-section cv-template3 d-none'}>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="section-head mb-0 border-0">Overview</h2>
                            {/* <button className="main-btn px-xxl-5 px-4" onClick={()=>downloadResume(developerCvData?.developer_detail?.resume)}>Download Resume</button> */}
                        </div>
                        <Row>
                            <Col lg={6} className="px-0">
                                <div className="resume-basic-info text-center">
                                    <div className="resume-imgbx mx-auto mb-4">
                                        <img src={developerDetails?.profile_picture} className="resume-img" />
                                    </div>
                                    <h3 className="resume-name">{developerDetails?.name}</h3>
                                    <p className="resume-designation">{developerDetails?.developer_detailprofessional_title}</p>
                                    {/* <div className="add_more_section" onClick={handleDeveloperDetails}><MdEditNote size={25}/></div> */}
                                </div>
                                <div className="connect-social-media">
                                    <h3 className="subheading-resume text-center mb-3">Skills</h3>
                                    {/* <div className="add_more_section" onClick={handleShowSkillsModal}><MdEditNote size={25}/></div> */}
                                    <ul className="skills-pill text-center">
                                        <li><span>HTML</span> </li>
                                        <li><span>CSS</span> </li>
                                        <li><span>JavaScript</span> </li>
                                        <li><span>jQuery</span> </li>
                                        <li><span>HTML</span> </li>
                                        {
                                            splitSkills(developerDetails?.developer_skills)?.map((item, index) => {
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
                                    {/* <div className="add_more_section" onClick={handleShowSocialMediaModal}><MdEditNote size={25}/></div> */}
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

                                    <ul className="social-media ">
                                        <li>
                                            <Link to={developerDetails?.developer_detail?.github_url}><FaGithub /></Link>
                                        </li>
                                        <li>
                                            <Link to={developerDetails?.developer_detail?.linkedin_url}><FaLinkedin /></Link>
                                        </li>
                                        {/* <li>
                                            <Link to={developerDetails?.developer_detail?.email}><MdEmail /></Link>
                                        </li> */}
                                    </ul>
                                </div>
                            </Col>
                            <Col lg={6} className="px-0 h-100">
                            <div className="about-info px-4">
                                <h3 className="subheading-resume mb-xxl-4 mb-3">About Me</h3>
                                {/* <h2 className="mainheading-resume">Art Changes Us</h2> */}
                                {/* <div className="add_more_section" onClick={handleShowModal}><MdEditNote size={25} /></div> */}
                             {  developerDetails?.developer_detail?.bio?.length >300 ? <p className="resume-text">{readmore && developerDetails?.developer_detail?.bio?.length>300?<>
                                    {developerDetails?.developer_detail?.bio.slice(0,300)}
                                    <span className="readLess"  onClick={readMoreLess}> {readmore? '[Read more...]':'[Read Less]'} </span>
                                </>:
                                <>
                                 {developerDetails?.developer_detail?.bio}
                                <span className="readLess" onClick={readMoreLess}> {readmore? '[Read more...]':'[Read Less]'} </span>
                                </>
}
                                </p> : <> {developerDetails?.developer_detail?.bio}</>}
                            </div>
                                <div className="about-info px-4 pt-4">
                                    {/* <div className="add_more_section" onClick={handleShowExperienceModal}><MdEditNote size={25}/></div> */}
                                    <h3 className="subheading-resume mb-xxl-4 mb-3">Experience</h3>
                                    {developerDetails?.developer_experiences?.map((item) => {
                                        return (
                                            <>
                                                <div className="exp-wrapper">
                                                    <p className="exp-year">{`${item?.start_date?.slice(0, 4)}-${item?.is_still_working ? "Present" : item?.end_date?.slice(0, 4)}`} | {item?.job_title} </p>
                                                    <ul className="exp-role">
                                                        <li className="resume-text">{item?.company_name} | <span>{item?.description}</span></li>
                                                    </ul>
                                                </div>
                                            </>
                                        )
                                    })}
                                    {developerDetails?.developer_educations ? <>
                                        <h3 className="subheading-resume mb-xxl-4 mb-3">Education</h3>
                                        {/* <div className="add_more_section_education" onClick={handleShowEducationModal}><MdEditNote size={25}/></div> */}
                                        {developerDetails?.developer_educations?.map((item) => {
                                            return (
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
                                        })}
                                    </> : ""}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </>}
        </>
    )
}
export default SingleDeveloper;
