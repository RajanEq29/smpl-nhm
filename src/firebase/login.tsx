import { FC, Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Tab,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LocalStorageBackup } from "../components/common/switcher/switcherdata/switcherdata";
import { ThemeChanger } from "../redux/action";
import favicon from "../assets/images/brand-logos/favicon.ico";

import axios from "axios";
import { axiosPost } from "../utils/ApiCall";

interface LoginProps {}

const Login: FC<LoginProps> = ({ ThemeChanger }: any) => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [show, setShow] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const { email, password } = data;
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `${import.meta.env.BASE_URL}upload-pdf`;
    navigate(path);
  };

  const handleLogin = async () => {
    setLoader(true);
    try {
      const res = await axiosPost("users/login", data);
      if (res.status === 200) {
        const user = res?.data;
        console.log("ssss", user);
        setShow(true);
        setLoader(false);

        localStorage.setItem("token", user?.token);
        localStorage.setItem("user", res?.data?.userData?.email);
        setName(res?.data?.userData?.email);
        console.log(res);
        setTimeout(() => {
          routeChange();
        }, 1000);
      } else {
        const errorData = res.data;
        setError(errorData.message);
        setShow(true);
        setLoader(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid Credentials!!");
      setShow(true);
      setLoader(false);
    }
  };

  useEffect(() => {
    LocalStorageBackup(ThemeChanger);
  }, []);

  return (
    <Fragment>
      <div>
        {show && (
          <ToastContainer className="toast-container position-fixed top-0 end-0 me-4 mt-4">
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={5000}
              autohide
              bg="primary-transparent"
              className="toast colored-toast"
            >
              <Toast.Header className="toast-header bg-primary text-fixed-white mb-0">
                <img
                  className="bd-placeholder-img rounded me-2"
                  src={favicon}
                  alt="..."
                />
                <strong className="me-auto">{name}</strong>
              </Toast.Header>
              <Toast.Body>{err ? err : "Successfully Logged In!!"}</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
          <Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
            <Tab.Container id="left-tabs-example" defaultActiveKey="react">
              <Card>
                {/* <Nav
                  variant="pills"
                  className="justify-content-center authentication-tabs"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="react">
                      <img src={react} alt="logo2" />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="firebase">
                      {" "}
                      <img src={firebase} alt="logo1" />
                    </Nav.Link>
                  </Nav.Item>
                </Nav> */}
                <Tab.Content>
                  <Tab.Pane eventKey="react" className="border-0 pb-2">
                    <div className="p-4">
                      <p className="h5 fw-semibold mb-2 text-center">Sign In</p>

                      <div className="row gy-3">
                        {err && <Alert variant="danger">{err}</Alert>}
                        <Col xl={12}>
                          <Form.Label
                            htmlFor="signin-username"
                            className="form-label text-default"
                          >
                            Email
                          </Form.Label>
                          <Form.Control
                            size="lg"
                            className=""
                            placeholder="Enter your email"
                            name="email"
                            type="text"
                            value={email}
                            onChange={changeHandler}
                            required
                          />
                        </Col>
                        <Col xl={12} className="mb-2">
                          <Form.Label
                            htmlFor="signin-password"
                            className="form-label text-default d-block"
                          >
                            Password
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              size="lg"
                              className="form-control"
                              placeholder="Enter your password"
                              name="password"
                              type={passwordshow1 ? "text" : "password"}
                              value={password}
                              onChange={changeHandler}
                              required
                            />
                            <Button
                              variant="light"
                              className="btn btn-light"
                              type="button"
                              onClick={() => setpasswordshow1(!passwordshow1)}
                              id="button-addon2"
                            >
                              <i
                                className={`${
                                  passwordshow1
                                    ? "ri-eye-line"
                                    : "ri-eye-off-line"
                                } align-middle`}
                                aria-hidden="true"
                              ></i>
                            </Button>
                          </InputGroup>
                          <div className="mt-2"></div>
                        </Col>
                        <Col xl={12} className="d-grid mt-2">
                          <button
                            onClick={() => {
                              handleLogin();
                            }}
                            className=" border-0 bg-primary rounded-2 py-2 fw-semibold fs-6 text-fixed-white button"
                            disabled={loader}
                          >
                            {loader ? (
                              <button
                                className=" bg-primary border-0 bg-bluee text-fixed-white rounded-1 ms-2 px-4 fw-semibold fs-14"
                                type="button"
                                disabled
                              >
                                <span
                                  className="spinner-border spinner-border-sm mx-2 "
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Login...
                              </button>
                            ) : (
                              <span className="ms-2 fs-15 fw-semibold">
                                Login
                              </span>
                            )}
                          </button>
                          {/* <Button
                            variant="primary"
                            onClick={() => {
                              handleLogin();
                            }}
                            size="lg"
                            className="btn"
                          >
                            Log in
                          </Button> */}
                        </Col>
                      </div>
                      <div className="text-center"></div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Card>
            </Tab.Container>
          </Col>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Login);
