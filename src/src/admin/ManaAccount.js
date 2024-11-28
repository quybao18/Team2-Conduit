import React from "react";
import { Container, Row, Col, Card, Nav, Table, Button } from "react-bootstrap";
import { FaUserCircle, FaBell, FaCog, FaChartBar, FaUser, FaUsersCog, FaHome } from "react-icons/fa";
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
                    {/* Manage Users Section */}
                    <div id="manage-users" className="mb-5">
                        <h3 className="mb-4">Manage Users</h3>
                        <Table
                            striped
                            bordered
                            hover
                            className="shadow-sm"
                            style={{ borderRadius: "15px", overflow: "hidden" }}
                        >
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>john@example.com</td>
                                    <td>User</td>
                                    <td>
                                        <Button variant="primary" size="sm" className="me-2">
                                            Edit
                                        </Button>
                                        <Button variant="danger" size="sm">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jane Smith</td>
                                    <td>jane@example.com</td>
                                    <td>Admin</td>
                                    <td>
                                        <Button variant="primary" size="sm" className="me-2">
                                            Edit
                                        </Button>
                                        <Button variant="danger" size="sm">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Setting;
