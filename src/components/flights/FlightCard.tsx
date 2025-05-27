import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Clock, ArrowRight, ChevronDown, ChevronUp, 
  Wifi, Coffee, Tv, Utensils, Headphones, PlugZap
} from 'lucide-react';
import { Flight } from '../../types';

interface FlightCardProps {
  flight: Flight;
  onSelect: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format duration from minutes to "Xh Ym"
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Format time (assuming ISO string input)
  const formatTime = (timeString: string) => {
    return format(new Date(timeString), 'h:mm a');
  };
  
  return (
    <div className="card flight-card-hover overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Airline Info */}
        <div className="flex items-center space-x-3 md:w-1/4 mb-4 md:mb-0">
          <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
            <img 
              src={flight.airlineLogo || `https://via.placeholder.com/48?text=${flight.airline.charAt(0)}`}
              alt={flight.airline}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium">{flight.airline}</h3>
            <p className="text-sm text-neutral-500">Flight {flight.flightNumber}</p>
          </div>
        </div>
        
        {/* Flight Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4 md:mb-0">
          {/* Departure */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-semibold">{formatTime(flight.departureTime)}</p>
            <p className="text-neutral-500">{flight.departureCode}</p>
          </div>
          
          {/* Duration */}
          <div className="flex flex-col items-center">
            <p className="text-sm font-medium text-neutral-500">
              {formatDuration(flight.durationMinutes)}
            </p>
            <div className="flight-path w-full max-w-[150px] py-2">
              <div className="flex justify-between">
                <div className="h-2 w-2 rounded-full bg-primary-600 flight-path-dot"></div>
                <div className="h-2 w-2 rounded-full bg-primary-600 flight-path-dot"></div>
              </div>
            </div>
            <p className="text-xs text-neutral-500">
              {flight.stops === 0 
                ? 'Nonstop' 
                : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
            </p>
          </div>
          
          {/* Arrival */}
          <div className="text-center md:text-right">
            <p className="text-2xl font-semibold">{formatTime(flight.arrivalTime)}</p>
            <p className="text-neutral-500">{flight.arrivalCode}</p>
          </div>
        </div>
        
        {/* Price and Button */}
        <div className="flex flex-col md:items-end justify-center space-y-2 md:w-1/5">
          <p className="text-2xl font-bold text-primary-600">${flight.price}</p>
          <p className="text-sm text-neutral-500">per person</p>
          <button
            onClick={onSelect}
            className="btn bg-primary-600 text-white hover:bg-primary-700 w-full md:w-auto"
          >
            Select
          </button>
        </div>
      </div>
      
      {/* Expandable Section */}
      <div className="mt-4 pt-2 border-t border-neutral-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <span className="text-sm mr-1">
            {isExpanded ? 'Hide details' : 'Show details'}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Flight Information</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 text-neutral-500 mt-0.5" />
                    <span>
                      <span className="font-medium">Departure:</span> {format(new Date(flight.departureTime), 'MMM d, yyyy h:mm a')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 text-neutral-500 mt-0.5" />
                    <span>
                      <span className="font-medium">Arrival:</span> {format(new Date(flight.arrivalTime), 'MMM d, yyyy h:mm a')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 text-neutral-500 mt-0.5" />
                    <span>
                      <span className="font-medium">Duration:</span> {formatDuration(flight.durationMinutes)}
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 text-neutral-500 mt-0.5" />
                    <span>
                      <span className="font-medium">Aircraft:</span> {flight.aircraft || 'Boeing 737'}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Amenities & Services</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Wifi className="h-4 w-4 text-neutral-500" />
                    <span>Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Utensils className="h-4 w-4 text-neutral-500" />
                    <span>Meal Service</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tv className="h-4 w-4 text-neutral-500" />
                    <span>Entertainment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <PlugZap className="h-4 w-4 text-neutral-500" />
                    <span>Power Outlets</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Headphones className="h-4 w-4 text-neutral-500" />
                    <span>Headphones</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Coffee className="h-4 w-4 text-neutral-500" />
                    <span>Beverages</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-3 rounded text-sm">
              <p className="font-medium">Baggage Information</p>
              <p className="text-neutral-600 mt-1">
                {flight.cabinClass === 'Economy' 
                  ? 'Economy includes 1 carry-on bag and 1 personal item. First checked bag may have a fee.' 
                  : 'Business/First Class includes 2 checked bags, 1 carry-on, and 1 personal item.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightCard;