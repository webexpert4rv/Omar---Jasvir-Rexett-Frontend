import React from 'react'
import { FaFilePdf } from "react-icons/fa";
import { HiMiniUser } from "react-icons/hi2";
import { FaTrashCan } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa";
import NoDataFound from '../../atomic/NoDataFound';
import { IoIosShareAlt } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

const DocumentListView = ({folderData,deleteFileAndFolder,handleDownload,getFileName,generateFileImage,toggleFolderView,handleShowShareFileModal}) => {
  const { t } = useTranslation()
    return (
    <div>
    <div className="table-responsive">
        <table className="table document-table table-ui-custom">
            <thead>
                <th className="document-th filename-th px-3">{t("name")}</th>
                <th className="document-th owner-th">{t("owner")}</th>
                <th className="document-th location-th">{t("location")}</th>
                <th className="document-th action-th">{t("action")}</th>
            </thead>
            <tbody>
               {folderData.length>0?folderData?.map((item,index)=>{
                return (
                  <>
                  <tr>
                    <td className="document-data filename-data px-3">
                        <div className="d-flex gap-2 align-items-center filename-data">

                            {
                                item.file_type!==0?<>
                                <div className="file-icon">
                                {generateFileImage(item?.s3_path)}
                            </div>
                            <span>{getFileName(item?.s3_path)}</span>
                                </>
                                :
                                <>
                                      <div className="folder-icon" onDoubleClick={()=>toggleFolderView(item)}>
                                <FaFolder />
                            </div>
                            <span>{item.s3_path}</span>
                                </>
                            }
                            </div>
                        
                    </td>
                    <td className="document-data">
                        <div className="d-flex align-items-center owner-icon gap-1">
                            <span className="me-icon"><HiMiniUser /></span><p className="mb-0">{item?.user ? item?.user?.name:"Me"}</p>
                        </div>        
                    </td>
                    <td className="document-data">{item?.user ? "Shared":"My Documents"}</td>
                    <td className="document-data">
                        <div className="d-flex gap-3">
                            <button className="download-btn doc-action-btn" onClick={() => handleDownload(item?.s3_path)}><FaDownload />
                            </button>
                            <button className="trash-btn doc-action-btn" onClick={() => deleteFileAndFolder(item.id, item.file_type==0?"folder": "file")} ><FaTrashCan /></button>
                            <button onClick={()=>handleShowShareFileModal(item?.id)} className="view-btn doc-action-btn"><IoIosShareAlt /></button>
                        </div>
                    </td>
                </tr>
                  </>
                )
               }):<NoDataFound/> }
                {/* <tr>
                    <td className="document-data filename-data">
                        <div className="d-flex gap-2 align-items-center">
                            <div className="file-icon">
                                <FaFilePdf />
                            </div>
                            <span>PDF Presentation</span>
                        </div>
                    </td>
                    <td className="document-data">
                        <div className="d-flex align-items-center owner-icon gap-1">
                            <span className="share-user-icon">C</span><p className="mb-0 owner-email">client123@gmail.com</p>
                        </div>        
                    </td>
                    <td className="document-data">Shared with me</td>
                    <td className="document-data">
                        <div className="d-flex gap-3">
                            <button className="download-btn doc-action-btn"><FaDownload />
                            </button>
                            <button className="trash-btn doc-action-btn" ><FaTrashCan /></button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="document-data filename-data px-3">
                        <div className="d-flex gap-2 align-items-center filename-data">
                            <div className="folder-icon">
                                <FaFolder />
                            </div>
                            <span>New Folder</span>
                        </div>
                    </td>
                    <td className="document-data">
                        <div className="d-flex align-items-center owner-icon gap-1">
                            <span className="me-icon"><HiMiniUser /></span><p className="mb-0">Me</p>
                        </div>      
                    </td>
                    <td className="document-data">My Documents</td>
                    <td className="document-data">
                        <div className="d-flex gap-3">
                            <button className="download-btn doc-action-btn"><FaDownload />
                            </button>
                            <button className="trash-btn doc-action-btn" ><FaTrashCan /></button>
                        </div>
                    </td>
                </tr> */}
            </tbody>
        </table>
    </div>
</div>
  )
}

export default DocumentListView
