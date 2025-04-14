import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { setAuth } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login({ email, password });
            dispatch(setAuth({ token: response.data.token, user: response.data }));
            toast.success('Login successful!');
            navigate('/events');
        } catch (error) {
            toast.error('Invalid credentials');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button className="mt-3" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
