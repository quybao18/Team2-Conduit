import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';

function ViewInfoUsers() {

    const { uid } = useParams();

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [favorite, setFavorite] = useState([]);

    const [authentication, setAuthentication] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerId, setFollowerId] = useState(null);
    const [blockedUsers, setBlockedUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authenData = localStorage.getItem('user');
                if (authenData) {
                    setAuthentication(JSON.parse(authenData));
                }

                const userResponse = await axios.get(`http://localhost:9999/user/${uid}`);
                const postsResponse = await axios.get('http://localhost:9999/post');
                const categoriesResponse = await axios.get('http://localhost:9999/category');
                const favoriteResponse = await axios.get('http://localhost:9999/favorite');
                const followingResponse = await axios.get('http://localhost:9999/follower');
                const blockedResponse = await axios.get(`http://localhost:9999/blockedUsers?userid=${uid}`); // 1 là ID user hiện tại
                const blocked = blockedResponse.data.map(block => block.blockeduserid);
                setBlockedUsers(blocked);

                setUser(userResponse.data);
                setPosts(postsResponse.data);
                setCategories(categoriesResponse.data);
                setFavorite(favoriteResponse.data);
                if (authenData) {
                    const currentUserId = JSON.parse(authenData).id;
                    const isUserFollowing = followingResponse.data.some((follow) => follow.followerId === currentUserId && follow.followingId === userResponse.data.id);
                    const followerId = followingResponse.data.filter((follow) => follow.followerId === currentUserId && follow.followingId === userResponse.data.id);
                    setFollowerId(followerId[0].id);
                    setIsFollowing(isUserFollowing);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [uid])

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
                    followingId: user.id
                });
            }
            setIsFollowing(!isFollowing);
            navigate(0);
        } catch (error) {
            console.log(error);
        }

    }
    const toggleBlock = async () => {
        try {
            if (authentication === null) {
                alert('Please login to block');
                navigate('/login');
                return;
            }
            await axios.post('http://localhost:9999/blockedUsers', {
                userid: authentication.id,
                blockeduserid: user.id
            });
            navigate(`/${authentication.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleHeart = async (postId) => {
        try {
            if(authentication === null) {
                alert('Please login to favorite');
                return;
            }

            const favoriteItem = favorite.find((fav) => fav.postId === postId && fav.userId === authentication.id);

            if(favoriteItem){
                await axios.delete(`http://localhost:9999/favorite/${favoriteItem.id}`);
                setFavorite(favorite.filter((fav) => fav.id !== favoriteItem.id));
            }else{
                const response = await axios.post('http://localhost:9999/favorite', {
                    userId: authentication.id,
                    postId: postId
                })
                setFavorite([...favorite, response.data]);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getFavoriteCount = (postId) => {
        return favorite.filter(fav => fav.postId === postId).length;
    }

    const isPostFavorited = (postId) => {
        return favorite?.some(fav => fav?.postId === postId && fav?.userId === authentication?.id);
    }

    const countPosts = posts.filter(post => post.userId === user.id).length;

    return (
        <div>
            <Header />
            <div style={{ backgroundColor: '#f8f9fa', padding: '20px 0', width: '100vw' }}>
                <Container fluid className="py-4 mt-5">
                    <Row className="align-items-center justify-content-center">
                        <Col xs={12} md={3} className="text-center">
                            <div
                                style={{
                                    width: '180px',
                                    height: '180px',
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                    backgroundColor: '#ddd',
                                    backgroundImage: `url(../images/${user.avatar}.png)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                onClick={() => navigate(`/viewPosts/${user.id}`)}
                            ></div>
                        </Col>

                        <Col xs={12} md={6} className="text-center text-md-start">
                            <h3
                                style={{
                                    fontWeight: 'bold',
                                    color: '#343a40',
                                }}
                            >
                                {user.userName}
                            </h3>
                            <p
                                className="text-muted"
                                style={{
                                    fontSize: '1rem',
                                    lineHeight: '1.6',
                                    maxWidth: '600px',
                                    margin: '10px auto 0',
                                }}
                            >
                                {user.bio}
                            </p>
                            <h5
                                className="mt-3"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#28a745',
                                }}
                            >
                                Total Posts: <span style={{ color: '#000' }}>{countPosts}</span>
                            </h5>
                            {authentication?.id !== user.userId && (
                                <Button style={{ marginLeft: 'auto' }} variant={isFollowing ? "danger" : "primary"} onClick={toggleFollow}>
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </Button>)}
                            {
                                authentication?.id !== user.userId && (
                                    <Button variant="dark" style={{ marginLeft: '10px' }} onClick={toggleBlock}>Block</Button>
                                )
                            }
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="row mt-5 ms-5 me-5">
                <div className="list-group mt-5">
                    {
                        posts.map((post, index) => {
                            if (post.userId === user.id) {
                                return (
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
                                                            textAlign: 'left',
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
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    {post.description}
                                                </p>
                                                <a
                                                    className="direction p-0"
                                                    size="sm"
                                                    style={{
                                                        cursor: 'pointer',
                                                        display: 'block',
                                                        textAlign: 'left',
                                                        textDecoration: 'none',
                                                    }}
                                                    onClick={() => navigate(`/post/${post.id}`)}
                                                >
                                                    Read more...
                                                </a>
                                            </div>
                                        </div>

                                        <div
                                            className="d-flex flex-column align-items-end justify-content-start w-25 mt-3"
                                            style={{ gap: '10px' }}
                                        >
                                            <Button
                                                variant={isPostFavorited(post?.id) ? 'success' : 'outline-success'}
                                                size="sm"
                                                style={{
                                                    fontSize: '0.8rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                                onClick={() => toggleHeart(post.id)}
                                            >
                                                ❤ {getFavoriteCount(post.id)}
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
                                                {categories.find((cate) => cate.id === post.categoryId)?.categoryName}
                                            </Badge>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    }
                </div>
            </div>

            <Footer />
        </div>

    )
}

export default ViewInfoUsers