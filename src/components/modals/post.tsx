import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Image, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Camera, CaretDownFill, XCircle } from "react-bootstrap-icons";
import { useLoading } from "../context/loading";
import { postAPI } from "../../api";
import { getGroupById } from "../../redux/apiRequests";

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

  const dispatch = useDispatch();

  const { setLoading }: any = useLoading();

  const [imgs, setImgs] = useState<any>([]);
  const [active, setActive] = useState(false);

  const handleConvertImg = (e: any) => {
    const files = [...e.target.files];
    console.log(files);
    files.forEach((file: File) => {
      if (file.size > 150000) {
        toast.error("File is too large");
        return;
      } else {
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImgs([...imgs, reader.result]); //base64encoded string
        };
      }
    });
    // getBase64(files);
    console.log(imgs);
  };

  const onSubmit = async (value: any) => {
    const newPost = {
      ...value,
      tags: value.tags,
      pictures: imgs.map((img: string) => img.split(",")[1]),
    };
    console.log(newPost);
    try {
      if (action === "Add") {
        await postAPI({ path: `/groups/${groupId}/posts`, body: newPost });
      }
      if (action === "Edit") {
        console.log(groupId);
        await postAPI({
          path: `/groups/${groupId}/${post.postId}`,
          body: newPost,
        });
      }
      console.log(groupId);
      getGroupById(groupId, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      className="post-modal"
      show={showModal}
      onHide={() => handleClose(setImgs([]))}
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
                  <label htmlFor="pictures" className="pictures">
                    Choose Images
                    <Camera />
                  </label>
                </Row>
                <Row>
                  <Field
                    id="pictures"
                    type="file"
                    name="pictures"
                    multiple={true}
                    onChange={handleConvertImg}
                  />

                  <div className="preview-image">
                    {imgs
                      ? imgs.map((img: string, i: number) => (
                          <div className="single-image" key={`preview-${i}`}>
                            <Image key={`preview-image-${i}`} src={img} />
                            <XCircle
                              key={`close-label-${i}`}
                              onClick={() => setImgs(imgs.splice(i + 1, 1))}
                            />
                          </div>
                        ))
                      : null}
                  </div>
                </Row>
              </div>
            ) : null}
            <div>
              <Row>
                <label htmlFor="tags">Tags</label>
              </Row>
              <Row>
                <div className="hashtag-selection">
                  {/* <div> */}
                  <Field
                    component="textarea"
                    placeholder="#hashtag"
                    name="tags"
                    id="tags"
                    readOnly
                    disabled
                  />
                  {/* </div> */}

                  <Button onClick={() => setActive(!active)}>
                    Select your hashtags <CaretDownFill />
                  </Button>
                  {[
                    "React.js",
                    "SASS",
                    "AngularJS",
                    "JavaScript",
                    "HTML5",
                    "Cascading Style Sheets (CSS)",
                    "Git",
                    "jQuery",
                    "Bootstrap",
                    "TypeScript",
                    "Web Development",
                  ].map((option) => (
                    <div
                      key={`label-${option}`}
                      className={`selection ${active ? "active" : ""}`}
                    >
                      <label>
                        <Field type="checkbox" name="tags" value={option} />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </Row>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleClose(setImgs([]))}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => handleClose(setImgs([]))}
            >
              Post
            </Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default PostModal;
