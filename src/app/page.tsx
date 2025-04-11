"use client";
import { useState } from 'react';
import Navbar from './components/Navbar';
import Loading from './components/Loading'; // Import Loading component

export default function Home() {
  const [microscopeSize, setMicroscopeSize] = useState('');
  const [magnification, setMagnification] = useState('');
  const [actualSize, setActualSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const calculate = () => {
    if (!microscopeSize || !magnification) return;
    const result = parseFloat(microscopeSize) / parseFloat(magnification);
    setActualSize(result);
  };

  const saveToDB = async () => {
    const username = prompt('Enter your username');
    if (!username || actualSize === null) return;

    setIsLoading(true); // Start loading
    setShowPopup(true);
    const res = await fetch('/api/add-entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        microscopeSize: parseFloat(microscopeSize),
        actualSize,
      }),
    });

    const result = await res.text();
    setIsLoading(false); // Stop loading

    // Display the popup with a success message
    setIsSaved(result === 'Success');
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4">
          <h1 className="text-2xl text-black font-bold text-center">Specimen Size Calculator</h1>

          <input
            type="number"
            placeholder="Image Size (μm)"
            value={microscopeSize}
            onChange={(e) => setMicroscopeSize(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
          <input
            type="number"
            placeholder="Magnification"
            value={magnification}
            onChange={(e) => setMagnification(e.target.value)}
            className="w-full p-2 text-black border rounded"
          />
          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Calculate
          </button>

          {actualSize !== null && (
            <>
              <div className="text-center text-black font-semibold text-lg">
                Real Life Size: {actualSize.toFixed(2)} μm
              </div>
              <button
                onClick={saveToDB}
                className="w-full bg-black text-white py-2 rounded hover:bg-black"
              >
                Add to DB
              </button>
            </>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-xl text-black font-semibold mb-4">
                  {isSaved ? 'Saved Successfully!' : 'Something went wrong'}
                </h2>
                {isSaved && (
                  <p className="mb-4 text-green-600">Your entry has been saved!</p>
                )}
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}
