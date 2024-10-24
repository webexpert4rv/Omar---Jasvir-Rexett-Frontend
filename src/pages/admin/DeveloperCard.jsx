import React from "react";
import userImage from "../../assets/img/user-img.jpg";
import { FaLinkedinIn } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const DeveloperCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="developer-card">
      <div className="user-imgbx" onClick={()=>{navigate(`/admin-single-developer/${data?.id}`)}}>
        <img src={data?.profile_picture ? data?.profile_picture : "/demo-user.png"} className="user-img" />
      </div>
      <div className="text-center">
        <h3 className="user-name">{data?.name}</h3>
        <p className="designation-user">Web Developers</p>
        <p className="email-user">{data?.email}</p>
        <p className="associate-text font-14 mt-2 mb-2">
          <span className="associate mb-1">Individual </span>
        </p>
        <ul className="social-icons">
          <li>
            <a href="">
              <FaLinkedinIn />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeveloperCard;
