import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
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

const RexettDocuments = ({currentRole}) => {
    const [bradCrump, setBradCrum] = useState([])
    const [allFilterValue, setAllCurrentFilterValue] = useState({});
    const [editFolderName, setEditFolderName] = useState({})
    const [showFolderView, setShowFolderView] = useState(false);
    const [currentFolderDetails, setCurrentFolderDetails] = useState({})
    const [show, setShow] = useState(false)
    const [isDelete, setDelete] = useState({ isDelete: false, id: "" })
    const [timerValue, setTimerValue] = useState("");
    const [search,setSearch]=useState('')
    const dispatch = useDispatch();
    const { folderData, smallLoader, screenLoader } = useSelector(state => state.clientData)

    const [showUploadFileModal, setShowUploadFileModal] = useState(false);
    const handleShowUploadFileModal = (id, name) => {
        if (id) {
            setShowUploadFileModal(true);
            setEditFolderName({ id: id, name: name })

        } else {
            setShowUploadFileModal(true);

        }
    };

    const handleCloseUploadFileModal = () => {
        setShowUploadFileModal(false);
        setShow(false)
        setDelete({ isDelete: false, id: "" })
    };

console.log(allFilterValue,"allFilterValue")
    const toggleFolderView = (item) => {
        let data={
           name: item?.s3_path,
           parent_id:item?.parent_id
        }
        setBradCrum([...bradCrump, data])
        setCurrentFolderDetails(item)
        setShowFolderView(true);
        let filterData = {
            parent_id: item.id
        }

        dispatch(getFolderData(filterData,currentRole))

    };

    useEffect(() => {
        let filterData = {
            parent_id: "0"
        }
        dispatch(getFolderData(filterData,currentRole))
    }, [dispatch])

    console.log(bradCrump, "bradCrump")

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
            dispatch(getFolderData(filterData,currentRole))
        }))
    }

    const handleFilterData = (e, filter) => {
        if (e.target.value == "All") {
            let filterData = {
                parent_id: "0"
            }
            dispatch(getFolderData(filterData,currentRole))
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
            dispatch(getFolderData(filterData,currentRole))
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
        dispatch(getFolderData(filterData,currentRole))
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        clearTimeout(timerValue);
        const timer = setTimeout(() => {
            let filterData = {
                parent_id:currentFolderDetails?.id,
                search: e.target.value
            }
            dispatch(getFolderData(filterData,currentRole))
        }, 500);
        setTimerValue(timer);

    }

    const bradCrumpHandle=(id)=>{
        let copyBrdCrmb=[...bradCrump]
       let index= copyBrdCrmb.findIndex(item=>item.parent_id==id)
       const newData =copyBrdCrmb.slice(0,index)
        setBradCrum(newData)
        let filterData = {
            parent_id: id,
        }
       
        dispatch(getFolderData(filterData,currentRole))
        if(id=="0"){
            setBradCrum([])
            setShowFolderView(false)
        }
    }

    return (
        <>
            <section>
                <div>

                    <div>
                        <h3 className="section-head-sub">Filter</h3>
                        <Form className="mb-4">
                            <div className="d-md-flex filter-section gap-3 align-items-center">
                                <div className="flex-none mb-md-0 mb-3">
                                    <Form.Label className="common-label">Select Category</Form.Label>
                                    <Form.Select className="filter-select shadow-none" value={allFilterValue?.category} onChange={(e) => handleFilterData(e, "category")}>
                                        <option value="All">All</option>
                                        <option value="1">Contracts</option>
                                        <option value="3">Invoices</option>
                                    </Form.Select>
                                </div>
                                <div className="flex-none mb-md-0 mb-3">
                                    <Form.Label className="common-label">Select File Type</Form.Label>
                                    <Form.Select className="filter-select shadow-none" value={allFilterValue?.file_extension} onChange={(e) => handleFilterData(e, "file_extension")}>
                                        <option value="All">All</option>
                                        <option value="pdf">PDFs</option>
                                        <option value="doc">Documents</option>
                                        <option value="img">Images</option>
                                        <option value="other">Others</option>
                                    </Form.Select>
                                </div>
                                <div>
                                <Form.Label className="common-label">Search</Form.Label>
                            <Form.Control type="text" placeholder="Search" onChange={handleSearchChange} value={search} className="search-field"></Form.Control>
                                </div>
                                <div className="mt-4">
                                    <Button variant="transparent" className="main-btn px-3 py-2 " onClick={clearAllFilter}>Clear</Button>
                                </div>
                            </div>
                        </Form>
                        <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                            <div>
                                <Form.Label onClick={handleShowUploadFileModal} className="main-btn px-5 cursor-pointer upload-btn">+ Create Folder</Form.Label>
                            </div>
                            <div>
                                {/* <Form.Control type="file" className="d-none" id="upload_file" onChange={handleFileUpload} /> */}
                                <Form.Label className="main-btn px-5 cursor-pointer upload-btn" onClick={() => setShow(true)}>+ Upload File</Form.Label>
                            </div>
                        </div>
                        <h3 className="section-head-sub">Contracts</h3>

                        {showFolderView && search=='' ? <section className="folder-view">
                            <div className="breadcrumb">
                                {bradCrump?.map((item) => {
                                    return (<>
                                        <Link  className="bread-link" onClick={()=>bradCrumpHandle(item.parent_id)}>{item.name}</Link>
                                        <span className="divider"> &gt; </span>
                                    </>)
                                })
                                }

                            </div>

                        </section> : ""}
                        {screenLoader ? <ScreenLoader /> : <div className="folder-listing">
                            {folderData?.length > 0 ? folderData?.map((item) => {
                                return (
                                    <>
                                        {
                                            item.file_type === 0 ? <>
                                                <div className="folder-list" onDoubleClick={() => toggleFolderView(item)}>
                                                    <div className="position-relative">
                                                        <FaFolder className="folder-icon" /><span>{item?.s3_path}</span>
                                                        <div className="doc-action">
                                                            <button className="trash-btn doc-action-btn" onClick={() => deleteFileAndFolder(item.id, "folder")}><FaTrashCan /></button>
                                                            <button className="view-btn doc-action-btn" onClick={() => handleShowUploadFileModal(item.id, item?.s3_path)}><MdEdit /></button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </> : <>
                                                <div className="pdf-list">
                                                    <div className="pdf-icon">
                                                        {generateFileImage(item?.s3_path)}

                                                    </div>
                                                    <p><span>{generateFileImage(item?.s3_path)}
                                                    </span>{getFileName(item?.s3_path)}</p>

                                                    <div className="doc-action">
                                                        {/* <button className="view-btn doc-action-btn"><MdEdit /></button> */}
                                                        <button className="download-btn doc-action-btn" onClick={() => handleDownload(item?.s3_path)}><FaDownload /></button>
                                                        <button className="trash-btn doc-action-btn" onClick={() => deleteFileAndFolder(item.id, "file")}><FaTrashCan /></button>
                                                    </div>
                                                </div>
                                            </>
                                        }

                                    </>
                                )
                            })
                                : <NoDataFound />}
                        </div>}
                    </div>
                </div>
            </section>
            <CreateFolder show={showUploadFileModal} handleClose={handleCloseUploadFileModal} currentFolderDetails={currentFolderDetails} data={editFolderName} folderData={folderData} currentRole={currentRole} />
            <RexettUploadFile show={show} handleClose={handleCloseUploadFileModal} currentFolderDetails={currentFolderDetails} currentRole={currentRole}/>
            <ConfirmationModal
                text={isDelete?.name == "folder" ? `Deleting this folder will also delete all the files and subfolders contained within it` : `Are you sure to delete this ${isDelete?.name}?`}
                show={isDelete?.isDelete} handleClose={handleCloseUploadFileModal} onClick={handleDelete}
                smallLoader={smallLoader}
            />
        </>
    );
};

export default RexettDocuments;
