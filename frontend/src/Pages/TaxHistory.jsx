import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TaxHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("https://taxcal-1dx7.onrender.com/api/tax/history");
        setHistory(response.data);
      } catch (err) {
        setError("Failed to fetch tax history. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []); 

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
          📜 Tax Calculation History
        </h2>

        {loading ? (
          <div className="text-center text-gray-700 text-lg font-semibold">Loading...</div>
        ) : error ? (
          <div className="p-6 bg-red-100 rounded-lg border border-red-200 text-red-700 text-center">
            <p className="font-semibold">❗ {error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <tr>
                    <th className="p-4 text-left text-sm md:text-base font-semibold uppercase tracking-wider">Annual Income</th>
                    <th className="p-4 text-left text-sm md:text-base font-semibold uppercase tracking-wider">Other Income</th>
                    <th className="p-4 text-left text-sm md:text-base font-semibold uppercase tracking-wider">Taxable Income</th>
                    <th className="p-4 text-left text-sm md:text-base font-semibold uppercase tracking-wider">Payable Tax</th>
                    <th className="p-4 text-left text-sm md:text-base font-semibold uppercase tracking-wider">Calculated At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {history.map((entry) => (
                    <tr key={entry._id} className="hover:bg-gray-50 transition-colors duration-200 even:bg-gray-50">
                      <td className="p-4 text-sm md:text-base text-gray-700 font-medium">
                        ₹{new Intl.NumberFormat().format(entry.annualIncome)}
                      </td>
                      <td className="p-4 text-sm md:text-base text-gray-600">
                        ₹{new Intl.NumberFormat().format(entry.otherIncome)}
                      </td>
                      <td className="p-4 text-sm md:text-base text-gray-700 font-medium">
                        ₹{new Intl.NumberFormat().format(entry.taxableIncome)}
                      </td>
                      <td className="p-4 text-sm md:text-base text-red-600 font-semibold">
                        ₹{new Intl.NumberFormat().format(entry.taxliability)}
                      </td>
                      <td className="p-4 text-sm md:text-base text-gray-500">
                        {new Date(entry.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {history.length === 0 && !loading && (
              <div className="p-8 text-center text-gray-500">
                <p className="text-xl mb-2">📭 No tax history found</p>
                <p>Calculate your first tax to see results here!</p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default TaxHistory;
