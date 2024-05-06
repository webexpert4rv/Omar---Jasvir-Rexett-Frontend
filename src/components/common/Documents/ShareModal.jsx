import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import "@yaireo/tagify/dist/tagify.css";
// import Tags from "@yaireo/tagify/dist/react.tagify";
import profileImg from "../../../assets/img/user-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../atomic/RexettButton";
import { getDocumentShare, shareBelongisFile } from "../../../redux/slices/developerDataSlice";

const baseTagifySettings = {
    blacklist: ["xxx", "yyy", "zzz"],
    maxTags: 6,
    placeholder: "Add People",
    dropdown: {
        enabled: 1, // enable suggestions dropdown
        maxItems: 5 // limit number of suggestions displayed
    }
};

const ShareModal = ({ show, handleClose,fileId}) => {
    const tagifyRef1 = useRef();
    const dispatch=useDispatch()
    const [tagifySettings, setTagifySettings] = useState(baseTagifySettings);
    const [tagifyProps, setTagifyProps] = useState({});
    const [sharedTags,setSharedTags]=useState([])
    const [data , setData] = useState()
    const { shareDocument,smallLoader } = useSelector(state => state.developerData)
    const suggestedTags =  shareDocument?.data?.map(item =>{return {value:item.name,label:item.id}})|| [];
    useEffect(() => {
        setTagifyProps({ loading: true });

        setTimeout(() => {
            setTagifyProps((lastProps) => ({
                ...lastProps,
                showFilteredDropdown: false
            }));
        }, 5000);
    }, []);
    
    const handleChange = (e) => {
        setData(e)
        if(e.detail.value){
            let d=  JSON.parse(e.detail.value)
            setSharedTags(d)
        }else{
            setSharedTags([])  
        }
      
    };

    const handleShare=async (e)=>{
        e.preventDefault()
        let user_id=sharedTags?.map((item)=>item.label)
        let payload={
            "file_id": fileId,
            "user_ids": user_id
          }
          if(user_id.length>0){
            await dispatch(shareBelongisFile(payload))
            handleClose()
          }
          dispatch(getDocumentShare())
          setSharedTags([])  
        
    }

    return (
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Share</h3>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    {/* <Tags
                                        ref={tagifyRef1}
                                        settings={tagifySettings}
                                        autoFocus={true}
                                        {...tagifyProps}
                                        className="w-100 common-field"
                                        onChange={handleChange}
                                        whitelist={suggestedTags} 
                                    /> */}
                                </Form.Group>
                                <div>
                                    {/* <h4 className="access-heading mb-3">People with access</h4> */}
                                    {/* {shareDocument?.data?.map((item, index) => {
                                        return (
                                            <>
                                                <ul className="access-list">
                                                    <li >
                                                        <div className="d-flex gap-3 align-items-center">
                                                            <span className="no-img letter-indicator">{item?.name.split("")[0]}</span>
                                                            <div>
                                                                <span className="font-15 owner-name">{item?.name}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </>
                                        )})} */}
                                    {/* <span className="owner-text">Owner</span> */}
                                    <div  className="text-center mt-4">
                                    <RexettButton
                                // type="submit"
                                text="Share"
                                className="main-btn px-4 font-14 fw-semibold"
                                onClick={handleShare}
                                variant="success"
                                disabled={!smallLoader && data?.detail?.value.length > 0 ? false : true }
                                isLoading={smallLoader}
                            />

                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ShareModal;
