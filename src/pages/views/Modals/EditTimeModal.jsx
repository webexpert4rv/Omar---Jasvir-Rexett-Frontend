import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch } from "react-redux";
import { editTimeReportOfDev } from "../../../redux/slices/clientDataSlice";
import { useTranslation } from "react-i18next";

const EditTimeModal = ({ show, handleClose, data ,smallLoader}) => {
    const { t } = useTranslation()
    const dispatch=useDispatch()
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});


    const onSubmit = (value) => {
        dispatch(editTimeReportOfDev(value,()=>{
            handleClose()
        }))
    }

    return (
        <Modal show={show} onHide={handleClose} className="custom-modal" centered animation>
            <Modal.Header closeButton className="border-0 pb-3 shadow-none">
                {/* <Modal.Title>Time Reports</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">{t("timeReports")}</h3>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                        <Form.Group className="mb-4">
                            {/* <Form.Label>Select Developer</Form.Label> */}
                            <Form.Select
                                {...register("contract_id", { required: "Please select a developer" })}
                            >
                                <option value="" selected disabled>{t("selectDeveloper")}</option>
                                {
                                    data?.map((item) => {
                                        return (
                                            <React.Fragment key={item?.contractDetails?.contract_id}>
                                                <option value={item?.contractDetails?.contract_id}>{item?.contractDetails?.user_details?.name}</option>
                                            </React.Fragment>
                                        )
                                    })
                                }

                            </Form.Select>
                            {errors.contract_id && (
                                <p className="error-message">{errors.contract_id.message}</p>
                            )}
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14">Having issue in time report?</Form.Label>
                        <Form.Control as="textarea" rows="6" placeholder="Enter your reason, why do you request for edit time request?"
                            name="message"
                            {...register("message", {
                                required: {
                                    value: true,
                                    message: "Message is required",
                                },
                            })}
                        ></Form.Control>
                        <p className="error-message">
                            {errors.message?.message}
                        </p>
                    </Form.Group>
                    <div className="text-center">
                        <RexettButton
                            type="submit"
                            text="Send Request"
                            className="main-btn px-4 font-14 fw-semibold"
                            variant="transparent"
                            isLoading={smallLoader}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default EditTimeModal;