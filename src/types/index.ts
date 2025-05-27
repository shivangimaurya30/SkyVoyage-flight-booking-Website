export interface Flight {
  id: string | number;
  airline: string;
  airlineLogo?: string;
  flightNumber: string;
  departureCity: string;
  departureCode: string;
  departureTime: string;
  arrivalCity: string;
  arrivalCode: string;
  arrivalTime: string;
  durationMinutes: number;
  stops: number;
  price: number;
  cabinClass?: string;
  aircraft?: string;
}

export interface SearchParams {
  from: string;
  to: string;
  departDate: Date;
  returnDate: Date | null;
  passengers: number;
  cabinClass: string;
}

export interface PassengerInfo {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  passportNumber: string;
  email?: string;
  phone?: string;
  specialAssistance: boolean;
  mealPreference: string;
}

export interface Booking {
  id: string;
  flight: Flight;
  passengers: PassengerInfo[];
  totalPrice: number;
  bookingDate: Date;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}