'use client';

import { useState, useEffect } from 'react';
import { getRsvps, getTotalAttendees, checkAdminPassword } from '../actions';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const isValid = await checkAdminPassword(password);
      if (isValid) {
        setIsAuthenticated(true);
        loadData();
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [rsvpData, total] = await Promise.all([
        getRsvps(),
        getTotalAttendees()
      ]);
      setRsvps(rsvpData);
      setTotalAttendees(Number(total));
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
          
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pack 131 Ice Cream Social RSVPs</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-blue-800">Summary</h2>
          <p className="text-lg">Total RSVPs: <strong>{rsvps.length}</strong></p>
          <p className="text-lg">Total Ice Cream Eaters: <strong>{totalAttendees}</strong></p>
        </div>
        
        {loading ? (
          <p className="text-center py-4">Loading data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border text-left">Name</th>
                  <th className="py-2 px-4 border text-center">Ice Cream Eaters</th>
                  <th className="py-2 px-4 border text-right">Submission Time</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500">No RSVPs yet</td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{rsvp.name}</td>
                      <td className="py-2 px-4 border text-center">{rsvp.attendees}</td>
                      <td className="py-2 px-4 border text-right">
                        {new Date(rsvp.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={loadData}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}