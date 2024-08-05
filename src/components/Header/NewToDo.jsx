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

function NewToDo({ currentTab, isEdit,setIsEdit ,selectedToDo, selectedId }) {
    const [valueMessage, setValueMessage] = useState('');
    const [value, onChange] = useState(new Date());
    // const [data, setData] = useState()
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
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});

    const { employeeList } = useSelector((state) => state.adminData)
    console.log(employeeList,"employeeList")
    console.log(selectedToDo?.description,"selectedToDodescriptiomn")
    console.log(selectedToDo?.title,"selectedToDotitle")


    useEffect(() => {
        dispatch(getAdminList())
    }, [])

    useEffect(()=>{
        setValue("title",selectedToDo?.title)
        setValue("description",selectedToDo?.description)
        


    },[])

    useEffect(()=>{
        const data = {
            tab: currentTab,
            status: "pending",
            due_date: newDate,
            page: 1,
            per_page: 10
        };
        console.log(data,"datauseEffect")
        dispatch(getAdminTodos(data));
    },[])

    const handleChange = (item) => {
        console.log(item, "values")
        setValueMessage(item)
    }
    const newDate = moment(value).format('YYYY-MM-DD');
    console.log(valueMessage,"valueMessageccc")

 




    const onSubmit = async (values) => {
        console.log(values,"values")
        let payload;
        if (isEdit) {
            payload = {
                title: values?.title,
                description: valueMessage,
                status: "pending",
                due_date: newDate,
                type: "to_self",
            };
            console.log(payload,"payloadonnewtodo")
            await dispatch(getEditToDo(payload, selectedId, () => {
                const data = {
                    tab: currentTab,
                    status: "pending",
                    due_date: newDate,
                    page: 1,
                    per_page: 10
                };
                console.log(data,"dataonadmintodo")
                dispatch(getAdminTodos(data));
                setIsEdit(false)
            }));
        } else {
            if (currentTab === "my_todo") {
                payload = {
                    title: values?.title,
                    description: valueMessage,
                    status: "pending",
                    due_date: newDate,
                    type: "to_self",
                };
            } else {
                payload = {
                    title: values?.title,
                    description: valueMessage,
                    status: "pending",
                    due_date: newDate,
                    type: "assigned_to_employees",
                    assignees: [41, 23],
                };
            }
            await dispatch(getAdminCreateToDo(payload, () => {
                const data = {
                    tab: currentTab,
                    status: "pending",
                    due_date: newDate,
                    page: 1,
                    per_page: 10
                };
                dispatch(getAdminTodos(data));
            }));
        }
    };


    return (
        <div className="new-todo">
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            className="common-field font-14 mb-2"
                            placeholder="Add your to-do..."
                            defaultValue={selectedToDo?.title}
                            {...register("title", {
                                required: "Job title is required",
                            })}
                        />
                        {errors?.title && (
                            <p className="error-message">{errors.title?.message}</p>
                        )}
                    </Form.Group>
                    <div className="custom-rich-editor todo-field">
                        {/* <ReactQuill value={selectedToDo?.description} onChange={(e) => handleChange(e)} /> */}
                        <Controller
                            name="description"
                            control={control}
                            // defaultValue={selectedToDo?.description}
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <ReactQuill
                                    {...field}
                                    ref={quillRef}
                                    value={ selectedToDo?.description}
                                    theme="snow"
                                    onChange={(content, delta, source, editor) => field.onChange(content)}
                                />
                             )} 
                        />
                    </div>
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
                                        // onChange={(e)=>handleSelectedOption(e)}
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
                                    {/* <ul className="quick-listing">
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
                                    </ul> */}
                                    <div className="meeting-booking mt-3 to-doschedule mb-0">
                                        <Calendar onChange={onChange} value={value} />
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <RexettButton
                                variant="transparent"
                                className="font-14 main-btn"
                                text={"Cancel"}
                                type="submit"
                            // onClick={handleClose}
                            // disabled={smallLoader}
                            // isLoading={smallLoader}
                            />
                            <RexettButton
                                variant="transparent"
                                className="font-14 main-btn"
                                text={isEdit ? "Update" : "Create Todo"}
                                type="submit"
                            // disabled={smallLoader}
                            // isLoading={smallLoader}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewToDo