import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/blog.css";
import Header from "../components/Header";

const baseURL = process.env.REACT_APP_baseURL;

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  async function fetchData() {
    const response = await axios
      .get(`${baseURL}/blogs/${id}`)
      .then((response) => {
        const blog = response.data;
        setBlog(blog); // set the posts data in state
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      <div className="blog-post ">
        <img
          src={blog.image}
          alt={blog.title}
          className="shadow p-2 mb-3 bg-white rounded"
        />
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
      </div>
    </>
  );
}

export default BlogDetails;
