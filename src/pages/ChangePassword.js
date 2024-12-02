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
      setError("Failed to update password.  Please try again.");
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      padding: "20px 30px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "left",
      marginBottom: "20px",
      fontWeight: "bold",
      color: "#333",
    },
    formGroup: {
      marginBottom: "15px",
    },
    button: {
      display: "block",
      width: "100%",
      backgroundColor: "#007bff",
      borderColor: "#007bff",
      padding: "10px",
      fontWeight: "bold",
      fontSize: "16px",
    },
  };

  return (
    <>
      <Header />
      <Container className="py-5 mt-5" style={styles.container}>
        <h2 style={styles.title}>Change Password</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handlePasswordChange}>
          <Form.Group controlId="currentPassword" style={styles.formGroup}>
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="newPassword" style={styles.formGroup}>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" style={styles.formGroup}>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={styles.button}>
            Change Password
          </Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

export default ChangePassword;
