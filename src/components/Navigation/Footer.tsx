import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2 space-x-6">
            <Link to="/about" className="text-gray-500 hover:text-gray-700">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-700">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-gray-700">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-700">
              Terms
            </Link>
            <Link to="/help" className="text-gray-500 hover:text-gray-700">
              Help Center
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} ExamMaster. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};