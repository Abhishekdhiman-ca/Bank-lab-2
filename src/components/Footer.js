import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>About Us</h4>
            <p>Bank of America is a financial services company, offering a wide range of banking and financial products and services for individuals, businesses, and institutions.</p>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <p>Email: info@bankofamerica.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="col-md-4">
            <h4>Follow Us</h4>
            <p>Connect with us on social media for the latest updates:</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p>Developed by Abhishek Dhiman &copy; 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
