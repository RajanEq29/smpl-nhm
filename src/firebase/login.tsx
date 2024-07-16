import { FC, Fragment, useState } from "react";
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
import favicon from "../assets/images/brand-logos/favicon.ico";
import { useAdminLoginUserMutation } from "../redux/Admin";

interface LoginProps {
  ThemeChanger: () => void;
}

const Login: FC<LoginProps> = ({ ThemeChanger }) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [isToastVisible, setToastVisible] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginAdmin] = useAdminLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response: any = await loginAdmin(formData);
      console.log("Login response: ", response);

      if (response?.data?.token) {
        setToastVisible(true);
        // navigate("upload-pdf");
        setUserName(response.data.userData.name);
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          setTimeout(() => navigate("upload-pdf"), 1000);
        }
      } else {
        console.error("API error: ", response);
        setError(response?.error?.data?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error: ", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {isToastVisible && (
        <ToastContainer className="position-fixed top-0 end-0 me-4 mt-4">
          <Toast
            onClose={() => setToastVisible(false)}
            show={isToastVisible}
            delay={5000}
            autohide
            bg="primary-transparent"
            className="colored-toast"
          >
            <Toast.Header className="bg-primary text-fixed-white mb-0">
              <img
                className="bd-placeholder-img rounded me-2"
                src={favicon}
                alt="..."
              />
              <strong className="me-auto">{userName}</strong>
            </Toast.Header>
            <Toast.Body>
              {error ? error : "Successfully Logged In!!"}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}

      <div className="container">
        <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
          <Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
            <Tab.Container id="left-tabs-example" defaultActiveKey="react">
              <Card>
                <Tab.Content>
                  <Tab.Pane eventKey="react" className="border-0 pb-2">
                    <div className="p-4">
                      <p className="h5 fw-semibold mb-2 text-center">Sign In</p>
                      <div className="row gy-3">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Col xl={12}>
                          <Form.Label
                            htmlFor="signin-email"
                            className="form-label text-default"
                          >
                            Email
                          </Form.Label>
                          <Form.Control
                            size="lg"
                            placeholder="Enter your email"
                            name="email"
                            type="email"
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
                              placeholder="Enter your password"
                              name="password"
                              type={passwordShow ? "text" : "password"}
                              value={password}
                              onChange={changeHandler}
                              required
                            />
                            <Button
                              variant="light"
                              type="button"
                              onClick={() => setPasswordShow(!passwordShow)}
                            >
                              <i
                                className={`${
                                  passwordShow
                                    ? "ri-eye-line"
                                    : "ri-eye-off-line"
                                } align-middle`}
                                aria-hidden="true"
                              ></i>
                            </Button>
                          </InputGroup>
                        </Col>
                        <Col xl={12} className="d-grid mt-2">
                          <Button
                            onClick={handleLogin}
                            className="bg-primary rounded-2 py-2 fw-semibold fs-6 text-fixed-white border-0"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm mx-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Logging in...
                              </>
                            ) : (
                              "Login"
                            )}
                          </Button>
                        </Col>
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

export default Login;
