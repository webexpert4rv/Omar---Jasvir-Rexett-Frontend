import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteEmailTemplate, getAllMessageTemplates, getMessageTemplates } from "../../../../redux/slices/adminDataSlice";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
const MessageTemplate = ({currentTab}) => {
    const {messageTemplates}= useSelector(state=>state.adminData)
    const navigate = useNavigate()
    console.log(messageTemplates,"messageTemplates")
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getAllMessageTemplates())
    },[])
    const handleDelete=(id)=>{
        dispatch(deleteEmailTemplate(id,()=>{
            dispatch(getAllMessageTemplates())
        }))}
    const handleEdit=(id)=>{
        console.log(id,"id")
        navigate(`/admin/create-message-template/${id}`)

    }
    return (
        <>
            <div>
                {currentTab === "four" &&
                    <div>
                        <div className="d-flex gap-3 justify-content-between align-items-center pb-2 mb-3 border-bottom-grey">
                            <h2 className="section-head-sub mb-0 border-0">
                                Message Templates
                            </h2>
                            <Link to={'/admin/create-message-template'} variant="transparent" className="main-btn font-14 text-decoration-none">Create new template</Link>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-ui-custom">
                                <thead>
                                    <tr>
                                        <th>Template name</th>
                                        <th>Subject</th>
                                        <th>Default template</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                  {messageTemplates?.templates?.map((item,idx)=>{
                                    return (<tr>
                                        <td>
                                            {item?.template_name}
                                        </td>
                                        <td>
                                        {item?.subject}
                                        </td>
                                        <td>
                                            <span className="status-info">{item?.template_type}</span>
                                        </td>
                                        <td>
                                        <div className="d-flex align-items-center gap-3">
                                                            <Button
                                                            className="arrow-btn info-arrow"
                                                            onClick={()=>handleEdit(item?.id)}
                                                            
                                                            
                                                            >
                                                                <FaPencil />
                                                            </Button>
                                                            <Button
                                                             className="arrow-btn danger-arrow"
                                                             onClick = {()=>handleDelete(item?.id)}
                                                             
                                                             >
                                                                <FaTrash />
                                                            </Button>
                                                        </div>
                                        </td>
                                    </tr>)})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default MessageTemplate;