import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16 flex items-center justify-center">
      <div className="container max-w-lg text-center">
        <div className="animate-float">
          <Plane className="h-24 w-24 mx-auto text-primary-400 transform rotate-45" />
        </div>
        
        <h1 className="mt-6 text-5xl font-bold text-neutral-900">404</h1>
        <h2 className="mt-2 text-3xl font-semibold text-neutral-800">Page Not Found</h2>
        
        <p className="mt-4 text-lg text-neutral-600">
          The page you're looking for has flown to another destination or doesn't exist.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="btn bg-primary-600 text-white hover:bg-primary-700 flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            Go Back Home
          </Link>
          <Link 
            to="/search" 
            className="btn bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50 flex items-center justify-center gap-2"
          >
            <Plane className="h-5 w-5" />
            Search Flights
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;