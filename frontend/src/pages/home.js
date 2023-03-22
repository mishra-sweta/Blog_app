import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import "../styles/blog.css";

const baseURL = process.env.REACT_APP_baseURL;

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [blogs, setBlogs] = useState([]);

  async function fetchData() {
    const response = await axios
      .get(baseURL + "/blogs/latest")
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

  return (
    <div className="home-page">
      <Header />
      <Row style={{ padding: "3%" }}>
        {blogs.map((blog) => (
          <Col>
            <div>
              <BlogCard
                key={blog.id}
                image={blog.image}
                title={blog.title}
                text={blog.content}
                id={blog._id}
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
