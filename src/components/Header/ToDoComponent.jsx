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
import { getAdminTodos, getDeleteTodo } from '../../redux/slices/adminDataSlice';
import { useDispatch, useSelector } from 'react-redux';

function ToDoComponent({ showToDo, setShowToDo }) {
    const [currentTab, setCurrentTab] = useState("my_todo")
    const [deletetodo, showDeletetodo] = useState(false); // State for showing/hiding delete options
    const dispatch = useDispatch()
    const { toDoList } = useSelector(state => state.adminData)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedId, setSelectedId] = useState()
    const [deleteId, setDeleteId] = useState()
    console.log(toDoList,"toDoList")



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
        const data = {
            tab: currentTab,
            status: "pending",
            due_date: "2024-08-03",
            page: 1,
            per_page: 10
        }
        dispatch(getAdminTodos(data))
    };
    console.log(selectedId, "selectedId")
    // const selectedToDo = toDoList?.map((status)=>{status?.find((val)=>val?.id=== selectedId)}
    const selectedToDo = Object.values(toDoList)
        .flatMap(status => status.tasks)
        .find(task => task.id === selectedId);
    // const selectedToDo = toDoListtasks.find((itm) => itm?.id === selectedId)
    console.log(selectedToDo, "selectedToDo")
    const handleEdit = (id) => {
        console.log(id, "id")
        setSelectedId(id)
        setIsEdit(true)
        // dispatch()

    }
    const stripHtmlTags = (str) => {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    };
    const handleDelete = () => {
        dispatch(getDeleteTodo(deleteId, () => {
            dispatch(getAdminTodos());
            showDeletetodo(false);
        }))

    }

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
                                    {/* <Form.Select
                                        className=" time-filter-select shadow-none"
                                        value={selectedView}
                                        onChange={(e) => handlePeriodChange(e.target.value)}
                                    >
                                        <option selected disabled>
                                            {t("selectView")}
                                        </option>
                                        <option value="weekly">By due date</option>
                                        <option value="monthly">By title</option>
                                        <option value="yearly">By candidate</option>
                                 
                                    <Dropdown.Item href="/" className="font-14">By due date</Dropdown.Item>
                                    <Dropdown.Item href="/" className="font-14">By title</Dropdown.Item>
                                    <Dropdown.Item href="/" className="font-14">By candidate</Dropdown.Item>
                                    </Form.Select> */}


                                    {/* <select
                                        className="time-filter-select shadow-none"
                                        value={selectedView}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            Select view
                                        </option>
                                        <option value="weekly">By due date</option>
                                        <option value="monthly">By title</option>
                                        <option value="yearly">By candidate</option>
                                    </select> */}


                                     <Form.Select
                                        // className=" time-filter-select shadow-none"
                                        // value={selectedView}
                                        // onChange={(e) => handlePeriodChange(e.target.value)}
                                    >
                                        <option selected disabled>
                                            Select View
                                        </option>
                                        <option value="weekly">By due date</option>
                                        <option value="monthly">By title</option>
                                        <option value="yearly">By candidate</option>
                                 
                                    {/* <Dropdown.Item href="/" className="font-14">By due date</Dropdown.Item>
                                    <Dropdown.Item href="/" className="font-14">By title</Dropdown.Item>
                                    <Dropdown.Item href="/" className="font-14">By candidate</Dropdown.Item> */}
                                    </Form.Select>
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
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        {/* <span className="font-14 fw-semibold">today</span> */}
                                        {/* <span className="font-14 fw-semibold">count</span> */}
                                    </div>


                                    {/* {toDoList?.{taskStatus}?.tasks?.map((item)=>{
                                        return(
                                         <div className="mb-3">
                                         <div className="todo-wrapper position-relative mb-3">
                                             <div className="todo-option">
                                                 <Button variant="transparent" className="shadow-none" onClick = {()=>handleEdit(item?.id)}>
                                                     <FaPencil />
                                                 </Button>
                                                 <Button variant="transparent" onClick={()=>handleShowDeleteToDo(item?.id)} className="shadow-none text-danger">
                                                     <FaTrash />
                                                 </Button>
                                             </div>
                                             <div className="d-flex align-items-start gap-2">
                                                 <div>
                                                     <Form.Check type="checkbox" className="checkbox-custom" />
                                                 </div>
                                                 <div>
                                                     <p className="mb-0 fw-semibold">{item?.title}</p>
                                                     <p className="mb-2 font-14">{stripHtmlTags(item?.description)}</p>
                                                     <div className="d-flex align-items-center gap-3">
                                                         <div className="d-flex align-items-center gap-1 today-text font-14">
                                                             <span><FaCalendarDays /></span>
                                                             <span>{item?.due_date?.slice(0,10)}</span>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                    })} */}
                                    <div>
                                        {Object.keys(toDoList).map(status => (
                                            <div key={status}>
                                                <h3 className="status-header">{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
                                                {toDoList[status].tasks.length > 0 ? (
                                                    toDoList[status].tasks.map(item => (
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
                                                                        onClick={() => handleShowDeleteToDo(item.id)}
                                                                        className="shadow-none text-danger"
                                                                    >
                                                                        <FaTrash />
                                                                    </Button>
                                                                </div>
                                                                <div className="d-flex align-items-start gap-2">
                                                                    <div>
                                                                        <Form.Check type="checkbox" className="checkbox-custom" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="mb-0 fw-semibold">{item.title}</p>
                                                                        <p className="mb-2 font-14">{stripHtmlTags(item.description)}</p>
                                                                        <div className="d-flex align-items-center gap-3">
                                                                            <div className="d-flex align-items-center gap-1 today-text font-14">
                                                                                <span><FaCalendarDays /></span>
                                                                                <span>{item.due_date.slice(0, 10)}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No tasks available.</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                    <NewToDo currentTab={currentTab} isEdit={isEdit} selectedToDo={selectedToDo} selectedId={selectedId} setIsEdit={setIsEdit} />
                </Offcanvas.Body>
            </Offcanvas>
            <DeleteToDo show={deletetodo} handleClose={handleCloseDeleteToDo} handleDelete={handleDelete} />

        </div>
    );
}

export default ToDoComponent;
