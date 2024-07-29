import React from 'react'
import { Button, OverlayTrigger } from 'react-bootstrap'
import devImg from '../../assets/img/user-img.jpg'
import { FaStar, FaTimes } from 'react-icons/fa'
import { LuMessagesSquare } from 'react-icons/lu'

const TableView = ({handleShowScheduleMeeting,scheduleInterview,rejectedApply,listing}) => {
  console.log(listing,"listing")

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
                            listing?.map((item,index)=>{
                              return (
                                <>
                                 <tr>
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
                                    <Button onClick={()=>handleShowScheduleMeeting(item?.developer?.name,item?.developer_id)} className="main-btn py-2 text-black font-15">
                                      <LuMessagesSquare />
                                    </Button>
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={rejectedApply}>
                                    <Button variant="danger">
                                      <FaTimes />
                                    </Button>
                                  </OverlayTrigger>
                                </div>
                              </td>
                            </tr>
                                </>
                              )
                            })
                             

                          }
                        
                        </tbody>
                      </table>
                    </div>
    </>
  )
}

export default TableView