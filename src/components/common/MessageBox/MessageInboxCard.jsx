import React, { useEffect } from 'react'
import devImg from "../../../assets/img/user-img.jpg"
import MoreChatOptions from './MoreChatOptions'
import { useDispatch, useSelector } from 'react-redux'
import { messageChatRoomList } from '../../../redux/slices/developerDataSlice'
import NoDataFound from '../../atomic/NoDataFound'
import moment from 'moment'

const MessageInboxCard = ({ type, chatRoom, messageWrapperVisible, handleChatProfileClick, filteredName, setSelectedTab, onScroll, listInnerRef, userList }) => {
    const dispatch = useDispatch()
    const { chatRoomMessageList } = useSelector((state) => state.developerData)


    // useEffect(()=>{
    //  dispatch(messageChatRoomList(userID))
    // },[])

    const stripHtmlTags = (str) => {
        return str?.replace(/<\/?[^>]+(>|$)/g, "");
      };


    console.log(chatRoomMessageList?.chatRooms,"chatRooms")
    
    


    return (
        <>
            <div 
                onScroll={onScroll}
                ref={listInnerRef}
                style={{ height: "100vh", overflowY: "auto" }}>
                {chatRoomMessageList?.chatRooms?.length > 0 ? (filteredName ? filteredName : chatRoomMessageList?.chatRooms)?.map((it) => {
                    return (
                        <>
                            <div className='chat-wrapper'>
                                <div className={`chat-profile-wrapper position-relative py-2 px-3 ${messageWrapperVisible ? "active-chat" : ""}`} >
                                    <MoreChatOptions item={it} type={type} setSelectedTab={setSelectedTab} />
                                    <div onClick={() => handleChatProfileClick(it?.members[0]?.chatroom_id)} className='cursor-pointer'>
                                    <div className="chat-profile-img">
                                        <img src={it?.members[0]?.user?.profile_picture} />
                                    </div>
                                    <div className="chat-profile-info w-100">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h3 className="chat-name">{it?.members[0]?.user?.name}</h3>
                                            <p className="chat-time"> {moment(it?.created_at).fromNow()}</p>
                                        </div>
                                        <p className="chat-message mb-0">
                                            {(stripHtmlTags(it?.messages[0]?.message_body))}
                                        </p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }) :
                    <div className="no-data-container">
                        <NoDataFound />
                    </div>
                }
            </div>
        </>
    )
}

export default MessageInboxCard