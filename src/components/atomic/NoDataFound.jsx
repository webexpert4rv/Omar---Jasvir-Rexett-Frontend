import React from 'react'
import errorImg from '../../assets/img/warning-icon.gif'
const NoDataFound = ({data}) => {
  return (
    <div className='no-data-container'>
      <div className='no-data'>
        {data?data:"🤔 We Couldn't Find Anything"}
      </div>
    </div>
  )
}

export default NoDataFound