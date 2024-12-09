import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Alert, Badge } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FollowerPost = () => {
    const navigate = useNavigate();
    const { uid } = useParams(); 
    const [posts, setPosts] = useState([]);
    const [categories, setcategories] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [following, setFollowing] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const [authentication, setAuthentication] = useState(null);

    useEffect(() => {
        fetchFollowing();
    }, []);

    const fetchFollowing = async () => {
        try {
            const authenData = localStorage.getItem('user');
            if(authenData){
                setAuthentication(JSON.parse(authenData));
            }

            const followingResponse = await axios.get("http://localhost:9999/follower");
            const followingIds = followingResponse.data
                .filter((follow) => follow.followerId === Number(uid)) // So sánh chính xác kiểu dữ liệu
                .map((follow) => follow.followingId);

            setFollowing(followingIds);

            const usersResponse = await axios.get('http://localhost:9999/user');
            setUsers(usersResponse.data);

            // Lấy danh sách bài viết
            const postsResponse = await axios.get("http://localhost:9999/post");
            const filteredPosts = postsResponse.data.filter((post) =>
                followingIds.includes(post.userId)
            );
            setPosts(filteredPosts);

            const categoriesResponse = await axios.get('http://localhost:9999/category');
            setcategories(categoriesResponse.data);

            const favoriteResponse = await axios.get("http://localhost:9999/favorite");
            setFavorite(favoriteResponse.data);

        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Unable to load posts. Please try again later.");
        }
    };


    const toggleHeart = async (postId) => {
        try {
            const favoriteItem = favorite.find((fav) => fav.postId === postId && fav.userId === authentication.id);

            if(favoriteItem){
                await axios.delete(`http://localhost:9999/favorite/${favoriteItem.id}`);
                setFavorite(favorite.filter((fav) => fav.id !== favoriteItem.id));
            } else{
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
    };


    return (
        <div>
            <Header />
            <Container className="mt-5 pt-5">
                <h3>My Following</h3>
                {error && <Alert variant="danger" className="text-center mb-4">{error}</Alert>}

                <div className="row mt-5">
                    {posts.length > 0 ? (
                        <>
                            {posts.map((post, index) => (
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
                                                                cursor: 'pointer',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#ddd',
                                                                backgroundImage: `url(../images/${user.avatar}.png)`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                            }}
                                                            onClick={() => navigate(`/viewInformation/${user.id}`)}
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
                                            variant={isPostFavorited(post?.id) ? "success" : "outline-success"}
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

                                        <br/>

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
                        </>
                    ) : (
                        <p className="text-center">No posts available to display.</p>
                    )}
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default FollowerPost;
