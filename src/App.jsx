// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import TrackerPage from './pages/TrackerPage';
import ReservationPage from './pages/ReservationPage';
import ReservationHistoryPage from './pages/ReservationHistoryPage';

// Additional Components

function HealthResources() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Health & Wellness Resources</h2>
      <p>
        Here are some tips to help you eat healthy and maintain a balanced lifestyle:
      </p>
      <ul
        className="list-none ml-0 mt-2 text-lg"
        style={{ listStyleType: 'none', marginLeft: 0 }}
      >
        <li>Incorporate plenty of fruits and vegetables in your meals.</li>
        <li>Drink water regularly and stay hydrated.</li>
        <li>Plan your meals to avoid impulsive, unhealthy choices.</li>
        <li>Engage in regular physical activity.</li>
        <li>Practice mindfulness and stress reduction techniques.</li>
      </ul>
      <p className="mt-4">
        Explore more resources for expert advice on nutrition and wellness.
      </p>
    </div>
  );
}

/*
function OrderNotification() {
  const [order, setOrder] = React.useState('');
  const [pickupTime, setPickupTime] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate notifying the restaurant.
    setMessage(`Order "${order}" with pickup at ${pickupTime} has been sent to the restaurant.`);
    setOrder('');
    setPickupTime('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Your Order:</label>
          <input
            type="text"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Pickup Time:</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Notify Restaurant
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
*/

function DailyLog() {
  const [logEntries, setLogEntries] = React.useState(() => {
    const saved = localStorage.getItem('dailyLogs');
    return saved ? JSON.parse(saved) : [];
  });
  const [mood, setMood] = React.useState('');
  const [physiological, setPhysiological] = React.useState('');
  const [food, setFood] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('dailyLogs', JSON.stringify(logEntries));
  }, [logEntries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toISOString(),
      mood,
      physiological,
      food,
    };
    setLogEntries([newEntry, ...logEntries]);
    setMood('');
    setPhysiological('');
    setFood('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Daily Log</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">How do you feel today?</label>
          <textarea
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="border p-2 w-full"
            placeholder="e.g.,Happy, Tired, Energetic"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Physiological Observation</label>
          <textarea
            type="text"
            value={physiological}
            onChange={(e) => setPhysiological(e.target.value)}
            className="border p-2 w-full"
            placeholder="e.g.,Temperature, Nausea"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">What did you eat today?</label>
          <textarea
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="border p-2 w-full"
            placeholder="Describe your meals and snacks"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save Log
        </button>
      </form>
      <h3 className="text-xl font-semibold mt-6">Log History</h3>
      <ul
        className="list-none mt-2 ml-0"
        style={{ listStyleType: 'none', marginLeft: 0 }}
      >
        {logEntries.map((entry, index) => (
          <li key={index} className="border p-2 mb-2">
            <p className="text-sm text-gray-500">
              {new Date(entry.date).toLocaleString()}
            </p>
            <p><strong>Mood:</strong> {entry.mood}</p>
            <p><strong>Physiological:</strong> {entry.physiological}</p>
            <p><strong>Food:</strong> {entry.food}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
          <Link to="/reservation-history" className="mx-2 hover:text-green-600">Reservation History</Link> |{' '}
          <Link to="/health-resources" className="mx-2 hover:text-green-600">Health Resources</Link> |{' '}
          {/* Order Notification tab is commented out */}
          {/* <Link to="/order-notification" className="mx-2 hover:text-green-600">Order Notification</Link> |{' '} */}
          <Link to="/daily-log" className="mx-2 hover:text-green-600">Daily Log</Link>
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
          <Route path="/health-resources" element={<HealthResources />} />
          {/* Order Notification route is commented out */}
          {/* <Route path="/order-notification" element={<OrderNotification />} /> */}
          <Route path="/daily-log" element={<DailyLog />} />
        </Routes>
      </main>

      <footer className="text-center py-4 text-sm text-green-700">
        &copy; 2025 Sprout. All rights reserved.
      </footer>
    </div>
  );
}
