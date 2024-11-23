import React, { useEffect, useState } from 'react';
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'; // Thêm các icon
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, [])


    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className=" position-fixed w-100" style={{ zIndex: 999, top: 0 }}>
                <Container>
                    <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>WisdomWell</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {
                                user ? (
                                    <>
                                        <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                                        <Nav.Link onClick={() => navigate(`/mypost/${user.id}`)}>My Posts</Nav.Link>
                                        <Nav.Link onClick={() => navigate('/newpost')}>New Post</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                                    </>
                                )
                            }
                        </Nav>

                        <Nav>
                            {
                                user ? (
                                    <>
                                        <Dropdown align="end">
                                            <Dropdown.Toggle
                                                id="dropdown-basic"
                                                variant="link"
                                                className="d-flex align-items-center text-light"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <img
                                                    src={`../images/${user.avatar}.png`}
                                                    roundedCircle
                                                    width="40"
                                                    height="40"
                                                    className="me-2"
                                                />
                                                {user.name}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => navigate('/profile')}>
                                                    <FaUserAlt className="me-2" />
                                                    Profile
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={handleLogout}>
                                                    <FaSignOutAlt className="me-2" />
                                                    Logout
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <Nav.Link onClick={() => navigate('/login')} className="d-flex align-items-center">
                                        <FaSignInAlt className="me-2" />
                                        Login
                                    </Nav.Link>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
