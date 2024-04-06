import React from 'react'
import errorImg from '../../assets/img/warning-icon.gif'
const NoDataFound = ({data}) => {
  return (
    <div className='no-data-container'>
      <div className='no-data'>
        <img src={errorImg} />{data?data:"No Data Found"}
      </div>
    </div>
  )
}

export default NoDataFound