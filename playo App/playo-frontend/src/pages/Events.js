import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col,Button } from 'react-bootstrap';
import EventService from '../services/EventService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Events = () => {
    const [events, setEvents] = useState([]);
    const { token } = useSelector((state) => state.auth); // Get token from Redux store
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            // Show error message if the user is not logged in
            toast.error('Please login to view events.');
            return;
        }

        // Fetch events only if the user is logged in
        const fetchEvents = async () => {
            try {
                const response = await EventService.getAllEvents();
                setEvents(response.data);
            } catch (error) {
                toast.error('Failed to load events.');
            }
        };

        fetchEvents();
    }, [token]);

    const handleEventClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };

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
                        <Card className="h-100" style={{ cursor: 'pointer' }}>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{event.name}</Card.Title>
                                <Card.Text className="flex-grow-1">
                                    {event.description}
                                </Card.Text>
                                <div className="mt-auto">
                                    <small className="text-muted">
                                        {event.timings && new Date(event.timings).toLocaleDateString()} 
                                        {event.timings && ' at '} 
                                        {event.timings && new Date(event.timings).toLocaleTimeString()}
                                    </small>
                                    <div className="mt-2">
                                        <Button 
                                            variant="primary" 
                                            size="sm"
                                            onClick={() => handleEventClick(event.id)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Events;

