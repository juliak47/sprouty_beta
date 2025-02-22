// src/components/ProgressChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ProgressChart({ logs }) {
  // Sort the logs by date so the chart is in chronological order.
  const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Create labels and datasets based on the logs.
  const labels = sortedLogs.map((log) => new Date(log.date).toLocaleDateString());
  const glucoseData = sortedLogs.map((log) => log.glucose);
  const weightData = sortedLogs.map((log) => log.weight);

  const data = {
    labels,
    datasets: [
      {
        label: 'Glucose Level',
        data: glucoseData,
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
      },
      {
        label: 'Weight',
        data: weightData,
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  return (
    <div>
      <h3>Progress Chart</h3>
      <Line data={data} />
    </div>
  );
}
