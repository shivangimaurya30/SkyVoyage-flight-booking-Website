import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, Shield, Clock, Search, CreditCard, 
  Clock3, HeadphonesIcon, MapPin, Star, Phone 
} from 'lucide-react';
import SearchForm from '../components/home/SearchForm';
import DestinationCard from '../components/home/DestinationCard';
import Testimonial from '../components/home/Testimonial';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen bg-gradient-to-r from-primary-900 to-primary-800 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src="https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Airplane wing view" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container relative z-10 mt-20 md:mt-0">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center text-white">
              <h1 className="animate-slideUp text-4xl font-bold md:text-5xl lg:text-6xl">
                Discover the World with <span className="text-accent-300">SkyVoyage</span>
              </h1>
              <p className="animate-slideUp animation-delay-200 mt-6 text-xl text-neutral-100">
                Find and book the perfect flight for your next adventure. 
                Unbeatable prices, seamless experience.
              </p>
              
              <div className="animate-slideUp animation-delay-300 mt-8 flex flex-wrap gap-4">
                <Link 
                  to="/search" 
                  className="btn bg-accent-500 text-white hover:bg-accent-600 px-6 py-3 text-base"
                >
                  Book a Flight
                </Link>
                <a 
                  href="#features" 
                  className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 text-base"
                >
                  Learn More
                </a>
              </div>
              
              <div className="animate-slideUp animation-delay-400 mt-12 flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent-300" />
                  <span>Secure Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent-300" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-accent-300" />
                  <span>Best Price Guarantee</span>
                </div>
              </div>
            </div>
            
            <div className="lg:flex items-center justify-end">
              <div className="card bg-white/10 backdrop-blur-md border border-white/20 w-full max-w-md mx-auto lg:mr-0">
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl">Why Choose SkyVoyage</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              Experience the best flight booking service with features designed to make your journey seamless from start to finish.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="card text-center transition-transform hover:-translate-y-1">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Search</h3>
              <p className="text-neutral-600">
                Find the perfect flight with our powerful and intuitive search tools.
              </p>
            </div>
            
            <div className="card text-center transition-transform hover:-translate-y-1">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Payments</h3>
              <p className="text-neutral-600">
                Book with confidence using our secure payment processing system.
              </p>
            </div>
            
            <div className="card text-center transition-transform hover:-translate-y-1">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Clock3 className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Real-time Updates</h3>
              <p className="text-neutral-600">
                Receive instant notifications about your flight status and changes.
              </p>
            </div>
            
            <div className="card text-center transition-transform hover:-translate-y-1">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <HeadphonesIcon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">24/7 Support</h3>
              <p className="text-neutral-600">
                Our dedicated support team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Destinations Section */}
      <section id="destinations" className="section bg-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl">Popular Destinations</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our most popular flight destinations and start planning your next adventure.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DestinationCard 
              city="New York" 
              country="United States" 
              price={299}
              image="https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <DestinationCard 
              city="Paris" 
              country="France" 
              price={449}
              image="https://images.pexels.com/photos/1850619/pexels-photo-1850619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <DestinationCard 
              city="Tokyo" 
              country="Japan" 
              price={699}
              image="https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <DestinationCard 
              city="Dubai" 
              country="United Arab Emirates" 
              price={599}
              image="https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <DestinationCard 
              city="London" 
              country="United Kingdom" 
              price={399}
              image="https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <DestinationCard 
              city="Sydney" 
              country="Australia" 
              price={799}
              image="https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/search" 
              className="btn bg-primary-600 text-white hover:bg-primary-700 px-6 py-3 text-base"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              Hear from travelers who have booked their flights with SkyVoyage.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Testimonial 
              name="Sarah Johnson"
              location="New York, USA"
              quote="SkyVoyage made it so easy to book my international flight. The interface is intuitive, and I found a great deal in minutes!"
              avatar="https://i.pravatar.cc/150?img=32"
              rating={5}
            />
            <Testimonial 
              name="David Chen"
              location="Toronto, Canada"
              quote="I've been using SkyVoyage for all my business trips. Their 24/7 support has saved me multiple times when facing unexpected changes."
              avatar="https://i.pravatar.cc/150?img=69"
              rating={5}
            />
            <Testimonial 
              name="Aisha Patel"
              location="London, UK"
              quote="The price comparison feature is fantastic! I saved over $200 on my last flight to Dubai thanks to SkyVoyage."
              avatar="https://i.pravatar.cc/150?img=47"
              rating={4}
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section id="support" className="relative py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary-950/80"></div>
          <img 
            src="https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Airplane view" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold md:text-4xl">Ready for Your Next Adventure?</h2>
            <p className="mt-4 text-lg">
              Book your flight today and experience the SkyVoyage difference. 
              Best prices, seamless booking, and world-class support.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link 
                to="/search" 
                className="btn bg-accent-500 text-white hover:bg-accent-600 px-6 py-3 text-base"
              >
                Search Flights
              </Link>
              <a 
                href="tel:+18001234567" 
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 text-base"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;