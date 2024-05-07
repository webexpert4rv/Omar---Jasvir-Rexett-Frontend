import React, { useEffect, useState } from "react";
import { Nav, Tab, Accordion, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { getFaq } from "../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import AddFaq from "./Modals/AddFaq";
import ConfirmationModal from "./Modals/ConfirmationModal";
import { deleteFaq } from "../../redux/slices/adminDataSlice";
import { useLocation } from "react-router-dom";
const Faq = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [show, setShow] = useState(false);
  const [isEditId,setEdit]=useState(null)
  const [deleteModal, setDeleteModal] = useState({
    isDelete:false,
    id:null,
  });
  const dispatch = useDispatch();
  const { faqsData } = useSelector((state) => state.clientData);
  const { smallLoader } = useSelector((state) => state.adminData);
  let {pathname} =useLocation()

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getFaq());
  }, []);

  const showFaqModal = () => {
    setEdit(null)
    setShow((prev) => !prev);
    setDeleteModal({
        isDelete:false,
        id:null,
      })
  };
  const newtooltip = <Tooltip id="tooltip">Add Faq</Tooltip>;


  const trashFaq=(e,id)=>{
    e.stopPropagation()
    setDeleteModal({
        isDelete:true,
        id:id
    })
  }

  const handleClose=()=>{
    setDeleteModal({
        isDelete:false,
        id:null
    })
  }

  const editFaq=(e,item)=>{
    e.stopPropagation()
    setShow(true);
    setEdit(item)
  }

  const handleDeleteAction=async()=>{
   await dispatch(deleteFaq(deleteModal?.id))
   dispatch(getFaq());
   setDeleteModal({
    isDelete:false,
    id:null
})
  }

  return (
    <>
      <section
        className={`faq-section ${pathname=="/admin-faq"? "admin-faq-section":""} ${
          activeTab === "general" ? "general-active" : ""
        } ${activeTab === "jobposting" ? "jobposting-active" : ""} ${
          activeTab === "timereporting" ? "timereporting-active" : ""
        }`}
      >
        <div className="inner-faq-section">
          <div className="faq-banner">
            <h3 className="mb-3 faq-heading">
              {t("frequentlyAskedQuestions")}
            </h3>
            <h2 className="mb-0 faq-tab-heading">
              {activeTab === "general" && "General"}
              {activeTab === "jobposting" && "Job Posting"}
              {activeTab === "timereporting" && "Time Reporting"}
            </h2>
          </div>
          <Tab.Container
            id="left-tabs-example"
            activeKey={activeTab}
            onSelect={handleTabChange}
          >
            <div className="d-flex justify-content-center align-items-center gap-3">
              <Nav variant="pills faq-pill justify-content-center">
                <Nav.Item className="faq-item">
                  <Nav.Link
                    className={`faq-link ${
                      activeTab === "general" ? "active" : ""
                    }`}
                    eventKey="general"
                  >
                    {t("general")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="faq-item">
                  <Nav.Link
                    className={`faq-link ${
                      activeTab === "jobposting" ? "active" : ""
                    }`}
                    eventKey="jobposting"
                  >
                    {t("jobPosting")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="faq-item">
                  <Nav.Link
                    className={`faq-link ${
                      activeTab === "timereporting" ? "active" : ""
                    }`}
                    eventKey="timereporting"
                  >
                    {t("timeReporting")}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
               { pathname=="/admin-faq" ? <OverlayTrigger placement="bottom" overlay={newtooltip}>
                    <button className="main-btn add-new-job-btn" onClick={showFaqModal}>
                    +
                    </button>
                </OverlayTrigger>:""}
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="general">
                <Accordion className="faq-accordion mt-4">
                    {/* <Button>ADd</Button> */}
                  {faqsData?.data?.general?.map((item, index) => (
                    <Accordion.Item key={index} eventKey={`general-${index}`}>
                      <Accordion.Header className="faq-accordion-header">
                        {item?.question} 
                      { pathname=="/admin-faq" && <>
                        <Button className="delete-btn ms-auto me-3" onClick={(e)=>trashFaq(e,item?.id)}><FaTrash /></Button>
                        <Button className="edit-job-btn me-3" onClick={(e)=>editFaq(e,item)}><TiEdit /></Button>
                        </>}
                        
                      </Accordion.Header>
                      <Accordion.Body className="faq-accordion-body">
                        <div
                          dangerouslySetInnerHTML={{ __html: item?.answer }}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Tab.Pane>
              <Tab.Pane eventKey="jobposting">
                <Accordion className="faq-accordion mt-4">
                  {faqsData?.data?.job_posting?.map((item, index) => (
                    <Accordion.Item
                      key={index}
                      eventKey={`jobposting-${index}`}
                    >
                      <Accordion.Header className="faq-accordion-header">
                        {item?.question} 
                        { pathname=="/admin-faq" && <>
                        <Button className="delete-btn ms-auto me-3" onClick={(e)=>trashFaq(e,item?.id)}><FaTrash /></Button>
                        <Button className="edit-job-btn me-3" onClick={(e)=>editFaq(e,item)}><TiEdit /></Button>
                        </>}
                      </Accordion.Header>
                      <Accordion.Body className="faq-accordion-body">
                        <div
                          dangerouslySetInnerHTML={{ __html: item?.answer }}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Tab.Pane>
              <Tab.Pane eventKey="timereporting">
                <Accordion className="faq-accordion mt-4">
                  {faqsData?.data?.time_reporting?.map((item, index) => (
                    <Accordion.Item
                      key={index}
                      eventKey={`timereporting-${index}`}
                    >
                      <Accordion.Header className="faq-accordion-header">
                        {item?.question} 
                        { pathname=="/admin-faq" && <>
                        <Button className="delete-btn ms-auto me-3" onClick={(e)=>trashFaq(e,item?.id)}><FaTrash /></Button>
                        <Button className="edit-job-btn me-3" onClick={(e)=>editFaq(e,item)}><TiEdit /></Button>
                        </>}
                      </Accordion.Header>
                      <Accordion.Body className="faq-accordion-body">
                        <div
                          dangerouslySetInnerHTML={{ __html: item?.answer }}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
        <AddFaq show={show} showFaqModal={showFaqModal} isEdit={isEditId} smallLoader={smallLoader} />
        <ConfirmationModal show={deleteModal?.isDelete} handleClose={handleClose} onClick={handleDeleteAction} header={"Delete Faq"} text={"Are you sure ,you want to delete this Question?"} smallLoader={smallLoader}/>
      </section>
    </>
  );
};
export default Faq;
