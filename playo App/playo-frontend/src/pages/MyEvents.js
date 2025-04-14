import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import EventService from '../services/EventService';

const MyEvents = () => {
    const [myEvents, setMyEvents] = useState([]);

    useEffect(() => {
        const fetchMyEvents = async () => {
            const response = await EventService.getMyEvents();
            setMyEvents(response.data);
        };
        fetchMyEvents();
    }, []);

    return (
        <Container className="mt-5">
            <h2>My Events</h2>
            <Row>
                {myEvents.map((event) => (
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

export default MyEvents;
