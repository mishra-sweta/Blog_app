import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Register from "./pages/register.js";
import Login from "./pages/login.js";
import BlogDetails from "./pages/blogDetails.js";
import CreateBlog from "./pages/createBlog.js";
import MyBlogs from "./pages/myBlogs.js";
import UpdateBlog from "./pages/updateBlog.js";
import Profile from "./pages/profile.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/blogs/:id" element={<BlogDetails />} />
        <Route exact path="/blogs/create" element={<CreateBlog />} />
        <Route exact path="/blogs/myblogs" element={<MyBlogs />} />
        <Route exact path="/blogs/update/:id" element={<UpdateBlog />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
