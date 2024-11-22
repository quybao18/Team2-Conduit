import React from 'react';
import { Container, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '40px 0', marginTop: '40px' }}>
      <Container>
        <Row className="mb-4">
          <Col md={3} sm={12} className="text-center text-md-start">
            <h4 className="fw-bold">WisdomWell</h4>
            <p className="text-muted">Connecting people, ideas, and opportunities around the world.</p>
          </Col>

          <Col md={3} sm={6}>
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ListGroup variant="flush">
              <ListGroup.Item action >Home</ListGroup.Item>
              <ListGroup.Item action >About Us</ListGroup.Item>
              <ListGroup.Item action >Services</ListGroup.Item>
              <ListGroup.Item action >Contact</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3} sm={6}>
            <h5 className="fw-bold mb-3">Contact</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-muted">Email: info@example.com</ListGroup.Item>
              <ListGroup.Item className="text-muted">Phone: +123 456 789</ListGroup.Item>
              <ListGroup.Item className="text-muted">Address: 123 Main St, City, Country</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3} sm={12} className="text-center text-md-start">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start">
              <Badge as="a"  className="m-2" style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                <FaFacebook />
              </Badge>
              <Badge as="a"  className="m-2" style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                <FaTwitter />
              </Badge>
              <Badge as="a"  className="m-2" style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                <FaLinkedin />
              </Badge>
              <Badge as="a"  className="m-2" style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                <FaInstagram />
              </Badge>
            </div>
          </Col>
        </Row>

        <Row className="text-center mt-4">
          <Col>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>© 2024 Website Name. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
