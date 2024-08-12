import React from "react";
import { Form, Modal } from "react-bootstrap";
import webSiteBuilderInstance from "../../../services/webSiteBuilderInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
const CreateWebsitePage = ({ show, handleClose, pageList, updatePageList,setScreenLoader }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    const payload = {
      ...data,
      template: data.template === 'blank' ? '':data.template
    }
    setScreenLoader(true)
    webSiteBuilderInstance
      .post(`/api/pages/`, payload)
      .then((response) => {
        console.log(response,"??//")
        const message = "Page created successfully!";
        toast.success(message, { position: "top-center" });
        updatePageList(response.data.page, "created")
        handleClose()
        setScreenLoader(false)
      })
      .catch((err) => {
        console.log(err)
        const message = err?.response?.data?.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
        // handleClose()
        setScreenLoader(false)
      });
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
          <h3 className="popup-heading">Create new page</h3>
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
                <option selected value="" >Select Template</option>
                <option value="blank">Blank page</option>
                {
                  pageList.map((page)=> <option value={page.slug} key={page._id}>{page.name}</option>)
                }
              </Form.Select>
              {errors.template && (
                <p className="text-danger">{errors.template.message}</p>
              )}
            </Form.Group>
            <div className="text-center">
              <button type="submit" className="main-btn font-14">
                Create new page
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CreateWebsitePage;