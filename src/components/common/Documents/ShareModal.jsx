import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css"; // Import the default tagify styles
import profileImg from "../../../assets/img/user-img.jpg";

const baseTagifySettings = {
    blacklist: ["xxx", "yyy", "zzz"],
    maxTags: 6,
    placeholder: "Add People",
    dropdown: {
        enabled: 1, // enable suggestions dropdown
        maxItems: 5 // limit number of suggestions displayed
    }
};

const ShareModal = ({ show, handleClose }) => {
    const tagifyRef1 = useRef();

    const [tagifySettings, setTagifySettings] = useState(baseTagifySettings);
    const [tagifyProps, setTagifyProps] = useState({});

    // Define suggested tags
    const suggestedTags = ["react", "javascript", "web development", "react-bootstrap", "tagify"];

    useEffect(() => {
        setTagifyProps({ loading: true });

        setTimeout(() => {
            setTagifyProps((lastProps) => ({
                ...lastProps,
                showFilteredDropdown: false
            }));
        }, 5000);
    }, []);

    const handleChange = (e) => {
        console.log("Tags changed:", e.detail.value);
    };

    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Share "Test Folder"</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Tags
                                        ref={tagifyRef1}
                                        settings={tagifySettings}
                                        autoFocus={true}
                                        {...tagifyProps}
                                        className="w-100"
                                        onChange={handleChange}
                                        whitelist={suggestedTags} // Add suggested tags
                                    />
                                </Form.Group>
                                <div>
                                    <h4 className="access-heading mb-3">People with access</h4>
                                    <ul className="access-list">
                                        <li>
                                            <div className="d-flex gap-3 align-items-center">
                                                <span className="no-img letter-indicator">L</span>
                                                <div>
                                                    <span className="font-15 owner-name">Lorem Ipsum (you)</span>
                                                    <span className="font-13 owner-email">loremipsum@amazon.com</span>
                                                </div>
                                            </div>
                                            <span className="owner-text">Owner</span>
                                        </li>
                                        <li>
                                            <div className="d-flex gap-3 align-items-center">
                                                <span className="img-profile">
                                                    <img src={profileImg} />
                                                </span>
                                                <div>
                                                    <span className="font-15 owner-name">Lorem Ipsum (you)</span>
                                                    <span className="font-13 owner-email">loremipsum@amazon.com</span>
                                                </div>
                                            </div>
                                            <span className="owner-text">Owner</span>
                                        </li>
                                        <li>
                                            <div className="d-flex gap-3 align-items-center">
                                                <span className="img-profile">
                                                    <span className="no-img letter-indicator">R</span>
                                                </span>
                                                <div>
                                                    <span className="font-15 owner-name">Rohit Sharma</span>
                                                    <span className="font-13 owner-email">rohitsharma@rexett.com</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ShareModal;
