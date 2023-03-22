import { React, useEffect } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const profile = {
    name: user.name,
    email: user.email,
    bio: `Hey ! This is ${user.name}. I love blogging and sharing my opinions.`,
    avatarUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg",
  };

  return (
    <div>
      <Header />
      <Container className="my-3">
        <Card className=" shadow p-3 mb-5 bg-white rounded">
          <Col>
            <Row xs={12} md={3} className="justify-content-center">
              <Image
                src={profile.avatarUrl}
                roundedCircle
                style={{ width: "225px", height: "200px" }}
              />
            </Row>
            <Row xs={12} md={9} className="d-flex justify-content-center">
              <h2 className="d-flex justify-content-center">{profile.name}</h2>
              <p className="d-flex justify-content-center">
                email : {profile.email}
              </p>
              <p className="d-flex justify-content-center">
                About me : {profile.bio}
              </p>
            </Row>
          </Col>
        </Card>
      </Container>
    </div>
  );
};

export default Profile;
