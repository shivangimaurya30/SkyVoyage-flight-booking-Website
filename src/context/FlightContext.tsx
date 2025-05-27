import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addDays } from 'date-fns';
import { flights } from '../data/flights';
import { generateBookingId } from '../utils/helpers';
import { Flight, SearchParams, Booking, PassengerInfo } from '../types';

interface FlightContextType {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  searchResults: Flight[];
  setSearchResults: (flights: Flight[]) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
  passengerInfo: PassengerInfo[];
  setPassengerInfo: (info: PassengerInfo[]) => void;
  booking: Booking | null;
  createBooking: () => string;
  getBookingById: (id: string) => Booking | null;
  searchFlights: () => void;
}

const defaultSearchParams: SearchParams = {
  from: '',
  to: '',
  departDate: new Date(),
  returnDate: addDays(new Date(), 7),
  passengers: 1,
  cabinClass: 'Economy',
};

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearchParams);
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo[]>([]);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Record<string, Booking>>({});

  const searchFlights = () => {
    // Simple filtering based on from/to
    const results = flights.filter(
      (flight) => 
        (!searchParams.from || flight.departureCity.toLowerCase().includes(searchParams.from.toLowerCase()) || 
         flight.departureCode.toLowerCase() === searchParams.from.toLowerCase()) &&
        (!searchParams.to || flight.arrivalCity.toLowerCase().includes(searchParams.to.toLowerCase()) || 
         flight.arrivalCode.toLowerCase() === searchParams.to.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const createBooking = () => {
    if (!selectedFlight || passengerInfo.length === 0) {
      throw new Error('Cannot create booking without flight and passenger information');
    }

    const bookingId = generateBookingId();
    const newBooking: Booking = {
      id: bookingId,
      flight: selectedFlight,
      passengers: passengerInfo,
      totalPrice: selectedFlight.price * passengerInfo.length,
      bookingDate: new Date(),
      status: 'Confirmed',
    };

    setBooking(newBooking);
    setBookings((prev) => ({ ...prev, [bookingId]: newBooking }));
    
    return bookingId;
  };

  const getBookingById = (id: string): Booking | null => {
    return bookings[id] || null;
  };

  const value = {
    searchParams,
    setSearchParams,
    searchResults,
    setSearchResults,
    selectedFlight,
    setSelectedFlight,
    passengerInfo,
    setPassengerInfo,
    booking,
    createBooking,
    getBookingById,
    searchFlights,
  };

  return <FlightContext.Provider value={value}>{children}</FlightContext.Provider>;
};

export const useFlightContext = (): FlightContextType => {
  const context = useContext(FlightContext);
  if (context === undefined) {
    throw new Error('useFlightContext must be used within a FlightProvider');
  }
  return context;
};