import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Nav, Table, Button, Form, FormControl } from "react-bootstrap";
import { FaUserCircle, FaBell, FaCog, FaChartBar, FaUser, FaUsersCog, FaHome } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import ErrorPage from "../components/ErrorPage";
import axios from "axios";
import UpdateRole from "./UpdateRole";

function ManaAccount() {

    const [users, setUsers] = useState([]);
    const [role, setRole] = useState([]);
    const [authentication, setAuthentication] = useState(null);

    const [selectedUser, setSelectedUser] = useState(null);
    const [showUpdateRole, setShowUpdateRole] = useState(false);
    const handleShowUpdateRole = (uid) => {
        setSelectedUser(uid);
        setShowUpdateRole(true);
    };
    const handleHideUpdateRole = () => setShowUpdateRole(false);


    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setAuthentication(userData);
        }
        const fetchData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:9999/user');
                const roleResponse = await axios.get('http://localhost:9999/role');
                setUsers(userResponse.data);
                setRole(roleResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])


    const handleDelete = async (uid) => {
        const confirm = window.confirm('Are you sure you want to delete this user?');
        if (confirm) {
            try {
                await axios.delete(`http://localhost:9999/user/${uid}`);
                setUsers(users.filter(user => user.id !== uid));
                alert('User deleted successfully');
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <>
            {
                (authentication?.roleId === 0) ? (
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
                                            {
                                                users.map((user, index) => {
                                                    return <tr key={index}>
                                                        <td>{user.id}</td>
                                                        <td>{user.userName}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            {
                                                                role.find(role => role.id === user.roleId)?.roleName
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button variant="primary" size="sm" className="me-2" onClick={() => handleShowUpdateRole(user.id)}>
                                                                Update
                                                            </Button>
                                                            {
                                                                user.roleId === 0 ? (
                                                                    <></>
                                                                ) : (
                                                                    <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                                                                        Delete
                                                                    </Button>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                        <UpdateRole show={showUpdateRole} handleClose={handleHideUpdateRole} userId={selectedUser} />
                    </Container>
                ) : (
                    <>
                        <ErrorPage />
                    </>
                )
            }
        </>
    );
}

export default ManaAccount;
