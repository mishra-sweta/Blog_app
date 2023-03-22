import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/blog.css";
import { Pencil, Trash } from "react-bootstrap-icons";
import axios from "axios";
import React, { useEffect } from "react";
//import UpdateBlog from "../pages/UpdateBlog";

const baseURL = process.env.REACT_APP_baseURL;

export default function BlogCard(props) {
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

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        baseURL + `/blogs/delete/${props.id}`,
        config
      );
      console.log(response.data);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Container style={{ margin: "3px" }}>
      <Card className="shadow p-2 mb-2 bg-white rounded">
        <Container fluid>
          <Row>
            <Col>{props.index + 1}</Col>
            <Col>{props.title}</Col>
            <Col>{props.createdAt.substr(0, 10)}</Col>
            <Col>
              <Link to={`/blogs/update/${props.id}`}>
                <Button className="btn-sm" variant="secondary">
                  <Pencil /> Edit
                </Button>
              </Link>
            </Col>

            <Col>
              <Button
                className="btn-sm"
                variant="danger"
                onClick={handleDelete}
              >
                <Trash /> Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </Container>
  );
}
