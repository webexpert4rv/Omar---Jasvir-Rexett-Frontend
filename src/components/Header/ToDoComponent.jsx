import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Offcanvas, Tab } from 'react-bootstrap';
import { IoFilter } from 'react-icons/io5';
import devImg from '../../assets/img/user-img.jpg';
import { Todo_tabText } from '../clients/TimeReporiting/constant';
import NewToDo from './NewToDo';
import { FaCalendarDays, FaPencil } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import Tabs from '../common/LeaveRequest/Tabs';
import DeleteToDo from '../common/Modals/DeleteToDo';
import { getAdminTodos, getDeleteTodo, getEditToDo } from '../../redux/slices/adminDataSlice';
import { useDispatch, useSelector } from 'react-redux';

function ToDoComponent({ showToDo, setShowToDo }) {
    const dispatch = useDispatch()
    const [currentTab, setCurrentTab] = useState("my_todo")
    const [deletetodo, showDeletetodo] = useState(false); // State for showing/hiding delete options
    const { toDoList, smallLoader, employeeList } = useSelector(state => state.adminData)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedId, setSelectedId] = useState()
    const [deleteId, setDeleteId] = useState()
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [details, setDetails] = useState();

    useEffect(() => {
        // Log selected candidates to see state updates
        console.log('Selected Candidates:', details);
      }, [details]);


    const handleCloseToDo = () => {
        setShowToDo(false);
    };
    const handleShowDeleteToDo = (id) => {
        setDeleteId(id)
        showDeletetodo(!deletetodo);
    }


    const handleCloseDeleteToDo = () => {
        showDeletetodo(false);
    }


    const handleSelect = (selectedTab) => {
        setCurrentTab(selectedTab)
        let data = {
            tab: selectedTab,
        }
        dispatch(getAdminTodos(data))
    };
    const selectedToDo = Object.values(toDoList).flatMap(status => status.tasks).find(task => task?.id === selectedId);
    const handleEdit = (id) => {
        setSelectedId(id)
        setIsEdit(true)

    }
    const stripHtmlTags = (str) => {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    };
    const handleDelete = () => {
        dispatch(getDeleteTodo(deleteId, () => {
            let data = {
                tab: currentTab
            }
            dispatch(getAdminTodos(data));
            showDeletetodo(false);
        }))
    }

    const handleCompletedTask = (id) => {
        let data = {
            "status": "completed"
        }
        dispatch(getEditToDo(data, id, () => {
            let data = {
                tab: currentTab
            }
            dispatch(getAdminTodos(data));
        }));
    }

    const handleUncheckTask = (id) => {
        let data = {
            "status": "pending"
        }
        dispatch(getEditToDo(data, id, () => {
            let data = {
                tab: currentTab
            }
            dispatch(getAdminTodos(data));
        }));

    }
    const handleFilters = (filter) => {
        dispatch(getAdminTodos(filter))
    }
    const getSelectedCandidateDetails = (canId) => {
        if(canId){
        const candidateDetails = employeeList .flatMap(itm => itm).find(candidate => candidate.id === canId);
            console.log(candidateDetails?.name,"candidateDetails")
            setDetails(candidateDetails?.name)
            console.log(details,"details Inside")
             return candidateDetails?.name
    }
}
    console.log(details,"details outside")
    console.log(selectedCandidates?.name, "newDetails")


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
                                    <Form.Select
                                        // className=" time-filter-select shadow-none"
                                        // value={selectedView}
                                        // onChange={(e) => handlePeriodChange(e.target.value)}
                                        onChange={(e) => handleFilters(e.target.value)}
                                    >
                                        <option selected disabled>
                                            Select View
                                        </option>
                                        <option value="due_date">By due date</option>
                                        <option value="title">By title</option>
                                        <option value="candidate">By candidate</option>
                                    </Form.Select>
                                    <div className="d-flex align-items-center px-3 justify-content-between complete-wrapper">
                                        {/* <Form.Label htmlFor="completed-task" className="font-14 mb-0">Show Completed to-dos</Form.Label> */}
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
                        </div>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className="todo-canvas-body">
                    <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="my_todo"
                    >
                        <div className="d-flex justify-content-center">
                            <Tabs
                                handleSelect={handleSelect}
                                tabText={Todo_tabText}
                                currentTab={currentTab}
                            />
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="my_todo" className="py-4">
                                <div className="to-dos-wrapper">
                                    <div>
                                        {Object.keys(toDoList).map(status => (
                                            <div key={status}>
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h3 className="font-14 fw-semibold">
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </h3>
                                                    {/* <span className="font-14 fw-semibold">{toDoList[status]?.count}</span> */}
                                                </div>
                                                {status === "completed" ? (
                                                    toDoList[status]?.tasks?.length > 0 ? (
                                                        toDoList[status].tasks.map(item => (
                                                            <div key={item.id} className="todo-wrapper mb-2">
                                                                <div className="d-flex align-items-start gap-2">
                                                                    <div>
                                                                        <Form.Check
                                                                            type="checkbox"
                                                                            className="checkbox-custom"
                                                                            onChange={() => handleUncheckTask(item?.id)}
                                                                            checked
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <p className="mb-0 fw-semibold completed-task">{item.title}</p>
                                                                        <p className="mb-2 font-14 completed-task">{item.description}</p>
                                                                        <div className="d-flex align-items-center gap-3">
                                                                            <div className="d-flex align-items-center gap-1 today-text font-14">
                                                                                <span><FaCalendarDays /></span>
                                                                                <span>{item.due_date.slice(0, 10)}</span>
                                                                            </div>
                                                                            {currentTab === "assigned_to" && (
                                                                                <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                                                    <img src={devImg} alt="Assigned user" />
                                                                                    {/* {getSelectedCandidateDetails(item?.id)} */}
                                                                                    {details}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No completed tasks available.</p>
                                                    )
                                                ) : (
                                                    <div>
                                                        {toDoList[status]?.tasks?.length > 0 ? (
                                                            toDoList[status].tasks.map(item => (
                                                                item.status === "pending" && (
                                                                    <div key={item.id} className="mb-3">
                                                                        <div className="todo-wrapper position-relative mb-3">
                                                                            <div className="todo-option">
                                                                                <Button
                                                                                    variant="transparent"
                                                                                    className="shadow-none"
                                                                                    onClick={() => handleEdit(item.id)}
                                                                                >
                                                                                    <FaPencil />
                                                                                </Button>
                                                                                <Button
                                                                                    variant="transparent"
                                                                                    className="shadow-none text-danger"
                                                                                    onClick={() => handleShowDeleteToDo(item.id)}
                                                                                >
                                                                                    <FaTrash />
                                                                                </Button>
                                                                            </div>
                                                                            <div className="d-flex align-items-start gap-2">
                                                                                <div>
                                                                                    <Form.Check
                                                                                        type="checkbox"
                                                                                        className="checkbox-custom"
                                                                                        onChange={() => handleCompletedTask(item.id)}
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <p className="mb-0 fw-semibold">{item.title}</p>
                                                                                    <p className="mb-2 font-14">{stripHtmlTags(item.description)}</p>
                                                                                    <div className="d-flex align-items-center gap-3">
                                                                                        <div className="d-flex align-items-center gap-1 today-text font-14">
                                                                                            <span><FaCalendarDays /></span>
                                                                                            <span>{item.due_date.slice(0, 10)}</span>
                                                                                        </div>
                                                                                        {currentTab === "assigned_to" && (
                                                                                            <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                                                                <img src={devImg} alt="Assigned user" />
                                                                                                {/* {getSelectedCandidateDetails(item?.id)} */}
                                                                                                {details}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            ))
                                                        ) : (
                                                            <p>No tasks available.</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                    </div>

                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                    <NewToDo currentTab={currentTab} isEdit={isEdit} selectedToDo={selectedToDo} selectedId={selectedId} setIsEdit={setIsEdit} stripHtmlTags={stripHtmlTags} getSelectedCandidateDetails={getSelectedCandidateDetails} />
                </Offcanvas.Body>
            </Offcanvas>
            <DeleteToDo show={deletetodo} handleClose={handleCloseDeleteToDo} handleDelete={handleDelete} smallLoader={smallLoader} />

        </div>
    );
}

export default ToDoComponent;
