import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "../styles/auth.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert.js";

const initialValues = {
  name: "",
  username: "",
  email: "",
  password: "",
};

const baseURL = "http://localhost:5000/api/users/register";

export default function Register() {
  const [registerData, setRegistration] = useState(initialValues);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function onInputChange(e) {
    setRegistration({ ...registerData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(baseURL, registerData);
      console.log(response.data);
      if (response.status === 200) {
        navigate("/login"); // Redirect to the login page
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="auth-page">
        <Card className="auth-card">
          <Container>
            {error && <ErrorAlert variant="danger" message={error} />}
          </Container>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Row style={{ paddingBlock: "2%" }}>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      value={registerData.name}
                      onChange={onInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={registerData.username}
                      onChange={onInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      name="email"
                      value={registerData.email}
                      onChange={onInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      value={registerData.password}
                      onChange={onInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Text>
                    Already have an account? <a href="./login">Click here</a>
                  </Form.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    variant="success"
                    type="submit"
                    className="auth-button"
                  >
                    Create account
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Card>
      </div>
    </>
  );
}
