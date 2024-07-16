import React, { useState } from 'react'
import { Button, Dropdown, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Calendar from 'react-calendar'
import { CgCalendar } from 'react-icons/cg'
import { FaCalendarDays } from 'react-icons/fa6'
import { RiUserAddFill } from 'react-icons/ri'
import { TbCalendarShare } from 'react-icons/tb'
import { TiWeatherSunny } from 'react-icons/ti'
import ReactQuill from 'react-quill'
import ToolTip from '../common/Tooltip/ToolTip'

function NewToDo() {
  const [valuemessga, setValuemessga] = useState('');
  const [value, onChange] = useState(new Date());
 

    return (
        <div className="new-todo">
            <div className="">
                <Form.Control type="text" className="common-field font-14 mb-2" placeholder="Add your to-do..." />
                <div className="custom-rich-editor todo-field">
                    <ReactQuill value={valuemessga} />
                </div>
                <div className="d-flex justify-content-between align-items-center pt-2">
                    <div className="d-flex align-items-center gap-3">
                        <Dropdown className="assign-dropdown">
                            <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                            <ToolTip   text= {"Assign to employee"}>
                                    <span className="assign-user cursor-pointer">
                                        <RiUserAddFill />
                                    </span>
                                    </ToolTip>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="assign-dropdown-menu">
                                <div className="search-field-employee">
                                    <Form.Control type="text" className="common-field font-12 mb-2" placeholder="Search Employee" />
                                </div>
                                <div className="employee-listing">
                                    <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                                        <span className="profile-pic-prefix">RG</span>
                                        <span className="font-12">robingautam@gmail.com</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                                        <span className="profile-pic-prefix">RG</span>
                                        <span className="font-12">robingautam@gmail.com</span>
                                    </div>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="assign-dropdown">
                            <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                            <ToolTip text = {"Select Date"} >
                                    <span className="calendar-assign">
                                        <FaCalendarDays />
                                    </span>
                                    </ToolTip>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="assign-dropdown-menu">
                                <div>
                                    <span className="font-14 fw-medium d-block mb-2">Quick schedule</span>
                                </div>
                                <ul className="quick-listing">
                                    <li>
                                        <span className="d-inline-flex align-items-center gap-1">
                                            <span className="quick-icon">
                                                <CgCalendar />
                                            </span>
                                            Today
                                        </span>
                                        <span className="fw-medium">26 Jun</span>
                                    </li>
                                    <li>
                                        <span className="d-inline-flex align-items-center gap-1">
                                            <span className="quick-icon">
                                                <TiWeatherSunny />
                                            </span>
                                            Tomorrow
                                        </span>
                                        <span className="fw-medium">27 Jun</span>
                                    </li>
                                    <li>
                                        <span className="d-inline-flex align-items-center gap-1">
                                            <span className="quick-icon">
                                                <TbCalendarShare />
                                            </span>
                                            Friday
                                        </span>
                                        <span className="fw-medium">28 Jun</span>
                                    </li>
                                </ul>
                                <div className="meeting-booking mt-3 to-doschedule mb-0">
                                    <Calendar onChange={onChange} value={value} />
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <Button variant="transparent" className="font-14 border-0 p-0 me-3">Cancel</Button>
                        <Button variant="transparent" className="font-14 main-btn">Create Todo</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewToDo