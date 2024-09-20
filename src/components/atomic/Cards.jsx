import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import userImg from "../../assets/img/user-img.jpg";

const Cards = ({ item, handleCardClick }) => {
  console.log(item,"item")
  
  return (
    <>
      <div
        className="developer-card"
        onClick={() => handleCardClick(item?.id)}
        key={item?.id}
      >
        <div className="user-imgbx">
          <img
            src={
              item?.profile_picture
                ? item?.profile_picture
                : userImg
            }
            alt="developerImage"
            className="user-img"
          />
        </div>
        <div className="text-center">
          <h3 className="user-name">{item?.name}</h3>
          <p className="designation-user">
            {item?.developer_detail?.professional_title}
          </p>
          <p className="email-user">{item?.email}</p>
          <ul className="social-icons d-none">
            <li>
              <Link to={item?.developer_detail?.github_url}>
                <FaGithub />
              </Link>
            </li>
            <li>
              <Link to={item?.developer_detail?.linkedin_url}>
                <FaLinkedin />
              </Link>
            </li>
            {/* <li>
              <Link to={item?.developer?.developer_detail?.email}>
                <MdEmail />
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Cards;
