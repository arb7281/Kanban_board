import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert  } from 'react-bootstrap';
import { registerUser } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Registration.css"

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    contactNumber: '',
    password: '',
    // profileImage: ''
  });

  const [errors, setErrors] = useState({});
  const {user} = useSelector((state) => state.auth)
 

  const dispatch = useDispatch()
  const navigate = useNavigate()


    if (user !== null) {
      navigate('/dashboard');
    }
 
    const validateForm = () => {
      const newErrors = {};
      const { name, username, email, contactNumber, password } = formData;
  
      if (!name) newErrors.name = 'Name is required';
      if (!username || username.length < 6) newErrors.username = 'Username must be at least 6 characters';
      if (!email || !/^[\w-]+@[\w-]+\.[\w-]+$/.test(email)) newErrors.email = 'Email must be in the format example@something.com';
      if (!contactNumber || !/^\d{10}$/.test(contactNumber)) newErrors.contactNumber = 'Contact number must be 10 DIGITS long';
      if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    if(validateForm()){
      dispatch(registerUser(formData))
      navigate("/login")
    }
      
    
    
  };

  return (

<section className="h-auto" >
<Container className="h-100">
  <Row className="d-flex justify-content-center align-items-center h-100">
    <Col lg={12} xl={11}>
      <div className="card text-black reg h-100 mb-5" style={{ borderRadius: '25px' }}>
        <div className="card-body p-md-5">
          <Row className="justify-content-center">
            <Col md={10} lg={6} xl={5}>
              <h2 className="text-center fw-bold mb-5 mt-4">Registration</h2>

              <Form onSubmit={handleSubmit}>
                {Object.keys(errors).length > 0 && (
                  <Alert variant="danger">
                    {Object.values(errors).map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </Alert>
                )}

                <Form.Group controlId="formName" className="mb-4">
                  <Row>
                    <Col md={4} xs={12} className="label-col">
                      <Form.Label className="fw-bold">Name</Form.Label>
                    </Col>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formUsername" className="mb-4">
                  <Row>
                    <Col md={4} xs={12} className="label-col">
                      <Form.Label className="fw-bold">Username</Form.Label>
                    </Col>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a username"
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-4">
                  <Row>
                    <Col md={4} xs={12} className="label-col">
                      <Form.Label className="fw-bold">Email</Form.Label>
                    </Col>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formContactNumber" className="mb-4">
                  <Row>
                    <Col md={4} xs={12} className="label-col">
                      <Form.Label className="fw-bold">Contact Number</Form.Label>
                    </Col>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter your contact number"
                        isInvalid={!!errors.contactNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contactNumber}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-4">
                  <Row>
                    <Col md={4} xs={12} className="label-col">
                      <Form.Label className="fw-bold">Password</Form.Label>
                    </Col>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter a strong password"
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Form.Group>

                <div className="d-flex reg-btn justify-content-center mx-4 mb-3 mb-lg-4">
                  <Button variant="primary" type="submit" className="w-100">
                    Register
                  </Button>
                </div>
              </Form>

              <div className="d-flex justify-content-center align-items-center my-4">
                <p className="mb-0">Already have an account?</p>
                <a href="/login" className="btn btn-secondary ms-2">
                  Log In
                </a>
              </div>
            </Col>

            <Col md={10} lg={6} xl={7} className="d-flex align-items-center order-1 order-lg-2">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                className="img-fluid"
                alt="Sample image"
              />
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

export default Registration;
