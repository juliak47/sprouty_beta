// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import TrackerPage from './pages/TrackerPage';
import ReservationPage from './pages/ReservationPage';
import ReservationHistoryPage from './pages/ReservationHistoryPage';

export default function App() {
  return (
    <div className="bg-green-50 min-h-screen text-gray-800">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 bg-green-50 z-50 shadow">
        <div className="text-center py-2">
          <h1 className="text-4xl font-bold text-green-700 m-0">Sprout</h1>
          <p className="text-green-600 m-0">Healthy Meal Tracker & Reservations</p>
        </div>
        <nav className="bg-gray-200 text-center py-2">
          <Link to="/" className="mx-2 hover:text-green-600">Home</Link> |{' '}
          <Link to="/tracker" className="mx-2 hover:text-green-600">Tracker</Link> |{' '}
          <Link to="/reserve" className="mx-2 hover:text-green-600">Current Reservation</Link> |{' '}
          <Link to="/reservation-history" className="mx-2 hover:text-green-600">Reservation History</Link>
        </nav>
      </header>

      {/* Main content (add top padding to avoid overlap with fixed header) */}
      <main className="max-w-4xl mx-auto p-4 pt-32">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu/:restaurantId" element={<MenuPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/reserve" element={<ReservationPage />} />
          <Route path="/reservation-history" element={<ReservationHistoryPage />} />
        </Routes>
      </main>

      <footer className="text-center py-4 text-sm text-green-700">
        &copy; 2025 Sprout. All rights reserved.
      </footer>
    </div>
  );
}
