import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa'; // Import success icon from react-icons

function SuccessReport() {

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#e9f7ef' }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg rounded-lg p-5 text-center border-0">
            <Card.Body>
              {/* Success Icon */}
              <FaCheckCircle size={100} color="#28a745" className="mb-4" />
              
              {/* Heading */}
              <h2 className="mb-4 text-success font-weight-bold" style={{ fontSize: '2.5rem' }}>
                Report Submitted Successfully!
              </h2>
              
              {/* Subtext */}
              <p className="text-muted mb-5" style={{ fontSize: '1.25rem' }}>
                Thank you for your feedback. We will review the issue and get back to you soon. Your report is valuable to us.
              </p>
              
              {/* Button */}
              <Button 
                variant="success" 
                href="/" 
                className="w-100 py-3" 
                size="lg" 
                style={{
                  fontSize: '1.25rem', 
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                Back to Home
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SuccessReport;
