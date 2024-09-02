import React from "react";
import { Button, Form, Modal, Nav, Tab } from "react-bootstrap";
import devImg from '../../../assets/img/user-img.jpg';
import { FaStar } from "react-icons/fa6";
const ManualSuggestions = ({ show, handleClose,developerList }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Manual Suggestion</h3>
                    <div>
                        <Form.Control type="text" className="common-field font-14 mb-2" placeholder="Search here..." />
                    </div>
                    <div>
                        <div className="table-responsive suggestion-table">
                            <table className="table table-ui-custom">
                                <thead>
                                    <tr>
                                        <th className="font-14 align-middle">
                                            <Form.Check type="checkbox" className="primary_checkbox" />
                                        </th>
                                        <th className="font-14 align-middle">
                                            Developer Name
                                        </th>
                                        <th className="font-14 align-middle">
                                            Rating
                                        </th>
                                        <th className="font-14 align-middle">
                                            Email Address
                                        </th>
                                        <th className="font-14 align-middle">
                                            Designation
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {developerList?.map((item)=>{
                                        return (
                                            <>
                                            <tr>
                                        <td className="font-14 align-middle">
                                            <Form.Check type="checkbox" className="primary_checkbox" />
                                        </td>
                                        <td className="font-14 align-middle">

                                            <div className="d-flex align-items-center">
                                                <div className="user-imgbx application-userbx">
                                                    <img src={devImg} className="user-img"
                                                    />
                                                </div>
                                                {item?.name}
                                            </div>
                                        </td>
                                        <td className="font-14 align-middle">
                                            <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                <FaStar /> 4.4
                                            </span>
                                        </td>
                                        <td className="font-14 align-middle">
                                           {item?.email}
                                        </td>
                                        <td className="font-14 align-middle">
                                            Software Developer
                                        </td>
                                    </tr>
                                            </>
                                        )
                                    }) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn font-14">Submit</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ManualSuggestions;