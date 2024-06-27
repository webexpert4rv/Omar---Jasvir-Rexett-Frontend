import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CommonInput from "../../../components/atomic/CommonInput";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
const RolesPermissionWrapper = ({
  show,
  handleClose,
  children,
  heading,
  options,
  modalName,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="custom-modal"
      animation
    >
      <Modal.Header closeButton className="popup-heading">
        {heading}
      </Modal.Header>

      <Modal.Body>
        {/* <h3 className="popup-heading">{heading}</h3> */}
        {modalName == "employee" && (
          <>
            <Form.Group className="mb-4">
              <CommonInput
                label="Email Address"
                name="email"
                type="text"
                control={control}
                placeholder="Enter email address"
                rules={{ required: "Email is required" }}
                error={errors.email}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <CommonInput
                label="Select Role"
                name="role"
                type="normal-select"
                control={control}
                defaultOption="Select Permission"
                options={options}
                rules={{ required: "Role is required" }}
                error={errors.role}
              />
            </Form.Group>
          </>
        )}

        {modalName == "role" && (
          <Form.Group className="mb-4">
            <CommonInput
              label="Role Name"
              name="role"
              type="text"
              control={control}
              placeholder="Add new Role"
              rules={{ required: "Role is required" }}
              error={errors.email}
            />
          </Form.Group>
        )}

        {modalName == "permission" && (
          <Form.Group className="mb-4">
            <CommonInput
              label="Add File"
              name="role"
              type="file"
              control={control}
              defaultOption="Select Permission"
              options={options}
              rules={{ required: "Role is required" }}
              error={errors.role}
            />
          </Form.Group>
        )}

        <div className="text-center">
          <RexettButton
            type="submit"
            text={modalName=="permission"?"Submit":"Send Invite"}
            className="main-btn px-4 font-14 fw-semibold"
            variant="transparent"
            // onClick={handleEditTime}
            // isLoading={smallLoader}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default RolesPermissionWrapper;
