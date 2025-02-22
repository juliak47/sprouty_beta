// src/pages/MenuPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const restaurantData = [
  {
    id: '1',
    name: 'Restaurant A',
    menu: [
      { item: 'Salad', price: '$5' },
      { item: 'Chicken', price: '$10' },
    ],
  },
  {
    id: '2',
    name: 'Restaurant B',
    menu: [
      { item: 'Pizza', price: '$8' },
      { item: 'Pasta', price: '$12' },
    ],
  },
];

export default function MenuPage() {
  const { restaurantId } = useParams();
  const restaurant = restaurantData.find((r) => r.id === restaurantId);
  const navigate = useNavigate();
  const maxProgress = 8; // Use 8 steps for avatar progress

  if (!restaurant) {
    return <div className="p-4">Restaurant not found.</div>;
  }

  const generateVoucher = () => {
    // Generate an 8-character random alphanumeric string
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleReserveMeal = (meal) => {
    const voucherCode = generateVoucher();
    const reservation = {
      restaurantName: restaurant.name,
      meal: meal.item,
      price: meal.price,
      voucher: voucherCode,
      date: new Date().toISOString(),
    };

    // Save current reservation (overwriting any previous one)
    localStorage.setItem('reservation', JSON.stringify(reservation));

    // Append the reservation to the reservation history array
    const existingHistory = localStorage.getItem('reservationHistory');
    let history = existingHistory ? JSON.parse(existingHistory) : [];
    history.push(reservation);
    localStorage.setItem('reservationHistory', JSON.stringify(history));

    // Update the shared progress if applicable
    let currentProgress = parseInt(localStorage.getItem('progress') || '0', 10);
    if (currentProgress < maxProgress) {
      currentProgress += 1;
      localStorage.setItem('progress', currentProgress.toString());
    }

    // Navigate to the Current Reservation page
    navigate('/reserve');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">{restaurant.name} - Menu</h2>
      <ul className="space-y-4">
        {restaurant.menu.map((meal, index) => (
          <li 
            key={index} 
            className="p-4 border border-green-300 rounded shadow-sm hover:shadow-md transition bg-green-50"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-green-600">{meal.item}</p>
                <p className="text-sm text-green-500">{meal.price}</p>
              </div>
              <button
                onClick={() => handleReserveMeal(meal)}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
              >
                Reserve Meal
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
