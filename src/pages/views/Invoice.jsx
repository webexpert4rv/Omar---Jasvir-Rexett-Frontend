import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";

const Invoice = () => {
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
                            <div className="d-flex gap-3">
                                <div>
                                    <Form.Label className="common-label">Filter by Date</Form.Label>
                                    <Form.Control type="date" className="filter-field shadow-none"></Form.Control>
                                </div>
                            </div>
                        </Form>
                        <h3 className="section-head-sub">Invoices</h3>
                        <div className="folder-listing">
                            <div className="folder-list" onDoubleClick={toggleFolderView}>
                                <FaFolder /> Invoice 1
                            </div>
                            {/* Add other folder-list items */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="folder-view" style={{ display: showFolderView ? 'block' : 'none' }}>
                <div className="breadcrumb">
                    <Link to={"/documents"} className="bread-link" onClick={toggleFolderView}>Invoices</Link>
                    <span className="divider"> &gt; </span>
                    <span className="bread-item">Invoice 1</span>
                </div>
                <div className="pdf-listing">
                    <div className="pdf-list">
                        <p>PDF Document 1.pdf</p>
                        <div className="pdf-icon">
                            <MdPictureAsPdf/>
                        </div>
                    </div>
                    {/* Add other pdf-list items */}
                </div>
            </section>
        </>
    );
};

export default Invoice;
