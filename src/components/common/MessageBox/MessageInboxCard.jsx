import React from 'react'
import devImg from "../../../assets/img/user-img.jpg"
import MoreChatOptions from './MoreChatOptions'

const MessageInboxCard = ({ messageWrapperVisible, handleChatProfileClick }) => {
    return (
        <>
            <div className={messageWrapperVisible ? "chat-profile-wrapper position-relative active-chat py-2 px-3" : "chat-profile-wrapper position-relative py-2 px-3"} onClick={handleChatProfileClick}>
                <MoreChatOptions/>
                <div className="chat-profile-img">
                    <img src={devImg} />
                </div>
                <div className="chat-profile-info">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="chat-name">Pankaj Pundir</h3>
                        <p className="chat-time">8 hours</p>
                    </div>
                    <p className="chat-message mb-0">
                        Hi,Welcome and thank you for showing an interest in Aviox technologies pvt ltd. Being connected to our company means you get the chance to let us get to know you even more. Start by introducing yourself on your personal profile. A good and informative profile will help us find a right match. We will keep you up to date with jobs that suit your profile.
                    </p>
                </div>
            </div>



        </>
    )
}

export default MessageInboxCard