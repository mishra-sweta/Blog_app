import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/blog.css";

export default function BlogCard(props) {
  return (
    <Container>
      <Card className="blog-card shadow p-3 mb-5 bg-white rounded">
        <Card.Img
          className="blog-image rounded"
          variant="top"
          src={props.image}
        />
        <Card.Body className="blog-details">
          <Card.Title className="blog-title">{props.title}</Card.Title>
          <Card.Text className="blog-card-description">{props.text}</Card.Text>

          <Link to={`/blogs/${props.id}`}>
            <Button className="blog-button" variant="outline-secondary">
              Read more
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
