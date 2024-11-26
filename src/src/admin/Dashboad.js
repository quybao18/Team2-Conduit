import React from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { FaUserCircle, FaBell, FaCog, FaHome } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";

function Setting() {

  const navigate = useNavigate();

  return (
    <Container fluid className="bg-light" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <HeaderAdmin />

      <Row>
        {/* Sidebar */}
        <Col
          md="auto"
          style={{
            width: "250px",
            background: "#2c3e50",
            color: "white",
            padding: 0,
          }}
        >
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col style={{ marginLeft: "10px" }} className="p-4">
          {/* Dashboard Section */}
          <div id="dashboard" className="mb-5">
            <h3 className="mb-4">Dashboard</h3>
            <Row className="g-4">
              <Col md={4}>
                <Card
                  className="text-center shadow-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body>
                    <Card.Title>Total Posts</Card.Title>
                    <Card.Text className="fs-4 text-primary">120</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  className="text-center shadow-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body>
                    <Card.Title>Active Users</Card.Title>
                    <Card.Text className="fs-4 text-success">45</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  className="text-center shadow-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body>
                    <Card.Title>New Registrations</Card.Title>
                    <Card.Text className="fs-4 text-warning">15</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Setting;
