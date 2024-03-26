import React, { useEffect, useState } from "react";
import { Collapse, Button, Col, Form, Row, Tabs, Tab, Nav } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { MdEdit } from "react-icons/md"
import { MdPictureAsPdf } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import userImage from '../../../assets/img/user-img.jpg'
import { useDispatch, useSelector } from "react-redux";
import { _deleteFileAndFolder, createNewFolderAndFile, filePreassignedUrlGenerate, getFolderData } from "../../../redux/slices/clientDataSlice";
import CreateFolder from "../../atomic/CreateFolder";
import RexettUploadFile from "../../atomic/RexettUploadFile";
import ConfirmationModal from "../../../pages/views/Modals/ConfirmationModal";
import ScreenLoader from "../../atomic/ScreenLoader";
import NoDataFound from "../../atomic/NoDataFound";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import { HiMiniUser } from "react-icons/hi2";
import DocumentListView from "./DocumentListView";
import { IoIosShareAlt } from "react-icons/io";
import ShareModal from "./ShareModal";
import { FaFilter } from "react-icons/fa";

const RexettDocuments = ({ currentRole }) => {
    const [bradCrump, setBradCrum] = useState([])
    const [allFilterValue, setAllCurrentFilterValue] = useState({});
    const [editFolderName, setEditFolderName] = useState({})
    const [showFolderView, setShowFolderView] = useState(false);
    const [currentFolderDetails, setCurrentFolderDetails] = useState({})
    const [sharefileModal, setShareFileModal] = useState(false);
    const [show, setShow] = useState(false)
    const [isDelete, setDelete] = useState({ isDelete: false, id: "" })
    const [timerValue, setTimerValue] = useState("");
    const [search, setSearch] = useState('')
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { folderData, smallLoader, screenLoader } = useSelector(state => state.clientData)

    const [showUploadFileModal, setShowUploadFileModal] = useState(false);
    const handleShowUploadFileModal = (id, name) => {
        setOpen(!open)
        if (id) {
            setShowUploadFileModal(true);
            setEditFolderName({ id: id, name: name })

        } else {
            setShowUploadFileModal(true);

        }
    };

    const handleShowShareFileModal = () => {
        setShareFileModal(true);
    }
    const handleCloseShareFileModal = () => {
        setShareFileModal(false)
    }

    const handleCloseUploadFileModal = () => {
        setShowUploadFileModal(false);
        setShow(false)
        setDelete({ isDelete: false, id: "" })
    };

    const toggleFolderView = (item) => {
        let data = {
            name: item?.s3_path,
            parent_id: item?.parent_id
        }
        setBradCrum([...bradCrump, data])
        setCurrentFolderDetails(item)
        setShowFolderView(true);
        let filterData = {
            parent_id: item.id
        }

        dispatch(getFolderData(filterData, currentRole))

    };

    useEffect(() => {
        let filterData = {
            parent_id: "0"
        }
        dispatch(getFolderData(filterData, currentRole))
    }, [dispatch])


    const handleDownload = (url) => {
        const newTab = window.open(url, '_blank');
        if (newTab) {
            newTab.focus();
        } else {
            // If the popup blocker prevents opening the new tab
            alert('Please allow pop-ups for this site to download the file in a new tab.');
        }
    };

    const getFileName = (url) => {
        let fileName = url?.split("/")
        if (fileName) {
            let splitWithDot = fileName[fileName.length - 1].split('.')
            return `${splitWithDot[splitWithDot.length - 2]}.${splitWithDot[splitWithDot.length - 1]}`
        }
    }

     const generateFileImage = (url) => {
        let fileName = url?.split("/")
        let splitWithDot = fileName[fileName.length - 1]
        let fileExtWithDot = splitWithDot.split(".")

        let fileExt = fileExtWithDot[fileExtWithDot.length - 1]
        switch (fileExt) {
            case "ts":
            case "js":
            case "txt":
                return <FaFileAlt />
            case "pdf":
                return <MdPictureAsPdf />
            case "png":
            case "jpg":
                return <img src={url} className="doc-image" />

            default:
        }
    }

    const deleteFileAndFolder = (id, name) => {
        setDelete({ isDelete: true, id: id, name: name })
    }
    

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(_deleteFileAndFolder(isDelete?.id, () => {
            let filterData = {
                parent_id: currentFolderDetails?.id
            }
            setDelete({ isDelete: false, id: "" })
            dispatch(getFolderData(filterData, currentRole))
        }))
    }

    const handleFilterData = (e, filter) => {
        if (e.target.value == "All") {
            let filterData = {
                parent_id: "0"
            }
            dispatch(getFolderData(filterData, currentRole))
            setAllCurrentFilterValue({
                [filter]: e.target.value,
            })
        } else {
            let filterData = {
                ...allFilterValue,
                [filter]: e.target.value,
                parent_id: "0"
            }
            setAllCurrentFilterValue({
                [filter]: e.target.value,
            })
            dispatch(getFolderData(filterData, currentRole))
        }

    }
    const clearAllFilter = () => {
        setAllCurrentFilterValue({
            date: "dd-mm-yyyy",
            category: "All",
            file_extension: "All",
        })
        setShowFolderView(false)
        setSearch('')
        let filterData = {
            parent_id: "0"
        }
        dispatch(getFolderData(filterData, currentRole))
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        clearTimeout(timerValue);
        const timer = setTimeout(() => {
            let filterData = {
                parent_id: currentFolderDetails?.id,
                search: e.target.value
            }
            dispatch(getFolderData(filterData, currentRole))
        }, 500);
        setTimerValue(timer);

    }

    const bradCrumpHandle = (id) => {
        let copyBrdCrmb = [...bradCrump]
        let index = copyBrdCrmb.findIndex(item => item.parent_id == id)
        const newData = copyBrdCrmb.slice(0, index)
        setBradCrum(newData)
        let filterData = {
            parent_id: id,
        }

        dispatch(getFolderData(filterData, currentRole))
        if (id == "0") {
            setBradCrum([])
            setShowFolderView(false)
        }
    }

    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const handleShowFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    }
    return (
        <>
            <section>
                <div>

                    <Row>
                        <Col md={12}>
                            <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                                {/* <Button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>+ New</Button> */}
                                {/* <div>
                                    <Form.Label className="main-btn px-4 cursor-pointer upload-btn mb-0" onClick={() => setShow(true)}>+ Upload File</Form.Label>
                                </div> */}
                                <div>
                                    <Button variant="transparent" onClick={handleShowFilterMenu} className="main-btn outline-main-btn px-4"><FaFilter /> Filter</Button>
                                </div>
                            </div>
                        </Col>

                        {showFolderView && search == '' ? <Col md={12}><section className="folder-view">
                            <div className="breadcrumb">
                                {bradCrump?.map((item, index) => {
                                    return (<>
                                        <Link className="bread-link" onClick={() => bradCrumpHandle(item.parent_id)}>{item.name}</Link>
                                        <span className="divider"> &gt; </span>
                                    </>)
                                })
                                }

                            </div>

                        </section> </Col> : ""}
                        <Col md={12}>
                            <div className="d-flex gap-3">
                                <div className={showFilterMenu ? "side-filter active" : "side-filter"}>
                                    <h3 className="section-head-sub">Filter</h3>
                                    <Form className="mb-4">
                                        <div className="filter-section gap-3 align-items-center">
                                            <div className="mb-2">
                                                <Form.Label className="common-label">Search</Form.Label>
                                                <Form.Control type="text" placeholder="Search" onChange={handleSearchChange} value={search} className="search-field"></Form.Control>
                                            </div>
                                            <div className="flex-none mb-2">
                                                <Form.Label className="common-label">Select Category</Form.Label>
                                                <Form.Select className="filter-select width-full shadow-none" value={allFilterValue?.category} onChange={(e) => handleFilterData(e, "category")}>
                                                    <option value="All">All</option>
                                                    <option value="1">Contracts</option>
                                                    <option value="3">Invoices</option>
                                                </Form.Select>
                                            </div>
                                            <div className="flex-none mb-2">
                                                <Form.Label className="common-label">Select File Type</Form.Label>
                                                <Form.Select className="filter-select width-full shadow-none" value={allFilterValue?.file_extension} onChange={(e) => handleFilterData(e, "file_extension")}>
                                                    <option value="All">All</option>
                                                    <option value="pdf">PDFs</option>
                                                    <option value="doc">Documents</option>
                                                    <option value="img">Images</option>
                                                    <option value="other">Others</option>
                                                </Form.Select>
                                            </div>
                                            <div className="flex-none mb-2">
                                                <Form.Label className="common-label">Shared By</Form.Label>
                                                <Form.Select className="filter-select width-full shadow-none">
                                                    <option value="">Select</option>
                                                    <option value="amazon">Amazon</option>
                                                    <option value="volvo">Volvo</option>
                                                    <option value="google">Google</option>
                                                    <option value="bmw">BMW</option>
                                                </Form.Select>
                                            </div>
                                            <div className="mt-4">
                                                <Button variant="transparent" className="main-btn px-3 py-2 " onClick={clearAllFilter}>Clear</Button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <div className="w-100">
                                    <Tab.Container className="w-100" defaultActiveKey="grid-view">
                                        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom-grey">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="d-flex align-items-center gap-3">
                                                    <h3 className="section-head-sub mb-0">Documents</h3>
                                                    <div className="position-relative">
                                                        <Button
                                                            onClick={() => setOpen(!open)}
                                                            className="main-btn px-2 add-new-btn cursor-pointer upload-btn mb-0"
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}
                                                        >
                                                            +
                                                        </Button>
                                                        <Collapse in={open} className="new-doc-collapse">
                                                            <div>
                                                                <Form.Label onClick={handleShowUploadFileModal} className="main-btn outline-main-btn px-4 cursor-pointer upload-btn mb-2 w-100">+ Create Folder</Form.Label>
                                                                <Form.Label onClick={() => setShow(true)} className="main-btn outline-main-btn px-4 cursor-pointer upload-btn mb-0 w-100">+ Upload File</Form.Label>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>
                                            </div>
                                            <Nav variant="pills" className="document-view-pill">
                                                <Nav.Item className="document-view-item">
                                                    <Nav.Link className="document-view-link" eventKey="grid-view"><IoGrid /></Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item className="document-view-item">
                                                    <Nav.Link className="document-view-link" eventKey="list-view"><FaListUl /></Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="grid-view">
                                                {screenLoader ? <ScreenLoader /> : <div className="folder-listing">
                                                    {folderData?.length > 0 ? folderData?.map((item) => {
                                                        return (
                                                            <>
                                                                {
                                                                    item.file_type === 0 ? <>
                                                                        <div className="folder-list" onDoubleClick={() => toggleFolderView(item)}>
                                                                            <div className="position-relative">
                                                                                <FaFolder className="folder-icon" />
                                                                                <div className="name-folder">
                                                                                    <span>{item?.s3_path}</span>
                                                                                    <div className="shared-doc">
                                                                                        <p className="shared-text">Shared by Amazon</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="doc-action">
                                                                                    <button className="trash-btn doc-action-btn" onClick={() => deleteFileAndFolder(item.id, "folder")}><FaTrashCan /></button>
                                                                                    <button className="view-btn doc-action-btn" onClick={() => handleShowUploadFileModal(item.id, item?.s3_path)}><MdEdit /></button>
                                                                                    <button onClick={handleShowShareFileModal} className="view-btn doc-action-btn"><IoIosShareAlt /></button>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </> : <>
                                                                        <div className="pdf-list">
                                                                            <div className="pdf-icon">
                                                                                {generateFileImage(item?.s3_path)}

                                                                            </div>
                                                                            <p>
                                                                                <span className="file-icon">{generateFileImage(item?.s3_path)}
                                                                                </span>
                                                                                <span className="filename-single">{getFileName(item?.s3_path)}</span>

                                                                            </p>
                                                                            <div className="doc-action">
                                                                                {/* <button className="view-btn doc-action-btn"><MdEdit /></button> */}
                                                                                <button className="download-btn doc-action-btn" onClick={() => handleDownload(item?.s3_path)}><FaDownload /></button>
                                                                                <button className="trash-btn doc-action-btn" onClick={() => deleteFileAndFolder(item.id, "file")}><FaTrashCan /></button>
                                                                                <button onClick={handleShowShareFileModal} className="view-btn doc-action-btn"><IoIosShareAlt /></button>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }

                                                            </>
                                                        )
                                                    })
                                                        : <NoDataFound />}
                                                </div>}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="list-view">
                                            <DocumentListView folderData={folderData} deleteFileAndFolder={deleteFileAndFolder} handleDownload={handleDownload} getFileName={getFileName} generateFileImage={generateFileImage} toggleFolderView={toggleFolderView}/>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <CreateFolder show={showUploadFileModal} handleClose={handleCloseUploadFileModal} currentFolderDetails={currentFolderDetails} data={editFolderName} folderData={folderData} currentRole={currentRole} />
            <RexettUploadFile show={show} handleClose={handleCloseUploadFileModal} currentFolderDetails={currentFolderDetails} currentRole={currentRole} />
            <ShareModal show={sharefileModal} handleClose={handleCloseShareFileModal} />
            <ConfirmationModal
                text={isDelete?.name == "folder" ? `Deleting this folder will also delete all the files and subfolders contained within it` : `Are you sure to delete this ${isDelete?.name}?`}
                show={isDelete?.isDelete} handleClose={handleCloseUploadFileModal} onClick={handleDelete}
                smallLoader={smallLoader}
            />
        </>
    );
};

export default RexettDocuments;
