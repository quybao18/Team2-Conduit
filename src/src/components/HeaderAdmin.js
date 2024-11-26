import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaUserCircle, FaBell, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HeaderAdmin() {
  const navigate = useNavigate();

  return (
    <Row
      className="align-items-center shadow-sm px-3"
      style={{
        background: "#2c3e50",
        color: "white",
        height: "70px",
      }}
    >
      <Col
        md={6}
        className="d-flex align-items-center"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        <span className="me-3" style={{ color: "#f39c12" }}>•</span> Admin Dashboard
      </Col>
      <Col md={6} className="text-end">
        <div
          className="d-inline-flex align-items-center me-4"
          style={{
            cursor: "pointer",
            background: "#34495e",
            padding: "5px 10px",
            borderRadius: "20px",
            fontSize: "0.9rem",
          }}
        >
          <FaBell className="me-2" size={18} title="Notifications" />
          <span>3 New</span>
        </div>

        <div
          onClick={() => navigate("/")}
          className="d-inline-flex align-items-center me-4"
          style={{
            cursor: "pointer",
            background: "#34495e",
            padding: "5px 10px",
            borderRadius: "20px",
            fontSize: "0.9rem",
          }}
        >
          <FaHome className="me-2" size={18} title="Home" />
          <span>Home</span>
        </div>

        <div className="d-inline-flex align-items-center">
          <span className="me-2">John Doe</span>
          <FaUserCircle size={30} title="Profile" />
        </div>
      </Col>
    </Row>
  );
}

export default HeaderAdmin;
