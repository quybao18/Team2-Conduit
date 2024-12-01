import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, ListGroup, Button } from "react-bootstrap";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Profile() {

    const {uid} = useParams();

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const userResponse = await axios.get(`http://localhost:9999/user/${uid}`);
                setUser(userResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [uid])


  return (
    <>
    <Header/>
    <Container className="py-5 mt-5">
        <Card className="shadow-lg border-0">
        <Row className="g-0">
          <Col md={4} className="bg-primary text-center text-white d-flex flex-column justify-content-center align-items-center p-4">
            <Image
              src={`../images/${user.avatar}.png`} 
              roundedCircle
              fluid
              style={{ width: "150px", height: "150px", border: "5px solid #fff" }}
            />
            <h3 className="mt-3">{user.userName}</h3>
            <p>Software Developer</p>
            <Button variant="light" size="sm" className="mt-2">
              <FaUserCircle className="me-2"/>
              <span onClick={() => navigate(`/updateProfile/${uid}`)}>Edit Profile</span>
            </Button>
          </Col>
          <Col md={8}>
            <Card.Body>
              <h4 className="mb-3 text-primary">About Me</h4>
              <p className="text-muted">
                {user.bio}
              </p>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-center">
                  <FaEnvelope className="me-3 text-primary" />
                  <strong>Email: </strong> {user.email}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <FaMapMarkerAlt className="me-3 text-primary" />
                  <strong>Address: </strong> {user.address}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <FaPhone className="me-3 text-primary" />
                  <strong>Phone: </strong> {user.phone}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
    <Footer/>
    </>
  );
}

export default Profile;
