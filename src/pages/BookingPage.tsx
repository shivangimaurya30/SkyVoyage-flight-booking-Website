import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plane, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useFlightContext } from '../context/FlightContext';
import BookingSummary from '../components/booking/BookingSummary';
import PassengerForm from '../components/booking/PassengerForm';

const BookingPage: React.FC = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const navigate = useNavigate();
  const { 
    searchResults, 
    selectedFlight, 
    setSelectedFlight, 
    searchParams,
    passengerInfo,
    setPassengerInfo,
    createBooking 
  } = useFlightContext();
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  // Find the flight by ID if not already selected
  useEffect(() => {
    if (!selectedFlight && flightId) {
      const flight = searchResults.find(f => f.id.toString() === flightId);
      if (flight) {
        setSelectedFlight(flight);
      } else {
        navigate('/search');
        toast.error('Flight not found. Please try another search.');
      }
    }
  }, [flightId, selectedFlight, searchResults, setSelectedFlight, navigate]);
  
  // Initialize passenger forms based on number of passengers
  useEffect(() => {
    if (searchParams.passengers && passengerInfo.length === 0) {
      const initialPassengers = Array(searchParams.passengers)
        .fill(null)
        .map((_, index) => ({
          id: index + 1,
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          passportNumber: '',
          email: index === 0 ? '' : undefined,
          phone: index === 0 ? '' : undefined,
          specialAssistance: false,
          mealPreference: 'Regular',
        }));
      
      setPassengerInfo(initialPassengers);
    }
  }, [searchParams.passengers, passengerInfo.length, setPassengerInfo]);
  
  const validatePassengerInfo = () => {
    const errors: string[] = [];
    
    passengerInfo.forEach((passenger, index) => {
      const passengerNum = index + 1;
      
      if (!passenger.firstName) {
        errors.push(`Passenger ${passengerNum}: First name is required`);
      }
      
      if (!passenger.lastName) {
        errors.push(`Passenger ${passengerNum}: Last name is required`);
      }
      
      if (!passenger.gender) {
        errors.push(`Passenger ${passengerNum}: Gender is required`);
      }
      
      if (!passenger.dateOfBirth) {
        errors.push(`Passenger ${passengerNum}: Date of birth is required`);
      }
      
      if (index === 0 && !passenger.email) {
        errors.push('Contact email is required');
      }
      
      if (index === 0 && !passenger.phone) {
        errors.push('Contact phone number is required');
      }
      
      if (passenger.email && !/^\S+@\S+\.\S+$/.test(passenger.email)) {
        errors.push(`Passenger ${passengerNum}: Invalid email format`);
      }
      
      if (passenger.phone && !/^\+?[0-9\s-()]{7,}$/.test(passenger.phone)) {
        errors.push(`Passenger ${passengerNum}: Invalid phone number`);
      }
    });
    
    setValidationErrors(errors);
    return errors.length === 0;
  };
  
  const handleContinue = () => {
    if (currentStep === 1) {
      if (validatePassengerInfo()) {
        setCurrentStep(2);
        window.scrollTo(0, 0);
      }
    } else if (currentStep === 2) {
      setIsLoading(true);
      
      // Simulate API call for booking
      setTimeout(() => {
        try {
          const bookingId = createBooking();
          navigate(`/confirmation/${bookingId}`);
        } catch (error) {
          toast.error('Failed to create booking. Please try again.');
          setIsLoading(false);
        }
      }, 2000);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
  };
  
  if (!selectedFlight) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Loading flight details</h2>
          <p className="text-neutral-600">Please wait while we retrieve your flight information</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Complete Your Booking</h1>
          <div className="mt-4 flex items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 ${
              currentStep >= 2 ? 'bg-primary-600' : 'bg-neutral-200'
            }`}></div>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
            }`}>
              2
            </div>
            <div className={`h-1 w-16 ${
              currentStep >= 3 ? 'bg-primary-600' : 'bg-neutral-200'
            }`}></div>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
            }`}>
              3
            </div>
          </div>
          <div className="mt-2 flex text-sm">
            <div className="flex-1 text-center">
              <div className={currentStep >= 1 ? 'text-primary-600 font-medium' : 'text-neutral-600'}>
                Passenger Information
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className={currentStep >= 2 ? 'text-primary-600 font-medium' : 'text-neutral-600'}>
                Payment
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className={currentStep >= 3 ? 'text-primary-600 font-medium' : 'text-neutral-600'}>
                Confirmation
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-6">Passenger Information</h2>
                
                {validationErrors.length > 0 && (
                  <div className="mb-6 bg-error-50 border border-error-100 text-error-900 px-4 py-3 rounded">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-error-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Please correct the following errors:</p>
                        <ul className="list-disc list-inside mt-1 text-sm">
                          {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-8">
                  {passengerInfo.map((passenger, index) => (
                    <PassengerForm
                      key={passenger.id}
                      passenger={passenger}
                      index={index}
                      onChange={(updatedPassenger) => {
                        const newPassengers = [...passengerInfo];
                        newPassengers[index] = updatedPassenger;
                        setPassengerInfo(newPassengers);
                      }}
                      isPrimaryContact={index === 0}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                
                <div className="bg-success-50 border border-success-100 text-success-900 px-4 py-3 rounded mb-6">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">This is a demo application</p>
                      <p className="text-sm">No real payment will be processed.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="label">Cardholder Name</label>
                    <input
                      id="cardName"
                      type="text"
                      className="input"
                      placeholder="As it appears on your card"
                      defaultValue={`${passengerInfo[0]?.firstName} ${passengerInfo[0]?.lastName}`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="label">Card Number</label>
                    <input
                      id="cardNumber"
                      type="text"
                      className="input"
                      placeholder="•••• •••• •••• ••••"
                      defaultValue="4111 1111 1111 1111"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="label">Expiration Date</label>
                      <input
                        id="expiryDate"
                        type="text"
                        className="input"
                        placeholder="MM/YY"
                        defaultValue="12/25"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="label">Security Code (CVV)</label>
                      <input
                        id="cvv"
                        type="text"
                        className="input"
                        placeholder="123"
                        defaultValue="123"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="billingAddress" className="label">Billing Address</label>
                    <input
                      id="billingAddress"
                      type="text"
                      className="input"
                      placeholder="Street address"
                      defaultValue="123 Main St"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="label">City</label>
                      <input
                        id="city"
                        type="text"
                        className="input"
                        placeholder="City"
                        defaultValue="New York"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zip" className="label">ZIP Code</label>
                      <input
                        id="zip"
                        type="text"
                        className="input"
                        placeholder="ZIP"
                        defaultValue="10001"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:row-start-1">
            <BookingSummary 
              flight={selectedFlight} 
              passengers={passengerInfo.length} 
              cabinClass={searchParams.cabinClass}
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleBack}
            className="btn bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50"
          >
            Back
          </button>
          
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="btn bg-primary-600 text-white hover:bg-primary-700"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : currentStep === 1 ? (
              'Continue to Payment'
            ) : (
              'Confirm Booking'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;