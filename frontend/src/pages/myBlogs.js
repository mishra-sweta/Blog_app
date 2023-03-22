import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";
import Header from "../components/Header";
import BlogEditCard from "../components/BlogEditCard";
import axios from "axios";
import "../styles/blog.css";

const baseURL = process.env.REACT_APP_baseURL;
let c = 1;

export default function MyBlogs() {
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

  const [blogs, setBlogs] = useState([]);

  async function fetchData() {
    const response = await axios
      .get(baseURL + "/blogs/myblogs", config)
      .then((response) => {
        const blogs = response.data;
        setBlogs(blogs); // set the posts data in state
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const total = blogs.length;

  return (
    <div className="home-page">
      <Header />
      <Col style={{ padding: "3%" }}>
        <h3 style={{ padding: "2%" }}>Total number of blogs : {total}</h3>

        {blogs.map((blog, index) => (
          <Row>
            <div>
              <BlogEditCard
                index={index}
                key={blog.id}
                title={blog.title}
                createdAt={blog.createdAt}
                id={blog._id}
              />
            </div>
          </Row>
        ))}
      </Col>
    </div>
  );
}
