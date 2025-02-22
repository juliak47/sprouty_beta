// src/pages/TrackerPage.jsx
import React, { useState, useEffect } from 'react';
import avatarImg from '../assets/avatar.png';
import castleImg from '../assets/castle.png';
import ProgressChart from '../components/ProgressChart';

export default function TrackerPage() {
  const [glucose, setGlucose] = useState('');
  const [weight, setWeight] = useState('');

  // Use 8 total steps for the avatar progress.
  const maxProgress = 8;
  const [progress, setProgress] = useState(0);

  // State for storing each log entry (date, glucose, weight)
  const [logs, setLogs] = useState([]);

  // Load logs and progress from local storage when the component mounts.
  useEffect(() => {
    const storedLogs = localStorage.getItem('healthLogs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
    const savedProgress = parseInt(localStorage.getItem('progress') || '0', 10);
    setProgress(savedProgress);
  }, []);

  const handleLog = () => {
    if (!glucose || !weight) {
      alert('Please enter both glucose and weight.');
      return;
    }

    const newLog = {
      date: new Date().toISOString(),
      glucose: Number(glucose),
      weight: Number(weight)
    };

    // Update logs state and persist to local storage.
    setLogs(prevLogs => {
      const updatedLogs = [...prevLogs, newLog];
      localStorage.setItem('healthLogs', JSON.stringify(updatedLogs));
      return updatedLogs;
    });

    // Clear the inputs.
    setGlucose('');
    setWeight('');

    alert('Data logged!');
  };

  // Calculate avatar's left position (using 80% width so the avatar doesn't reach the very edge)
  const avatarPositionPercentage = (progress / maxProgress) * 80;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Health Tracker</h2>

      <div>
        <label>Glucose Level: </label>
        <input
          type="number"
          value={glucose}
          onChange={(e) => setGlucose(e.target.value)}
        />
      </div>
      <div>
        <label>Weight: </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <button onClick={handleLog}>Log Data</button>

      <div style={{ margin: '1rem 0' }}>
        <p>Progress: {progress} / {maxProgress}</p>
        {/* Render step markers above the progress bar */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
          {Array.from({ length: maxProgress }).map((_, index) => {
            const step = index + 1;
            // Calculate marker position evenly spaced
            const leftPercent = (index / (maxProgress - 1)) * 100;
            return (
              <div
                key={step}
                style={{
                  position: 'absolute',
                  left: `${leftPercent}%`,
                  transform: 'translateX(-50%)',
                  top: '-20px', // positioned above the bar
                  fontWeight: 'bold'
                }}
              >
                {step}
              </div>
            );
          })}
          {/* Progress bar container */}
          <div style={{ width: '100%', border: '1px solid #ccc', height: '50px', position: 'relative' }}>
            <img
              src={avatarImg}
              alt="avatar"
              style={{
                position: 'absolute',
                left: `${avatarPositionPercentage}%`,
                top: 0,
                height: '50px'
              }}
            />
            <img
              src={castleImg}
              alt="castle"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                height: '50px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Render the progress chart if there are any log entries */}
      {logs.length > 0 && (
        <div>
          <h3>Your Progress Over Time</h3>
          <ProgressChart logs={logs} />
        </div>
      )}
    </div>
  );
}
