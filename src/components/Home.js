import React from 'react';
import LeftImage from './../bank-of-america-tower-mk001_1200xx5484-3091-0-0.jpg';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Home.css'; // Import custom CSS file for additional styling

const Home = () => {
  return (
    <Container fluid>
      <Row className="hero-section">
        <Col md={6} className="hero-image">
          <img className="img-fluid" src={LeftImage} alt="Bank Building"/>
        </Col>

        <Col md={6} className='hero-content'>
          <h2>Welcome to <span className='hero-logo'>BANK OF AMERICA</span></h2>
          <p className="hero-description">Experience banking at its best with Bank of America. We are committed to providing you with personalized financial solutions to help you achieve your goals. Whether you're saving for the future, managing your day-to-day finances, or planning for retirement, we're here to support you every step of the way.</p>
          <Button className="hero-button btn-primary">Open an Account</Button>
        </Col>
      </Row>

      <BodyArea/>
    </Container>
  );
};

const BodyArea = () => {
    return (
        <Container>
          <Row className="body-section">
              <Col md={4} className="body-content">
                  <h3>Checking Account</h3>
                  <p>Our checking accounts provide you with easy access to your funds anytime, anywhere. Whether you prefer traditional banking or the convenience of online and mobile banking, we have the right solution for you.</p>
                  <ul>
                    <li>No monthly maintenance fees</li>
                    <li>Free online and mobile banking</li>
                    <li>Access to thousands of ATMs nationwide</li>
                    <li>24/7 customer support</li>
                  </ul>
              </Col>

              <Col md={4} className="body-content">
                  <h3>Savings Account</h3>
                  <p>Start saving for your future with our range of savings accounts. Earn competitive interest rates and watch your savings grow over time. With options like automatic transfers and mobile deposits, saving has never been easier.</p>
                  <ul>
                    <li>Competitive interest rates</li>
                    <li>Automatic transfers to help you save effortlessly</li>
                    <li>Mobile deposit feature for added convenience</li>
                    <li>Access to financial education resources</li>
                  </ul>
              </Col>

              <Col md={4} className="body-content">
                  <h3>Current Account</h3>
                  <p>Manage your day-to-day finances with ease with our current accounts. Enjoy features such as overdraft protection, unlimited transactions, and access to a nationwide network of ATMs. Make banking simpler and more convenient with Bank of America.</p>
                  <ul>
                    <li>Overdraft protection available</li>
                    <li>Unlimited transactions</li>
                    <li>Access to a large network of ATMs</li>
                    <li>Option to link accounts for easier fund transfers</li>
                  </ul>
              </Col>
          </Row>
        </Container>
    );
}

export default Home;
