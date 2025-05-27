import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { ArrowRight, Calendar, Users, RefreshCw } from 'lucide-react';
import { useFlightContext } from '../context/FlightContext';
import toast from 'react-hot-toast';

const SearchPage: React.FC = () => {
  const { searchParams, setSearchParams, searchFlights } = useFlightContext();
  const navigate = useNavigate();
  
  const [from, setFrom] = useState(searchParams.from);
  const [to, setTo] = useState(searchParams.to);
  const [departDate, setDepartDate] = useState(searchParams.departDate);
  const [returnDate, setReturnDate] = useState(searchParams.returnDate);
  const [passengers, setPassengers] = useState(searchParams.passengers);
  const [cabinClass, setCabinClass] = useState(searchParams.cabinClass);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (from === to) {
      toast.error('Departure and destination cannot be the same');
      return;
    }
    
    setSearchParams({
      from,
      to,
      departDate,
      returnDate,
      passengers,
      cabinClass,
    });
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      searchFlights();
      navigate('/results');
      setIsLoading(false);
    }, 1500);
  };
  
  const handleSwapLocations = () => {
    const tempFrom = from;
    setFrom(to);
    setTo(tempFrom);
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Search for Flights</h1>
          <p className="mt-2 text-neutral-600">
            Find the best deals on flights to your dream destination
          </p>
        </div>
        
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <label htmlFor="from" className="label">
                  From
                </label>
                <input
                  id="from"
                  type="text"
                  placeholder="City or airport"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="input"
                  required
                />
              </div>
              
              <div className="flex items-end justify-center py-2 md:py-0">
                <button
                  type="button"
                  onClick={handleSwapLocations}
                  className="rounded-full bg-neutral-100 p-2 hover:bg-neutral-200 transition-colors"
                  aria-label="Swap locations"
                >
                  <ArrowRight className="h-5 w-5 text-neutral-700" />
                </button>
              </div>
              
              <div className="relative flex-1">
                <label htmlFor="to" className="label">
                  To
                </label>
                <input
                  id="to"
                  type="text"
                  placeholder="City or airport"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <label className="label">Departure Date</label>
                <div className="relative">
                  <DatePicker
                    selected={departDate}
                    onChange={(date) => setDepartDate(date || new Date())}
                    minDate={new Date()}
                    className="input w-full"
                    dateFormat="MMM d, yyyy"
                    placeholderText="Select date"
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                </div>
              </div>
              
              <div>
                <label className="label">Return Date</label>
                <div className="relative">
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date || new Date())}
                    minDate={departDate}
                    className="input w-full"
                    dateFormat="MMM d, yyyy"
                    placeholderText="Select date"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                </div>
              </div>
              
              <div>
                <label htmlFor="passengers" className="label">
                  Passengers
                </label>
                <div className="relative">
                  <select
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="input appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                  <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                </div>
              </div>
              
              <div>
                <label htmlFor="cabinClass" className="label">
                  Cabin Class
                </label>
                <select
                  id="cabinClass"
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="input appearance-none"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="btn bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Search Flights'
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Popular Searches</h2>
            <p className="text-neutral-600 mt-1">
              Quickly select from popular routes
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularRoutes.map((route, index) => (
              <button
                key={index}
                className="card flex items-center p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setFrom(route.from);
                  setTo(route.to);
                }}
              >
                <div className="flex-1">
                  <div className="font-medium">{route.from} → {route.to}</div>
                  <div className="text-sm text-neutral-500">
                    {route.fromCode} - {route.toCode}
                  </div>
                </div>
                <div className="text-primary-600 font-semibold">
                  ${route.price}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-12 card bg-primary-50 border border-primary-100">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary-100 p-3">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-primary-900">Flexible with dates?</h3>
              <p className="mt-1 text-primary-700">
                Use our flexible dates option to see prices for multiple days around your preferred departure date.
              </p>
              <button className="mt-3 text-primary-600 font-medium hover:text-primary-700 transition-colors">
                View flexible dates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dummy data for popular routes
const popularRoutes = [
  { from: 'New York', to: 'London', fromCode: 'NYC', toCode: 'LHR', price: 449 },
  { from: 'Los Angeles', to: 'Tokyo', fromCode: 'LAX', toCode: 'HND', price: 799 },
  { from: 'Chicago', to: 'Paris', fromCode: 'ORD', toCode: 'CDG', price: 599 },
  { from: 'Miami', to: 'Cancun', fromCode: 'MIA', toCode: 'CUN', price: 299 },
  { from: 'San Francisco', to: 'Sydney', fromCode: 'SFO', toCode: 'SYD', price: 999 },
  { from: 'Boston', to: 'Rome', fromCode: 'BOS', toCode: 'FCO', price: 649 },
];

export default SearchPage;