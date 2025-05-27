import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Filter, ArrowUpDown, Clock, Plane, ArrowRight, 
  BarChart2, RefreshCw, Wifi, Coffee, Tv, Utensils
} from 'lucide-react';
import { useFlightContext } from '../context/FlightContext';
import FlightCard from '../components/flights/FlightCard';

const ResultsPage: React.FC = () => {
  const { searchParams, searchResults, setSelectedFlight } = useFlightContext();
  const navigate = useNavigate();
  
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract unique airlines from results
  const airlines = [...new Set(searchResults.map(flight => flight.airline))];
  
  // Calculate min and max price from results
  const minPrice = Math.min(...searchResults.map(flight => flight.price));
  const maxPrice = Math.max(...searchResults.map(flight => flight.price));
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Sort and filter flights
  const sortedAndFilteredFlights = searchResults
    .filter(flight => 
      (selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline)) &&
      (flight.price >= priceRange[0] && flight.price <= priceRange[1])
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
      if (sortBy === 'departure') return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
      return 0;
    });
  
  const handleSelectFlight = (flight: any) => {
    setSelectedFlight(flight);
    navigate(`/booking/${flight.id}`);
  };
  
  const toggleAirlineFilter = (airline: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airline)
        ? prev.filter(a => a !== airline)
        : [...prev, airline]
    );
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Searching for the best flights</h2>
          <p className="text-neutral-600">We're finding the perfect options for your trip</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold md:text-3xl">
              {searchParams.from || 'Any Origin'} to {searchParams.to || 'Any Destination'}
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Edit Search
            </button>
          </div>
          <p className="text-neutral-600 mt-1">
            {format(searchParams.departDate, 'MMM d, yyyy')}
            {searchParams.returnDate && ` - ${format(searchParams.returnDate, 'MMM d, yyyy')}`} • 
            {searchParams.passengers} {searchParams.passengers === 1 ? 'Passenger' : 'Passengers'} • 
            {searchParams.cabinClass}
          </p>
        </div>
        
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filters - Mobile View Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50"
            >
              <Filter className="h-5 w-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 space-y-6 flex-shrink-0`}>
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Airlines</h3>
                  <div className="space-y-2">
                    {airlines.map(airline => (
                      <label key={airline} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.length === 0 || selectedAirlines.includes(airline)}
                          onChange={() => toggleAirlineFilter(airline)}
                          className="rounded text-primary-600 focus:ring-primary-500"
                        />
                        <span>{airline}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Stops</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                      <span>Nonstop</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                      <span>1 Stop</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Departure Time</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                      <span>Morning (6AM - 12PM)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                      <span>Afternoon (12PM - 6PM)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                      <span>Evening (6PM - 12AM)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
              <div className="text-sm text-neutral-600">
                <span className="font-medium text-neutral-900">{sortedAndFilteredFlights.length}</span> flights found
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price' | 'duration' | 'departure')}
                  className="rounded-md border-neutral-300 text-sm py-1.5 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="price">Price</option>
                  <option value="duration">Duration</option>
                  <option value="departure">Departure Time</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {sortedAndFilteredFlights.length > 0 ? (
                sortedAndFilteredFlights.map((flight) => (
                  <FlightCard 
                    key={flight.id} 
                    flight={flight} 
                    onSelect={() => handleSelectFlight(flight)} 
                  />
                ))
              ) : (
                <div className="card text-center py-12">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                    <Plane className="h-8 w-8 text-neutral-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No flights found</h3>
                  <p className="text-neutral-600 mb-6">
                    We couldn't find any flights matching your search criteria. Try adjusting your filters or search for different dates.
                  </p>
                  <button
                    onClick={() => navigate('/search')}
                    className="btn bg-primary-600 text-white hover:bg-primary-700"
                  >
                    Start a New Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;