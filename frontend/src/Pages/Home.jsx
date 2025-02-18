import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    annualIncome: "",
    investments80C: "",
    investments80D: "",
    hra: "",
    lta: "",
    otherIncome: "",
    salariedOrPensioners: "false",
  });

  const [loading, setLoading] = useState(false);
  const [taxData, setTaxData] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formattedData = {
      annualIncome: Number(formData.annualIncome),
      investments80C: Number(formData.investments80C),
      investments80D: Number(formData.investments80D),
      hra: Number(formData.hra),
      lta: Number(formData.lta),
      otherIncome: Number(formData.otherIncome),
      salariedOrPensioners: formData.salariedOrPensioners === "true",
    };

    try {
      const response = await axios.post("http://localhost:5000/api/tax/calculate", formattedData);

      if (response.data.message === "No Income Tax") {
        setTaxData(null);
        setMessage("🎉 No Income Tax Applicable!");
      } else {
        setTaxData(response.data);
        setError("");
      }

      setShowResult(true);
    } catch (err) {
      setError("Failed to calculate tax. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4 md:p-6">
      {!showResult ? (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            <span className="text-black">🧮</span> Tax Calculator
          </h2>


          {error && (
            <div className="mb-6 p-4 bg-red-100 rounded-lg border border-red-200 text-red-700 text-center">
              <p className="font-semibold">❗ {error}</p>
            </div>
          )}

          <form action="/submit" method="POST" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative">
                <input
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  placeholder="💰 Annual Income"
                  required
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type="number"
                  name="investments80C"
                  value={formData.investments80C}
                  onChange={handleChange}
                  placeholder="📈 80C Investments"
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type="number"
                  name="investments80D"
                  value={formData.investments80D}
                  onChange={handleChange}
                  placeholder="🏥 80D Health Insurance"
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type="number"
                  name="hra"
                  value={formData.hra}
                  onChange={handleChange}
                  placeholder="🏠 House Rent Allowance"
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type="number"
                  name="lta"
                  value={formData.lta}
                  onChange={handleChange}
                  placeholder="✈️ Leave Travel Allowance"
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type="number"
                  name="otherIncome"
                  value={formData.otherIncome}
                  onChange={handleChange}
                  placeholder="💵 Other Income"
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                🎓 Employment Type
                <select
                  name="salariedOrPensioners"
                  value={formData.salariedOrPensioners}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="false">Non-Salaried</option>
                  <option value="true">Salaried/Pensioner</option>
                </select>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
             {loading ? "Loading...":"📊 Calculate Tax"} 
            </button>
          </form>

        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            <span className="text-black">📋</span> Tax Results
          </h2>


          <div className="space-y-6">
            {taxData ? (
              <div className="bg-gray-50 p-6 rounded-2xl shadow-inner">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600 font-semibold">Annual Income:</span>
                    <span className="text-blue-600 font-bold">₹{formatCurrency(taxData.annualIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600 font-semibold">Taxable Income:</span>
                    <span className="text-purple-600 font-bold">₹{formatCurrency(taxData.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-semibold">Payable Tax:</span>
                    <span className="text-red-600 font-bold">₹{formatCurrency(taxData.taxliability)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-center">
                <p className="text-xl font-semibold text-green-700">🎉 {message}</p>
              </div>
            )}

            {taxData?.suggestions?.length > 0 && (
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-800 mb-4">💡 Tax Optimization Tips</h3>
                <ul className="space-y-3">
                  {taxData.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2 text-amber-700">
                      <span>•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setShowResult(false)}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                🔄 Recalculate
              </button>
              <button
                onClick={() => navigate("/history")}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                📜 View History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;