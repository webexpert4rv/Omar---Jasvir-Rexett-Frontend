import React, { useEffect, useRef, useState } from 'react'
import { Button, Dropdown, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Calendar from 'react-calendar'
import { CgCalendar } from 'react-icons/cg'
import { FaCalendarDays } from 'react-icons/fa6'
import { RiUserAddFill } from 'react-icons/ri'
import { TbCalendarShare } from 'react-icons/tb'
import { TiWeatherSunny } from 'react-icons/ti'
import ReactQuill from 'react-quill'
import ToolTip from '../common/Tooltip/ToolTip'
import RexettButton from '../atomic/RexettButton'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminCreateToDo, getAdminList, getAdminTodos, getEditToDo } from '../../redux/slices/adminDataSlice'
import moment from 'moment'

function NewToDo({ currentTab, isEdit, setIsEdit, selectedToDo, selectedId, stripHtmlTags, getSelectedCandidateDetails }) {
    const [value, onChange] = useState(new Date());
    const quillRef = useRef(null);
    const dispatch = useDispatch()
    const {
        register,
        setValue,
        watch,
        control,
        setError,
        clearErrors,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});
    const newDate = moment(value).format('YYYY-MM-DD');
    const { employeeList, approvedLoader } = useSelector((state) => state.adminData)
    const [priority, setPriority] = useState()
    const [priorityColor, setPriorityColor] = useState()

    console.log(selectedToDo, "selectedToDo")
    useEffect(() => {
        dispatch(getAdminList())

    }, [])
    useEffect(() => {
        if (isEdit === true) {
            setValue("title", selectedToDo?.title)
            setValue("description", selectedToDo?.description)
            setPriorityColor(selectedToDo?.priority)
        }else{
            setValue("title","")
            setValue("description","")
            setPriorityColor("")

        }
    }, [isEdit])

    useEffect(() => {
        let data = {
            tab: currentTab
        }
        dispatch(getAdminTodos(data));
    }, [])


    const handleClear = () => {
        reset()
    }


    console.log(priorityColor, "priorityColor")
    const handleChange = (priority) => {
        console.log(priority, "priority")
        setPriority(priority)
        if (priority == "low") {
            setPriorityColor("green");
        } else if (priority == "normal") {
            setPriorityColor("yellow");
        } else {
            setPriorityColor("red");
        }
    }


    const onSubmit = async (values) => {
        console.log(values,"valuess")
        console.log(isEdit,"isEdit")
        getSelectedCandidateDetails(values?.assignees)
        let payload;
        if (isEdit === true) {
            if (currentTab === "my_todo") {
                payload = {
                    title: values?.title,
                    description: (stripHtmlTags(values?.description)),
                    status: "pending",
                    due_date: newDate,
                    priority: values?.priority,
                    priority_color: priorityColor,
                    type: "to_self",
                };
                await dispatch(getEditToDo(payload, selectedId, () => {
                    let data = {
                        tab: currentTab
                    }
                    dispatch(getAdminTodos(data));
                    setIsEdit(false)
                    reset()
                }));
            }
             else {
                payload = {
                    title: values?.title,
                    description: (stripHtmlTags(values?.description)),
                    status: "pending",
                    due_date: newDate,
                    priority: values?.priority,
                    priority_color: priorityColor,
                    type: "assigned_to_employees",
                    assignees: [
                        values?.assignees
                    ],
                };
                await dispatch(getEditToDo(payload, selectedId, () => {
                    let data = {
                        tab: currentTab
                    }
                    dispatch(getAdminTodos(data));
                    setIsEdit(false)
                    reset()
                }));
            }
        } else {
            if (currentTab === "my_todo") {
                console.log("inside my todo")
                payload = {
                    title: values?.title,
                    description: (stripHtmlTags(values?.description)),
                    status: "pending",
                    due_date: newDate,
                    type: "to_self",
                    priority: values?.priority,
                    priority_color: priorityColor
                };
            } else {
                console.log("inside assinged to do ")
                payload = {
                    title: values?.title,
                    description: (stripHtmlTags(values?.description)),
                    status: "pending",
                    due_date: newDate,
                    type: "assigned_to_employees",
                    priority: values?.priority,
                    assignees: [values?.assignees],
                    priority_color: priorityColor
                };
            }
            dispatch(getAdminCreateToDo(payload, () => {
                let data = {
                    tab: currentTab
                }
                dispatch(getAdminTodos(data));
                reset()
            }));
        }
    };



    // const handleSelectedOption=(item)=>{
    //     console.log(item,"item")
    // }
    return (
        <div className="new-todo">
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            className="common-field font-14 mb-2"
                            placeholder="Add your to-do..."
                            defaultValue=""
                            {...register("title", {
                                required: "Task title is required",
                            })}
                        />
                        {errors?.title && (
                            <p className="error-message">{errors.title?.message}</p>
                        )}
                    </Form.Group>
                    <div className="custom-rich-editor todo-field">
                        <Controller
                            name="description"
                            control={control}
                            defaultValue={selectedToDo?.description || ""}
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <ReactQuill
                                    {...field}
                                    ref={quillRef}
                                    value={watch("description")}
                                    theme="snow"
                                />
                            )}
                        />
                    </div>
                    {errors?.description && (
                        <p className="error-message ">{errors.description?.message}</p>
                    )}
                    <div className="d-flex justify-content-between align-items-center pt-2">
                        <div className="d-flex align-items-center gap-3">
                            {currentTab === "assigned_to" ?
                                <Dropdown className="assign-dropdown">
                                    <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                                        <ToolTip text={"Assign to employee"}>
                                            <span className="assign-user cursor-pointer">
                                                <RiUserAddFill />
                                            </span>
                                        </ToolTip>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="assign-dropdown-menu">
                                        <Form.Select
                                            className="common-field font-12 mb-2"
                                            name="assignees"
                                            // onChange={(e)=>handleSelectedOption(e.target.value)}
                                            {...register("assignees", {
                                                required: "Please select candidate"
                                            })}
                                        >
                                            <option value="">Search Employee</option>
                                            {employeeList?.map(emp => (
                                                <option key={emp.id} value={emp.id}>
                                                    {emp.email}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Dropdown.Menu>
                                </Dropdown> : ""}
                            <Dropdown className="assign-dropdown">
                                <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                                    <ToolTip text={"Select Date"} >
                                        <span className="calendar-assign" >
                                            <FaCalendarDays />
                                        </span>
                                    </ToolTip>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="assign-dropdown-menu">
                                    <div>
                                        <span className="font-14 fw-medium d-block mb-2">Quick schedule</span>
                                    </div>
                                    <div className="meeting-booking mt-3 to-doschedule mb-0">
                                        <Calendar onChange={onChange} value={value} />
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" className="priority-btn" id="dropdown-basic">
                                    Select Priority
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="assign-dropdown-menu">
                                    <Form.Select
                                        className="common-field font-12 mb-2"
                                        name="priority"
                                        defaultValue={selectedToDo?.priority}
                                        {...register("priority", {
                                            // required: "Please select candidate",
                                            onChange: (e) => handleChange(e.target.value)
                                        })}
                                    >
                                        <option value="" disabled>Filter...</option>
                                        <option value="low">Low Priority</option>
                                        <option value="normal">Normal Priority</option>
                                        <option value="high">High Priority</option>
                                    </Form.Select>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <RexettButton
                                variant="transparent"
                                className="font-14 main-btn"
                                text={"Cancel"}
                                type="button"
                                onClick={handleClear}
                            />
                            <RexettButton
                                variant="transparent"
                                className="font-14 main-btn"
                                text={isEdit ? "Update" : "Create Todo"}
                                type="submit"
                                disabled={approvedLoader}
                                isLoading={approvedLoader}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewToDo