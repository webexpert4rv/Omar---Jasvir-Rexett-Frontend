import React from "react";
import profileImg from '../../assets/img/demo-img.jpg';
import whiteLogo from '../../assets/img/rexett-logo-white.png';
import { BsHeadphones } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { BiVideo } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { BsChatLeftDots } from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";
import { LuScreenShare } from "react-icons/lu";
import { BiShieldQuarter } from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
import { BiSolidExit } from "react-icons/bi";

const JoiningVideo = () => {
    return (
        <>
            <div className="video-area-section">
                <div className="video-header">
                    <div className="logo-brand">
                        <img src={whiteLogo} />
                        <span>Video Conferencing</span>
                    </div>
                    <div></div>
                </div>
                <div className="video-area h-100">
                    <div className="position-relative d-flex align-items-center justify-content-center h-100">
                        <div className="joinee-video">
                            <p className="joinee-nametag">MB</p>
                            <p className="name-joinee">Michael Brown</p>
                        </div>
                    </div>
                    <div className="position-relative d-flex align-items-center justify-content-center h-100">
                        <div className="myvideo">
                            <img src={profileImg} className="video-profile-img" />
                            <p className="name-joinee">James Taylor</p>
                        </div>
                    </div>
                </div>
                <div className="video-options-wrapper">
                    <div className="">
                        <Button variant="transparent" className="video-btn">
                            <span>
                                <BsHeadphones />
                            </span>
                            Join Audio
                        </Button>
                        <Button variant="transparent" className="video-btn">
                            <span>
                                <BiVideo />
                            </span>
                            Start Video
                        </Button>
                    </div>
                    <div className="">
                        <Button variant="transparent" className="video-btn">
                            <span>
                                <LuUsers />
                                <sup className="joinee-no">1</sup>
                            </span>
                            Participants
                        </Button>
                        <Button variant="transparent" className="video-btn">
                            <span>
                                <BsChatLeftDots />
                            </span>
                            Chat
                        </Button>
                        <Button variant="transparent" className="video-btn">
                            <span>
                                <BsHandThumbsUp />
                            </span>
                            Reactions
                        </Button>
                        <Button variant="transparent" className="video-btn">
                            <span>
                                <LuScreenShare />
                            </span>
                            Share Screen
                        </Button>
                        <Button variant="transparent" className="video-btn">
                            <span>
                                <BiShieldQuarter />
                            </span>
                            Security
                        </Button>
                        <Button variant="transparent" className="video-btn">
                            <span>
                                <CgMoreO />
                            </span>
                            More
                        </Button>
                    </div>
                    <div className="">
                        <Button variant="transparent" className="leave-meeting-btn">
                            <span>
                                <BiSolidExit />
                            </span>
                            Leave Meeting
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default JoiningVideo;