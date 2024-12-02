import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FollowerPost = () => {
    const navigate = useNavigate();
    const { uid } = useParams(); // Lấy uid từ URL
    const [posts, setPosts] = useState([]);
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
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Unable to load posts. Please try again later.");
        }
    };

    return (
        <div>
    <Header />
    <Container className="mt-5 pt-5">
        {error && <p className="text-danger text-center">{error}</p>}
        <h2 className="text-center mb-4">Posts</h2>
        <div className="row justify-content-center">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={post.pid}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="text-primary">{post.title}</Card.Title>
                                <Card.Text className="text-muted mb-3">{post.description}</Card.Text>
                                <Card.Text>
                                    <strong>Favorites:</strong> {post.favoriteCount}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Created:</strong> {new Date(post.createdTime).toLocaleString()}
                                </Card.Text>
                                <div className="text-center">
                                    <Button
                                        variant="outline-primary"
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
                <p className="text-center text-secondary">No posts available to display.</p>
            )}
        </div>
    </Container>
    <Footer />
</div>

    );
};

export default FollowerPost;
