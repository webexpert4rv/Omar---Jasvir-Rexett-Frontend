import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { MdPictureAsPdf } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import userImage from '../../../assets/img/user-img.jpg'
import { useDispatch, useSelector } from "react-redux";
import { _deleteFileAndFolder, createNewFolderAndFile, filePreassignedUrlGenerate, getFolderData } from "../../../redux/slices/clientDataSlice";
import CreateFolder from "../../atomic/CreateFolder";
import RexettUploadFile from "../../atomic/RexettUploadFile";
import ConfirmationModal from "../../../pages/views/Modals/ConfirmationModal";
import ScreenLoader from "../../atomic/ScreenLoader";

const RexettDocuments = () => {
    const [showFolderView, setShowFolderView] = useState(false);
    const [currentFolderDetails, setCurrentFolderDetails] = useState({})
    const [show, setShow] = useState(false)
    const [isDelete, setDelete] = useState({ isDelete: false, id: "" })
    const dispatch = useDispatch();
    const { folderData, smallLoader,screenLoader } = useSelector(state => state.clientData)

    // const toggleFolderView = () => {
    //     setShowFolderView(!showFolderView);
    // };

    const [showUploadFileModal, setShowUploadFileModal] = useState(false);
    const handleShowUploadFileModal = () => {
        setShowUploadFileModal(true);
    };

    const handleCloseUploadFileModal = () => {
        setShowUploadFileModal(false);
        setShow(false)
        setDelete({ isDelete: false, id: "" })
    };



    const toggleFolderView = (item) => {
        setCurrentFolderDetails(item)
        setShowFolderView(!showFolderView);
        let filterData={
            parent_id:item.id
        }
        
        dispatch(getFolderData(filterData))

    };

    useEffect(() => {
        let filterData={
            parent_id:"0"
        }
        dispatch(getFolderData(filterData))
    }, [dispatch])

    const handleDownload = (url) => {
        var element = document.createElement("a");
    var file = new Blob(
      [
        url
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download =  url;
    element.click();
      };

    const getFileName = (url) => {
        let fileName = url?.split("/")
        let splitWithDot = fileName[fileName.length - 1].split('.')
        return `${splitWithDot[splitWithDot.length - 2]}.${splitWithDot[splitWithDot.length - 1]}`
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

    const deleteFileAndFolder = (id) => {
        setDelete({ isDelete: true, id: id })

    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(_deleteFileAndFolder(isDelete?.id, () => {
            setDelete({ isDelete: false, id: "" })
            dispatch(getFolderData("0"))
        }))
    }

    const handleFilterData=(e,filter)=>{
        let filterData={
            [filter]:e.target.value,
            parent_id:"0"
        }
        dispatch(getFolderData(filterData))
    }

    return (
        <>

            <section>
                <div>

                    <div>
                        <h3 className="section-head-sub">Filter By</h3>
                        <Form className="mb-4">
                            <div className="d-flex filter-section gap-3">
                                <div className="flex-none">
                                    <Form.Label className="common-label">Select Category</Form.Label>
                                    <Form.Select className="filter-select shadow-none"  onChange={(e)=>handleFilterData(e,"category")}>
                                        <option value="0">All</option>
                                        <option value="1">Contracts</option>
                                        <option value="2">Invoices</option>
                                    </Form.Select>
                                </div>
                                <div className="flex-none">
                                    <Form.Label className="common-label">Select File Type</Form.Label>
                                    <Form.Select className="filter-select shadow-none" onChange={(e)=>handleFilterData(e,"file_type")}>
                                        <option value="0">All</option>
                                        <option value="pdfs">PDFs</option>
                                        <option value="docs">Documents</option>
                                        <option value="images">Images</option>
                                        <option value="others">Others</option>
                                    </Form.Select>
                                </div>
                                <div>
                                    <Form.Label className="common-label">Filter by Date</Form.Label>
                                    <Form.Control type="date" className="filter-field shadow-none"  onChange={(e)=>handleFilterData(e,"date")}></Form.Control>
                                </div>
                            </div>
                        </Form>
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div>
                                <Form.Label onClick={handleShowUploadFileModal} className="main-btn px-5 cursor-pointer">+ Create Folder</Form.Label>
                            </div>
                            <div>
                                {/* <Form.Control type="file" className="d-none" id="upload_file" onChange={handleFileUpload} /> */}
                                <Form.Label className="main-btn px-5 cursor-pointer" onClick={() => setShow(true)}>+ Upload File</Form.Label>
                            </div>
                        </div>
                        <h3 className="section-head-sub">Contracts</h3>

                        {showFolderView ? <section className="folder-view">
                            <div className="breadcrumb">
                                <Link to={"/documents"} className="bread-link" onClick={toggleFolderView}>Documents</Link>
                                <span className="divider"> &gt; </span>
                                <span className="bread-item">Document 1</span>
                            </div>

                        </section> : ""}
                     { screenLoader?<ScreenLoader/>:  <div className="folder-listing">
                            {folderData?.map((item) => {
                                return (
                                    <>
                                        {
                                            item.file_type === 0 ? <>
                                                <div className="folder-list" onDoubleClick={() => toggleFolderView(item)}>
                                                    <div className="position-relative">
                                                        <FaFolder className="folder-icon" /><span>{item?.s3_path}</span>
                                                        <button className="trash-btn doc-action-btn" onClick={() => deleteFileAndFolder(item.id)}><FaTrashCan /></button>

                                                    </div>
                                                </div>
                                            </> : <>
                                                <div className="pdf-list">
                                                    <div className="pdf-icon">
                                                        {generateFileImage(item?.s3_path)}

                                                    </div>
                                                    <p><span>{generateFileImage(item?.s3_path)}</span>{getFileName(item?.s3_path)}</p>
                                                    <div className="doc-action">
                                                        <button className="view-btn doc-action-btn"><FaEye /></button>
                                                        <button className="download-btn doc-action-btn" onClick={()=>handleDownload(item?.s3_path)}><FaDownload /></button>
                                                        <button className="trash-btn doc-action-btn" onClick={() => deleteFileAndFolder(item.id)}><FaTrashCan /></button>
                                                    </div>
                                                </div>
                                            </>
                                        }

                                    </>
                                )
                            })
                            }
                        </div>}
                    </div>
                </div>
            </section>
            <CreateFolder show={showUploadFileModal} handleClose={handleCloseUploadFileModal} currentFolderDetails={currentFolderDetails} />
            <RexettUploadFile show={show} handleClose={handleCloseUploadFileModal} currentFolderDetails={currentFolderDetails} />
            <ConfirmationModal
                text={"Are you sure to delete this File?"}
                show={isDelete?.isDelete} handleClose={handleCloseUploadFileModal} onClick={handleDelete}
                smallLoader={smallLoader}
            />
        </>
    );
};

export default RexettDocuments;
