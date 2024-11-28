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
                <div className="row">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div className="col-md-4 mb-4" key={post.pid}>
                                <Card style={{ width: "100%" }}>
                                    <Card.Body>
                                        <Card.Title>{post.title}</Card.Title>
                                        <Card.Text>{post.description}</Card.Text>
                                        <Card.Text>
                                            <strong>Favorite Count:</strong> {post.favoriteCount}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Created Time:</strong> {new Date(post.createdTime).toLocaleString()}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() => navigate(`/post/${post.id}`)}
                                        >
                                            View Post
                                        </Button>
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
