import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  CheckCircle, Calendar, Clock, Users, Download, Printer,
  Send, Share2, Smartphone, RefreshCw, QrCode
} from 'lucide-react';
import { useFlightContext } from '../context/FlightContext';

const ConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById } = useFlightContext();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const booking = bookingId ? getBookingById(bookingId) : null;
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Finalizing your booking</h2>
          <p className="text-neutral-600">Please wait while we complete your reservation</p>
        </div>
      </div>
    );
  }
  
  if (!booking) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
        <div className="container max-w-3xl">
          <div className="card text-center py-12">
            <div className="text-error-500 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Not Found</h2>
            <p className="text-neutral-600 mb-6">
              We couldn't find the booking you're looking for. It may have expired or been removed.
            </p>
            <Link to="/" className="btn bg-primary-600 text-white hover:bg-primary-700">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const { flight, passengers, totalPrice, bookingDate, id: confirmationNumber } = booking;
  
  // Format duration from minutes to "Xh Ym"
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container max-w-3xl">
        <div className="card mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success-100 text-success-500 mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-neutral-600">
              Thank you for booking with SkyVoyage. Your flight is confirmed and ready to go.
            </p>
            <div className="mt-4 inline-block bg-primary-50 text-primary-800 px-4 py-2 rounded-md">
              <span className="text-sm font-medium">Confirmation Number: </span>
              <span className="font-bold">{confirmationNumber}</span>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
            
            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
                {/* Departure */}
                <div>
                  <p className="text-lg font-semibold">{flight.departureCity} ({flight.departureCode})</p>
                  <p className="text-neutral-600">{format(new Date(flight.departureTime), 'h:mm a')}</p>
                  <p className="text-sm text-neutral-500">
                    {format(new Date(flight.departureTime), 'EEE, MMM d, yyyy')}
                  </p>
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
                <div className="text-right">
                  <p className="text-lg font-semibold">{flight.arrivalCity} ({flight.arrivalCode})</p>
                  <p className="text-neutral-600">{format(new Date(flight.arrivalTime), 'h:mm a')}</p>
                  <p className="text-sm text-neutral-500">
                    {format(new Date(flight.arrivalTime), 'EEE, MMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-neutral-500" />
                  <span>Booking Date: {format(new Date(bookingDate), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-neutral-500" />
                  <span>Duration: {formatDuration(flight.durationMinutes)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-neutral-500" />
                  <span>Passengers: {passengers.length}</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>
            
            <div className="space-y-4 mb-6">
              {passengers.map((passenger, index) => (
                <div key={index} className="bg-neutral-50 rounded-lg p-4">
                  <p className="font-medium mb-2">
                    Passenger {index + 1}: {passenger.firstName} {passenger.lastName}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <span className="text-neutral-500">Date of Birth:</span>{' '}
                      {passenger.dateOfBirth && format(new Date(passenger.dateOfBirth), 'MMM d, yyyy')}
                    </div>
                    <div>
                      <span className="text-neutral-500">Gender:</span> {passenger.gender}
                    </div>
                    {passenger.email && (
                      <div>
                        <span className="text-neutral-500">Email:</span> {passenger.email}
                      </div>
                    )}
                    {passenger.phone && (
                      <div>
                        <span className="text-neutral-500">Phone:</span> {passenger.phone}
                      </div>
                    )}
                    <div>
                      <span className="text-neutral-500">Meal Preference:</span> {passenger.mealPreference}
                    </div>
                    {passenger.specialAssistance && (
                      <div>
                        <span className="text-neutral-500">Special Assistance:</span> Required
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
            
            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base fare ({passengers.length} {passengers.length === 1 ? 'passenger' : 'passengers'})</span>
                  <span>${flight.price * passengers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes and fees</span>
                  <span>${Math.round(totalPrice * 0.15)}</span>
                </div>
                <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-neutral-200">
                  <span>Total Paid</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card bg-primary-50 p-4 flex items-center gap-4">
            <div className="rounded-full bg-primary-100 p-3">
              <QrCode className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-primary-900">Mobile Boarding Pass</h3>
              <p className="text-sm text-primary-700">Available 24 hours before departure</p>
            </div>
          </div>
          
          <div className="card bg-accent-50 p-4 flex items-center gap-4">
            <div className="rounded-full bg-accent-100 p-3">
              <Smartphone className="h-6 w-6 text-accent-700" />
            </div>
            <div>
              <h3 className="font-medium text-accent-900">Flight Updates</h3>
              <p className="text-sm text-accent-700">Receive real-time notifications</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button className="btn flex items-center gap-2 bg-primary-600 text-white hover:bg-primary-700">
            <Download className="h-5 w-5" />
            Download E-Ticket
          </button>
          <button className="btn flex items-center gap-2 bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50">
            <Printer className="h-5 w-5" />
            Print Ticket
          </button>
          <button className="btn flex items-center gap-2 bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50">
            <Send className="h-5 w-5" />
            Email Itinerary
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;