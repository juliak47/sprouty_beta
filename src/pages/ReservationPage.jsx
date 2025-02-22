// src/pages/ReservationPage.jsx
import React, { useState, useEffect } from 'react';

export default function ReservationPage() {
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    // Retrieve the current reservation from local storage
    const storedReservation = localStorage.getItem('reservation');
    if (storedReservation) {
      setReservation(JSON.parse(storedReservation));
    }
  }, []);

  if (!reservation) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Current Reservation</h2>
        <p>No current reservation found. Please reserve a meal.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Current Reservation</h2>
      <p>
        <strong>Restaurant:</strong> {reservation.restaurantName}
      </p>
      <p>
        <strong>Meal:</strong> {reservation.meal}
      </p>
      <p>
        <strong>Price:</strong> {reservation.price}
      </p>
      <p>
        <strong>Voucher Code:</strong> {reservation.voucher}
      </p>
      <p>
        <strong>Reserved At:</strong> {new Date(reservation.date).toLocaleString()}
      </p>
    </div>
  );
}
