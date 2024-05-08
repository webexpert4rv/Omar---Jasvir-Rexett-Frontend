import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Nav, Tab, Accordion, Form, Button } from 'react-bootstrap';
=======
import { Nav, Tab, Accordion, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
>>>>>>> 974b28f71010dc07624db021808ccf4617c8a761
import { getFaq } from "../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import AddFaq from "./Modals/AddFaq";
import ConfirmationModal from "./Modals/ConfirmationModal";
import { deleteFaq } from "../../redux/slices/adminDataSlice";
import { useLocation } from "react-router-dom";
import ScreenLoader from "../../components/atomic/ScreenLoader";
const Faq = () => {
<<<<<<< HEAD
    const [activeTab, setActiveTab] = useState("general");
    const dispatch = useDispatch()
    const { faqsData } = useSelector(state => state.clientData)
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    console.log(faqsData, "faqsData")
    useEffect(() => {
        dispatch(getFaq())
    }, [])
    return (
        <>
            <section className={`faq-section ${activeTab === "general" ? "general-active" : ""} ${activeTab === "jobposting" ? "jobposting-active" : ""} ${activeTab === "timereporting" ? "timereporting-active" : ""} ${activeTab === "askquestion" ? "askquestion-active" : ""} `} >
                <div className="inner-faq-section">
                    <div className="faq-banner">
                        <h3 className="mb-3 faq-heading">Frequently Asked Questions</h3>
                        <h2 className="mb-0 faq-tab-heading">
                            {activeTab === "general" && "General"}
                            {activeTab === "jobposting" && "Job Posting"}
                            {activeTab === "timereporting" && "Time Reporting"}
                            {activeTab === "askquestion" && "Ask Question"}
                        </h2>
                    </div>
                    <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={handleTabChange}>
                        <div className="d-flex justify-content-center">
                            <Nav variant="pills faq-pill justify-content-center">
                                <Nav.Item className="faq-item">
                                    <Nav.Link className={`faq-link ${activeTab === "general" ? "active" : ""}`} eventKey="general">General</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="faq-item">
                                    <Nav.Link className={`faq-link ${activeTab === "jobposting" ? "active" : ""}`} eventKey="jobposting">Job Posting</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="faq-item">
                                    <Nav.Link className={`faq-link ${activeTab === "timereporting" ? "active" : ""}`} eventKey="timereporting">Time Reporting</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="faq-item">
                                    <Nav.Link className={`faq-link ${activeTab === "askquestion" ? "active" : ""}`} eventKey="askquestion">Ask Question</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="general">
                                <Accordion className="faq-accordion mt-4">
                                    <Accordion.Item className="faq-accordion-item" eventKey="0">
                                        {faqsData?.data?.map((item, index) => {
                                            return (
                                                <>
                                                    <Accordion.Header  key ={index} className="faq-accordion-header">{item?.question}</Accordion.Header>
                                                    <Accordion.Body className="faq-accordion-body">
                                                    {item?.answer}
                                                    </Accordion.Body>
                                                </>)
                                        })}
                                    </Accordion.Item>
                                </Accordion>
                            </Tab.Pane>
                            <Tab.Pane eventKey="jobposting">
                                <Accordion className="faq-accordion mt-4">
                                    <Accordion.Item className="faq-accordion-item" eventKey="0">
                                        <Accordion.Header className="faq-accordion-header">How to Register as a client?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item className="faq-accordion-item" eventKey="1">
                                        <Accordion.Header className="faq-accordion-header">How to Rexett CRM?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item className="faq-accordion-item" eventKey="2">
                                        <Accordion.Header className="faq-accordion-header">How to Rexett CRM?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Tab.Pane>
                            <Tab.Pane eventKey="timereporting">
                                <Accordion className="faq-accordion mt-4">
                                    <Accordion.Item className="faq-accordion-item" eventKey="0">
                                        <Accordion.Header className="faq-accordion-header">How to Register as a client?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item className="faq-accordion-item" eventKey="1">
                                        <Accordion.Header className="faq-accordion-header">How to Rexett CRM?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item className="faq-accordion-item" eventKey="2">
                                        <Accordion.Header className="faq-accordion-header">How to Rexett CRM?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Tab.Pane>
                            <Tab.Pane eventKey="askquestion">
                                <div className="as-question-card mt-4">
                                    <Form>
                                        <h3 className="question-head mb-4">Need to ask question?</h3>
                                        <div className="text-center d-flex gap-2 align-items-start">
                                            <Form.Control type="text" className="common-field" placeholder="Enter your question" />
                                            <Button className="main-btn px-4">Submit</Button>
                                        </div>
                                    </Form>
                                </div>
                                <Accordion className="faq-accordion mt-4">
                                    <Accordion.Item className="faq-accordion-item" eventKey="0">
                                        <Accordion.Header className="faq-accordion-header">How to Register as a client? <span className="no-anwser">Not anwser yet.</span> </Accordion.Header>
                                        {/* <Accordion.Body className="faq-accordion-body">
                                            Not anwser yet.
                                        </Accordion.Body> */}
                                    </Accordion.Item>
                                    <Accordion.Item className="faq-accordion-item" eventKey="1">
                                        <Accordion.Header className="faq-accordion-header">How to Rexett CRM?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item className="faq-accordion-item" eventKey="2">
                                        <Accordion.Header className="faq-accordion-header">How to Rexett CRM?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </section>
        </>
    )
}
export default Faq;
=======
  const [activeTab, setActiveTab] = useState("general");
  const [show, setShow] = useState(false);
  const [isEditId,setEdit]=useState(null)
  const [deleteModal, setDeleteModal] = useState({
    isDelete:false,
    id:null,
  });
  const dispatch = useDispatch();
  const { faqsData,screenLoader } = useSelector((state) => state.clientData);
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
        {screenLoader? <ScreenLoader />:  <div className="inner-faq-section">
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
        </div>}
        <AddFaq show={show} showFaqModal={showFaqModal} isEdit={isEditId} smallLoader={smallLoader} />
        <ConfirmationModal show={deleteModal?.isDelete} handleClose={handleClose} onClick={handleDeleteAction} header={"Delete Faq"} text={"Are you sure ,you want to delete this Question?"} smallLoader={smallLoader}/>
      </section>
    </>
  );
};
export default Faq;
>>>>>>> 974b28f71010dc07624db021808ccf4617c8a761
