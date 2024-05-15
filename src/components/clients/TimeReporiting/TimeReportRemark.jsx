import React, { useState } from 'react'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import userImage from "../../../assets/img/user-img.jpg"
import { sendRemarkOnTimeReport } from '../../../redux/slices/adminDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import RexettButton from '../../atomic/RexettButton';
const TimeReportRemark = ({remarkshow,handleremarkClose,currentDetails,role}) => {
    let {contractDetails:{user_details,contract_id,remarks}}=currentDetails
    const [addRemark,setRemark]=useState(null);
    const dispatch =useDispatch()
    const { smallLoader } = useSelector(state => state.adminData)

    const handleRemarkChange=(e)=>{
        setRemark(e.target.value)
    }

    const handleRemarkSend=(e)=>{
        e.preventDefault()
      let payload={
            "contract_id": contract_id,
            "client_remarks": addRemark
          }
          dispatch(sendRemarkOnTimeReport(payload))
    }

  return (
    <Offcanvas className="time-detail-sidepanel" show={remarkshow} onHide={handleremarkClose} placement='end'>
    <Offcanvas.Header closeButton>
    <Offcanvas.Title>Remarks</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
        <div className='remarks-section'>
            <div className='remark-card-wrapper'>
                {
                  remarks?.map((item)=>{
                    return (
                        <div className='remark-card'>
                        <div className='remark-user'>
                            <div className='d-flex justify-content-between align-items-center gap-2'>
                                <img src={userImage} /> Client Name
                            </div>
                            <p>25 Apr, 11:20 AM</p>
                        </div>
                        <div className='remark-content'>
                            <p>{item?.client_remarks || item?.developer_remarks }</p>
                        </div>
                    </div>
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
                    <Form.Control type='text' as="textarea" placeholder="Enter your remark"  className='common-field font-14' onChange={handleRemarkChange} />
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