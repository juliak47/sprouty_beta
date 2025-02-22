// // src/pages/MenuPage.jsx
// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// // Minimal restaurant data to display the restaurant name
// const restaurantData = [
//   { id: '1', name: 'Restaurant A' },
//   { id: '2', name: 'Restaurant B' },
// ];

// // Define five healthy meal options with descriptions and nutritional values
// const mealOptions = [
//   {
//     id: 'A',
//     name: 'Garden Salad',
//     description: 'Mixed greens, tomatoes, cucumbers',
//     calories: 150,
//     protein: '5g',
//     fat: '7g',
//   },
//   {
//     id: 'B',
//     name: 'Chicken Wrap',
//     description: 'Grilled chicken with veggies in a whole grain wrap',
//     calories: 350,
//     protein: '25g',
//     fat: '10g',
//   },
//   {
//     id: 'C',
//     name: 'Veggie Bowl',
//     description: 'Steamed veggies with quinoa and chickpeas',
//     calories: 300,
//     protein: '10g',
//     fat: '8g',
//   },
//   {
//     id: 'D',
//     name: 'Fruit Smoothie',
//     description: 'Mixed berries, banana, and yogurt smoothie',
//     calories: 250,
//     protein: '8g',
//     fat: '4g',
//   },
//   {
//     id: 'E',
//     name: 'Tomato Soup',
//     description: 'Fresh tomato soup with basil',
//     calories: 180,
//     protein: '6g',
//     fat: '5g',
//   },
// ];

// export default function MenuPage() {
//   const { restaurantId } = useParams();
//   const restaurant = restaurantData.find((r) => r.id === restaurantId);

//   if (!restaurant) {
//     return <div className="p-4">Restaurant not found.</div>;
//   }

//   // State for the weekly order: quantities for meals A–E
//   const [order, setOrder] = useState({ A: 0, B: 0, C: 0, D: 0, E: 0 });
//   const [pickupTime, setPickupTime] = useState('');
//   const [message, setMessage] = useState('');

//   // Update quantity for a specific meal option
//   const handleQuantityChange = (mealId, value) => {
//     const num = parseInt(value, 10) || 0;
//     setOrder({ ...order, [mealId]: num });
//   };

//   // Calculate the total number of meals selected
//   const totalMeals = Object.values(order).reduce((acc, curr) => acc + curr, 0);

//   // On form submission, if exactly 5 meals are selected, send SMS via backend.
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (totalMeals !== 5) {
//       setMessage('Please select exactly 5 meals for the week.');
//       return;
//     }
//     // Build a summary string that includes meal names and quantities
//     const orderSummary = mealOptions
//       .map((meal) => `${meal.name}: ${order[meal.id]}`)
//       .join(', ');
//     const orderDetails = `${restaurant.name} Order - ${orderSummary}. Pickup Time (Monday): ${pickupTime}`;
//     try {
//       const response = await fetch('/api/send-sms', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderDetails }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(`Success! SMS sent. ${data.message}`);
//       } else {
//         setMessage(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       setMessage(`Error sending SMS: ${error.message}`);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold text-green-700 mb-4">
//         {restaurant.name} - Healthy Weekly Menu
//       </h2>
//       <p className="mb-4 text-lg">
//         Please select exactly 5 meals for the week from the options below (you can mix and match, for example, 2 Garden Salads and 3 Chicken Wraps).
//       </p>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {mealOptions.map((meal) => (
//           <div key={meal.id} className="border border-green-300 rounded-lg p-4 bg-green-50 mb-4">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-xl font-semibold text-green-600">{meal.name}</p>
//                 <p className="text-sm text-green-500">{meal.description}</p>
//                 <p className="text-sm text-green-500">
//                   Calories: {meal.calories} | Protein: {meal.protein} | Fat: {meal.fat}
//                 </p>
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-1">Quantity:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={order[meal.id]}
//                   onChange={(e) => handleQuantityChange(meal.id, e.target.value)}
//                   className="w-20 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//         <div className="mt-4">
//           <p className="text-lg">
//             Total Meals Selected: <span className="font-bold">{totalMeals}</span> (must equal 5)
//           </p>
//         </div>
//         <div>
//           <label className="block text-lg font-medium mb-1">Pickup Time (Monday):</label>
//           <input
//             type="time"
//             value={pickupTime}
//             onChange={(e) => setPickupTime(e.target.value)}
//             className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition"
//         >
//           Place Order & Send SMS
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-600 text-lg">{message}</p>}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Minimal restaurant data to display the restaurant name.
const restaurantData = [
  { id: '1', name: 'Restaurant A' },
  { id: '2', name: 'Restaurant B' },
];

// Define five healthy meal options with example nutritional values.
const mealOptions = [
  {
    id: 'A',
    name: 'Garden Salad',
    description: 'Mixed greens, tomatoes, cucumbers',
    calories: 150,
    protein: '5g',
    fat: '7g',
  },
  {
    id: 'B',
    name: 'Chicken Wrap',
    description: 'Grilled chicken with veggies in a whole grain wrap',
    calories: 350,
    protein: '25g',
    fat: '10g',
  },
  {
    id: 'C',
    name: 'Veggie Bowl',
    description: 'Steamed veggies with quinoa and chickpeas',
    calories: 300,
    protein: '10g',
    fat: '8g',
  },
  {
    id: 'D',
    name: 'Fruit Smoothie',
    description: 'Mixed berries, banana, and yogurt smoothie',
    calories: 250,
    protein: '8g',
    fat: '4g',
  },
  {
    id: 'E',
    name: 'Tomato Soup',
    description: 'Fresh tomato soup with basil',
    calories: 180,
    protein: '6g',
    fat: '5g',
  },
];

export default function MenuPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurantData.find((r) => r.id === restaurantId);

  if (!restaurant) {
    return <div className="p-4">Restaurant not found.</div>;
  }

  // State for meal order quantities and pickup time.
  const [order, setOrder] = useState({ A: 0, B: 0, C: 0, D: 0, E: 0 });
  const [pickupTime, setPickupTime] = useState('');
  const [message, setMessage] = useState('');

  // Update quantity for a specific meal option.
  const handleQuantityChange = (mealId, value) => {
    const num = parseInt(value, 10) || 0;
    setOrder({ ...order, [mealId]: num });
  };

  // Calculate total meals selected.
  const totalMeals = Object.values(order).reduce((acc, curr) => acc + curr, 0);

  // Generate an 8-character voucher code.
  const generateVoucher = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  // Handle order submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalMeals !== 5) {
      setMessage('Please select exactly 5 meals for the week.');
      return;
    }
    const voucher = generateVoucher();
    // Build a summary string of the order.
    const orderSummary = mealOptions
      .map((meal) => `${meal.name}: ${order[meal.id]}`)
      .join(', ');
    const reservation = {
      restaurant: restaurant.name,
      orderSummary,
      voucher,
      pickupTime,
      date: new Date().toISOString(),
    };

    // Save current reservation in localStorage.
    localStorage.setItem('reservation', JSON.stringify(reservation));
    // Append to reservation history.
    const existingHistory = localStorage.getItem('reservationHistory');
    let history = existingHistory ? JSON.parse(existingHistory) : [];
    history.push(reservation);
    localStorage.setItem('reservationHistory', JSON.stringify(history));

    // Display voucher code to the user.
    setMessage(`Reservation successful! Your voucher code is: ${voucher}`);
    // Navigate to a reservation details page:
    navigate('/reserve');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        {restaurant.name} - Healthy Weekly Menu
      </h2>
      <p className="mb-4 text-lg">
        Please select exactly 5 meals for the week from the options below.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mealOptions.map((meal) => (
          <div
            key={meal.id}
            className="border border-green-300 rounded-lg p-4 bg-green-50 mb-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-semibold text-green-600">
                  {meal.name}
                </p>
                <p className="text-sm text-green-500">{meal.description}</p>
                <p className="text-sm text-green-500">
                  Calories: {meal.calories} | Protein: {meal.protein} | Fat: {meal.fat}
                </p>
              </div>
              <div>
                <label className="block text-lg font-medium mb-1">
                  Quantity:
                </label>
                <input
                  type="number"
                  min="0"
                  value={order[meal.id]}
                  onChange={(e) => handleQuantityChange(meal.id, e.target.value)}
                  className="w-20 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <p className="text-lg">
            Total Meals Selected: <span className="font-bold">{totalMeals}</span>{' '}
            (must equal 5)
          </p>
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">
            Pickup Time (Monday):
          </label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        {/* SMS sending is now commented out; voucher code will be generated instead */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </form>
      {message && (
        <p className="mt-4 text-green-600 text-lg">{message}</p>
      )}
    </div>
  );
}
