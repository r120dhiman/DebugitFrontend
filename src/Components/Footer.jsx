import React from 'react';
import { Link } from 'react-router-dom';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-2">Civic Portal</h4>
          </div>
          <div className="flex flex-wrap justify-center space-x-6 text-sm">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined className="text-2xl hover:text-white transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined className="text-2xl hover:text-white transition" />
            </a>
            <a href="mailto:contact@example.com">
              <MailOutlined className="text-2xl hover:text-white transition" />
            </a>
          </div>
        </div>
        <hr className="border-gray-700 my-6" />
        <div className="text-center text-sm">
          <p>&copy; {currentYear} Civic Portal. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-500">
            Made by <span className="text-white">Civic Portal</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;