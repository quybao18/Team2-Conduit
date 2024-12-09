import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Nav, Table, Button, FormControl } from "react-bootstrap";
import { FaUserCircle, FaBell, FaCog, FaChartBar, FaUser, FaUsersCog, FaHome, FaTrashAlt, FaEye } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";

function ManaComment() {

    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commentsResponse = await axios.get('http://localhost:9999/comment');
                const usersResponse = await axios.get('http://localhost:9999/user');
                const categoriesResponse = await axios.get('http://localhost:9999/category');
                setUsers(usersResponse.data);
                setComments(commentsResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const [search, setSearch] = useState('');

    const filterComments = comments.filter(comment =>  {
        const matchesComment = comment.id.toString().toLowerCase().includes(search.toLowerCase());
        return matchesComment;
    })

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleDelete = async (cid) => {
        const confirm = window.confirm('Are you sure you want to delete this comment?');
        if(confirm){
            try {
                await axios.delete(`http://localhost:9999/comment/${cid}`);
                setComments(comments.filter(comment => comment.id !== cid));
                setSearch('');
                navigate(`/manaComment`)
            } catch (error) {
                console.log(error);
            }
        }
    }

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
            <Col style={{ marginLeft: "10px" }} className="p-4 mt-5">
            <FormControl
            type="text"
            placeholder="Search by id"
            value={search}
            onChange={handleChange}
            />
            <Table striped bordered hover responsive className="bg-white shadow-sm mt-5">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>ID</th>
                                <th>Author</th>
                                <th>Title</th>
                                <th>Created Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                filterComments.map((comment, index) => {
                                    return (
                                        <tr key={comment.id}>
                                            <td>{comment.id}</td>
                                            <td>
                                                {
                                                    users.find(user => user.id === comment.userId)?.userName
                                                }
                                            </td>
                                            <td>{comment.content}</td>
                                            <td>{comment.createdTime}</td>
                                            <td className="d-flex justify-content-around">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(comment.id)}
                                                >
                                                    <FaTrashAlt className="me-1" /> Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
            </Col>
          </Row>
        </Container>
      )
    }

export default ManaComment