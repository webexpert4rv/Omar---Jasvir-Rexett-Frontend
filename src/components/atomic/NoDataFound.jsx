import React from 'react'
import errorImg from '../../assets/img/warning-icon.gif'
const NoDataFound = () => {
  return (
    <div className='no-data-container'>
      <div className='no-data'>
        <img src={errorImg} />No Data Found
      </div>
    </div>
  )
}

export default NoDataFound