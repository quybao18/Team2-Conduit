import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [addUser, setAddUser] = useState({
        userName: '',
        email: '',
        password: '',
        bio: '',
        address: '',
        phone: '',
        roleId: 1,
        avatar: '',
    });

    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'repeatPassword') {
            setRepeatPassword(value);
        } else {
            setAddUser({
                ...addUser,
                [name]: value,
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Check required fields
        if (!addUser.userName || !addUser.email || !addUser.password || !repeatPassword) {
            setFormError('Please fill in all fields');
            return;
        }

        // Clear form-level error
        setFormError('');

        // Check password match
        if (addUser.password !== repeatPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[0-9])[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(addUser.password)) {
            setPasswordError('Password must be at least 6 characters long and include a number');
            return;
        }

        // Clear password error if validation passes
        setPasswordError('');

        try {
            const usersResponse = await axios.get('http://localhost:9999/user');
            const existingAccount = usersResponse.data.find(user => user.email === addUser.email);
            if (existingAccount) {
                setFormError('Email already exists');
                return;
            }

            // Add new user
            const newUser = {
                ...addUser,
                id: usersResponse.data.length + 1,
            };
            await axios.post('http://localhost:9999/user', newUser);

            // Registration success
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <img
                                            onClick={() => navigate('/login')}
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/BackButton.svg/2048px-BackButton.svg.png"
                                            width="50px"
                                            alt="Back"
                                            style={{ cursor: 'pointer', float: 'left' }}
                                        />
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form onSubmit={handleRegister} className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Your Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="userName"
                                                        value={addUser.userName}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Your Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        value={addUser.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Password</label>
                                                    <input
                                                        type="password"
                                                        className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                                        name="password"
                                                        value={addUser.password}
                                                        onChange={handleChange}
                                                    />
                                                    {passwordError && <div className="invalid-feedback" style={{ color: 'red', fontSize: '0.9rem' }}>{passwordError}</div>}
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Repeat your password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="repeatPassword"
                                                        value={repeatPassword}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {formError && <div className="text-danger mb-3" style={{ fontSize: '0.9rem' }}>{formError}</div>}

                                            <div className="form-check d-flex justify-content-center mb-5">
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid"
                                            alt="Sample"
                                        />
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
