import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Footer from "./components/Footer";

// Lazy load TaxHistory component
const TaxHistory = lazy(() => import("./Pages/TaxHistory"));

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex flex-col justify-center items-center min-h-screen text-xl text-gray-600">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4">Loading...</p>
        </div>
        
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<TaxHistory />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
