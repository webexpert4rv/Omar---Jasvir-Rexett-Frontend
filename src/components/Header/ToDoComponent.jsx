import React, { useState } from 'react';
import { Button, Dropdown, Form, Offcanvas, Tab } from 'react-bootstrap';
import { IoFilter } from 'react-icons/io5';
import devImg from '../../assets/img/user-img.jpg';
import { Todo_tabText } from '../clients/TimeReporiting/constant';
import NewToDo from './NewToDo';
import { FaCalendarDays, FaPencil } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import Tabs from '../common/LeaveRequest/Tabs';
import DeleteToDo from '../common/Modals/DeleteToDo';

function ToDoComponent({ showToDo, setShowToDo }) {
    const [currentTab, setCurrentTab] = useState("first")
    const [deletetodo, showDeletetodo] = useState(false); // State for showing/hiding delete options


    const handleCloseToDo = () => {
        setShowToDo(false);
    };
    const handleShowDeleteToDo = () => {
        showDeletetodo(!deletetodo);
    }


    const handleCloseDeleteToDo = () => {
        showDeletetodo(false);
      } 


    const handleSelect = (selectedTab) => {
        setCurrentTab(selectedTab)
    };

    return (
        <div>
            <Offcanvas show={showToDo} placement="end" className="todo-canvas" onHide={handleCloseToDo}>
                <Offcanvas.Header className="border-bottom-grey pb-3" closeButton>
                    <div className="d-flex align-items-center gap-2">
                        <Offcanvas.Title>
                            To do list
                        </Offcanvas.Title>
                        <div className="d-flex align-items-center gap-1">
                            <Dropdown className="d-inline mx-2" autoClose="outside">
                                <Dropdown.Toggle className="filter-btn" id="dropdown-autoclose-outside">
                                    <IoFilter />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="sort-dropdown">
                                    <Dropdown.Item href="#" className="font-14">By due date</Dropdown.Item>
                                    <Dropdown.Item href="#" className="font-14">By title</Dropdown.Item>
                                    <Dropdown.Item href="#" className="font-14">By candidate</Dropdown.Item>
                                    <div className="d-flex align-items-center px-3 justify-content-between complete-wrapper">
                                        <Form.Label htmlFor="completed-task" className="font-14 mb-0">Show Completed to-dos</Form.Label>
                                        <div className="form-check form-switch toggle-switch-wrapper d-inline-block ps-0">
                                            <input
                                                className="form-check-input toggle-switch-custom ps-0 ms-0 shadow-none"
                                                type="checkbox"
                                                role="switch"
                                                id="completed-task"
                                            />
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="font-14 fw-semibold">Tomorrow</span>
                                <span className="font-14 fw-semibold">1</span>
                            </div> */}
                        </div>
                    </div>
                </Offcanvas.Header>

                {/* <Offcanvas.Body className="todo-canvas-body">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <div className="d-flex justify-content-center">
                            <Tabs onSelect={handleSelect} tabText={Todo_tabText} currentTab={currentTab}>
                            </Tabs>
                        </div> */}
                {/* <Tab.Content>
                            <Tab.Pane eventKey="my-to-dos" className="py-4">
                            </Tab.Pane>
                            <Tab.Pane eventKey="assigned-to-dos" className="py-4">
                            </Tab.Pane>
                        </Tab.Content> */}
                {/* </Tab.Container> */}
                {/* </Offcanvas.Header> */}
                <Offcanvas.Body className="todo-canvas-body">
                    <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="first"
                    >
                        <div className="d-flex justify-content-center">
                            <Tabs
                                handleSelect={handleSelect}
                                tabText={Todo_tabText}
                                currentTab={currentTab}
                            />
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="first" className="py-4">
                                <div className="to-dos-wrapper">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="font-14 fw-semibold">Today</span>
                                        <span className="font-14 fw-semibold">0/3</span>
                                    </div>
                                    <div className="mb-3">
                                        <div className="todo-wrapper position-relative mb-3">
                                            <div className="todo-option">
                                                <Button variant="transparent" className="shadow-none">
                                                    <FaPencil />
                                                </Button>
                                                <Button variant="transparent" onClick={handleShowDeleteToDo} className="shadow-none text-danger">
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                            <div className="d-flex align-items-start gap-2">
                                                <div>
                                                    <Form.Check type="checkbox" className="checkbox-custom" />
                                                </div>
                                                <div>
                                                    <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                    <p className="mb-2 font-14">Review it and create  an application</p>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="d-flex align-items-center gap-1 today-text font-14">
                                                            <span><FaCalendarDays /></span>
                                                            <span>Today</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="todo-wrapper position-relative mb-3">
                                            <div className="todo-option">
                                                <Button variant="transparent" className="shadow-none">
                                                    <FaPencil />
                                                </Button>
                                                <Button variant="transparent" onClick={handleShowDeleteToDo} className="shadow-none text-danger">
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                            <div className="d-flex align-items-start gap-2">
                                                <div>
                                                    <Form.Check type="checkbox" className="checkbox-custom" />
                                                </div>
                                                <div>
                                                    <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                    <p className="mb-2 font-14">Review it and create  an application</p>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="d-flex align-items-center gap-1 today-text font-14">
                                                            <span><FaCalendarDays /></span>
                                                            <span>Today</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="font-14 fw-semibold">Tomorrow</span>
                                        <span className="font-14 fw-semibold">1</span>
                                    </div> */}
                                    <div className="todo-wrapper position-relative mb-2">
                                        <div className="todo-option">
                                            <Button variant="transparent" className="shadow-none">
                                                <FaPencil />
                                            </Button>
                                            <Button variant="transparent" onClick={handleShowDeleteToDo} className="shadow-none text-danger">
                                                <FaTrash />
                                            </Button>
                                        </div>
                                        <div className="d-flex align-items-start gap-2">
                                            <div>
                                                <Form.Check type="checkbox" className="checkbox-custom" />
                                            </div>
                                            <div>
                                                <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                <p className="mb-2 font-14">Review it and create  an application</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-1 tomorrow-text font-14">
                                                        <span><FaCalendarDays /></span>
                                                        {/* <span>Tomorrow</span> */}
                                                    </div>
                                                    <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                        <img src={devImg} />
                                                        Rohit Sharma
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="font-14 fw-semibold">Completed</span>
                                        <span className="font-14 fw-semibold">1</span>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div>
                                                <Form.Check type="checkbox" className="checkbox-custom" checked />
                                            </div>
                                            <div>
                                                <p className="mb-0 fw-semibold completed-task">Create job ad for upcoming marketing manager position</p>
                                                <p className="mb-2 font-14 completed-task">Review it and create  an appliacation</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-1 today-text font-14">
                                                        <span><FaCalendarDays /></span>
                                                        <span>Today</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                        <img src={devImg} />
                                                        Rohit Sharma
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="assigned-to-dos" className="py-4">
                                <div className="to-dos-wrapper">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="font-14 fw-semibold">Today</span>
                                        <span className="font-14 fw-semibold">0/3</span>
                                    </div>
                                    <div className="mb-3">
                                        <div className="todo-wrapper mb-2">
                                            <div className="d-flex align-items-start gap-2">
                                                <div>
                                                    <Form.Check type="checkbox" className="checkbox-custom" />
                                                </div>
                                                <div>
                                                    <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                    <p className="mb-2 font-14">Review it and create  an appliacation</p>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="d-flex align-items-center gap-1 today-text font-14">
                                                            <span><FaCalendarDays /></span>
                                                            <span>Today</span>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                            <img src={devImg} />
                                                            Rohit Sharma
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="todo-wrapper mb-2">
                                            <div className="d-flex align-items-start gap-2">
                                                <div>
                                                    <Form.Check type="checkbox" className="checkbox-custom" />
                                                </div>
                                                <div>
                                                    <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                    <p className="mb-2 font-14">Review it and create  an appliacation</p>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="d-flex align-items-center gap-1 today-text font-14">
                                                            <span><FaCalendarDays /></span>
                                                            <span>Today</span>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                            <img src={devImg} />
                                                            Rohit Sharma
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="todo-wrapper mb-2">
                                            <div className="d-flex align-items-start gap-2">
                                                <div>
                                                    <Form.Check type="checkbox" className="checkbox-custom" />
                                                </div>
                                                <div>
                                                    <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                    <p className="mb-2 font-14">Review it and create  an appliacation</p>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="d-flex align-items-center gap-1 today-text font-14">
                                                            <span><FaCalendarDays /></span>
                                                            <span>Today</span>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                            <img src={devImg} />
                                                            Rohit Sharma
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="font-14 fw-semibold">Tomorrow</span>
                                        <span className="font-14 fw-semibold">1</span>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div>
                                                <Form.Check type="checkbox" className="checkbox-custom" />
                                            </div>
                                            <div>
                                                <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                <p className="mb-2 font-14">Review it and create  an application</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-1 tomorrow-text font-14">
                                                        <span><FaCalendarDays /></span>
                                                        <span>Tomorrow</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                        <img src={devImg} />
                                                        Rohit Sharma
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div>
                                                <Form.Check type="checkbox" className="checkbox-custom" />
                                            </div>
                                            <div>
                                                <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                <p className="mb-2 font-14">Review it and create  an application</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-1 tomorrow-text font-14">
                                                        <span><FaCalendarDays /></span>
                                                        <span>Tomorrow</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                        <img src={devImg} />
                                                        Rohit Sharma
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                    <NewToDo />
                </Offcanvas.Body>
            </Offcanvas>
      <DeleteToDo show={deletetodo} handleClose={handleCloseDeleteToDo} />

        </div>
    );
}

export default ToDoComponent;
