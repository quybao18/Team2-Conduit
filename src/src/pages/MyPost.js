import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function MyPost() {

    const { mpid } = useParams();
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:9999/user/${mpid}`);
                const postsResponse = await axios.get('http://localhost:9999/post');
                const categoryResponse = await axios.get('http://localhost:9999/category');
                setUser(userResponse.data);
                setPosts(postsResponse.data);
                setCategory(categoryResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [mpid])

    return (
        <div>
            <Header />
            <div className="row mt-5 ms-5 me-5">
                <h3 className='mt-5'>My Feed</h3>
                <div className="list-group mt-5">
                    {
                        posts.map((post, index) => {
                            if (post.userId === user.id) {
                                return <div
                                    key={index}
                                    className="list-group-item d-flex justify-content-between align-items-start py-3 px-4 mb-3 shadow-sm"
                                    style={{
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <div className="d-flex flex-column justify-content-start align-items-start w-75">
                                        <div className="d-flex align-items-center mb-3">
                                            <div
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#ddd',
                                                    backgroundImage: `url(../images/${user.avatar}.png)`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            ></div>


                                            <div className="ms-3">
                                                <p
                                                    className="mb-1"
                                                    style={{
                                                        fontSize: '1rem',
                                                        color: '#28a745',
                                                        fontWeight: '600',
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    {user.userName}
                                                </p>
                                                <small className="text-muted">{post.createdTime}</small>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <h5 className="mb-2" style={{ fontWeight: '600', textAlign: 'left' }}>{post.title}</h5>
                                            <p
                                                className="text-muted mb-2"
                                                style={{
                                                    fontSize: '0.9rem',
                                                    lineHeight: '1.4',
                                                    textAlign: 'left'
                                                }}
                                            >
                                                {post.description}
                                            </p>
                                            <a className='direction p-0' size="sm" style={{ cursor: 'pointer', display: 'block', textAlign: 'left', textDecoration: 'none' }}
                                            onClick={() => navigate(`/post/${post.id}`)}>Read more...</a>
                                        </div>
                                    </div>

                                    <div
                                        className="d-flex flex-column align-items-end justify-content-start w-25 mt-3"
                                        style={{ gap: '10px' }}
                                    >
                                        <Button
                                            variant="outline-success"
                                            size="sm"
                                            style={{
                                                fontSize: '0.8rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            ❤ {post.favoriteCount}
                                        </Button>
                                        <br />
                                        <Badge
                                            bg="light"
                                            className="text-secondary d-block mb-2 mt-5"
                                            style={{
                                                fontSize: '0.8rem',
                                                border: '1px solid #ddd',
                                                padding: '0.3rem 0.6rem',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            {
                                                category.find((cate) => cate.id === post.categoryId)?.categoryName
                                            }
                                        </Badge>
                                    </div>
                                </div>
                            }

                        })
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default MyPost;
