import React from "react";
import { Container, Row, Col, Card, Nav, Table, Button } from "react-bootstrap";
import { FaUserCircle, FaBell, FaCog, FaChartBar, FaUser, FaUsersCog, FaHome } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";

function ManaCategory() {

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

        </Col>
      </Row>
    </Container>
  )
}

export default ManaCategory