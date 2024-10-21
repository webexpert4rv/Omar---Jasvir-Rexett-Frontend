import React from 'react';

const SingleAttendeeInfo = ({attendeeData}) => {
console.log(attendeeData,"attendeeData")
  return (
    <div>{attendeeData?.email}</div>
  )
}

export default SingleAttendeeInfo