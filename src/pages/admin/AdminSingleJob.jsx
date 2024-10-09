import React from 'react'
import SingleJobDetails from '../../components/common/SingleJob/SingleJobDetails'

const AdminSingleJob = () => {
  localStorage.removeItem("clientActiveStep")
  localStorage.removeItem("developerId")
  localStorage.removeItem("nestedActiveStep")

  return (
    <>
    <SingleJobDetails />
    </>
  )
}

export default AdminSingleJob