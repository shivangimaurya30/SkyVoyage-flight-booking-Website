import { Routes, Route } from 'react-router-dom';
import { FlightProvider } from './context/FlightContext';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <FlightProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="booking/:flightId" element={<BookingPage />} />
          <Route path="confirmation/:bookingId" element={<ConfirmationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </FlightProvider>
  );
}

export default App;