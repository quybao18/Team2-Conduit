import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, ListGroup, Button, Alert,  Spinner, Table } from "react-bootstrap";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUserAlt, FaUserCircle,FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Profile() {

    const {uid} = useParams();
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const userResponse = await axios.get(`http://localhost:9999/user/${uid}`);
                const blockResponse = await axios.get("http://localhost:9999/blockedUsers?userid="+uid);
                const blockedUsersData = blockResponse.data;
                const updatedBlockedUsers = [];
                for (const blockedUsers of blockedUsersData) {
                  const userResponse = await axios.get(`http://localhost:9999/user/${blockedUsers.blockeduserid}`);
                  updatedBlockedUsers.push({
                    ...blockedUsers,
                    blockedUserName: userResponse.data.userName, // Corrected to userName
                  });
                }
                setBlockedUsers(updatedBlockedUsers);
                setUser(userResponse.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [uid])

    const handleUnblock = async (blockId) => {
      const confirm = window.confirm("Are you sure you want to unblock this user?");
      if (confirm) {
        try {
          await axios.delete(`http://localhost:9999/blockedUsers/${blockId}`);
          setBlockedUsers(blockedUsers.filter((user) => user.id !== blockId));
          alert("User unblocked successfully");
        } catch (error) {
          console.error("Error unblocking user:", error);
        } 
      }
    };
  
  
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
                  <strong className="pe-1">Email: </strong> {user.email}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <FaMapMarkerAlt className="me-3 text-primary" />
                  <strong className="pe-1">Address: </strong> {user.address}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <FaPhone className="me-3 text-primary" />
                  <strong className="pe-1">Phone: </strong> {user.phone}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Row className="my-4">
          <Col>
          <h3 className="mb-4">Blocked Users</h3>

            {loading && (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
              </div>
            )}

            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}

            {!loading && !error && blockedUsers.length === 0 && (
              <Alert variant="info" className="text-center">
                No blocked users found.
              </Alert>
            )}

            {!loading && !error && blockedUsers.length > 0 && (
              <Table striped bordered hover responsive className="text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Blocked User Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blockedUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.blockedUserName}</td> {/* Corrected to blockedUserName */}
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleUnblock(user.id)}
                          size="sm"
                        >
                          <FaTrash /> Unblock
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

          </Col>
        </Row>
    </Container>
    <Footer/>
    </>
  );
}

export default Profile;
