import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProfile() {

    const { uid } = useParams();

    const [ user, setUser ] = useState({});
    const [avatar, setAvatar] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:9999/user/${uid}`);
                setUser(userResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [uid])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        console.log(URL.createObjectURL(file));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9999/user/${uid}`, user);
            alert("Profile updated successfully");
            } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className="py-5">
            <Card className="shadow-lg border-0">
                <Card.Body>
                    <h2 className="text-primary mb-4 text-center">Update Profile</h2>
                    <img onClick={() => navigate(`/profile/${uid}`)} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/BackButton.svg/2048px-BackButton.svg.png" width="50px" alt="Back" style={{ cursor: 'pointer', float: 'left'}} />
                    <Row>
                    
                        <Col md={4} className="text-center">
                        
                            <Image
                                src={`../images/${user.avatar}.png`}
                                roundedCircle
                                fluid
                                style={{ width: "150px", height: "150px", border: "5px solid #e9ecef" }}
                            />
                            <Form.Group controlId="formFile" className="mt-3">
                                <Form.Label>Change Avatar</Form.Label>
                                <Form.Control  type="file" name = 'avatar' onChange={handlePreviewAvatar} />
                            </Form.Group>
                        </Col>

                        <Col md={8}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Label style={{ fontWeight: "bold", textAlign: 'left', display: 'block' }}>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your username" name = 'userName' value={user.userName} onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group controlId="bio" className="mb-3">
                                    <Form.Label style={{ fontWeight: "bold", textAlign: 'left', display: 'block' }}>Bio</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Write about yourself" name = 'bio' value={user.bio} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label style={{ fontWeight: "bold", textAlign: 'left', display: 'block' }}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" name = 'email' value={user.email} readOnly/>
                                </Form.Group>

                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label style={{ fontWeight: "bold", textAlign: 'left', display: 'block' }}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter a new password" name = 'password' value={user.password} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="address" className="mb-3">
                                    <Form.Label style={{ fontWeight: "bold", textAlign: 'left', display: 'block' }}>Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your address" name = 'address' value={user.address} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="phone" className="mb-3">
                                    <Form.Label style={{ fontWeight: "bold", textAlign: 'left', display: 'block' }}>Phone</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your phone number" name = 'phone' value={user.phone} onChange={handleChange} />
                                </Form.Group>

                                <div className="text-center">
                                    <Button variant="primary" className="px-5" type="submit">
                                        Save Changes
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default UpdateProfile;