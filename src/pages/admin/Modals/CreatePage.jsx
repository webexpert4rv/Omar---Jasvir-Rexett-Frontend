import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import webSiteBuilderInstance from "../../../services/webSiteBuilderInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
const CreateWebsitePage = ({
  show,
  handleClose,
  pageList,
  updatePageList,
  setScreenLoader,
  isEdit = false,
  pageData,
}) => {
  const [updateList, setUpdatedList] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEdit && pageData) {
      setUpdatedList(() => pageList.filter((pg) => pg._id !== pageData._id));
    } else {
      setUpdatedList([...pageList]);
    }
  }, [pageData]);

  useEffect(() => {
    if (isEdit && pageData) {
      setValue("name", pageData.name);
      setValue("isHomePage", pageData.isHomePage);
      setValue("template", pageData.template ? pageData.template : "blank");
    }
  }, [updateList]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      template: data.template === "blank" ? "" : data.template,
    };
    setScreenLoader(true);
    if (isEdit) {
      const isBlankTemplate = pageData.template
        ? pageData.template === data.template
        : data.template === "blank"
        ? true
        : false;
      if (
        pageData.name === data.name &&
        isBlankTemplate &&
        pageData.isHomePage === data.isHomePage
      ) {
        setScreenLoader(false);
        handleClose();
        return;
      }
      webSiteBuilderInstance
        .put(`/api/pages/${pageData._id}`, payload)
        .then((response) => {
          const message = "Page updated successfully!";
          toast.success(message, { position: "top-center" });
          updatePageList(response.data.page, "updated");
          handleClose();
          setScreenLoader(false);
        })
        .catch((err) => {
          console.log(err);
          const message =
            err?.response?.data?.message || "Something went wrong";
          toast.error(message, { position: "top-center" });
          // handleClose()
          setScreenLoader(false);
        });
    } else {
      webSiteBuilderInstance
        .post(`/api/pages/`, payload)
        .then((response) => {
          console.log(response, "??//");
          const message = "Page created successfully!";
          toast.success(message, { position: "top-center" });
          updatePageList(response.data.page, "created");
          handleClose();
          setScreenLoader(false);
        })
        .catch((err) => {
          console.log(err);
          const message =
            err?.response?.data?.message || "Something went wrong";
          toast.error(message, { position: "top-center" });
          // handleClose()
          setScreenLoader(false);
        });
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="custom-modal"
        animation
      >
        <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

        <Modal.Body>
          <h3 className="popup-heading">{`${
            isEdit ? "Update" : "Create new"
          } page`}</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4">
              <Form.Label className="font-14 fw-medium">Page Name *</Form.Label>
              <Form.Control
                type="text"
                className="common-field font-14"
                placeholder="E.g. Homepage"
                {...register("name", { required: "Page name is required" })}
              />
              {errors.pageName && (
                <p className="text-danger">{errors.pageName.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="font-14 fw-medium">
                Select Template *
              </Form.Label>
              <Form.Select
                className="common-field font-14"
                {...register("template", {
                  required: "Template selection is required",
                })}
              >
                <option hidden selected value="">
                  Select Template
                </option>
                <option value="blank">Blank page</option>
                {updateList.map((page) => (
                  <option value={page.name} key={page._id}>
                    {page.name}
                  </option>
                ))}
              </Form.Select>
              {errors.template && (
                <p className="text-danger">{errors.template.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                className="font-14"
                label="Make this as Home Page"
                {...register("isHomePage")}
              />
            </Form.Group>
            <div className="text-center">
              <button type="submit" className="main-btn font-14">
                {`${isEdit ? "Update" : "Create new"} page`}
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CreateWebsitePage;
