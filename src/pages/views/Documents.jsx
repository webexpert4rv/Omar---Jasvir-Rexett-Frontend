import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import userImage from '../../assets/img/user-img.jpg'

const Documents = () => {
    const [showFolderView, setShowFolderView] = useState(false);

    const toggleFolderView = () => {
        setShowFolderView(!showFolderView);
    };

    return (
        <>
            <section style={{ display: showFolderView ? 'none' : 'block' }}>
                <div>
                    {/* <Form className="mb-4">
                        <Form.Control type="text" placeholder="Search" className="search-field"></Form.Control>
                    </Form> */}
                    <div>
                        <h3 className="section-head-sub">Filter By</h3>
                        <Form className="mb-4">
                            <div className="d-flex filter-section gap-3">
                                <div className="flex-none">
                                    <Form.Label className="common-label">Select Category</Form.Label>
                                    <Form.Select className="filter-select shadow-none">
                                        <option>Category</option>
                                        <option value="1">By PDF</option>
                                        <option value="2">By Images</option>
                                        <option value="3">By Docs</option>
                                    </Form.Select>
                                </div>
                                <div>
                                    <Form.Label className="common-label">Filter by Date</Form.Label>
                                    <Form.Control type="date" className="filter-field filter-field-customize shadow-none"></Form.Control>
                                </div>
                            </div>
                        </Form>
                        <h3 className="section-head-sub">Contracts</h3>
                        <div className="folder-listing">
                            <div className="folder-list" onDoubleClick={toggleFolderView}>
                                <FaFolder /> <span>Document 1</span>
                            </div>
                            {/* Add other folder-list items */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="folder-view" style={{ display: showFolderView ? 'block' : 'none' }}>
                <div className="breadcrumb">
                    <Link to={"/documents"} className="bread-link" onClick={toggleFolderView}>Documents</Link>
                    <span className="divider"> &gt; </span>
                    <span className="bread-item">Document 1</span>
                </div>
                <div className="pdf-listing">
                    <div className="pdf-list">
                        <div className="pdf-icon">
                            <MdPictureAsPdf/>
                        </div>
                        <p><span><MdPictureAsPdf/></span> PDF Document 1.pdf</p>
                        <div className="doc-action">
                            <button className="view-btn doc-action-btn"><FaEye/></button>
                            <button className="download-btn doc-action-btn"><FaDownload/></button>
                            <button className="trash-btn doc-action-btn"><FaTrashCan/></button>
                        </div>
                    </div>
                    <div className="pdf-list">
                        <div className="pdf-icon">
                            <img src={userImage} className="doc-image" />
                        </div>
                        <p><span><FaImage/></span> user-image.jpg</p>
                        <div className="doc-action">
                            <button className="view-btn doc-action-btn"><FaEye/></button>
                            <button className="download-btn doc-action-btn"><FaDownload/></button>
                            <button className="trash-btn doc-action-btn"><FaTrashCan/></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Documents;
