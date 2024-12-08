import React, { useState, useEffect } from "react";
import { Card, Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const { id } = useParams(); 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/forgotPassword");
    }
  }, [id, navigate]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      await axios.patch(`http://localhost:9999/user/${id}`, {
        password: newPassword,
      });

      setSuccess("Password has been updated successfully.");
      setTimeout(() => navigate(`/login`), 2000); 
    } catch (err) {
      setError("Failed to update password. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <Card style={{ width: "28rem", padding: "25px" }}>
            <Card.Header className="bg-primary text-white text-center h5">
              Reset Your Password
            </Card.Header>
            <Card.Body>
              <Card.Text className="text-center mb-4">
                Enter a new password and confirm it to reset your password.
              </Card.Text>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handlePasswordReset}>
                <Form.Group controlId="newPassword" className="mb-3">
                  <Form.Label style={{ fontWeight: "bold", fontSize: "16px", float: 'left' }}>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label style={{ fontWeight: "bold", fontSize: "16px", float: 'left' }}>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Reset Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
