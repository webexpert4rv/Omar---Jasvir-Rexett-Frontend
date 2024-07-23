import React from "react";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { FiMoon, FiSun, FiSunrise, FiSunset } from "react-icons/fi";
import { IoCheckmarkOutline, IoCloseOutline, IoPencilSharp } from "react-icons/io5";
const ManageShift = () => {
    const morningShift = (
        <Tooltip>Morning</Tooltip>
    )
    const afternoonShift = (
        <Tooltip>Afternoon</Tooltip>
    )
    const eveningShift = (
        <Tooltip>Evening</Tooltip>
    )
    const nightShift = (
        <Tooltip>Night</Tooltip>
    )
    const mondayHoliday = (
        <Tooltip>Monday</Tooltip>
    )
    const tuesdayHoliday = (
        <Tooltip>Tuesday</Tooltip>
    )
    const wednesdayHoliday = (
        <Tooltip>Wednesday</Tooltip>
    )
    const thursdayHoliday = (
        <Tooltip>Thursday</Tooltip>
    )
    const fridayHoliday = (
        <Tooltip>Friday</Tooltip>
    )
    const saturdayHoliday = (
        <Tooltip>Saturday</Tooltip>
    )
    const sundayHoliday = (
        <Tooltip>Sunday</Tooltip>
    )
    const shiftinfo = (
        <Tooltip>
            Please select your preferred shift (Morning/Afternoon/Evening/Night) for this week. The chosen shift will be assigned accordingly.
        </Tooltip>
    )
    const holidayinfo = (
        <Tooltip>
            Please select your preferred holiday (Monday/Tuesday/Wednesday/etc.) for this month. The chosen day will be assigned accordingly.
        </Tooltip>
    )
    return (
        <>
            <div className="card-box">
                <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
                    <h2 className="section-head-sub mb-0 border-0">
                        Manage Agent Shift (July Month)
                    </h2>
                </div>
                <div>
                    <div className="table-responsive">
                        <table className="table table-ui-custom">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className="white-nowrap">Phone number</th>
                                    <th className="white-nowrap">Email address</th>
                                    <th className="white-nowrap text-center">
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            Manage shift
                                            <OverlayTrigger placement="bottom" overlay={shiftinfo}>
                                                <span>
                                                    <FaInfoCircle />
                                                </span>
                                            </OverlayTrigger>
                                        </div>
                                    </th>
                                    <th className="white-nowrap text-center">
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            Manage holiday
                                            <OverlayTrigger placement="bottom" overlay={holidayinfo}>
                                                <span>
                                                    <FaInfoCircle />
                                                </span>
                                            </OverlayTrigger>
                                        </div>
                                    </th>
                                    <th className="white-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex align-items-center gap-3 white-nowrap">
                                            John Smith
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle">(555) 234-5678</td>
                                    <td className="font-14 align-middle white-nowrap">john.smith@example.com</td>
                                    <td className="font-14 align-middle white-nowrap text-center">
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <div>
                                                <input type="radio" name="shift-radio" className="shift-input-radio" id="morning_shift" />
                                                <OverlayTrigger placement="bottom" overlay={morningShift}>
                                                    <Form.Label htmlFor="morning_shift" className="shift_label">
                                                        <FiSunrise />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="shift-radio" className="shift-input-radio" id="afternoon_shift" />
                                                <OverlayTrigger placement="bottom" overlay={afternoonShift}>
                                                    <Form.Label htmlFor="afternoon_shift" className="shift_label">
                                                        <FiSun />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="shift-radio" className="shift-input-radio" id="evening_shift" />
                                                <OverlayTrigger placement="bottom" overlay={eveningShift}>
                                                    <Form.Label htmlFor="evening_shift" className="shift_label">
                                                        <FiSunset />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="shift-radio" className="shift-input-radio" id="night_shift" />
                                                <OverlayTrigger placement="bottom" overlay={nightShift}>
                                                    <Form.Label htmlFor="night_shift" className="shift_label">
                                                        <FiMoon />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle text-center">
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <div>
                                                <input type="radio" name="holiday-radio" className="holiday-input-radio" id="monday_holiday" />
                                                <OverlayTrigger placement="bottom" overlay={mondayHoliday}>
                                                    <Form.Label htmlFor="monday_holiday" className="holiday_label">
                                                        M
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio" className="holiday-input-radio" id="tuesday_holiday" />
                                                <OverlayTrigger placement="bottom" overlay={tuesdayHoliday}>
                                                    <Form.Label htmlFor="tuesday_holiday" className="holiday_label">
                                                        T
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio" className="holiday-input-radio" id="wednesday_holiday" />
                                                <OverlayTrigger placement="bottom" overlay={wednesdayHoliday}>
                                                    <Form.Label htmlFor="wednesday_holiday" className="holiday_label">
                                                        W
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio" className="holiday-input-radio" id="thursday_holiday" />
                                                <OverlayTrigger placement="bottom" overlay={thursdayHoliday}>
                                                    <Form.Label htmlFor="thursday_holiday" className="holiday_label">
                                                        T
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio" className="holiday-input-radio" id="friday_holiday" />
                                                <OverlayTrigger placement="bottom" overlay={fridayHoliday}>
                                                    <Form.Label htmlFor="friday_holiday" className="holiday_label">
                                                        F
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio" className="holiday-input-radio" id="saturday_holiday" />
                                                <OverlayTrigger placement="bottom" overlay={saturdayHoliday}>
                                                    <Form.Label htmlFor="saturday_holiday" className="holiday_label">
                                                        S
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio" className="holiday-input-radio" id="sunday_holiday" />
                                                <OverlayTrigger placement="bottom" overlay={sundayHoliday}>
                                                    <Form.Label htmlFor="sunday_holiday" className="holiday_label">
                                                        S
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex gap-2">
                                            <Button className="arrow-btn primary-arrow">
                                                <IoCheckmarkOutline />
                                            </Button>
                                            <Button className="arrow-btn info-arrow">
                                                <IoPencilSharp />
                                            </Button>
                                            <Button className="arrow-btn danger-arrow">
                                                <IoCloseOutline />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex align-items-center gap-3 white-nowrap">
                                            John Smith
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle">(555) 234-5678</td>
                                    <td className="font-14 align-middle white-nowrap">john.smith@example.com</td>
                                    <td className="font-14 align-middle white-nowrap text-center">
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <div>
                                                <input type="radio" name="shift-radio_2" className="shift-input-radio" id="morning_shift2" />
                                                <OverlayTrigger placement="bottom" overlay={morningShift}>
                                                    <Form.Label htmlFor="morning_shift2" className="shift_label">
                                                        <FiSunrise />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="shift-radio_2" className="shift-input-radio" id="afternoon_shift2" />
                                                <OverlayTrigger placement="bottom" overlay={afternoonShift}>
                                                    <Form.Label htmlFor="afternoon_shift2" className="shift_label">
                                                        <FiSun />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="shift-radio_2" className="shift-input-radio" id="evening_shift2" />
                                                <OverlayTrigger placement="bottom" overlay={eveningShift}>
                                                    <Form.Label htmlFor="evening_shift2" className="shift_label">
                                                        <FiSunset />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="shift-radio_2" className="shift-input-radio" id="night_shift2" />
                                                <OverlayTrigger placement="bottom" overlay={nightShift}>
                                                    <Form.Label htmlFor="night_shift2" className="shift_label">
                                                        <FiMoon />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle text-center">
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <div>
                                                <input type="radio" name="holiday-radio_2" className="holiday-input-radio" id="monday_holiday2" />
                                                <OverlayTrigger placement="bottom" overlay={mondayHoliday}>
                                                    <Form.Label htmlFor="monday_holiday2" className="holiday_label">
                                                        M
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio_2" className="holiday-input-radio" id="tuesday_holiday2" />
                                                <OverlayTrigger placement="bottom" overlay={tuesdayHoliday}>
                                                    <Form.Label htmlFor="tuesday_holiday2" className="holiday_label">
                                                        T
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio_2" className="holiday-input-radio" id="wednesday_holiday2" />
                                                <OverlayTrigger placement="bottom" overlay={wednesdayHoliday}>
                                                    <Form.Label htmlFor="wednesday_holiday2" className="holiday_label">
                                                        W
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio_2" className="holiday-input-radio" id="thursday_holiday2" />
                                                <OverlayTrigger placement="bottom" overlay={thursdayHoliday}>
                                                    <Form.Label htmlFor="thursday_holiday2" className="holiday_label">
                                                        T
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio_2" className="holiday-input-radio" id="friday_holiday2" />
                                                <OverlayTrigger placement="bottom" overlay={fridayHoliday}>
                                                    <Form.Label htmlFor="friday_holiday2" className="holiday_label">
                                                        F
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio_2" className="holiday-input-radio" id="saturday_holiday2" />
                                                <OverlayTrigger placement="bottom" overlay={saturdayHoliday}>
                                                    <Form.Label htmlFor="saturday_holiday2" className="holiday_label">
                                                        S
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                            <div>
                                                <input type="radio" name="holiday-radio_2" className="holiday-input-radio" id="sunday_holiday2" />
                                                <OverlayTrigger placement="bottom" overlay={sundayHoliday}>
                                                    <Form.Label htmlFor="sunday_holiday2" className="holiday_label">
                                                        S
                                                    </Form.Label>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex gap-2">
                                            <Button className="arrow-btn primary-arrow">
                                                <IoCheckmarkOutline />
                                            </Button>
                                            <Button className="arrow-btn info-arrow">
                                                <IoPencilSharp />
                                            </Button>
                                            <Button className="arrow-btn danger-arrow">
                                                <IoCloseOutline />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManageShift;