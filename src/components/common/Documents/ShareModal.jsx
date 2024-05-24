import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../atomic/RexettButton";
import {
  getDocumentShare,
  shareBelongisFile,
} from "../../../redux/slices/developerDataSlice";

const baseTagifySettings = {
  blacklist: ["xxx", "yyy", "zzz"],
  maxTags: 6,
  placeholder: "Add People",
  dropdown: {
    enabled: 1,
    maxItems: 5,
  },
};

const ShareModal = ({ show, handleClose, fileId }) => {
  const tagifyRef1 = useRef();
  const dispatch = useDispatch();
  const [tagifySettings, setTagifySettings] = useState(baseTagifySettings);
  const [tagifyProps, setTagifyProps] = useState({});
  const [sharedTags, setSharedTags] = useState();
  const [data, setData] = useState();
  const { shareDocument, smallLoader } = useSelector(
    (state) => state.developerData
  );
  const suggestedTags =
    shareDocument?.data?.map((item) => {
      return { value: item.id, label: item.name };
    }) || [];

  useEffect(() => {
    dispatch(getDocumentShare());
    setData();
  }, []);

  const handleChange = (e) => {
    setData(e);
    if (e.detail?.value) {
      let d = JSON.parse(e.detail.value);
      setSharedTags(d);
    } else {
      setSharedTags();
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    let user_id = shareDocument?.data?.map((item) => item.id);
    let payload = {
      file_id: fileId,
      user_ids: user_id,
    };
    if (user_id.length > 0) {
      await dispatch(shareBelongisFile(payload));
      handleClose();
      setData();
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="custom-modal"
      animation
    >
      <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

      <Modal.Body>
        <h3 className="popup-heading">Share</h3>
        <Form>
          <div className="experience-container">
            <Row>
              <Col md="12">
                <Form.Group className="mb-4">
                  <Select
                    className="basic-single"
                    options={suggestedTags}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div>
                  <div className="text-center mt-4">
                    <RexettButton
                      type="submit"
                      text="Share"
                      className="main-btn px-4 font-14 fw-semibold"
                      onClick={handleShare}
                      variant="success"
                      disabled={data ? false : true}
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
