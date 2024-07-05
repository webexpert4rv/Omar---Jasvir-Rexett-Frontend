import React, { useState } from "react";
import { Button, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import websiteImg from '../../assets/img/website-img.png';
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DeletePage from "../../components/common/Modals/DeletePage";
import CreateWebsitePage from "./Modals/CreatePage";
const WebsitePages = () => {
    const editPage = (
        <Tooltip>Edit</Tooltip>
    )
    const viewPage = (
        <Tooltip>View</Tooltip>
    )
    const delPage = (
        <Tooltip>Delete</Tooltip>
    )
    const [showdeletepage , showDeletePage] = useState(false);
    const handleShowDeletePage = () => {
        showDeletePage(!showdeletepage)
    }
    const handleCloseDeletePage = () => {
        showDeletePage(false)
    }
    const [showcreatepage, ShowCreateWebsite] = useState(false);
    const handleShowWebsite = () => {
        ShowCreateWebsite(!showcreatepage);
    }
    const handleCloseWebsite = () => {
        ShowCreateWebsite(false);
    }

    return (
        <>
            <div className="card-box h-100">
                <div className="border-bottom-grey pb-3 mb-4">
                    <h2 className="section-head border-0 mb-0 pb-0">Pages</h2>
                </div>
                <div className="website-wrapper">
                    <Button variant="transparent" onClick={handleShowWebsite} className="newpage-card">
                        + Create New Page
                    </Button>
                    <div className="website-card">
                        <div className="action-website">
                            <OverlayTrigger placement="bottom" overlay={editPage}>
                                <Link to={'/admin/website-builder'} className="text-decoration-none website-action">
                                    <FaPencil />
                                </Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={viewPage}>
                                <Button variant="transparent" className="website-action">
                                    <FaEye />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={delPage}>
                                <Button variant="transparent" className="website-action text-danger" onClick={handleShowDeletePage}>
                                    <FaTrash />
                                </Button>
                            </OverlayTrigger>
                        </div>
                        <img src={websiteImg} />
                        <p>Homepage</p>
                    </div>
                    <div className="website-card">
                        <div className="action-website">
                            <OverlayTrigger placement="bottom" overlay={editPage}>
                                <Link to={'/admin/website-builder'} className="text-decoration-none website-action">
                                    <FaPencil />
                                </Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={viewPage}>
                                <Button variant="transparent" className="website-action">
                                    <FaEye />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={delPage}>
                                <Button variant="transparent" className="website-action text-danger" onClick={handleShowDeletePage}>
                                    <FaTrash />
                                </Button>
                            </OverlayTrigger>
                        </div>
                        <img src={websiteImg} />
                        <p>Career page</p>
                    </div>
                    <div className="website-card">
                        <div className="action-website">
                            <OverlayTrigger placement="bottom" overlay={editPage}>
                                <Link to={'/admin/website-builder'} className="text-decoration-none website-action">
                                    <FaPencil />
                                </Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={viewPage}>
                                <Button variant="transparent" className="website-action">
                                    <FaEye />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={delPage}>
                                <Button variant="transparent" className="website-action text-danger" onClick={handleShowDeletePage}>
                                    <FaTrash />
                                </Button>
                            </OverlayTrigger>
                        </div>
                        <img src={websiteImg} />
                        <p>Single Career page</p>
                    </div>
                    <div className="website-card">
                        <div className="action-website">
                            <OverlayTrigger placement="bottom" overlay={editPage}>
                                <Link to={'/admin/website-builder'} className="text-decoration-none website-action">
                                    <FaPencil />
                                </Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={viewPage}>
                                <Button variant="transparent" className="website-action">
                                    <FaEye />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={delPage}>
                                <Button variant="transparent" className="website-action text-danger" onClick={handleShowDeletePage}>
                                    <FaTrash />
                                </Button>
                            </OverlayTrigger>
                        </div>
                        <img src={websiteImg} />
                        <p>Contact page</p>
                    </div>
                </div>
            </div>
            <CreateWebsitePage show={showcreatepage} handleClose={handleCloseWebsite} />
            <DeletePage show={showdeletepage} handleClose={handleCloseDeletePage}  />
        </>
    )
}
export default WebsitePages;