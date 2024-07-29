import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const MoreChatOptions = () => {
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
                    <span className="font-14">Mark as unread</span>
                </div>
                <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                    <span className="font-14">Reassign user</span>
                </div>
                {/* <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                  <span className="font-14 d-inline-block cursor-pointer" onClick={handleShowUserConversation}>Add users</span>
                  </div> */}
                <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                    <span className="font-14">Archieve</span>
                </div>
            </div>
        </Dropdown.Menu>
    </Dropdown>
</span>
  )
}

export default MoreChatOptions