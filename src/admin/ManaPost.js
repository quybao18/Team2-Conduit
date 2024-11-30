import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Nav, Table, Button, FormControl } from "react-bootstrap";
import { FaUserCircle, FaBell, FaCog, FaChartBar, FaUser, FaUsersCog, FaHome, FaEye, FaTrashAlt } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";

function ManaPost() {

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsResponse = await axios.get('http://localhost:9999/post');
                const usersResponse = await axios.get('http://localhost:9999/user');
                const categoriesResponse = await axios.get('http://localhost:9999/category');
                setUsers(usersResponse.data);
                setPosts(postsResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const [search, setSearch] = useState('');

    const filterPosts = posts.filter(post => {
        const matchesPost = post.id.toString().toLowerCase().includes(search.toLowerCase());
        return matchesPost;
    })

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleDelete = async(pid) => {
        const confirm = window.confirm('Are you sure you want to delete this post?');
        if(confirm){
            try {
                await axios.delete(`http://localhost:9999/post/${pid}`);
                setPosts(posts.filter(post => post.id !== pid));
                setSearch('');
                navigate('/manaPost');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Container fluid className="bg-light" style={{ minHeight: "100vh" }}>
            <HeaderAdmin />

            <Row>
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
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                filterPosts.map((post, index) => {
                                    return (
                                        <tr key={post.id}>
                                            <td>{post.id}</td>
                                            <td>
                                                {
                                                    users.find(user => user.id === post.userId)?.userName
                                                }
                                            </td>
                                            <td>{post.title}</td>
                                            <td>{post.createdTime}</td>
                                            <td>
                                                {
                                                    categories.find(cate => cate.id === post.categoryId)?.categoryName
                                                }
                                            </td>
                                            <td className="d-flex justify-content-around">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(post.id)}
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

export default ManaPost