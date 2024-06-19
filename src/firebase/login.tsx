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
import desktoplogo from "../assets/images/brand-logos/desktop-logo.png";
import desktopdarklogo from "../assets/images/brand-logos/desktop-dark.png";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LocalStorageBackup } from "../components/common/switcher/switcherdata/switcherdata";
import { ThemeChanger } from "../redux/action";
import favicon from "../assets/images/brand-logos/favicon.ico";

import axios from "axios";

interface LoginProps {}

const Login: FC<LoginProps> = ({ ThemeChanger }: any) => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [show, setShow] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState({
    email: "example@gmail.com",
    password: "password123",
  });
  const { email, password } = data;
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `${import.meta.env.BASE_URL}dashboards/crm/`;
    navigate(path);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://doctorodinbackend.onrender.com/login",
        data
      );
      if (res.status === 200) {
        const user = res?.data;
        setShow(true);
        localStorage.setItem("token", user?.token);
        console.log(user);
        setTimeout(() => {
          routeChange();
        }, 1000);
      } else {
        const errorData = res.data;
        setError(errorData.message);
        setShow(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid Credentials!!");
      setShow(true);
    }
  };

  // const Login = (e: any) => {
  //   e.preventDefault();
  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       console.log(user);
  //       routeChange();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setError(err.message);
  //     });
  // };
  // const Login1 = () => {
  //   if (data.email == "example@gmail.com" && data.password == "password123") {
  //     routeChange();
  //   } else {
  //     setError("The Auction details did not Match");
  //     setData({
  //       email: "example@gmail.com",
  //       password: "password123",
  //     });
  //   }
  // };

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
                <strong className="me-auto">Dr.Odin</strong>
              </Toast.Header>
              <Toast.Body>{err ? err : "Successfully Logged In!!"}</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
          <Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
            <div className="my-5 d-flex justify-content-center">
              <Link to={`${import.meta.env.BASE_URL}dashboards/crm/`}>
                <img src={desktoplogo} alt="logo" className="desktop-logo" />
                <img
                  src={desktopdarklogo}
                  alt="logo"
                  className="desktop-dark"
                />
              </Link>
            </div>
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
                      <p className="mb-4 text-muted op-7 fw-normal text-center">
                        Welcome back Dr.Odin!
                      </p>
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
                            <Link to="#" className="float-end text-danger">
                              Forget password ?
                            </Link>
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
                          <div className="mt-2">
                            <div className="form-check">
                              <Form.Check
                                className=""
                                type="checkbox"
                                value=""
                                id="defaultCheck1"
                              />
                              <Form.Label
                                className=" text-muted fw-normal"
                                htmlFor="defaultCheck1"
                              >
                                Remember password ?
                              </Form.Label>
                            </div>
                          </div>
                        </Col>
                        <Col xl={12} className="d-grid mt-2">
                          <Button
                            variant="primary"
                            onClick={() => {
                              handleLogin();
                            }}
                            size="lg"
                            className="btn"
                          >
                            Sign In
                          </Button>
                        </Col>
                      </div>
                      <div className="text-center">
                        <p className="fs-12 text-muted mt-3">
                          Dont have an account?{" "}
                          <Link
                            to={`${
                              import.meta.env.BASE_URL
                            }authentication/signup/signupcover`}
                            className="text-primary"
                          >
                            Sign Up
                          </Link>
                        </p>
                      </div>
                      <div className="text-center my-3 authentication-barrier">
                        <span>OR</span>
                      </div>
                      <div className="btn-list text-center">
                        <Button variant="light" className="btn btn-icon">
                          <i className="ri-facebook-line fw-bold text-dark op-7"></i>
                        </Button>
                        <Button variant="light" className="btn btn-icon">
                          <i className="ri-google-line fw-bold text-dark op-7"></i>
                        </Button>
                        <Button variant="light" className="btn btn-icon">
                          <i className="ri-twitter-line fw-bold text-dark op-7"></i>
                        </Button>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="firebase" className="border-0 pb-2">
                    <div className="p-4">
                      <p className="h5 fw-semibold mb-2 text-center">Sign In</p>
                      <p className="mb-4 text-muted op-7 fw-normal text-center">
                        Welcome back Jhon !
                      </p>
                      <div className="row gy-3">
                        {err && <Alert variant="danger">{err}</Alert>}
                        <Col xl={12}>
                          <Form.Label
                            htmlFor="signin-username"
                            className="text-default"
                          >
                            Email
                          </Form.Label>
                          <Form.Control
                            size="lg"
                            className="form-control"
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
                            <Link to="#" className="float-end text-danger">
                              Forget password ?
                            </Link>
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              size="lg"
                              className="form-control"
                              placeholder="password"
                              name="password"
                              type="password"
                              value={password}
                              onChange={changeHandler}
                              required
                            />
                            <Button
                              variant="light"
                              className="btn"
                              type="button"
                              id="button-addon2"
                            >
                              <i className="ri-eye-off-line align-middle"></i>
                            </Button>
                          </InputGroup>
                          <div className="mt-2">
                            <div className="form-check">
                              <Form.Check
                                className=""
                                type="checkbox"
                                value=""
                                id="defaultCheck1"
                              />
                              <Form.Label
                                className="form-check-label text-muted fw-normal"
                                htmlFor="defaultCheck1"
                              >
                                Remember password ?
                              </Form.Label>
                            </div>
                          </div>
                        </Col>
                        <Col xl={12} className="d-grid mt-2">
                          <Button
                            variant="primary"
                            size="lg"
                            className="btn"
                            onClick={Login}
                          >
                            Sign In
                          </Button>
                        </Col>
                      </div>
                      <div className="text-center">
                        <p className="fs-12 text-muted mt-3">
                          Dont have an account?{" "}
                          <Link
                            to={`${import.meta.env.BASE_URL}firebase/signup`}
                            className="text-primary"
                          >
                            Sign Up
                          </Link>
                        </p>
                      </div>
                      <div className="text-center my-3 authentication-barrier">
                        <span>OR</span>
                      </div>
                      <div className="btn-list text-center">
                        <Button variant="light" className="btn btn-icon">
                          <i className="ri-facebook-line fw-bold text-dark op-7"></i>
                        </Button>
                        <Button variant="light" className="btn btn-icon">
                          <i className="ri-google-line fw-bold text-dark op-7"></i>
                        </Button>
                        <Button variant="light" className="btn btn-icon">
                          <i className="ri-twitter-line fw-bold text-dark op-7"></i>
                        </Button>
                      </div>
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
