import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch } from "react-redux";
import { editTimeReportOfDev } from "../../../redux/slices/clientDataSlice";

const EditTimeModal = ({ show, handleClose, data ,smallLoader}) => {
    const dispatch=useDispatch()
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});


    const onSubmit = (value) => {
        console.log(value, "kkk")
        dispatch(editTimeReportOfDev(value,()=>{
            handleClose()
        }))
    }

    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Time Reports</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                        <Form.Group className="mb-4">
                            <Form.Label>Select Developer</Form.Label>
                            <Form.Select
                                {...register("contract_id", { required: "Please select a developer" })}
                            >
                                <option value="" selected disabled>Select Developer</option>
                                {
                                    data?.map((item) => {
                                        return (
                                            <React.Fragment key={item?.contractDetails?.contract_id}>
                                                <option value={item?.contractDetails?.contract_id}>{item?.contractDetails?.developer_details?.name}</option>
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
                        <Form.Label>Having issue in time report?</Form.Label>
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
                            className="main-btn px-4"
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