import React from 'react';
import { Container, Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className="hero-banner text-center text-light bg-dark p-3 m-3">
                <Container className="py-5 ">
                    <h1 className="display-4">Welcome to Playo</h1>
                    <p className="lead">
                        Connect with players, create and join events, and make your sports journey seamless.
                    </p>
                    <div className="mt-4">
                        <Button as={Link} to="/register" variant="primary" size="lg" className="me-2">
                            Get Started
                        </Button>
                        <Button as={Link} to="/login" variant="light" size="lg">
                            Login
                        </Button>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Home;
