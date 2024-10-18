import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import devImg from "../../../assets/img/demo-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  allEmployeeList,
  allMemberList,
  assignEmployee,
} from "../../../redux/slices/adminDataSlice";
import useDebounce from "../../../hooks/useDebounce";
import RexettButton from "../../../components/atomic/RexettButton";
const AssignEmployee = ({ show, handleClose, currentTab,page,developerId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployeeData, setFilterdEmployeeData] = useState([]);
  const [selectedMember, setSelectedMember] = useState({});
  const dispatch = useDispatch();
  const { assignEmployeeList, smallLoader } = useSelector((state) => state.adminData);
  const id = localStorage.getItem("userId")

  //   const debouncedSearchTerm = useDebounce(searchTerm, 500);
  console.log(id, "idea")

  useEffect(() => {
    dispatch(allEmployeeList());
  }, []);

  useEffect(() => {
    setFilterdEmployeeData(assignEmployeeList);
  }, [assignEmployeeList]);

  //   commented for feature use
  //   useEffect(() => {
  //     if (debouncedSearchTerm) {
  //       dispatch(allEmployeeList(debouncedSearchTerm));
  //     }
  //   }, [debouncedSearchTerm]);

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearchTerm(e.target.value);
    const filteredEmployees = assignEmployeeList.filter((employee) => {
      return (
        employee.email.toLowerCase().includes(searchText) ||
        employee.name.toLowerCase().includes(searchText) ||
        employee.role.toLowerCase().includes(searchText)
      );
    });
    setFilterdEmployeeData(filteredEmployees);
  };

  const handleAssignEmployee = () => {
    const payload = {
      user_id: +developerId,
      assigned_member_id: +selectedMember?.id,
      assigned_member_role: selectedMember?.roles[0]?.name,
    };
    dispatch(assignEmployee(payload, () => {
      let queryFilters = {
        search: "",
        order_alphabetically: "asc",
        order_created_at: "",
        approval_status: "",
        created_at: "",
        page: page,
        active_tab: currentTab,
      }
      dispatch(allMemberList(queryFilters))
    }));
    handleClose()
  };
  console.log(selectedMember, "selectedMember");
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      animation
      size="lg"
      className="custom-modal"
      backdrop="static"
    >
      <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

      <Modal.Body>
        <h3 className="popup-heading">Assign Team Member</h3>
        <Form>
          <Form.Control
            type="text"
            className="common-field font-14"
            onChange={(e) => handleChange(e)}
            placeholder="Search Employee"
          />
          <p className="font-12 text-muted">
            Who would you like to assign to this conversation? You can only
            assign employee with access to the candidate.
          </p>
          <div className="table-responsive">
            <table className="table table-ui-custom">
              <thead>
                <tr>
                  <th className="align-middle lh-1"></th>
                  <th className="font-14 align-middle">Employee Name</th>
                  <th className="font-14 align-middle">Email address</th>
                  <th className="font-14 align-middle">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployeeData.map((emp) => (
                  <tr>
                    <td className="align-middle">
                      <Form.Check
                        type="radio"
                        name="employee_assign"
                        className="primary-checkbox"
                        onChange={() => setSelectedMember(emp)}
                      />
                    </td>
                    <td className="align-middle font-14">
                      <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                        <img
                          src={
                            emp.profile_picture
                              ? emp.profile_picture
                              : "/demo-user.png"
                          }
                          className="avatar-company"
                        />
                        {emp.name}
                      </div>
                    </td>
                    <td className="align-middle font-14">{emp.email}</td>
                    <td className="align-middle font-14">{emp.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <RexettButton
              type="button"
              text="Assign Employee"
              onClick={handleAssignEmployee}
              className="main-btn px-4 font-14 fw-semibold"
              variant="transparent"
              disabled={smallLoader || !selectedMember.id}
              isLoading={smallLoader}
            />
            {/* <Button
              variant="transparent"
              className="main-btn px-4 font-14 fw-semibold"
              onClick={handleAssignEmployee}
              disabled={!selectedMember.id}
            >
              Assign Employee
            </Button> */}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default AssignEmployee;
