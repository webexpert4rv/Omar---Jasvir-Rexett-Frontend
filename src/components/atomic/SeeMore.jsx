import React from 'react'
import { Link } from 'react-router-dom'

export const SeeMore = ({setCount}) => {
  
  const updateSeeMore=()=>{
    setCount(prev=>prev+1)
  }

  return (
    <Link to={"#"} className="link-text-dark" onClick={updateSeeMore}>See More</Link>
  )
}
