import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation to ensure email and password are not empty
        if (!email.trim() || !password.trim()) {
            setErrorMessage('Email and password are required.');
            return;
        }

        // Implementing additional client-side validation to prevent XSS attacks
        if (/<(?:.|\n)*?>/gm.test(email) || /<(?:.|\n)*?>/gm.test(password)) {
            setErrorMessage('Invalid input detected.');
            return;
        }

        axios.post('http://localhost:8000/login', { email, password })
            .then(result => {
                console.log(result.data);
                if (result.data === "Success") {
                    navigate('/home');
                }
            })
            .catch(err => {
                console.log(err);
                // Handle errors, such as displaying a message to the user
                setErrorMessage('Failed to log in. Please try again.');
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Login</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input 
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-0'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <input 
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                            className='form-control rounded-0'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Login
                    </button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;
