import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [captchaValue, setCaptchaValue] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const validateForm = () => {
    const newErrors = {};
    const { emailOrUsername, password } = formData;

    if (!emailOrUsername)
      newErrors.emailOrUsername = "Email or Username is required";
    if (!password) newErrors.password = "Password is required";
    if (!captchaValue) newErrors.captcha = "Please complete the CAPTCHA";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const resultAction = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials");
      }
    }
  };

  return (
    <section className="h-auto">
      <Container className="h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col lg={12} xl={11}>
            <div
              className="card mt-5 text-black reg h-100 mb-5"
              style={{ borderRadius: "25px" }}
            >
              <div className="card-body p-md-5">
                <Row className="justify-content-center">
                  <Col md={8} lg={6}>
                    <h2 className="text-center fw-bold mb-5 mt-4">Login</h2>

                    <Form onSubmit={handleSubmit}>
                      {Object.keys(errors).length > 0 && (
                        <Alert variant="danger">
                          {Object.values(errors).map((error, index) => (
                            <div key={index}>{error}</div>
                          ))}
                        </Alert>
                      )}

                      <Form.Group
                        controlId="formEmailOrUsername"
                        className="mb-4"
                      >
                        <Row>
                          <Col
                            md={4}
                            xs={12}
                            className="d-flex align-items-center label-col"
                          >
                            <Form.Label className="fw-bold text-md-end">
                              Email or Username
                            </Form.Label>
                          </Col>
                          <Col md={8} xs={12}>
                            <Form.Control
                              type="text"
                              name="emailOrUsername"
                              value={formData.emailOrUsername}
                              onChange={handleChange}
                              placeholder="Enter email or username"
                              isInvalid={!!errors.emailOrUsername}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.emailOrUsername}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group controlId="formPassword" className="mb-4">
                        <Row>
                          <Col
                            md={4}
                            xs={12}
                            className="d-flex align-items-center label-col"
                          >
                            <Form.Label className="fw-bold text-md-end">
                              Password
                            </Form.Label>
                          </Col>
                          <Col md={8} xs={12}>
                            <Form.Control
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Enter your password"
                              isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Row className="mb-3 justify-content-center">
                        <Col
                          className="d-flex flex-column align-items-center"
                          md={12}
                        >
                          <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={handleCaptchaChange}
                          />
                          {errors.captcha && (
                            <div className="text-danger mt-2 text-center">
                              {errors.captcha}
                            </div>
                          )}
                        </Col>
                      </Row>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-4"
                      >
                        Login
                      </Button>
                    </Form>

                    <div className="d-flex justify-content-center align-items-center">
                      <p className="mb-0">Don't have an account?</p>
                      <a href="/" className="btn btn-primary ms-2">
                        Sign Up
                      </a>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
