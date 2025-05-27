import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFlightContext } from '../../context/FlightContext';

const SearchForm: React.FC = () => {
  const { searchParams, setSearchParams } = useFlightContext();
  const navigate = useNavigate();
  
  const [from, setFrom] = useState(searchParams.from);
  const [to, setTo] = useState(searchParams.to);
  const [departDate, setDepartDate] = useState(searchParams.departDate);
  const [returnDate, setReturnDate] = useState(searchParams.returnDate);
  const [passengers, setPassengers] = useState(searchParams.passengers);
  const [cabinClass, setCabinClass] = useState(searchParams.cabinClass);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setSearchParams({
      from,
      to,
      departDate,
      returnDate,
      passengers,
      cabinClass,
    });
    
    navigate('/search');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-white md:text-2xl">Find Your Flight</h3>
      
      <div className="grid gap-4">
        <div className="relative">
          <label htmlFor="from" className="block text-sm font-medium text-white mb-1">
            From
          </label>
          <input
            id="from"
            type="text"
            placeholder="City or airport"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="input bg-white/20 border-white/30 text-white placeholder:text-white/60"
            required
          />
        </div>
        
        <div className="relative">
          <label htmlFor="to" className="block text-sm font-medium text-white mb-1">
            To
          </label>
          <input
            id="to"
            type="text"
            placeholder="City or airport"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="input bg-white/20 border-white/30 text-white placeholder:text-white/60"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Departure Date
          </label>
          <div className="relative">
            <DatePicker
              selected={departDate}
              onChange={(date) => setDepartDate(date || new Date())}
              minDate={new Date()}
              className="input bg-white/20 border-white/30 text-white placeholder:text-white/60 w-full"
              dateFormat="MMM d, yyyy"
              placeholderText="Select date"
              required
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Return Date
          </label>
          <div className="relative">
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date || new Date())}
              minDate={departDate}
              className="input bg-white/20 border-white/30 text-white placeholder:text-white/60 w-full"
              dateFormat="MMM d, yyyy"
              placeholderText="Select date"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="passengers" className="block text-sm font-medium text-white mb-1">
            Passengers
          </label>
          <div className="relative">
            <select
              id="passengers"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="input bg-white/20 border-white/30 text-white appearance-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num} className="text-neutral-900">
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </select>
            <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          </div>
        </div>
        
        <div>
          <label htmlFor="cabinClass" className="block text-sm font-medium text-white mb-1">
            Cabin Class
          </label>
          <select
            id="cabinClass"
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            className="input bg-white/20 border-white/30 text-white appearance-none"
          >
            <option value="Economy" className="text-neutral-900">Economy</option>
            <option value="Premium Economy" className="text-neutral-900">Premium Economy</option>
            <option value="Business" className="text-neutral-900">Business</option>
            <option value="First" className="text-neutral-900">First</option>
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        className="btn w-full bg-accent-500 text-white hover:bg-accent-600 py-3 text-base"
      >
        Search Flights
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchForm;