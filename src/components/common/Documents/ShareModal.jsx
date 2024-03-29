import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "@yaireo/tagify/dist/tagify.css"; // Import the default tagify styles
import Tags from "@yaireo/tagify/dist/react.tagify";
import profileImg from "../../../assets/img/user-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../atomic/RexettButton";
import { shareBelongisFile } from "../../../redux/slices/developerDataSlice";

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
        if(e.detail.value){
            let d=  JSON.parse(e.detail.value)
            setSharedTags(d)
        }else{
            setSharedTags([])  
        }
      
    };
        console.log(shareDocument,"shareDocument")

    const handleShare=async (e)=>{
        e.preventDefault()
        let user_id=sharedTags?.map((item)=>item.label)
        let payload={
            "file_id": fileId,
            "user_ids":user_id
          }
          if(user_id.length>0){
            await dispatch(shareBelongisFile(payload))
            handleClose()
          }
        
    }

    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Share </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Tags
                                        ref={tagifyRef1}
                                        settings={tagifySettings}
                                        autoFocus={true}
                                        {...tagifyProps}
                                        className="w-100"
                                        onChange={handleChange}
                                        whitelist={suggestedTags} // Add suggested tags
                                    />
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
                                className="main-btn px-5"
                                onClick={handleShare}
                                variant="success"
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
