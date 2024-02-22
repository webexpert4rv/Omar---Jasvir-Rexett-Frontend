import React, {useState} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
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
const JobPost = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <>
            <section className="job-post-section">
                <h2 className="overview-card-heading mb-4">Job Post</h2>
                <Form>
                    <Row>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>Job Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Job Name" />
                            </Form.Group>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>Job Category</Form.Label>
                                <Form.Select>
                                    <option value="" disabled selected>Select Job Category</option>
                                    <option value="web_development">Web Development</option>
                                    <option value="graphic_designing">Graphic Designing</option>
                                    <option value="website_design">Website Design</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="12" className="mb-4">
                            <Form.Group>
                                <Form.Label>Job Description</Form.Label>
                                <Form.Control as="textarea" rows="5" placeholder="Enter Job Description" />
                            </Form.Group>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>Experience Required</Form.Label>
                                <Form.Select>
                                    <option value="" disabled selected>Select Experience Required</option>
                                    <option value="less_one">Less than 1 year</option>
                                    <option value="year_1_2">1 - 2 years</option>
                                    <option value="year_2_3">2 - 3 years</option>
                                    <option value="year_3_4">3 - 4 years</option>
                                    <option value="year_4_5">4 - 5 years</option>
                                    <option value="more_5">5+ years</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label className="d-block">Location</Form.Label>
                                <div>
                                    <Form.Check type="radio" value="remote" label="Remote" id="remote_loc" inline name="location_radio" />
                                    <Form.Check type="radio" value="on_site" label="On Site" id="remote_loc" inline name="location_radio" />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>Contract</Form.Label>
                                <Form.Select>
                                    <option value="" selected disabled>Select Contract</option>
                                    <option value="hourly">Hourly</option>
                                    <option value="project_base">Project Base</option>
                                    <option value="six_month_contract">6 month contract</option>
                                    <option value="one_year_contract">1 year contract</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="6" className="mb-4">
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
                    <div className="text-center">
                        <Button className="main-btn px-5">Submit</Button>
                    </div>
                </Form>
            </section>
        </>
    )
}
export default JobPost;