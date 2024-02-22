import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { MdPictureAsPdf } from "react-icons/md";
import userImage from '../../assets/img/user-img.jpg'

const DeveloperDocuments = () => {
    const [showFolderView, setShowFolderView] = useState(false);

    const toggleFolderView = () => {
        setShowFolderView(!showFolderView);
    };

    return (
        <>
            <section style={{ display: showFolderView ? 'none' : 'block' }}>
                <div>
                    <Form className="mb-4">
                        <Form.Control type="text" placeholder="Search" className="search-field"></Form.Control>
                    </Form>
                    <div>
                        <h3 className="section-head-sub">Filter By</h3>
                        <Form className="mb-4">
                            <div className="d-flex filter-section gap-3">
                                <div className="flex-none">
                                    <Form.Label className="common-label">Select Category</Form.Label>
                                    <Form.Select className="filter-select shadow-none">
                                        <option value="0">All</option>
                                        <option value="1">Contracts</option>
                                        <option value="2">Invoices</option>
                                    </Form.Select>
                                </div>
                                <div className="flex-none">
                                    <Form.Label className="common-label">Select File Type</Form.Label>
                                    <Form.Select className="filter-select shadow-none">
                                        <option value="0">All</option>
                                        <option value="pdfs">PDFs</option>
                                        <option value="docs">Documents</option>
                                        <option value="images">Images</option>
                                        <option value="others">Others</option>
                                    </Form.Select>
                                </div>
                                <div>
                                    <Form.Label className="common-label">Filter by Date</Form.Label>
                                    <Form.Control type="date" className="filter-field shadow-none"></Form.Control>
                                </div>
                            </div>
                        </Form>
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div>
                                <Form.Control type="file" className="d-none" id="upload_file" />
                                <Form.Label htmlFor="upload_file" className="main-btn px-5 cursor-pointer">+ Upload File</Form.Label>
                            </div>
                            <div>
                                <Form.Control type="file" className="d-none" id="upload_file" />
                                <Form.Label htmlFor="upload_file" className="main-btn px-5 cursor-pointer">+ Upload Folder</Form.Label>
                            </div>
                        </div>
                        <h3 className="section-head-sub">Documents</h3>
                        <div className="folder-listing">
                            <div className="folder-list" onDoubleClick={toggleFolderView}>
                                <FaFolder /> Document 1
                            </div>
                            <div className="pdf-list">
                                <div className="pdf-icon">
                                    <MdPictureAsPdf />
                                </div>
                                <p><span><MdPictureAsPdf /></span> PDF Document 1.pdf</p>
                                <div className="doc-action">
                                    <button className="view-btn doc-action-btn"><FaEye /></button>
                                    <button className="download-btn doc-action-btn"><FaDownload /></button>
                                    <button className="trash-btn doc-action-btn"><FaTrashCan /></button>
                                </div>
                            </div>
                            <div className="pdf-list">
                                <div className="pdf-icon">
                                    <img src={userImage} className="doc-image" />
                                </div>
                                <p><span><FaImage /></span> user-image.jpg</p>
                                <div className="doc-action">
                                    <button className="view-btn doc-action-btn"><FaEye /></button>
                                    <button className="download-btn doc-action-btn"><FaDownload /></button>
                                    <button className="trash-btn doc-action-btn"><FaTrashCan /></button>
                                </div>
                            </div>
                            {/* Add other folder-list items */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="folder-view" style={{ display: showFolderView ? 'block' : 'none' }}>
                <div className="breadcrumb">
                    <Link to={"/developer-documents"} className="bread-link" onClick={toggleFolderView}>Documents</Link>
                    <span className="divider"> &gt; </span>
                    <span className="bread-item">Document 1</span>
                </div>
                <div className="pdf-listing">
                    <div className="pdf-list">
                        <div className="pdf-icon">
                            <MdPictureAsPdf />
                        </div>
                        <p><span><MdPictureAsPdf /></span> PDF Document 1.pdf</p>
                        <div className="doc-action">
                            <button className="view-btn doc-action-btn"><FaEye /></button>
                            <button className="download-btn doc-action-btn"><FaDownload /></button>
                            <button className="trash-btn doc-action-btn"><FaTrashCan /></button>
                        </div>
                    </div>
                    <div className="pdf-list">
                        <div className="pdf-icon">
                            <img src={userImage} className="doc-image" />
                        </div>
                        <p><span><FaImage /></span> user-image.jpg</p>
                        <div className="doc-action">
                            <button className="view-btn doc-action-btn"><FaEye /></button>
                            <button className="download-btn doc-action-btn"><FaDownload /></button>
                            <button className="trash-btn doc-action-btn"><FaTrashCan /></button>
                        </div>
                    </div>
                    {/* Add other pdf-list items */}
                </div>
            </section>
        </>
    );
};

export default DeveloperDocuments;
