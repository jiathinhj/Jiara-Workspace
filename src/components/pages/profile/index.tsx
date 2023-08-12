import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import LeftSider from "../../layout/menu/LeftSider";
import { apiResquest, apiURL, postAPI } from "../../../redux/apiRequest";
import { toast } from "react-toastify";
import { Camera, Check2, Pen, X } from "react-bootstrap-icons";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../preloader/LoadingContext";

const Profile = () => {
  const [userProfile, setUserProFile] = useState<any>({});
  const [expanded, setExpanded] = useState<boolean>(false);
  const [input, setInput] = useState<any>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<any>({ file: null });
  const [showAvtBtn, setShowAvtBtn] = useState<any>(false);

  const navigate = useNavigate();
  const { setLoading }: any = useLoading();

  //get current user profile from LocalStorage
  const fetchUser = () => {
    const currentUser: any = localStorage.getItem("currentUser");
    setUserProFile(JSON.parse(currentUser));
  };

  // const phoneNumberInput = useRef<any>(null);
  // useEffect(() => {
  //   if (phoneNumberInput.current && editable === true) {
  //     phoneNumberInput.current.focus();
  //   }
  // }, [phoneNumberInput]);

  const handleChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }; //set input fields

  //change password
  const handleChangePassword = async () => {
    const body = {
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    };
    try {
      await postAPI(apiURL.resetPassword, body);
      toast.success("Password has been changed successfully");
      setExpanded(false);
      setInput({});
      setShowPassword(false);
    } catch (error: any) {
      if (error && error.response.status === 422) {
        toast.error("Password incorrect");
      } else toast.error("Failed. Please try again!");
    }
  };

  //send email to change password
  const handleSendEmail = async () => {
    const body = { username: userProfile.username, email: userProfile.email };
    try {
      await axios.patch(apiURL.resetPassword, body);
      toast.success("An email has been sent. Please check your email");
    } catch (error) {
      console.log(error);
    }
  };

  //change phone number
  const handleChangePhoneNumber = async () => {
    const body = { phoneNumber: input.newPhoneNumber };
    if (
      input.newPhoneNumber &&
      (await apiResquest({
        method: "post",
        url: apiURL.personal,
        data: body,
        toast,
        successMessage: "Your phone number has been changed successfully",
        navigate,
      }))
    ) {
      setEditable(false);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...userProfile, phoneNumber: input.newPhoneNumber })
      ); //set new phone number on LS
      fetchUser();
    } else setEditable(false);
  };

  //set Escapse key
  const handleKeyDown = (e: any) => {
    if (e.key === "Escape") {
      setEditable(false);
    }
  };

  //change img to base64
  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL = "";
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  //change avatar
  const handleChangeAvatar = async (e: any) => {
    setShowAvtBtn(true);
    let { file } = avatar;
    file = e.target.files[0];
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 200,
      useWebWorker: true,
    }; // compress img settings
    const compressedFile = await imageCompression(file, options);
    getBase64(compressedFile).then((result) => {
      file["base64"] = result;
      setAvatar(file);
    });
  };

  //submit avatar to server
  const handleSubmitAvatar = async () => {
    console.log(avatar);
    const body = {
      phoneNumber: userProfile.phoneNumber,
      base64Avatar: avatar?.base64.split(",")[1] || undefined,
    };
    try {
      await postAPI(apiURL.personal, body);
      toast.success("Avatar saved successfully");
      window.location.reload();
    } catch (err) {
      toast.error("Failed! Please try again!");
      console.log(err);
    }
    setShowAvtBtn(false);
  };

  // const phoneNumberInput = useCallback((inputElement: any) => {
  //   if (inputElement) {
  //     inputElement.focus();
  //   }
  // }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Col className="sider" xs={3}>
        <LeftSider />
      </Col>
      <Col xs={9} className="main-content">
        <Row className="profile-setting">
          <Col className="top-area" sm="4">
            <div className="avatar-area">
              <Image
                src={
                  showAvtBtn ? `${avatar.base64}` : `${userProfile.avatarUrl}`
                }
              />

              <Form.Label htmlFor="avatar">
                <Camera className="change-avatar-icon" />
              </Form.Label>
              <Form.Control
                className="d-none"
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleChangeAvatar}
              />
            </div>
            {showAvtBtn ? (
              <Button
                variant="outline-primary"
                className="mt-2"
                onClick={handleSubmitAvatar}
              >
                Save avatar
              </Button>
            ) : null}
            <h3>{`${userProfile.lastname} ${userProfile.firstname}`}</h3>
          </Col>
          <Col className="info-area" sm="8">
            <Row>
              <InputGroup as={Row}>
                <Col sm="3">
                  <label htmlFor="">Username</label>
                </Col>
                <Col sm="8">
                  <Form.Control readOnly defaultValue={userProfile.username} />
                </Col>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup as={Row}>
                <Col sm="3">
                  <label htmlFor="">Password</label>
                </Col>
                <Col sm="6">
                  <Form.Control
                    type="password"
                    readOnly
                    defaultValue={"password"}
                  />
                </Col>
                <Col sm="3">
                  <span
                    className="txtsm"
                    onClick={() => {
                      setExpanded(!expanded);
                      setInput({});
                    }}
                  >
                    {expanded ? "Close" : "Change password"}
                  </span>
                </Col>
              </InputGroup>
              <Form action="reply-comment">
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      className="change-password d-flex gap-3 ms-4"
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: {
                          opacity: 1,
                          height: "auto",
                        },
                        collapsed: { opacity: 0, height: 0, marginTop: 0 },
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <Row>
                        <InputGroup as={Row}>
                          <Col sm="4">
                            <label htmlFor="currentPassword">Password</label>
                          </Col>
                          <Col sm="8">
                            <Form.Control
                              name="currentPassword"
                              value={input.currentPassword}
                              onChange={handleChange}
                              type={showPassword ? "text" : "password"}
                            />
                          </Col>
                        </InputGroup>
                        <InputGroup as={Row}>
                          <Col sm="4">
                            <label htmlFor="newPassword">New password</label>
                          </Col>
                          <Col sm="8">
                            <Form.Control
                              name="newPassword"
                              value={input.newPassword}
                              onChange={handleChange}
                              type={showPassword ? "text" : "password"}
                            />
                          </Col>
                        </InputGroup>

                        <Col className="action">
                          <span
                            className="txtsm"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? "Hide Password" : "Show Password"}
                          </span>
                          <span className="txtsm" onClick={handleSendEmail}>
                            Forgot password? Reset via Email
                          </span>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={handleChangePassword}
                          >
                            Confirm
                          </Button>
                        </Col>
                      </Row>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Form>
            </Row>
            <Row>
              <InputGroup as={Row}>
                <Col sm="3">
                  <label htmlFor="">Email</label>
                </Col>
                <Col sm="8">
                  <Form.Control readOnly defaultValue={userProfile.email} />
                </Col>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup as={Row}>
                <Col sm="3">
                  <label htmlFor="phoneNumber">Phone number</label>
                </Col>
                <Col sm="6">
                  <Form.Control
                    name="newPhoneNumber"
                    value={
                      editable ? input.newPhoneNumber : userProfile.phoneNumber
                    }
                    onChange={handleChange}
                    readOnly={editable ? false : true}
                    defaultValue={userProfile.phoneNumber}
                    style={
                      editable
                        ? { backgroundColor: "var(--hover-color)" }
                        : { backgroundColor: "" }
                    }
                    onKeyDown={handleKeyDown}
                    // ref={phoneNumberInput}
                  />
                </Col>

                <Col sm="3">
                  {editable ? (
                    <>
                      <Button className="btn-transparent">
                        <Check2 onClick={handleChangePhoneNumber} />
                      </Button>
                      <Button className="btn-transparent">
                        <X onClick={() => setEditable(false)} />
                      </Button>
                    </>
                  ) : (
                    <span
                      onClick={() => {
                        setEditable(!editable);
                      }}
                      className="btn-transparent txtsm"
                    >
                      Edit phone numbers
                    </span>
                  )}
                </Col>
              </InputGroup>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Profile;
