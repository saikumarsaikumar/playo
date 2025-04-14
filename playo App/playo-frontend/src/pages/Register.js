import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Container, Form, Button } from 'react-bootstrap';
import AuthService from '../services/AuthService';

const Register = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth); // Get token from Redux store

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    // Redirect logged-in users using useEffect
    useEffect(() => {
        if (token) {
            toast.info('You are already logged in!');
            navigate('/events'); // Redirect to events page
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await AuthService.register(formData);
            toast.success('Registration successful! Please log in.');
            navigate('/'); // Redirect to login page
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter a secure password"
                        required
                    />
                </Form.Group>
                <Button className="mt-3" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
