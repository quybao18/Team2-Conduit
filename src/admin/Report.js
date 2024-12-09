import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table, Button, Badge, Breadcrumb, Modal, Pagination } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import HeaderAdmin from '../components/HeaderAdmin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Report() {

    const [reports, setReports] = useState([]);
    const [users, setUsesrs] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:9999/user');
                const reportsResponse = await axios.get('http://localhost:9999/report');
                const postsResponse = await axios.get('http://localhost:9999/post');
                const commentsResponse = await axios.get('http://localhost:9999/comment');
                setUsesrs(usersResponse.data);
                setPosts(postsResponse.data);
                setComments(commentsResponse.data);
                setReports(reportsResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const handleShowModal = (report) => {
        setSelectedReport(report);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReport(null);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const updatedReports = reports.map(report =>
                report.id === id ? { ...report, status: newStatus } : report
            );
            setReports(updatedReports);

            const reportToUpdate = reports.find(report => report.id === id);
            if (reportToUpdate) {
                await axios.put(`http://localhost:9999/report/${id}`, {
                    ...reportToUpdate,
                    status: newStatus,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (rid) => {
        try {
            await axios.delete(`http://localhost:9999/report/${rid}`);
            setReports(reports.filter(report => report.id !== rid));
            alert('Report deleted successfully');
            navigate('/report')
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <Container fluid className="bg-light" style={{ minHeight: '100vh' }}>
            {/* Header */}
            <HeaderAdmin />

            <Row>
                {/* Sidebar */}
                <Col
                    md="auto"
                    style={{
                        width: '250px',
                        background: '#2c3e50',
                        color: 'white',
                        padding: 0,
                    }}
                >
                    <Sidebar />
                </Col>

                <Col className="p-4">


                    <h2 className="mb-4">User Reports</h2>

                    <Table striped bordered hover responsive className="bg-white shadow-sm">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created Time</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr key={index}>
                                    <td>{report.id}</td>
                                    <td>
                                        {
                                            users.find(user => user.id === report.userId)?.email
                                        }
                                    </td>
                                    <td>{report.title}</td>
                                    <td className="text-truncate" style={{ maxWidth: '150px' }}>
                                        {report.description}
                                    </td>
                                    <td>{report.createdTime}</td>
                                    <td>
                                        <Badge bg={report.type === 'post' ? 'info' : 'warning'}>
                                            {report.type}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge
                                            bg={report.status === 'Pending' ? 'warning' : 'success'}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleStatusChange(report.id, report.status === 'pending' ? 'approved' : 'pending')}
                                        >
                                            {report.status}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleShowModal(report)}
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleDelete(report.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {selectedReport && (
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Report Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            selectedReport.type === 'post' ? (
                                <>
                                    <p><strong style={{ color: 'skyblue' }}>Post Details</strong></p>
                                    {
                                        posts.map(post => {
                                            if (post.id === selectedReport.pomentId) {
                                                return (
                                                    <div key={post.id}>
                                                        <p><strong>Post ID: </strong>{post.id}</p>
                                                        <p><strong>Author: </strong>{users.find(user => user.id === post.userId)?.userName}</p>
                                                        <p><strong>Post Title: </strong>{post.title}</p>
                                                        <p><strong>Post Description: </strong>{post.description}</p>
                                                        <p><strong>Post Created Time: </strong>{post.createdTime}</p>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })
                                    }
                                </>
                            ) : (
                                <>
                                    <p><strong style={{ color: 'skyblue' }}>Comment Details</strong></p>
                                    {
                                        comments.map(comment => {
                                            if (comment.id === selectedReport.pomentId) {
                                                return (
                                                    <div key={comment.id}>
                                                        <p><strong>Comment ID:</strong> {comment.id}</p>
                                                        <p><strong>Author: </strong>{users.find(user => user.id === comment.userId)?.userName}</p>
                                                        <p><strong>Comment Content: </strong>{comment.content}</p>
                                                        <p><strong>Comment Created Time: </strong>{comment.createdTime}</p>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })
                                    }
                                </>
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => handleStatusChange(selectedReport.id, 'approved')}>
                            Approve
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}

export default Report;
