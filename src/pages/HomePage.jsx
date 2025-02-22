// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const restaurants = [
  { id: '1', name: 'Restaurant A' },
  { id: '2', name: 'Restaurant B' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-100 p-8">
      {/* Branding Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">Sprout Restaurants</h1>
        <p className="text-lg text-green-700">Discover healthy dining options near you</p>
      </header>
      
      {/* Restaurant List */}
      <main className="max-w-md mx-auto">
        <ul 
          className="space-y-6 list-none pl-0"
          style={{ listStyleType: 'none' }}>
          {restaurants.map((r) => (
            <li
              key={r.id}
              className="bg-white border border-green-300 rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >
              <Link
                to={`/menu/${r.id}`}
                className="block text-2xl font-semibold text-green-600 text-center hover:underline"
              >
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
