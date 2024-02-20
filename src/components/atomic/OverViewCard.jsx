import React from 'react'
import { IoTrendingUpSharp } from "react-icons/io5";

const OverViewCard = ({head,value}) => {
    return (
        <>
            <div className="overview-card">
                <div>
                    <h4 className="overview-card-subhead">{head}</h4>
                    <h3 className="overview-card-heading mb-0">{value}</h3>
                </div>
                <span className="over-icon"><IoTrendingUpSharp /></span>
            </div>
        </>
    )
}

export default OverViewCard