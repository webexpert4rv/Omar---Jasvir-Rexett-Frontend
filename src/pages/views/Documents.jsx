import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import userImage from '../../assets/img/user-img.jpg'
import { useDispatch, useSelector } from "react-redux";
import { getFolderData } from "../../redux/slices/clientDataSlice";
import RexettDocuments from "../../components/common/Documents/RexettDocuments";

const Documents = () => {
    const dispatch =useDispatch();

    useEffect(()=>{
        dispatch(getFolderData("0"))
    },[dispatch])


    return (
        <>
            <RexettDocuments/>
        </>
    );
};

export default Documents;
