import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, ListGroup, InputGroup, FormControl, Card, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import { FaFlag, FaTrash } from 'react-icons/fa';

function DetailPost() {

    const { pid } = useParams();

    const [user, setUser] = useState([]);
    const [post, setPost] = useState({});
    const [category, setCategory] = useState([]);
    const [comments, setComments] = useState([]);
    const [reports, setReports] = useState([]);

    const [authentication, setAuthentication] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerId, setFollowerId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authenData = localStorage.getItem('user');
                if (authenData) {
                    setAuthentication(JSON.parse(authenData));
                }

                const userResponse = await axios.get('http://localhost:9999/user');
                const postResponse = await axios.get(`http://localhost:9999/post/${pid}`);
                const categoryResponse = await axios.get('http://localhost:9999/category');
                const commentsResponse = await axios.get('http://localhost:9999/comment');
                const followingResponse = await axios.get('http://localhost:9999/follower');
                const reportsResponse = await axios.get('http://localhost:9999/report');
                setUser(userResponse.data);
                setPost(postResponse.data);
                setCategory(categoryResponse.data);
                setComments(commentsResponse.data);
                setReports(reportsResponse.data);
                if (authenData) {
                    const currentUserId = JSON.parse(authenData).id;
                    const isUserFollowing = followingResponse.data.some((follow) => follow.followerId === currentUserId && follow.followingId === postResponse.data.userId);
                    const followerId = followingResponse.data.filter((follow) => follow.followerId === currentUserId && follow.followingId === postResponse.data.userId);
                    setFollowerId(followerId[0].id);
                    setIsFollowing(isUserFollowing);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [pid]);
    console.log(followerId);
    const toggleFollow = async () => {
        try {
            if (authentication === null) {
                alert('Please login to follow');
                navigate('/login');
                return;
            }
            if (isFollowing) {
                //unfollow 
                await axios.delete(`http://localhost:9999/follower/${followerId}`);

            } else {
                //follow
                await axios.post('http://localhost:9999/follower', {

                    followerId: authentication.id,
                    followingId: post.userId
                });
            }
            setIsFollowing(!isFollowing);
            navigate(0);
        } catch (error) {
            console.log(error);
        }

    }



    const formatDate = (date) => {
        const year = date.getFullYear();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${day}-${month} ${hours}:${minutes}:${seconds}`;
    };

    const [addComment, setAddComment] = useState({
        content: '',
        createdTime: '',
        userId: null,
        postId: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddComment({
            ...addComment,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentTime = formatDate(new Date());
        const newComment = {
            ...addComment,
            id: comments.length + 1,
            userId: authentication.id,
            createdTime: currentTime,
            postId: post.id
        }
        try {
            const response = await axios.post('http://localhost:9999/comment', newComment);
            setComments((prevComments) => [
                ...prevComments,
                response.data
            ])
            alert('Comment added successfully');
            setAddComment({
                content: '',
            })
            navigate(`/post/${post.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (cid) => {
        const confirm = window.confirm('Are you sure you want to delete this comment?');
        if (confirm) {
            try {
                await axios.delete(`http://localhost:9999/comment/${cid}`);
                setComments(comments.filter(comment => comment.id !== cid));
                navigate(`/post/${post.id}`)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const handleShowModal = (report) => {
        setSelectedReport(report);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReport(null);
    }

    const [addReport, setAddReport] = useState({
        title: '',
        description: '',
        createdTime: '',
        type: 'post',
        status: 'pending',
        pomentId: null,
        userId: null
    })


    const handleChangeReport = (e) => {
        const { name, value } = e.target;
        setAddReport({
            ...addReport,
            [name]: name === 'pomentId' ? parseInt(value) : value
        })
    }

    const handleAddReport = async (e) => {
        e.preventDefault();
        try {
            if (authentication === null){
                alert('Please login to report!')
            }
            const currentTime = formatDate(new Date());
            const newReport = {
                ...addReport,
                id: reports.length + 1,
                createdTime: currentTime,
                pomentId: addReport.type === 'post' ? post.id : selectedReport?.id,
                userId: authentication.id
            }
            await axios.post('http://localhost:9999/report', newReport);
            navigate('/successReport');
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            <div className="my-5">
                <Row>
                    <Col md={12} className="mx-auto">
                        <div className="border-0 shadow-sm mb-5 p-4 bg-white rounded">
                            <div className="d-flex align-items-center mb-4">
                                {
                                    user.map(user => {
                                        if (user.id === post.userId) {
                                            return <img
                                                src={`../images/${user.avatar}.png`}
                                                alt="User Avatar"
                                                className="rounded-circle me-3"
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        }
                                    })
                                }
                                <div>
                                    <h5 className="fw-bold mb-0" style={{ textAlign: 'left' }}>
                                        {
                                            user.find(user => user.id === post.userId)?.userName
                                        }
                                    </h5>
                                    <small className="text-muted" style={{ textAlign: 'left', display: 'block' }}>{post.createdTime}</small>
                                </div>
                                {authentication?.id !== post.userId && (
                                    <Button style={{ marginLeft: 'auto' }} variant={isFollowing ? "danger" : "primary"} onClick={toggleFollow}>
                                        {isFollowing ? "Unfollow" : "Follow"}
                                    </Button>)}
                            </div>



                            <div className="d-flex flex-column align-items-start">
                                <h3 className=" fw-bold text-primary mb-3 w-100">
                                    {post.title}
                                </h3>
                                <div className="mb-3">
                                    <span className="badge bg-secondary me-2">
                                        {
                                            category.find((cate) => cate.id === post.categoryId)?.categoryName
                                        }
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <p className="fs-5 text-dark">
                                {post.description}
                            </p>
                            {
                                (authentication?.id === post?.userId) ? (
                                    <></>
                                ) : (
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            variant="outline-danger"
                                            className="d-flex align-items-center"
                                            onClick={() => handleShowModal(post)}>
                                            <FaFlag className="me-2" /> Report
                                        </Button>
                                    </div>
                                )

                            }
                        </div>
                    </Col>
                </Row>


                <Row >
                    <Col md={8} className="mx-auto">
                        <div className="comments-section mt-5">
                            <h2 className="h4 fw-bold text-dark mb-4">Comments</h2>

                            {
                                comments.map((comment, index) => {
                                    if (comment.postId === post.id) {
                                        return <Card className="border rounded shadow-sm mb-3">
                                            <Card.Body className="p-3">
                                                <Card.Text className="fs-5 mb-0" style={{ textAlign: 'left' }}>{comment.content}</Card.Text>
                                            </Card.Body>

                                            <Card.Footer className="bg-light px-3 py-2">
                                                <Row className="align-items-center">
                                                    <Col xs="auto">
                                                        {
                                                            user.map(user => {
                                                                if (user.id === comment.userId) {
                                                                    return <img
                                                                        src={`../images/${user.avatar}.png`}
                                                                        alt="User Avatar"
                                                                        className="rounded-circle me-3"
                                                                        style={{ width: '40px', height: '40px' }}
                                                                    />
                                                                }
                                                            })
                                                        }
                                                    </Col>
                                                    <Col style={{ textAlign: 'left' }}>
                                                        <span className="fw-bold text-success" style={{ display: 'block' }}>
                                                            {
                                                                user.find(user => user.id === comment.userId)?.userName
                                                            }
                                                        </span>
                                                        <small className="text-muted">{comment.createdTime}</small>
                                                    </Col>
                                                    <Col xs="auto" className="d-flex justify-content-end">
                                                        {

                                                            (authentication?.id === comment?.userId) ? (
                                                                <></>
                                                            ) : (
                                                                <Button
                                                                    variant="outline-warning"
                                                                    className="d-flex align-items-center me-3"
                                                                    style={{ padding: '0.2rem 0.4rem', fontSize: '0.9rem' }}
                                                                    onClick={() => handleShowModal(comment)}
                                                                >
                                                                    <FaFlag className="me-2" /> Report
                                                                </Button>
                                                            )
                                                        }

                                                        {(authentication?.id === comment.userId) && (
                                                            <FaTrash
                                                                className="text-danger"
                                                                style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                                                                onClick={() => handleDelete(comment.id)}
                                                            />
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    }
                                })
                            }

                            <Modal show={showModal} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Report </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleAddReport}>
                                        <Form.Group >
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter report title"
                                                name="title"
                                                value={addReport.title}
                                                onChange={handleChangeReport}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mt-3">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Describe the issue"
                                                name="description"
                                                value={addReport.description}
                                                onChange={handleChangeReport}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mt-3">
                                            <Form.Label>Type</Form.Label>
                                            <Form.Control
                                                as='select'
                                                name='type'
                                                value={addReport.type}
                                                onChange={handleChangeReport}
                                            >
                                                <option value='post'>Post</option>
                                                <option value='comment'>Comment</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseModal}>
                                                Close
                                            </Button>
                                            <Button variant="primary" type='submit'>
                                                Submit
                                            </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal.Body>
                            </Modal>

                            {
                                authentication ? (
                                    <>
                                        <div className="p-4 bg-light shadow-sm rounded mt-5">
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group controlId="commentInput" className="mb-3">
                                                    <Form.Label className="fw-bold">Leave a Comment</Form.Label>
                                                    <InputGroup>
                                                        <FormControl
                                                            as="textarea"
                                                            rows={4}
                                                            placeholder="Write your comment..."
                                                            className="rounded border-0 shadow-sm"
                                                            name='content'
                                                            value={addComment.content}
                                                            onChange={handleChange}
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className="w-100 py-2 fw-bold shadow-sm"
                                                >
                                                    Post Comment
                                                </Button>
                                            </Form>
                                        </div>
                                    </>
                                ) : (
                                    null
                                )
                            }
                        </div>
                    </Col>
                </Row>

                <Footer />
            </div>
        </>
    );
}

export default DetailPost;
