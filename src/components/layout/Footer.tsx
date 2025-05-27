import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { SkyVoyageLogo } from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SkyVoyageLogo className="h-10 w-auto text-white mb-4" />
            <p className="mb-6 max-w-md text-neutral-400">
              SkyVoyage helps you find and book the best deals on flights worldwide. 
              Our mission is to make travel planning seamless and enjoyable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="rounded-full bg-neutral-800 p-2 text-white hover:bg-primary-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="rounded-full bg-neutral-800 p-2 text-white hover:bg-primary-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="rounded-full bg-neutral-800 p-2 text-white hover:bg-primary-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="rounded-full bg-neutral-800 p-2 text-white hover:bg-primary-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/search" className="text-neutral-400 hover:text-white transition-colors">Find Flights</Link>
              </li>
              <li>
                <a href="#destinations" className="text-neutral-400 hover:text-white transition-colors">Popular Destinations</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Travel Guides</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Flight Status</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Loyalty Program</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-medium">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Baggage Policy</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Cancellation Policy</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-medium">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-400" />
                <span className="text-neutral-400">123 SkyVoyage Avenue, Suite 500<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-neutral-400" />
                <a href="tel:+18001234567" className="text-neutral-400 hover:text-white transition-colors">1-800-123-4567</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-neutral-400" />
                <a href="mailto:info@skyvoyage.com" className="text-neutral-400 hover:text-white transition-colors">info@skyvoyage.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-8 border-neutral-800" />
        
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <p className="text-sm text-neutral-500">© 2025 SkyVoyage. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-neutral-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;