import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { EDUCATION_LEVEL } from '../../../components/common/JobPostForm/constant'

const EducationLevelSelect = ({handleEducationLevel}) => {
  return (
    <div>
    <h2 className="resume-heading">
        What best describes your level of education?
    </h2>
    <p className="fw-semibold">Select the best option and we'll help you structure your education section.</p>
    <Row className="justify-content-center">
        <Col md={10}>
            <div>
                <div className="mt-5">
                    <div className="selection-wrapper">
                    
                        {
                            EDUCATION_LEVEL.map((item)=>{
                                return (
                                    <>
                                     <span onClick={()=>handleEducationLevel(item.label)} className="education-selection">{item?.label}</span>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="text-center mt-3">
                        <Link to={'/add-education'} className="text-green text-decoration-none font-14 fw-medium">Pefer not to answer</Link>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
</div>
  )
}

export default EducationLevelSelect