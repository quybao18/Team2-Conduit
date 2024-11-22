import React from 'react';
import { Carousel, Container, Nav, Navbar } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="py-3 position-fixed w-100" style={{ zIndex: 999, top: 0 }}>
                <Container>
                    <Navbar.Brand href="#home">WisdomWell</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                            <Nav.Link href="#features">My Posts</Nav.Link>
                            <Nav.Link href="#features">New Post</Nav.Link>
                        </Nav>

                        <Nav>
                            <Nav.Link href="#login" className="d-flex align-items-center">
                                <FaSignInAlt className="me-2" />
                                Login
                            </Nav.Link>
                            <Nav.Link href="#logout" className="d-flex align-items-center">
                                <FaSignOutAlt className="me-2" />
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <Carousel>
                <Carousel.Item>
                    <img style={{width: '100%'}} src='https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=600'/>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
        </>
    );
}

export default Header;
