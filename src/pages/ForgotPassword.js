import React from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";

function ForgotPassword() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <Card style={{ width: "22rem", padding: "20px" }}>
            <Card.Header className="bg-primary text-white text-center h5">
              Password Reset
            </Card.Header>
            <Card.Body>
              <Card.Text className="text-center mb-4">
                Enter your email address, and we’ll send instructions to reset your password.
              </Card.Text>
              <Form>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Reset Password
                </Button>
              </Form>
              <div className="d-flex justify-content-between">
                <a href="#" className="text-decoration-none">Login</a>
                <a href="#" className="text-decoration-none">Register</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
