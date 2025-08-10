import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import EventService from '../services/EventService';

const EventDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            toast.error('Please login to view event details.');
            navigate('/login');
            return;
        }

        const fetchEventDetails = async () => {
            try {
                setLoading(true);
                const response = await EventService.getEventDetails(eventId);
                setEventDetails(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setError('Failed to load event details.');
                toast.error('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId, token, navigate]);

    const getParticipationStatusColor = (status) => {
        switch (status) {
            case 'ACCEPTED': return 'success';
            case 'APPLIED': return 'warning';
            case 'REJECTED': return 'danger';
            default: return 'secondary';
        }
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return 'Not specified';
        const date = new Date(dateTime);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-2">Loading event details...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="outline-danger" onClick={() => navigate('/events')}>
                        Back to Events
                    </Button>
                </Alert>
            </Container>
        );
    }

    if (!eventDetails) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="warning">
                    <Alert.Heading>Event Not Found</Alert.Heading>
                    <p>The event you're looking for doesn't exist or you don't have permission to view it.</p>
                    <Button variant="outline-warning" onClick={() => navigate('/events')}>
                        Back to Events
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            {/* Back Button */}
            <Button 
                variant="outline-secondary" 
                className="mb-3"
                onClick={() => navigate('/events')}
            >
                ← Back to Events
            </Button>

            {/* Event Header */}
            <Card className="mb-4">
                <Card.Header>
                    <h1 className="mb-0">{eventDetails.name}</h1>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={8}>
                            <h5>Description</h5>
                            <p className="text-muted">{eventDetails.description}</p>
                            
                            <h5>Event Details</h5>
                            <Row>
                                <Col sm={6}>
                                    <strong>Date & Time:</strong><br />
                                    <span className="text-muted">{formatDateTime(eventDetails.timings)}</span>
                                </Col>
                                <Col sm={6}>
                                    <strong>Player Limit:</strong><br />
                                    <span className="text-muted">{eventDetails.playerLimit} players</span>
                                </Col>
                            </Row>
                            
                            {eventDetails.otherRequirements && (
                                <div className="mt-3">
                                    <strong>Requirements:</strong><br />
                                    <span className="text-muted">{eventDetails.otherRequirements}</span>
                                </div>
                            )}
                        </Col>
                        <Col md={4}>
                            <h5>Organizer</h5>
                            <Card>
                                <Card.Body>
                                    <strong>{eventDetails.organizer.firstName} {eventDetails.organizer.lastName}</strong><br />
                                    <small className="text-muted">{eventDetails.organizer.email}</small>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Participants Section */}
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Participants</h3>
                    <Badge bg="primary" pill>
                        {eventDetails.totalParticipants} / {eventDetails.playerLimit}
                    </Badge>
                </Card.Header>
                <Card.Body>
                    {eventDetails.participants && eventDetails.participants.length > 0 ? (
                        <Row>
                            {eventDetails.participants.map((participant) => (
                                <Col key={participant.userId} md={6} lg={4} className="mb-3">
                                    <Card className="h-100">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 className="card-title mb-1">
                                                        {participant.firstName} {participant.lastName}
                                                    </h6>
                                                    <small className="text-muted">{participant.email}</small>
                                                </div>
                                                <Badge 
                                                    bg={getParticipationStatusColor(participant.participationStatus)}
                                                    className="ms-2"
                                                >
                                                    {participant.participationStatus}
                                                </Badge>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-muted">No participants yet. Be the first to join!</p>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Action Buttons */}
            <div className="mt-4 text-center">
                <Button variant="success" size="lg" className="me-2">
                    Apply to Join
                </Button>
                <Button variant="outline-primary" size="lg">
                    Share Event
                </Button>
            </div>
        </Container>
    );
};

export default EventDetails;