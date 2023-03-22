import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";

const baseURL = process.env.REACT_APP_baseURL;

const initialValues = {
  title: "",
  content: "",
  image: "",
};

const CreateBlog = () => {
  const [data, setData] = useState(initialValues);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("data"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  function onInputChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        baseURL + "/blogs/create",
        data,
        config
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <Header />
      <Container style={{ paddingBlock: "3%" }}>
        <h1>Hey {user.name} , What's on your mind?</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title :</Form.Label>
            <Form.Control
              type="text"
              value={data.title}
              onChange={onInputChange}
              name="title"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content :</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.content}
              onChange={onInputChange}
              name="content"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image url :</Form.Label>
            <Form.Control
              type="text"
              value={data.image}
              onChange={onInputChange}
              name="image"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Publish
          </Button>
          {"  "}
          <Link to={"/"}>
            <Button variant="secondary">Cancel</Button>
          </Link>
        </Form>
      </Container>
    </div>
  );
};

export default CreateBlog;
