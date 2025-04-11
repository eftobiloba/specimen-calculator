"use client";

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading'; // Import Loading component

type Entry = {
  id: number;
  username: string;
  microscopeSize: number;
  actualSize: number;
  created_at: string;
};

export default function EntriesPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch('/api/get-entries');
        if (!res.ok) {
          throw new Error('Failed to fetch entries');
        }
        const data = await res.json();
        if (data.length === 0) {
          setError('Entries not found'); // Set error if no entries are found
        } else {
          setEntries(data); // Set entries if data is returned
        }
      } catch (err) {
        setError('Error fetching entries'); // Handle fetch error
      } finally {
        setLoading(false); // Set loading to false after fetch completes (success or error)
      }
    };
    fetchEntries();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">Saved Entries</h1>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loading /> {/* Show loading spinner while fetching */}
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div> // Show error message if fetch fails
          ) : entries.length === 0 ? (
            <div className="text-center text-gray-500">Entries not found</div> // Show message when no entries are found
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="border-b pb-2">
                <p className="text-blue"><strong>User:</strong> {entry.username}</p>
                <p className="text-black"><strong>Microscope Size:</strong> {entry.microscopeSize} μm</p>
                <p className="text-black"><strong>Real Life Size:</strong> {entry.actualSize.toFixed(2)} μm</p>
                <p className="text-sm text-black">{new Date(entry.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
