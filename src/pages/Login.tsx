import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', {
                username,
                password,
            });
            const token = response.data.jwt; // Assuming JWT is returned as 'jwt'
            localStorage.setItem('token', token); // Store token in local storage
            navigate('/'); // Redirect to home after successful login
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
