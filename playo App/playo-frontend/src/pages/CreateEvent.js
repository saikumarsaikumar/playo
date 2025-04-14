import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Container, Form, Button } from 'react-bootstrap';
import EventService from '../services/EventService';

const CreateEvent = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth); // Get token from Redux store

    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        timings: '',
        playerLimit: '',
        otherRequirements: '',
    });

    // Redirect to login if not logged in
    if (!token) {
        toast.error('You must be logged in to create an event.');
        navigate('/');
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.description || !formData.timings || !formData.playerLimit) {
            toast.error('Please fill all required fields.');
            return;
        }

        if (isNaN(formData.playerLimit) || parseInt(formData.playerLimit) <= 0) {
            toast.error('Player limit must be a positive number.');
            return;
        }

        // Make API call
        try {
            const response = await EventService.createEvent(formData);
            toast.success('Event created successfully!');
            navigate('/events'); // Redirect to events page
        } catch (error) {
            toast.error('Failed to create the event. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Create Event</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter event name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter event description"
                        rows={3}
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Timings</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="timings"
                        value={formData.timings}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Player Limit</Form.Label>
                    <Form.Control
                        type="number"
                        name="playerLimit"
                        value={formData.playerLimit}
                        onChange={handleChange}
                        placeholder="Enter number of players"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Other Requirements</Form.Label>
                    <Form.Control
                        type="text"
                        name="otherRequirements"
                        value={formData.otherRequirements}
                        onChange={handleChange}
                        placeholder="Enter any other requirements"
                    />
                </Form.Group>
                <Button className="mt-3" type="submit">
                    Create Event
                </Button>
            </Form>
        </Container>
    );
};

export default CreateEvent;
