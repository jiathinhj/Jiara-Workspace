import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Image, Modal, Row } from "react-bootstrap";
import { apiURL, getGroupById, postAPI } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { XCircle } from "react-bootstrap-icons";
import { useLoading } from "../preloader/LoadingContext";

const initialValues: any = {
  title: "",
  tags: "",
  content: "",
  pictures: "",
};
const PostModal = ({ showModal, handleClose, post, groupId, action }: any) => {
  const editingPost = {
    title: post?.title,
    tags: post?.tags,
    content: post?.content,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setLoading }: any = useLoading();

  const [imgs, setImgs] = useState<any>([]);

  const handleConvertImg = (e: any) => {
    let files = [...e.target.files];

    files.forEach((file) => {
      if (file.size > 150000) {
        console.log("File too large");
        toast.error("File is too large");
        return;
      }
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgs([...imgs, reader.result]); //base64encoded string
      };
    });
    // getBase64(files);
    console.log(imgs);
  };

  const onSubmit = async (value: any) => {
    setLoading(true);
    const newPost = {
      ...value,
      tags:
        action === "Add" ||
        (action === "Edit" && post && post.length && post.tags !== value.tags)
          ? value.tags.split(",")
          : post.tags,
      pictures: imgs.map((img: string) => img.split(",")[1]),
    };

    try {
      if (action === "Add") {
        await postAPI(`${apiURL.groups}/${groupId}/posts`, newPost);
      }
      if (action === "Edit") {
        console.log(groupId);
        await postAPI(`${apiURL.groups}/${groupId}/${post.postId}`, newPost);
      }
      console.log(groupId);
      getGroupById(groupId, toast, dispatch, navigate);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      className="post-modal"
      show={showModal}
      onHide={handleClose}
      centered
    >
      <Formik
        initialValues={post ? editingPost : initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <Modal.Title>
            {action === "Edit" ? "Edit post" : "Add new post"}
          </Modal.Title>
          <Modal.Body>
            <div>
              <Row>
                <label htmlFor="title">Title</label>
              </Row>
              <Row>
                <Field
                  component="textarea"
                  rows={2}
                  placeholder="Topic"
                  required
                  name="title"
                  id="title"
                />
              </Row>
            </div>
            <div>
              <Row>
                <label htmlFor="content">Content</label>
              </Row>
              <Row>
                <Field
                  component="textarea"
                  placeholder="What is the discussion about?"
                  rows={5}
                  name="content"
                  required
                  id="content"
                />
              </Row>
            </div>
            {action === "Add" ? (
              <div>
                <Row>
                  <label htmlFor="pictures">Choose Images</label>
                </Row>
                <Row>
                  <Field
                    id="pictures"
                    type="file"
                    name="pictures"
                    placeholder="Choose Images"
                    onChange={handleConvertImg}
                  />
                  {/* {errors ? (
                    <Alert
                      variant="danger"
                      style={{ margin: "10px 0", padding: "5px 0" }}
                    >
                      {errors}
                    </Alert>
                  ) : null} */}
                  <div className="preview-image">
                    {imgs.map((img: string, i: number) => (
                      <div className="single-image">
                        <Image key={i} src={img} />
                        <XCircle key={`close-label-${i}`} />
                      </div>
                    ))}
                  </div>
                </Row>
              </div>
            ) : null}
            <div>
              <Row>
                <label htmlFor="tags">Tags</label>
              </Row>
              <Row>
                <Field
                  component="textarea"
                  rows={2}
                  placeholder="#hashtag"
                  name="tags"
                  id="tags"
                />
              </Row>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Post
            </Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default PostModal;
