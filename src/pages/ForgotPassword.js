import React, { useState } from "react";
import { Card, Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Gửi request đến JSON Server để kiểm tra email
      const response = await axios.get(`http://localhost:9999/user?email=${email}`);

      if (response.data.length > 0) {
        // Nếu email tồn tại, chuyển hướng đến trang đổi mật khẩu
        setSuccess("Email found. Redirecting to reset password...");
        setTimeout(() => navigate(`/reset-password/${response.data[0].id}`), 2000);
      } else {
        // Nếu email không tồn tại
        setError("Email not found. Please check and try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <Card style={{ width: "28rem", padding: "25px" }}>
            <Card.Header className="bg-primary text-white text-center h5">
              Password Reset
            </Card.Header>
            <Card.Body>
              <Card.Text className="text-center mb-4">
                Enter your email address, and we’ll send instructions to reset your password.
              </Card.Text>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label style={{ fontWeight: "bold", fontSize: "16px", float: 'left' }}>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Reset Password
                </Button>
              </Form>
              <div className="d-flex justify-content-between">
                <a href="/login" className="text-decoration-none">Login</a>
                <a href="/register" className="text-decoration-none">Register</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
