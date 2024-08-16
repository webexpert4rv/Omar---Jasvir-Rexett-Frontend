import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getEmployeeList, assignMember} from '../../../redux/slices/adminDataSlice';
import devImg from '../../../assets/img/demo-img.jpg';

const AssignEmployee = ({ show, handleClose, selectedUserId }) => {
    const dispatch = useDispatch();
    const employeeList = useSelector(state => state.adminData.employeeList);

    // Access the `data` array from the employeeList object
    const employees = employeeList?.data || [];

    const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(null);
    const [selectedEmployeeRole, setSelectedEmployeeRole] = React.useState('');

    useEffect(() => {
        if (show) {
            dispatch(getEmployeeList());
        }
    }, [show, dispatch]);

    const handleUserSelect = (id, role) => {
        setSelectedEmployeeId(id);
        setSelectedEmployeeRole(role);
    };

    const handleAssign = () => {
        if (!selectedEmployeeId || !selectedEmployeeRole) {
            toast.error('Please select an employee and role.', { position: 'top-center' });
            return;
        }
        dispatch(assignMember(selectedUserId, selectedEmployeeId, selectedEmployeeRole))
            .then(() => {
                handleClose();
            })
            .catch((error) => {
                console.error('Error assigning employee:', error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Assign Team Member</h3>
                <Form>
                    <Form.Control type="text" className="common-field font-14" placeholder="Search Employee" />
                    <p className="font-12 text-muted">
                        Who would you like to assign to this conversation? You can only assign employees with access to the candidate.
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
                                {Array.isArray(employees) && employees.length > 0 ? (
                                    employees.map(employee => (
                                        <tr key={employee.id}>
                                            <td className="align-middle">
                                                <Form.Check
                                                    type="radio"
                                                    name="employee_assign"
                                                    className="primary-checkbox"
                                                    checked={selectedEmployeeId === employee.id}
                                                    onChange={() => handleUserSelect(employee.id, employee.roles.length > 0 ? employee.roles[0].name : 'No Role')}
                                                />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={employee.profile_picture || devImg} className="avatar-company" alt="avatar" />
                                                    {employee.name}
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">{employee.email}</td>
                                            <td className="align-middle font-14">
                                                {employee.roles.length > 0 ? employee.roles[0].name : 'No Role'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">No employees found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold" onClick={handleAssign}>
                            Assign Employee
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AssignEmployee;