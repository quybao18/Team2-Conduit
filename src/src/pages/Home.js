import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Container, InputGroup, ListGroup, Form, Pagination } from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [comments, setComments] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCate, setSelectedCate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:9999/user');
                const postsResponse = await axios.get('http://localhost:9999/post');
                const categoriesResponse = await axios.get('http://localhost:9999/category');
                const commentsResponse = await axios.get('http://localhost:9999/comment');
                setUsers(usersResponse.data);
                setPosts(postsResponse.data);
                setCategories(categoriesResponse.data);
                setComments(commentsResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])


    const filterPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
        const matchesSelected = selectedCate ? post.categoryId === selectedCate : true;
        return matchesSearch && matchesSelected;

    })

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSelectedCate = (cid) => {
        setSelectedCate(cid)
    }


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filterPosts.slice(indexOfFirstPost, indexOfLastPost);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filterPosts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div>
            <Header />

            <div className="container mt-5 pt-5">
                <InputGroup className="mb-4">
                    <Form.Control
                        placeholder="Search..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        style={{ borderRadius: '20px' }}
                        value={search}
                        onChange={handleSearch}
                    />
                </InputGroup>
            </div>

            <div className="row mt-5 ms-5 me-5">
                <div className="col-lg-9">
                    <h2 className="mb-4 text-success">🌐 Global Feed</h2>
                    <div className="list-group">
                        {currentPosts.map((post, index) => (
                            <div
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
                                        {
                                            users.map((user, index) => {
                                                if (post.userId === user.id) {
                                                    return <div
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
                                                }
                                            })
                                        }
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
                                                {
                                                    users.find(user => user.id === post.userId)?.userName
                                                }
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
                                            categories.find(category => category.id === post.categoryId)?.categoryName
                                        }
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



                <div className="col-lg-3">
                    <h2 className="mb-4">🔥 Popular Tags</h2>
                    <div
                        className="p-4 bg-light shadow-sm"
                        style={{
                            borderRadius: '15px',
                            maxHeight: '400px',
                            overflowY: 'scroll',
                            border: '1px solid #ddd',
                        }}
                    >
                        {categories.map((cate, index) => (
                            <Badge
                                key={index}
                                bg="dark"
                                className="m-1 p-2"
                                style={{ fontSize: '0.9rem', borderRadius: '10px', cursor: 'pointer' }}
                                onClick={() => handleSelectedCate(cate.id)}
                            >
                                {cate.categoryName}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <Pagination className='justify-content-center'>
                {pageNumbers.map(number => (
                    <Pagination.Item key={number} onClick={() => setCurrentPage(number)} active={number === currentPage}>
                        {number}
                    </Pagination.Item>
                ))}
            </Pagination>

            <Footer />

        </div>
    )
}

export default Home