import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "@yaireo/tagify/dist/tagify.css"; // Import the default tagify styles
import Tags from "@yaireo/tagify/dist/react.tagify";
import profileImg from "../../../assets/img/user-img.jpg";
import { useSelector } from "react-redux";

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
    const { shareDocument } = useSelector(state => state.developerData)
    // Define suggested tags
    const suggestedTags =  shareDocument?.name ? [shareDocument.name] : [];
    console.log(suggestedTags , "suggestedTags")
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
                                    {shareDocument?.data?.map((item, index) => {
                                        return (
                                            <>
                                                <ul className="access-list">
                                                    <li >
                                                        <div className="d-flex gap-3 align-items-center">
                                                            <span className="no-img letter-indicator">{item?.name.split("")[0]}</span>
                                                            <div>
                                                                <span className="font-15 owner-name">{item?.name}</span>
                                                                <span className="font-13 owner-email">loremipsum@amazon.com</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </>
                                        )})}
                                    <span className="owner-text">Owner</span>
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
