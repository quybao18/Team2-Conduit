import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, ListGroup, InputGroup, FormControl, Card } from 'react-bootstrap';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

function DetailPost() {

    const { pid } = useParams();

    const [user, setUser] = useState([]);
    const [post, setPost] = useState({});
    const [category, setCategory] = useState([]);
    const [comments, setComments] = useState([]);

    const [authentication, setAuthentication] = useState(null);

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
                setUser(userResponse.data);
                setPost(postResponse.data);
                setCategory(categoryResponse.data);
                setComments(commentsResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [pid]);

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
        const {name, value} = e.target;
        setAddComment({
            ...addComment,
            [name] :  value
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
                                                        </span>{' '}
                                                        <small className="text-muted">{comment.createdTime}</small>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    }
                                })
                            }

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
