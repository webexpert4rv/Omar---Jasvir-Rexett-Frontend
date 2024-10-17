import React from 'react'
import { Button, OverlayTrigger } from 'react-bootstrap'
import devImg from '../../assets/img/user-img.jpg'
import { FaStar, FaTimes } from 'react-icons/fa'
import { LuMessagesSquare } from 'react-icons/lu'
import NoDataFound from './NoDataFound'
import { PiUserRectangleFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

const TableView = ({handleShowScheduleMeeting,scheduleInterview,rejectedApply,listing,handleJobStatusModal,type}) => {
  console.log(listing,"listing")
  console.log(type,"gridviewType")

  const navigate = useNavigate();
  const role = localStorage.getItem("role")

  const handleDeveloperCard = (e, id) => {
    if (role == "client") {
      navigate(`/client/client-single-developer/${id}`);
    } else if (role === "admin") {
      navigate(`/admin-single-developer/${id}`);
    }
  };

  return (
    <>
      <div className="table-responsive">
                      <table className="table document-table table-ui-custom">
                        <thead>
                          <th className="document-th filename-th px-3">Name</th>
                          <th className="document-th location-th">Designation</th>
                          <th className="document-th location-th">Experience</th>
                          <th className="document-th location-th">Expertise</th>
                          <th className="document-th location-th">Good to have skills</th>
                          <th className="document-th location-th">Rating</th>
                          <th className="document-th location-th">Screening Rating</th>
                          <th className="document-th location-th">Profile match</th>
                          <th className="document-th location-th">Action</th>
                        </thead>
                        <tbody>
                          {
                           listing?.length>0? listing?.map((item,index)=>{
                              return (
                                <>
                                 <tr onClick={(e) => handleDeveloperCard(e, item?.developer_id)}>
                              <td className="document-data px-3">
                                <div className="d-flex align-items-center gap-2">
                                  <img src={item?.developer?.profile_picture} className="developer-img" />
                                  {item?.developer?.name}
                                </div>
                              </td>
                              <td className="document-data">{item?.developer?.developer_detail?.professional_title}</td>
                              <td className="document-data">{item?.developer?.developer_detail?.total_experience} years</td>
                              <td className="document-data white-nowrap">
                                <ul className="skills-listing mb-0">
                                {
                                  item?.developer?.expertises?.map((item,index)=>{
                                    return (
                                      <>
                                      <li>{item.skill}</li>
                                      </>
                                    )
                                  })
                                }
                                </ul>
                              </td>
                              <td className="document-data">
                                <ul className="skills-listing mb-0">
                                {
                                  item?.developer?.other_skills?.map((item,index)=>{
                                    return (
                                      <>
                                      <li>{item.skill}</li>
                                      </>
                                    )
                                  })
                                }
                                </ul>
                              </td>
                              <td className="document-data">
                                <span className="status-upcoming">
                                  <span className="d-inline-flex align-items-center gap-1">
                                    <FaStar /> 4.4
                                  </span>
                                </span>
                              </td>
                              <td className="document-data">
                                <span className="status-upcoming">
                                  <span className="d-inline-flex align-items-center gap-1">
                                    <FaStar /> 8.9
                                  </span>
                                </span>
                              </td>
                              <td className="document-data">
                                <div className="">
                                  <span className="status-finished w-auto d-inline-block"><strong>95%</strong></span>
                                </div>
                              </td>
  
                              <td className="document-data">
                                <div className="d-flex align-items-center gap-2 job-action-btns">
                                  <OverlayTrigger placement="top" overlay={scheduleInterview}>
                                    {/* <Button onClick={()=>handleShowScheduleMeeting(item?.developer?.name,item?.developer_id)} className="main-btn py-2 text-black font-15"> */}
                                    <Button onClick={(e)=>handleJobStatusModal(e, item?.developer?.id,"interviewing", type,item?.id)} className="main-btn py-2 text-black font-15">
                                    <PiUserRectangleFill />
                                    </Button>
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={rejectedApply}>
                                    <Button onClick={(e)=>handleJobStatusModal(e, item?.developer?.id,"rejected", type,item?.id)} variant="danger">
                                      <FaTimes />
                                    </Button>
                                  </OverlayTrigger>
                                </div>
                              </td>
                            </tr>
                                </>
                              )
                            })
                             
                          :  <td colSpan={10} ><div className="simple-no-data"><NoDataFound /></div></td>
                          }
                        
                        </tbody>
                      </table>
                    </div>
    </>
  )
}

export default TableView