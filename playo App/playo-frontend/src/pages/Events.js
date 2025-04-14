import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import EventService from '../services/EventService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Events = () => {
    const [events, setEvents] = useState([]);
    const { token } = useSelector((state) => state.auth); // Get token from Redux store

    useEffect(() => {
        if (!token) {
            // Show error message if the user is not logged in
            toast.error('Please login to view events.');
            return;
        }

        // Fetch events only if the user is logged in
        const fetchEvents = async () => {
            try {
                const response = await EventService.getMyEvents();
                setEvents(response.data);
            } catch (error) {
                toast.error('Failed to load events.');
            }
        };

        fetchEvents();
    }, [token]);

    if (!token) {
        // Show an error message if the user is not logged in
        return (
            <Container className="mt-5 text-center">
                <h2>All Events</h2>
                <p className="text-danger">Please login to view events.</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2>All Events</h2>
            <Row>
                {events.map((event) => (
                    <Col key={event.id} sm={12} md={6} lg={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{event.name}</Card.Title>
                                <Card.Text>{event.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Events;
