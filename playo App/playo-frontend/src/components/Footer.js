import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
    <footer className="bg-dark text-light py-3 mt-auto">
        <Container>
            <Row>
                <Col className="text-center">
                    <p>&copy; {new Date().getFullYear()} Playo. All Rights Reserved.</p>
                </Col>
            </Row>
        </Container>
    </footer>
);

export default Footer;
