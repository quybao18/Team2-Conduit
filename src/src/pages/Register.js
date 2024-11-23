import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [roleId] = useState('0');
    const [avatar] = useState('avatar_default');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password || !userName || !bio || !address || !phone) {
            alert("Please fill all fields!");
            return;
        }

        try {
            const usersResponse = await axios.get('http://localhost:9999/user');
            const existingUser = usersResponse.data.find(user => user.email === email);

            if (existingUser) {
                alert("Email already exists. Please use a different email.");
                return;
            }

            const newId = usersResponse.data.length > 0
                ? Math.max(...usersResponse.data.map(user => parseInt(user.id))) + 1
                : 1;

            const newUser = {
                id: String(newId),
                userName,
                bio,
                email,
                password,
                address,
                phone,
                roleId,
                avatar
            };
            await axios.post('http://localhost:9999/user', newUser);

            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (error) {
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#508BFC' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-8 col-lg-6">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="../images/Community.jpg"
                                        alt="register form"
                                        className="img-fluid"
                                        style={{
                                            borderRadius: '1rem 0 0 1rem',
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleRegister}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <span className="h1 fw-bold mb-0">WisdomWell</span>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="userName"
                                                    style={{
                                                        fontSize: '1.1rem',
                                                        color: '#393f81',
                                                        fontWeight: '500',
                                                        marginTop: '8px',
                                                        textAlign: 'left',
                                                        display: 'block',
                                                    }}
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="userName"
                                                    className="form-control form-control-lg"
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="bio"
                                                    style={{
                                                        fontSize: '1.1rem',
                                                        color: '#393f81',
                                                        fontWeight: '500',
                                                        marginTop: '8px',
                                                        textAlign: 'left',
                                                        display: 'block',
                                                    }}
                                                >
                                                    Bio
                                                </label>
                                                <input
                                                    type="text"
                                                    id="bio"
                                                    className="form-control form-control-lg"
                                                    value={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="email"
                                                    style={{
                                                        fontSize: '1.1rem',
                                                        color: '#393f81',
                                                        fontWeight: '500',
                                                        marginTop: '8px',
                                                        textAlign: 'left',
                                                        display: 'block',
                                                    }}
                                                >
                                                    Email address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control form-control-lg"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="password"
                                                    style={{
                                                        fontSize: '1.1rem',
                                                        color: '#393f81',
                                                        fontWeight: '500',
                                                        marginTop: '8px',
                                                        textAlign: 'left',
                                                        display: 'block',
                                                    }}
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control form-control-lg"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="address"
                                                    style={{
                                                        fontSize: '1.1rem',
                                                        color: '#393f81',
                                                        fontWeight: '500',
                                                        marginTop: '8px',
                                                        textAlign: 'left',
                                                        display: 'block',
                                                    }}
                                                >
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    className="form-control form-control-lg"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="phone"
                                                    style={{
                                                        fontSize: '1.1rem',
                                                        color: '#393f81',
                                                        fontWeight: '500',
                                                        marginTop: '8px',
                                                        textAlign: 'left',
                                                        display: 'block',
                                                    }}
                                                >
                                                    Phone
                                                </label>
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    className="form-control form-control-lg"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="submit"
                                                >
                                                    Register
                                                </button>
                                            </div>

                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                                Already have an account?{' '}
                                                <a href="/login" style={{ color: '#393f81' }}>
                                                    Login here
                                                </a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
