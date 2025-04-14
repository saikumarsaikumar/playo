import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from '../slices/authSlice';

const AppNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(clearAuth());
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Playo
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/events">All Events</Nav.Link>
                        {token && <Nav.Link as={Link} to="/my-events">My Events</Nav.Link>}
                        {token && <Nav.Link as={Link} to="/createEvent">Create Event</Nav.Link>}
                    </Nav>
                    <Nav>
                        {!token ? (
                            <>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
