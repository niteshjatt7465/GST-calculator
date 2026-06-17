/**
 * App.jsx — Root component
 * Composes Header, main page, and Footer
 */
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CalculatorPage from "./pages/CalculatorPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <div className="flex-1">
        <CalculatorPage />
      </div>
      <Footer />
    </div>
  );
}
