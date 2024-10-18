import React, { useEffect } from "react";
import devImg from "../../../assets/img/user-img.jpg";
import MoreChatOptions from "./MoreChatOptions";
import { useDispatch, useSelector } from "react-redux";
import { messageChatRoomList } from "../../../redux/slices/developerDataSlice";
import NoDataFound from "../../atomic/NoDataFound";
import moment from "moment";
import { setIsChatOpen } from "../../../redux/slices/adminDataSlice";

const MessageInboxCard = ({
  type,
  chatRoom,
  messageWrapperVisible,
  handleChatProfileClick,
  filteredName,
  setSelectedTab,
  onScroll,
  listInnerRef,
  userList,
}) => {
  const dispatch = useDispatch();

  const { chatRoomMessageList } = useSelector((state) => state.developerData);

  const stripHtmlTags = (str) => {
    return str?.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const getlastMsgOrMsgTime = (requirement, item) => {
    // extrating last message (if item length is greater than 0) from whole messages key within the item object
    const lastMessage = item.messages?.length
      ? item?.messages[item?.messages.length - 1]
      : "";
    if (lastMessage) {
      if (requirement === "time") {
        // for displaying last messages's time
        return moment(lastMessage?.created_at).fromNow();
      } else {
        // for displaying last messages
        return ` ${lastMessage?.sender?.name} : ${stripHtmlTags(
          lastMessage?.message_body
        )}`;
      }
    }
  };
console.log(chatRoomMessageList?.chatRooms,"chatrooms")
  return (
    <>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        {chatRoomMessageList?.chatRooms?.length > 0 ? (
          (filteredName ? filteredName : chatRoomMessageList?.chatRooms)?.map(
            (it,idx) => {
              return (
                <>
                  <div className="chat-wrapper">
                    <div
                      className={`chat-profile-wrapper position-relative py-2 px-3 ${
                        messageWrapperVisible ? "active-chat" : ""
                      }`}
                    >
                      <div
                        onClick={() => {
                          handleChatProfileClick(it?.members[0]?.chatroom_id);
                          dispatch(setIsChatOpen(true));
                        }}
                        className="cursor-pointer"
                      >
                        <div className="chat-profile-info w-100">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center gap-2">
                              <div className="chat-profile-img">
                                <img src={it?.members[0]?.user?.profile_picture} />
                              </div>
                              <h3 className="chat-name mb-0">
                                {it?.members[0]?.user?.name}
                              </h3>
                            </div>
                            {/* <p className="chat-time"> {moment(it?.created_at).fromNow()}</p> */}
                            <p className="chat-time mb-0">
                              {getlastMsgOrMsgTime("time", it)}
                            </p>
                            <MoreChatOptions
                              item={it}
                              type={type}
                              setSelectedTab={setSelectedTab}
                            />
                          </div>
                          {/* <p className="chat-message mb-0">
                                            {(stripHtmlTags(it?.messages[0]?.message_body))}
                                        </p> */}
                          <p className="chat-message mb-0">
                            {getlastMsgOrMsgTime("message", it)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          )
        ) : (
          <div className="no-data-container">
            <NoDataFound />
          </div>
        )}
      </div>
    </>
  );
};

export default MessageInboxCard;
