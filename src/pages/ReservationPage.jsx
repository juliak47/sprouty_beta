import React, { useState, useEffect } from 'react';

export default function ReservationPage() {
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const storedReservation = localStorage.getItem('reservation');
    if (storedReservation) {
      setReservation(JSON.parse(storedReservation));
    }
  }, []);

  if (!reservation) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Current Reservation</h2>
        <p>No current reservation found. Please reserve a meal.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Current Reservation</h2>
      <p><strong>Restaurant:</strong> {reservation.restaurant}</p>
      <p><strong>Menu:</strong> {reservation.orderSummary}</p>
      <p><strong>Pickup Time:</strong> {reservation.pickupTime}</p>
      <p><strong>Voucher Code:</strong> {reservation.voucher}</p>
      <p><strong>Reserved At:</strong> {new Date(reservation.date).toLocaleString()}</p>
    </div>
  );
}
