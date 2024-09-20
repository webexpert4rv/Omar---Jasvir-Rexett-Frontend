import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/slices/adminDataSlice";
import { useNavigate } from "react-router-dom";

const useEndAndDelete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToEnd, setIdToEnd] = useState(null);
  const [modalLoader, setModalLoader] = useState(false);

  const handleEndAndDeleteModal = ({
    action,
    idToDelete = null,
    idToEnd = null,
  }) => {
    if (action === "openEndModal") {
      setShowEndModal(true);
      setIdToEnd(idToEnd);
    } else if (action === "openDeleteModal") {
      setShowDeleteModal(true);
      setIdToDelete(idToDelete);
    } else if (action === "closeEndModal") {
      setShowEndModal(false);
      setIdToEnd(null);
    } else if (action === "closeDeleteModal") {
      setShowDeleteModal(false);
      setIdToDelete(null);
    }
  };
  const handleDeleteJob = () => {
    setModalLoader(true);
    dispatch(
      deleteJob(idToDelete,successCallback,failureCallback)
    );
  };
  const navigateToJobDetails = () => {
    navigateToJobDetails("")
  }
  const successCallback = () => {
    setShowDeleteModal(false);
    setModalLoader(false);
    setIdToDelete(false);
    navigate("/admin/admin-job-listing")
  }
  const failureCallback = () => {
    setShowDeleteModal(false);
    setModalLoader(false);
    setIdToDelete(false);
  }
  console.log(showDeleteModal,idToDelete,"dellllllll");
  return {
    handleEndAndDeleteModal,
    showDeleteModal,
    showEndModal,
    modalLoader,
    handleDeleteJob
  };
};

export default useEndAndDelete;
