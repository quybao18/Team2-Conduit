import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Alert } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FollowerPost = () => {
    const navigate = useNavigate();
    const { uid } = useParams(); // Lấy uid từ URL
    const [posts, setPosts] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [following, setFollowing] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFollowing();
    }, []);

    const fetchFollowing = async () => {
        try {
            const followingResponse = await axios.get("http://localhost:9999/follower");
            const followingIds = followingResponse.data
                .filter((follow) => follow.followerId === Number(uid)) // So sánh chính xác kiểu dữ liệu
                .map((follow) => follow.followingId);

            setFollowing(followingIds);

            // Lấy danh sách bài viết
            const postsResponse = await axios.get("http://localhost:9999/post");
            const filteredPosts = postsResponse.data.filter((post) =>
                followingIds.includes(post.userId)
            );
            setPosts(filteredPosts);

            const favoriteResponse = await axios.get("http://localhost:9999/favorite");
            setFavorite(favoriteResponse.data);

        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Unable to load posts. Please try again later.");
        }
    };

    const getFavoriteCount = (postId) => {
        return favorite.filter(fav => fav.postId === postId).length;
    }


    return (
        <div>
            <Header />
            <Container className="mt-5 pt-5">
                {error && <Alert variant="danger" className="text-center mb-4">{error}</Alert>}

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div className="col d-flex" key={post.id}>
                                <Card className="h-100 shadow-lg border-0 w-100 rounded-4 bg-light hover-scale">
                                    <Card.Body className="d-flex flex-column p-4">
                                        <Card.Title className="text-dark fw-bold fs-4 mb-3">{post.title}</Card.Title>
                                        <Card.Text className="text-muted flex-grow-1">
                                            {post.description.length > 100
                                                ? `${post.description.substring(0, 100)}...`
                                                : post.description}
                                        </Card.Text>
                                        <div className="mt-auto">
                                            <Card.Text className="text-secondary mb-2">
                                                <small><strong>Favorites:</strong> {getFavoriteCount(post.id)}</small>
                                            </Card.Text>
                                            <Card.Text className="text-secondary mb-3">
                                                <small><strong>Created:</strong> {new Date(post.createdTime).toLocaleString()}</small>
                                            </Card.Text>
                                            <Button
                                                variant="primary"
                                                className="w-100 py-2 mt-2 rounded-pill text-white fw-semibold hover-button"
                                                onClick={() => navigate(`/post/${post.id}`)}
                                            >
                                                View Post
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
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
