// src/pages/ReservationHistoryPage.jsx
import React, { useState, useEffect } from 'react';

export default function ReservationHistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('reservationHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  if (history.length === 0) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Reservation History</h2>
        <p>No reservations have been made yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Reservation History</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {history.map((res, index) => (
          <li
            key={index}
            style={{
              marginBottom: '1rem',
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '4px'
            }}
          >
            <p><strong>Restaurant:</strong> {res.restaurant}</p>
            <p><strong>Menu:</strong> {res.orderSummary}</p>
            <p><strong>Pickup Time:</strong> {res.pickupTime}</p>
            <p><strong>Voucher Code:</strong> {res.voucher}</p>
            <p><strong>Reserved At:</strong> {new Date(res.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
