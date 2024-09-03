import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { updateChatRoom } from '../../../redux/slices/adminDataSlice'
import { getAllMessages } from '../../../redux/slices/developerDataSlice'

const MoreChatOptions = ({ item, type,setCurrentTab }) => {
    let userID = localStorage.getItem("userId")
    const dispatch = useDispatch()
    const handleUnRead = (e) => {
        e.stopPropagation()
        let payload = {
            type: "unread",

        }
        dispatch(updateChatRoom(item?.id, payload, () => {
            let data = {
                type: type,
                page: "1",
                per_page: "10"
            }
            dispatch(getAllMessages(userID, data))
        }))
        setCurrentTab("second")
    }

    const handleArchive = (e) => {
        e.stopPropagation()
        let payload = {
            type: "archive",
        }
        dispatch(updateChatRoom(item?.id, payload, () => {
            let data = {
                type: type,
                page: "1",
                per_page: "10"
            }
            dispatch(getAllMessages(userID, data))
        }))
        setCurrentTab("third")
    }
    return (
        <span className="more-chat-options">
            <Dropdown className="assign-dropdown">
                <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                    <span className="assign-user cursor-pointer">
                        <HiOutlineDotsVertical />
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="assign-dropdown-menu more-option-menu">
                    <div className="employee-listing">
                        <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                           { type === "unread" ? <span className="font-14" onClick={(e)=>handleUnRead(e)}>Mark as unread</span>:""}
                        </div>
                        {/* <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                            <span className="font-14">Reassign user</span>
                        </div> */}
                        {/* <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                  <span className="font-14 d-inline-block cursor-pointer" onClick={handleShowUserConversation}>Add users</span>
                  </div> */}
                        <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          { type === "archive"? <span className="font-14" onClick={(e)=>handleArchive(e)}>Archive</span> : ""}
                        </div>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </span>
    )
}

export default MoreChatOptions