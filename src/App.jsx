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
      {/* Branding Header */}
      <header className="text-center py-4">
        <h1 className="text-4xl font-bold text-green-700">Sprout</h1>
        <p className="text-green-600">Healthy Meal Tracker & Reservations</p>
      </header>

      {/* Navigation Bar */}
      <nav style={{ padding: '1rem', background: '#eee', textAlign: 'center' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/tracker">Tracker</Link> |{' '}
        <Link to="/reserve">Current Reservation</Link> |{' '}
        <Link to="/reservation-history">Reservation History</Link>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4">
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
