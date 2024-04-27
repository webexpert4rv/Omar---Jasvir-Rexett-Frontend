import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { fetchDeveloperCv, updateDeveloperCvBio } from "../../../redux/slices/developerDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getDeveloperDetails } from "../../../redux/slices/clientDataSlice";

const AboutCV = ({ show, handleClose, data, id, role }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const { smallLoader } = useSelector(state => state.developerData)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const [charCount, setCharCount] = useState(0);
  const maxChars = 1000;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setCharCount(value.length);
      setValue("bio", value.slice(0, maxChars));
    }
  };

  useEffect(() => {
    setValue("bio", data)
  }, [data])

  const onSubmit = (values) => {
    if (role === "developer") {
      let data = {
        ...values,
        "user_id": id
      }
      dispatch(updateDeveloperCvBio(data, () => {
        dispatch(fetchDeveloperCv(id))
        handleClose()
      }))
    } else {
      let data = {
        ...values,
        "user_id": id
      }
      dispatch(updateDeveloperCvBio(data, () => {
        dispatch(getDeveloperDetails(id))
        handleClose()
      }))
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
      <Modal.Header closeButton className="border-0 pb-3">
        {/* <Modal.Title>About Section</Modal.Title> */}
      </Modal.Header>

      <Modal.Body>
        <h3 className="popup-heading">{t("aboutSection")}</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-4">
            <Form.Control as="textarea" className="common-field" rows="6" name="bio" placeholder="Enter your bio"
              {...register("bio", {
                required: {
                  value: true,
                  message: "Please Enter Bio Data",
                },
                validate: (value) =>
                  value.length <= maxChars || "Maximum character limit reached",

              })}

              onChange={handleChange}
            ></Form.Control>
            <p className="error-message">
              {errors.bio?.message}
            </p>
            <p className="font-13 text-end">{maxChars - charCount} {t("charactersRemaining")}</p>
          </Form.Group>
          <div className="text-center">
            <RexettButton
              type="submit"
              text={t("submit")}
              className="main-btn px-4 font-14 fw-semibold"
              variant="transparent"
              disabled={smallLoader}
              isLoading={smallLoader}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
export default AboutCV;