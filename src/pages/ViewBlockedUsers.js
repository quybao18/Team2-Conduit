import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner, Alert } from "react-bootstrap";
import { FaUserAlt, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "../api/contacts";
import Header from '../components/Header';
import Footer from '../components/Footer';

const ViewBlockedUsers = () => {
  const { uid } = useParams();
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlockedUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:9999/block", {
        params: { user_id: uid }
      });
      setBlockedUsers(response.data);
    } catch (err) {
      setError("Error fetching blocked users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async (blockId) => {
    const confirm = window.confirm("Are you sure you want to unblock this user?");
    if (confirm) {
      try {
        await axios.delete(`http://localhost:9999/block/${blockId}`);
        setBlockedUsers(blockedUsers.filter((user) => user.id !== blockId));
        alert("User unblocked successfully");
      } catch (error) {
        console.error("Error unblocking user:", error);
      }
    }
  };

  useEffect(() => {
    if (uid) {
      fetchBlockedUsers();
    }
  }, [uid]);

  return (
    <div>
      <Header />
      <Container className="my-5"> {/* Increased vertical margin */}
        <Row className="my-4"> {/* Adjusted margin for the Row */}
          <Col>
            <h1 className="text-center">Blocked Users</h1>

            {loading && (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
              </div>
            )}

            {/* Display error message if there was an issue fetching data */}
            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}

            {/* Display blocked users or a message if none are found */}
            {!loading && !error && blockedUsers.length === 0 && (
              <Alert variant="info" className="text-center">
                No blocked users found.
              </Alert>
            )}

            {/* Display blocked users in a table */}
            {!loading && !error && blockedUsers.length > 0 && (
              <Table striped bordered hover responsive className="text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Blocked User ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blockedUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.blocked_user_id}</td>
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

            {/* Button to refresh blocked users */}
            <Button variant="primary" onClick={fetchBlockedUsers} className="mt-3">
              Refresh List
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ViewBlockedUsers;
