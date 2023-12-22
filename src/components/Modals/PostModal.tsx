import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Image, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Camera, CaretDownFill, XCircle } from "react-bootstrap-icons";
import { useFileResize } from "../Hooks/useFileResize";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { getGroupById } from "../../Apis/requests";

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
  const axiosPrivate = useAxiosPrivate();

  const [imgs, setImgs] = useState<string[]>([]);
  const [active, setActive] = useState(false);

  const resizeFile = useFileResize();

  const selectFiles = (e: any) => {
    const images: any = [];
    for (let i = 0; i < e.target.files.length; i++) {
      resizeFile(e.target.files[i]).then((compressedFile) => {
        images.push(compressedFile.base64);
        setImgs([...imgs, ...images]);
      });
    }
  };

  const deleteFiles = (i: number) => {
    imgs.splice(i, 1);
    setImgs([...imgs]);
  };
  // getBase64(files);

  const onSubmit = async (value: any) => {
    const newPost = {
      ...value,
      tags: value.tags,
      pictures: imgs.map((img: string) => img.split(",")[1]),
    };
    try {
      if (action === "Add") {
        await axiosPrivate({
          method: "post",
          url: `/groups/${groupId}/posts`,
          data: newPost,
        });
      }
      if (action === "Edit") {
        await axiosPrivate({
          method: "post",
          url: `/groups/${groupId}/${post.postId}`,
          data: newPost,
        });
      }
      console.log(newPost);
      getGroupById(groupId, dispatch);
    } catch (error) {}
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
                    onChange={selectFiles}
                  />
                  {/* 
                  <div className="preview-image">
                    {imgs
                      ? imgs.map((img: string, i: number) => (
                          <div className="single-image" key={`preview-${i}`}>
                            <Image key={`preview-image-${i}`} src={img} />
                            <XCircle
                              key={`close-label-${i}`}
                              onClick={() => deleteFiles(i)}
                            />
                          </div>
                        ))
                      : null}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                <label
                  htmlFor="photos"
                  className="flex flex-col items-center justify-center max-h-25 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Typography>Add photos</Typography>
                    <BiCamera className="mt-3" />
                  </div>
                  <input
                    id="photos"
                    type="file"
                    multiple
                    hidden
                    onChange={selectFiles}
                  ></input>
                </label>
                {imgs
                  ? imgs.map((img,i) => (
                      <div className="relative h-25" key={`preview-${img}`}>
                        <img
                          className="rounded-lg cursor-pointer bg-gray-50 hover:blur-[1px] w-full"
                          key={`preview-img-${img}`}
                          src={img}
                        />
                        <div className="absolute cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 w-full h-full top-0 rounded-lg bg-gray-600 bg-opacity-30 text-gray-100">
                          <Typography
                            key={`close-label-${img}`}
                            onClick={() => deleteFiles(i)}
                            className="text-center text-sm"
                          >
                            Remove
                          </Typography>
                        </div>
                      </div>
                    ))
                  : null}
              </div> */}
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
