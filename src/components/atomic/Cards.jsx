import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import userImg from '../../assets/img/user-img.jpg'

const Cards = (cardDetails) => {
    return (
        <>
            <div className="developer-card">
                <div className="user-imgbx">
                    <img src={cardDetails?.item?.developer?.profile_picture} className="user-img" />
                </div>
                <div className="text-center">
                    <h3 className="user-name">{cardDetails?.item?.developer?.name}</h3>
                    <p className="designation-user">{cardDetails?.item?.developer?.developer_detail?.professional_title}</p>
                    <p className="email-user">{cardDetails?.item?.developer?.email}</p>
                    <ul className="social-icons d-none">
                        <li>
                            <Link to={cardDetails?.item?.developer?.developer_detail?.github_url}><FaGithub /></Link>
                        </li>
                        <li>
                            <Link to={cardDetails?.item?.developer?.developer_detail?.linkedin_url}><FaLinkedin /></Link>
                        </li>
                        <li>
                            <Link to={cardDetails?.item?.developer?.developer_detail?.email}><MdEmail /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Cards