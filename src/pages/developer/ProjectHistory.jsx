import React from "react";
import { Nav, Tab } from "react-bootstrap";
const ProjectHistory = () => {
    return (
        <>
            <div className="card-box">
                <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
                    <h2 className="section-head-sub mb-0 border-0">
                        Project History
                    </h2>
                </div>
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="active_project"
                >
                    <div className="d-flex">
                        <Nav variant="pills" className="application-pills">
                            <Nav.Item className="application-item">
                                <Nav.Link eventKey="active_project" className="application-link">
                                    Active Project
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="application-item">
                                <Nav.Link eventKey="completed_project" className="application-link">
                                    Completed Projects
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <Tab.Content>
                        <Tab.Pane eventKey="active_project" className="pb-4">
                            <div>
                                <div className="table-responsive">
                                    <table className="table table-ui-custom">
                                        <thead>
                                            <tr>
                                                <th>Project Name</th>
                                                <th>Client Name</th>
                                                <th>Start Date</th>
                                                <th>Total Hours Spend</th>
                                                <th>Total Invoice Raised</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="application-row">
                                                <td className="font-14 align-middle">Frontend developer</td>
                                                <td className="font-14 align-middle">Amazon</td>
                                                <td className="font-14 align-middle">02 May 2024</td>
                                                <td className="font-14 align-middle">130hrs</td>
                                                <td className="font-14 align-middle">2</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="completed_project">
                            <div>
                                <div className="table-responsive">
                                    <table className="table table-ui-custom">
                                        <thead>
                                            <tr>
                                                <th>Project Name</th>
                                                <th>Client Name</th>
                                                <th>Start Date</th>
                                                <th>Completion Date</th>
                                                <th>Total Hours Spend</th>
                                                <th>Total Invoice Raised</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="application-row">
                                                <td className="font-14 align-middle">AI Chat Bot</td>
                                                <td className="font-14 align-middle">Google</td>
                                                <td className="font-14 align-middle">12 Dec 2023</td>
                                                <td className="font-14 align-middle">13 Apr 2024</td>
                                                <td className="font-14 align-middle">3000hrs</td>
                                                <td className="font-14 align-middle">12</td>
                                            </tr>
                                            <tr className="application-row">
                                                <td className="font-14 align-middle">Figma to UI</td>
                                                <td className="font-14 align-middle">RV Technologies</td>
                                                <td className="font-14 align-middle">10 Nov 2023</td>
                                                <td className="font-14 align-middle">08 Oct 2023</td>
                                                <td className="font-14 align-middle">528hrs</td>
                                                <td className="font-14 align-middle">4</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </>
    )
}
export default ProjectHistory;