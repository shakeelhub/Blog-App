import React from 'react';
import blog from '../../src/assets/blog.svg'

export default function Footer() {
  return (
    <footer className="footer-container">
    <div className="footer-content">
      <div className="footer-brand">
        <a href="https://yourwebsite.com">
          <img 
            src={blog}
            alt="Your Logo" 
            className="footer-logo"
          />
        </a>
      </div>
      <div className="footer-links">
        <a href="https://example.com/about" target="_blank" rel="noopener noreferrer">About</a>
        <a href="https://example.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <a href="https://example.com/licensing" target="_blank" rel="noopener noreferrer">Licensing</a>
        <a href="https://example.com/contact" target="_blank" rel="noopener noreferrer">Contact</a>
      </div>
    </div>
    <hr className="footer-divider" />
    <div className="footer-bottom">
      <p>&copy; 2024. All rights reserved.</p>
    </div>
  </footer>
  );
}