import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cards from "../../components/atomic/Cards";
import OverViewCard from "../../components/atomic/OverViewCard";
import { useDispatch, useSelector } from "react-redux";
import { developerAssignList } from "../../redux/slices/clientDataSlice";

const Dashboard = () => {
    const dispatch =useDispatch();
    const {assignedDeveloperList}=useSelector(state=>state.clientData)
    console.log(assignedDeveloperList,"assignedDeveloperList")

    useEffect(()=>{
     dispatch(developerAssignList(1));
    },[dispatch])

    return(
        <>
            <h2 className="section-head mb-4">Overview</h2>
            <div className="overview-card-wrapper mb-5">
                <OverViewCard head="Fund" value="Spent"/>
                <OverViewCard head="Client" value="Earned Back"/>
            </div>
            <h2 className="section-head-sub mb-5">List of assigned developers</h2>
            <div className="developers-list">
                {
                    assignedDeveloperList?.map((item,index)=>{
                        return(
                            <>
                            <Cards item={item}/>
                            </>
                        )
                    })
                }
            </div>
            <div className="text-center mt-3">
                <Link to={"/hired-developers"} className="link-text-dark">See All</Link>
            </div>
        </>
    )
}
export default Dashboard;