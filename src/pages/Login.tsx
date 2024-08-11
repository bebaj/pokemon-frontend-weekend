import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', {
                username,  // Sent as JSON
                password,  // Sent as JSON
            });

            const token = response.headers['authorization']?.split(' ')[1];
            if (token) {
                localStorage.setItem('token', token);
                navigate('/');
            } else {
                setError('Login failed, please try again.');
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    setError('Invalid username or password');
                } else {
                    setError('An error occurred, please try again later.');
                }
            } else {
                setError('An error occurred, please check your network connection.');
            }
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
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
