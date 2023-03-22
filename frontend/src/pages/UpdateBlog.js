import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";

const baseURL = process.env.REACT_APP_baseURL;

const initialValues = {
  title: "",
  content: "",
  image: "",
};

const UpdateBlog = () => {
  const [data, setData] = useState(initialValues);
  const navigate = useNavigate();
  const { id } = useParams();
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

  async function fetchData() {
    const response = await axios
      .get(`${baseURL}/blogs/${id}`)
      .then((response) => {
        const data = response.data;
        setData(data); // set the posts data in state
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  function onInputChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        baseURL + `/blogs/update/${id}`,
        data,
        config
      );
      console.log(response.data);
      if (response.status === 200) {
        navigate(`/blogs/${id}`);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <Header />
      <Container style={{ paddingBlock: "3%" }}>
        <h1>Want to change something?</h1>
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
            Update
          </Button>
          {"  "}
          <Link to={"/blogs/myblogs"}>
            <Button variant="secondary">Cancel</Button>
          </Link>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateBlog;
