import {useState} from "react";
import { Button, Form, Modal, Nav, Tab } from "react-bootstrap";
import devImg from '../../../assets/img/user-img.jpg';
import { FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { suggestDevelopers } from "../../../redux/slices/adminDataSlice";

const ManualSuggestions = ({ show, handleClose,developerList,jobId }) => {
    const [selectedItems, setSelectedItems] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const dispatch = useDispatch();

    const handleCheckboxChange = (id) => {
        setSelectedItems(prevSelectedItems => {
            const updatedSelectedItems = { ...prevSelectedItems, [id]: !prevSelectedItems[id] };
            return updatedSelectedItems;
        });
    };

    // const handleSelectAll = () => {
    //     const newSelectAll = !selectAll;
    //     setSelectAll(newSelectAll);
    //     const updatedSelectedItems = developerList.reduce((acc, item) => {
    //         acc[item.id] = newSelectAll;
    //         return acc;
    //     }, {});
    //     setSelectedItems(updatedSelectedItems);
    // };

    const handleSubmit = async() => {
        const selectedDevelopers = developerList.filter(item => selectedItems[item.id]);
        const selectedDevelopersIds = selectedDevelopers?.map((val)=>Number(val.id));
        const payload = {
            "job_id": Number(jobId),
            "developer_ids": selectedDevelopersIds
          }
        await dispatch(suggestDevelopers(payload));
        setSelectedItems({});
        setSelectAll(false);
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Manual Suggestion</h3>
                    <div>
                        <Form.Control type="text" className="common-field font-14 mb-2" placeholder="Search here..." />
                    </div>
                    <div>
                        <div className="table-responsive suggestion-table">
                            <table className="table table-ui-custom">
                                <thead>
                                    <tr>
                                        <th className="font-14 align-middle">
                                            {/* <Form.Check type="checkbox" className="primary_checkbox" /> */}
                                            {/* <Form.Check
                                                type="checkbox"
                                                className="primary_checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            /> */}
                                            S No.
                                        </th>
                                        <th className="font-14 align-middle">
                                            Developer Name
                                        </th>
                                        <th className="font-14 align-middle">
                                            Rating
                                        </th>
                                        <th className="font-14 align-middle">
                                            Email Address
                                        </th>
                                        <th className="font-14 align-middle">
                                            Designation
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {developerList?.map((item)=>{
                                        return (
                                            <>
                                            <tr>
                                        <td className="font-14 align-middle">
                                            {/* <Form.Check type="checkbox" className="primary_checkbox" /> */}
                                            <Form.Check
                                                    type="checkbox"
                                                    className="primary_checkbox"
                                                    checked={!!selectedItems[item.id]}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                        </td>
                                        <td className="font-14 align-middle">

                                            <div className="d-flex align-items-center">
                                                <div className="user-imgbx application-userbx">
                                                    <img src={devImg} className="user-img"
                                                    />
                                                </div>
                                                {item?.name}
                                            </div>
                                        </td>
                                        <td className="font-14 align-middle">
                                            <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                <FaStar /> 4.4
                                            </span>
                                        </td>
                                        <td className="font-14 align-middle">
                                           {item?.email}
                                        </td>
                                        <td className="font-14 align-middle">
                                            Software Developer
                                        </td>
                                    </tr>
                                            </>
                                        )
                                    }) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn font-14" onClick={handleSubmit}>Submit</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ManualSuggestions;