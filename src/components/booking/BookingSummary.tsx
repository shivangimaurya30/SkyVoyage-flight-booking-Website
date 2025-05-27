import React from 'react';
import { format } from 'date-fns';
import { Plane, Clock, Calendar } from 'lucide-react';
import { Flight } from '../../types';

interface BookingSummaryProps {
  flight: Flight;
  passengers: number;
  cabinClass: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ flight, passengers, cabinClass }) => {
  // Format duration from minutes to "Xh Ym"
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const totalPrice = flight.price * passengers;
  const taxes = Math.round(totalPrice * 0.15);
  const grandTotal = totalPrice + taxes;
  
  return (
    <div className="card sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
      
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
            <img 
              src={flight.airlineLogo || `https://via.placeholder.com/48?text=${flight.airline.charAt(0)}`}
              alt={flight.airline}
              className="h-6 w-6 object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium">{flight.airline}</h3>
            <p className="text-sm text-neutral-500">Flight {flight.flightNumber}</p>
          </div>
        </div>
        
        <div className="border-t border-b border-neutral-200 py-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-lg font-semibold">{flight.departureCode}</p>
              <p className="text-sm text-neutral-500">{flight.departureCity}</p>
            </div>
            <div className="flex flex-col items-center px-2">
              <p className="text-xs font-medium text-neutral-500">
                {formatDuration(flight.durationMinutes)}
              </p>
              <div className="flight-path w-16 py-1">
                <div className="flex justify-between">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-600 flight-path-dot"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-600 flight-path-dot"></div>
                </div>
              </div>
              <p className="text-xs text-neutral-500">
                {flight.stops === 0 
                  ? 'Nonstop' 
                  : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{flight.arrivalCode}</p>
              <p className="text-sm text-neutral-500">{flight.arrivalCity}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-1">
            <Calendar className="h-4 w-4 text-neutral-500" />
            <span>{format(new Date(flight.departureTime), 'EEEE, MMM d, yyyy')}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Clock className="h-4 w-4 text-neutral-500" />
            <span>
              {format(new Date(flight.departureTime), 'h:mm a')} - {format(new Date(flight.arrivalTime), 'h:mm a')}
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Plane className="h-4 w-4 text-neutral-500" />
            <span className="text-sm font-medium">{cabinClass} Class</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-neutral-400"></div>
            </div>
            <span className="text-sm text-neutral-600">
              {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
            </span>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Base fare ({passengers} {passengers === 1 ? 'passenger' : 'passengers'})</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxes and fees</span>
              <span>${taxes}</span>
            </div>
            <div className="flex justify-between font-semibold mt-4 pt-2 border-t border-neutral-200">
              <span>Total</span>
              <span className="text-primary-600">${grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;