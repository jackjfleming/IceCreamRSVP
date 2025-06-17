'use client';

import { useState } from 'react';
import { submitRsvp } from '../actions';

export default function RsvpForm() {
  const [name, setName] = useState('');
  const [attendees, setAttendees] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    try {
      const result = await submitRsvp(name, attendees);
      if (result.success) {
        setSubmitted(true);
        setName('');
        setAttendees(1);
        setError('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit RSVP. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-100 p-6 rounded-lg border-2 border-green-300 text-center">
        <h3 className="text-xl font-bold text-green-700 mb-2">Thanks for your RSVP!</h3>
        <p className="text-green-800">We look forward to seeing you at the Ice Cream Social!</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Another RSVP
        </button>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 p-6 rounded-lg border-2 border-blue-300">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">RSVP Now!</h2>
      
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Your Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="attendees" className="block text-gray-700 mb-2">
            Number of Ice Cream Eaters:
          </label>
          <input
            type="number"
            id="attendees"
            value={attendees}
            onChange={(e) => setAttendees(parseInt(e.target.value) || 1)}
            min="1"
            max="20"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <p className="text-sm text-gray-600 mt-1">Please include all children who will need ice cream</p>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Submit RSVP
        </button>
      </form>
    </div>
  );
}