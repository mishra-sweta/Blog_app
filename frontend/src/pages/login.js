import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert.js";

import "../styles/auth.css";

const initialValues = {
  username: "",
  password: "",
};

const baseURL = process.env.REACT_APP_baseURL;

export default function Login() {
  const [loginData, setLogin] = useState(initialValues);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  function onInputChange(e) {
    setLogin({ ...loginData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(baseURL + "/users/login", loginData);
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("data", JSON.stringify(response.data));
        navigate("/"); // Redirect to the home page
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <Container>
          {error && <ErrorAlert variant="danger" message={error} />}
        </Container>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row style={{ paddingBlock: "3%" }}>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={loginData.username}
                    onChange={onInputChange}
                    name="username"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={onInputChange}
                    name="password"
                    required
                  />
                </Form.Group>

                <Form.Text>
                  Don't have an account? <Link to="/register">Click here</Link>
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="success" type="submit" className="auth-button">
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Card>
    </div>
  );
}
