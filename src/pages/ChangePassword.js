import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("User not logged in.");
        return;
      }

      const response = await axios.get(`http://localhost:9999/user/${user.id}`);
      const userData = response.data;

      if (userData.password !== currentPassword) {
        setError("Current password is incorrect.");
        return;
      }

      await axios.patch(`http://localhost:9999/user/${user.id}`, {
        password: newPassword,
      });

      setSuccess("Password updated successfully.");
      setTimeout(() => navigate(`/profile/${user.id}`), 2000);
    } catch (err) {
      setError("Failed to update password. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <Container className="py-5 mt-5 d-flex justify-content-center">
        <div
          style={{
            maxWidth: "500px",
            width: "100%",
            background: "white",
            borderRadius: "10px",
            padding: "30px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            className="text-center mb-4"
            style={{
              fontWeight: "bold",
              color: "#4a4a4a",
            }}
          >
            Change Password
          </h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label style={{ fontWeight: "500", fontSize: "14px", textAlign: "left", display: "block" }}>
                Current Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="rounded-3"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label style={{ fontWeight: "500", fontSize: "14px", textAlign: "left", display: "block" }}>
                New Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="rounded-3"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="confirmPassword">
              <Form.Label style={{ fontWeight: "500", fontSize: "14px", textAlign: "left", display: "block" }}>
                Confirm New Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="rounded-3"
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="w-100 rounded-3"
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                backgroundColor: "#007bff",
                borderColor: "#007bff",
              }}
            >
              Change Password
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default ChangePassword;
