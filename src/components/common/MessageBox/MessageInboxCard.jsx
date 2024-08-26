import React, { useEffect } from 'react'
import devImg from "../../../assets/img/user-img.jpg"
import MoreChatOptions from './MoreChatOptions'
import { useDispatch, useSelector } from 'react-redux'
import { messageChatRoomList } from '../../../redux/slices/developerDataSlice'
import NoDataFound from '../../atomic/NoDataFound'
import moment from 'moment'

const MessageInboxCard = ({ type,chatRoom ,messageWrapperVisible, handleChatProfileClick }) => {
    const dispatch =useDispatch()
    let userID=localStorage.getItem("userId")
    const {chatRoomMessageList}=useSelector((state)=>state.developerData)

    // useEffect(()=>{
    //  dispatch(messageChatRoomList(userID))
    // },[])
    return (
        <>
          { chatRoomMessageList?.chatRooms?.length>0? chatRoomMessageList?.chatRooms?.map((it)=>{
            return (
                <>
                <div className={messageWrapperVisible ? "chat-profile-wrapper position-relative active-chat py-2 px-3" : "chat-profile-wrapper position-relative py-2 px-3"} onClick={()=>handleChatProfileClick(it?.members[0]?.chatroom_id)}>
                <MoreChatOptions  item={it} type={type}/>
                <div className="chat-profile-img">
                    <img src={it?.members[0]?.user?.profile_picture} />
                </div>
                <div className="chat-profile-info">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="chat-name">{it?.members[0]?.user?.name}</h3>
                        <p className="chat-time"> {moment(it?.created_at).fromNow()}</p>
                    </div>
                    <p className="chat-message mb-0">
                      {it?.messages[0]?.message_body}
                    </p>
                </div>
            </div>
                </>
            )
          }):<NoDataFound/> }

            



        </>
    )
}

export default MessageInboxCard