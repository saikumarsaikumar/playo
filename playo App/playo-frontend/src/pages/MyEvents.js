import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EventService from '../services/EventService';

const MyEvents = () => {
    const [myEvents, setMyEvents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMyEvents = async () => {
            const response = await EventService.getMyEvents();
            setMyEvents(response.data);
        };
        fetchMyEvents();
    }, []);


    const handleEventClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <Container className="mt-5">
            <h2>My Events</h2>
            <Row>
                {myEvents.map((event) => (
                    <Col key={event.id} sm={12} md={6} lg={4} className="mb-3">
                        <Card className="h-100">
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

export default MyEvents;
