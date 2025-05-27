import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, Phone, User } from 'lucide-react';
import { SkyVoyageLogo } from '../ui/Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || !isHomePage 
      ? 'bg-white shadow-md py-3' 
      : 'bg-transparent py-5'
  }`;
  
  const linkClasses = `font-medium transition-colors ${
    isScrolled || !isHomePage 
      ? 'text-neutral-800 hover:text-primary-600' 
      : 'text-white hover:text-accent-300'
  }`;
  
  const mobileMenuClasses = `fixed inset-0 flex flex-col bg-white z-50 p-6 space-y-8 transition-transform duration-300 ease-in-out ${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  }`;
  
  return (
    <header className={navbarClasses}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <SkyVoyageLogo 
            className={`h-9 w-auto ${isScrolled || !isHomePage ? 'text-primary-600' : 'text-white'}`} 
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/search" className={linkClasses}>
            Find Flights
          </Link>
          <a href="#features" className={linkClasses}>
            Features
          </a>
          <a href="#destinations" className={linkClasses}>
            Destinations
          </a>
          <a href="#support" className={linkClasses}>
            Support
          </a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <a href="tel:+18001234567" className={`flex items-center gap-1.5 ${linkClasses}`}>
            <Phone className="h-4 w-4" />
            <span>1-800-123-4567</span>
          </a>
          <Link 
            to="/login" 
            className={`flex items-center gap-1.5 rounded-md px-4 py-2 border ${
              isScrolled || !isHomePage 
                ? 'border-primary-600 text-primary-600 hover:bg-primary-50' 
                : 'border-white text-white hover:bg-white/10'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
        </div>
        
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={isScrolled || !isHomePage ? 'text-neutral-800' : 'text-white'} />
          ) : (
            <Menu className={isScrolled || !isHomePage ? 'text-neutral-800' : 'text-white'} />
          )}
        </button>
        
        <div className={mobileMenuClasses}>
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <SkyVoyageLogo className="h-9 w-auto text-primary-600" />
            </Link>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6 text-neutral-800" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 text-lg">
            <Link to="/search" className="text-neutral-800 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Find Flights
            </Link>
            <a href="#features" className="text-neutral-800 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Features
            </a>
            <a href="#destinations" className="text-neutral-800 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Destinations
            </a>
            <a href="#support" className="text-neutral-800 hover:text-primary-600" onClick={() => setIsOpen(false)}>
              Support
            </a>
          </nav>
          
          <div className="flex flex-col space-y-4 mt-auto">
            <a 
              href="tel:+18001234567" 
              className="flex items-center gap-2 text-neutral-800 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="h-5 w-5" />
              <span>1-800-123-4567</span>
            </a>
            <Link 
              to="/login"
              className="flex items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-3 text-white hover:bg-primary-700"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;