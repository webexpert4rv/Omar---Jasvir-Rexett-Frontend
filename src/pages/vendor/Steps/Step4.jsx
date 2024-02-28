import React, {useState} from "react";
import { Col, Form, Row } from "react-bootstrap";
import Select from 'react-select';
const options = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'js', label: 'JavaScript' },
    { value: 'jquery', label: 'jQuery' },
    { value: 'reactjs', label: 'ReactJS' },
    { value: 'vuejs', label: 'VueJS' },
    { value: 'angularjs', label: 'AngularJS' },
    { value: 'bootstrap', label: 'Bootstrap' },
  ];

const StepFour = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return(
        <>
            <section className="step-container">
                <h2 className="overview-card-heading">Enter Skills</h2>
                <Form>
                    <div className="inner-form">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Form.Label>Skills</Form.Label>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                        isMulti
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </section>
        </>
    )
}
export default StepFour;