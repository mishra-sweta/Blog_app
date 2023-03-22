import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { ArrowBarRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("data"));
  function logout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Brain Dump</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/blogs/create">create blog</Nav.Link>
            <Nav.Link href="/blogs/myblogs">my blogs</Nav.Link>
            <Nav.Link href="/profile">my profile</Nav.Link>
            <Button
              variant="outline-secondary"
              className="btn-sm p-2 mb-1"
              onClick={logout}
            >
              <ArrowBarRight /> Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
