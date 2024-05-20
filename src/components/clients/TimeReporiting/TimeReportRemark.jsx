import React, { useState } from 'react'
import { Button, Form, Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap'
import userImage from "../../../assets/img/user-img.jpg"
import { sendRemarkOnTimeReport } from '../../../redux/slices/adminDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import RexettButton from '../../atomic/RexettButton';
import { timeReporting } from '../../../redux/slices/clientDataSlice';
import { IoCheckmark } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
const TimeReportRemark = ({ remarkshow, handleremarkClose, currentDetails, role, page }) => {
    let { contractDetails: { user_details, contract_id, remarks } } = currentDetails
    const [addRemark, setRemark] = useState(null);
    const dispatch = useDispatch()
    const { smallLoader } = useSelector(state => state.adminData)

    const handleRemarkChange = (e) => {
        setRemark(e.target.value)
    }
    console.log(role, "role")
    const handleRemarkSend = async (e) => {
        e.preventDefault()
        let payload = {
            "contract_id": contract_id,
            "remarks": addRemark
        }
        await dispatch(sendRemarkOnTimeReport(payload))
        let filterData = {
            page: page
        }
        dispatch(timeReporting(filterData, role));
        handleremarkClose()
    }
    const approveRemark = (
        <Tooltip id="tooltip">
            Approve
        </Tooltip>
    );
    const rejectRemark = (
        <Tooltip id="tooltip">
            Reject
        </Tooltip>
    );

    return (
        <Offcanvas className="time-detail-sidepanel" show={remarkshow} onHide={handleremarkClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Remarks</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='remarks-section'>
                    <div className='remark-card-wrapper'>
                        {
                            remarks?.map((item) => {
                                return (
                                    <>
                                        <div className='remark-card'>
                                            <div className='remark-user'>
                                                <div className='d-flex justify-content-between align-items-center gap-2'>
                                                    <img src={item?.user?.profile_picture} /> {item?.user?.name}
                                                </div>
                                                {/* <p>25 Apr, 11:20 AM</p> */}
                                                <p>{item.created_at?.slice(0, 10)}</p>

                                            </div>
                                            <div className='remark-content'>
                                                <p>{item?.remark}</p>
                                            </div>
                                            <div className="d-flex justify-content-end gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveRemark}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectRemark}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                            <span className="status-finished mt-2">Approved</span>
                                            <span className="status-rejected mt-2">Rejected</span>
                                        </div>
                                    </>
                                )
                            })
                        }

                        {/* <div className='remark-card'>
                    <div className='remark-user'>
                        <div className='d-flex justify-content-between align-items-center gap-2'>
                            <img src={userImage} /> Admin
                        </div>
                        <p>25 Apr, 11:20 AM</p>
                    </div>
                    <div className='remark-content'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod totam cupiditate ipsa eveniet ea magni recusandae similique rerum aspernatur facilis? Minus quo quae aliquid culpa vero incidunt blanditiis quibusdam dolorem? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae accusantium eius, dolor deserunt eum aperiam sed repudiandae possimus nisi, sunt id. Culpa voluptatum vero sint praesentium non autem veritatis doloribus.</p>
                    </div>
                </div>
                <div className='remark-card'>
                    <div className='remark-user'>
                        <div className='d-flex justify-content-between align-items-center gap-2'>
                            <img src={userImage} /> Me (Rohit Sharma)
                        </div>
                        <p>25 Apr, 11:20 AM</p>
                    </div>
                    <div className='remark-content'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod totam cupiditate ipsa eveniet ea magni recusandae similique rerum aspernatur facilis? Minus quo quae aliquid culpa vero incidunt blanditiis quibusdam dolorem? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae accusantium eius, dolor deserunt eum aperiam sed repudiandae possimus nisi, sunt id. Culpa voluptatum vero sint praesentium non autem veritatis doloribus.</p>
                    </div>
                </div> */}
                    </div>
                    <div className='remark-input-wrapper'>
                        <div>
                            <Form.Control type='text' as="textarea" placeholder="Enter your remark" className='common-field font-14' onChange={handleRemarkChange} />
                            {/* <Button className='main-btn font-14 mt-2 py-2 px-3' onClick={handleRemarkSend}>Send</Button> */}

                            <RexettButton
                                type="submit"
                                text="Send"
                                className='main-btn font-14 mt-2 py-2 px-3'
                                variant="transparent"
                                onClick={handleRemarkSend}
                                disabled={smallLoader}
                                isLoading={smallLoader}
                            />

                        </div>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default TimeReportRemark