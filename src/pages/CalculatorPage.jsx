/**
 * GST Calculator Page
 * Main page composing the calculator form and invoice preview
 */
import React from "react";
import { useGSTCalculator } from "../hooks/useGSTCalculator";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import ResultCard from "../components/ResultCard";
import InvoicePreview from "../components/InvoicePreview";
import {
  User,
  Package,
  IndianRupee,
  Calculator,
  RefreshCcw,
  Loader2,
  AlertCircle,
} from "lucide-react";

const GST_RATE_OPTIONS = [
  { value: "5", label: "5% — Essential Goods" },
  { value: "12", label: "12% — Standard Goods" },
  { value: "18", label: "18% — Most Services" },
  { value: "28", label: "28% — Luxury Goods" },
];

export default function CalculatorPage() {
  const {
    form,
    errors,
    result,
    invoiceData,
    isDownloading,
    isCalculating,
    handleChange,
    handleCalculate,
    handleDownloadPDF,
    handleReset,
  } = useGSTCalculator();

  return (
    <main id="calculator" className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Feature badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["⚡ Instant Calculation", "📄 PDF Invoice", "🇮🇳 Indian GST Rates", "🔒 No Data Stored"].map((badge) => (
          <span
            key={badge}
            className="text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full px-3 py-1"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left Panel: Calculator Form ───────────────────────── */}
        <section aria-label="GST Calculator Form">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">GST Calculator</h2>
                <p className="text-sm text-slate-500 mt-0.5">Fill in the details to calculate GST</p>
              </div>
              {/* Reset button */}
              {(result || Object.values(form).some(Boolean)) && (
                <button
                  id="reset-calculator-btn"
                  onClick={handleReset}
                  title="Reset all fields"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
                >
                  <RefreshCcw size={13} />
                  Reset
                </button>
              )}
            </div>

            {/* General error */}
            {errors.general && (
              <div
                role="alert"
                className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm"
              >
                <AlertCircle size={16} className="shrink-0" />
                {errors.general}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <InputField
                id="customer-name"
                label="Customer Name"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="e.g. Rajesh Kumar"
                error={errors.customerName}
                icon={User}
                required
              />

              <InputField
                id="product-name"
                label="Product / Service Name"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                placeholder="e.g. Web Development Services"
                error={errors.productName}
                icon={Package}
                required
              />

              <InputField
                id="base-amount"
                label="Base Amount (₹)"
                name="baseAmount"
                type="number"
                value={form.baseAmount}
                onChange={handleChange}
                placeholder="e.g. 10000"
                error={errors.baseAmount}
                icon={IndianRupee}
                required
              />

              <SelectField
                id="gst-rate"
                label="GST Rate"
                name="gstRate"
                value={form.gstRate}
                onChange={handleChange}
                options={GST_RATE_OPTIONS}
                error={errors.gstRate}
                required
              />
            </div>

            {/* Calculate Button */}
            <button
              id="calculate-gst-btn"
              onClick={handleCalculate}
              disabled={isCalculating}
              className="
                w-full flex items-center justify-center gap-2.5
                bg-gradient-to-r from-indigo-600 to-violet-600
                hover:from-indigo-700 hover:to-violet-700
                active:scale-[0.98] text-white font-bold py-3.5 px-6
                rounded-xl shadow-md shadow-indigo-200
                transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed
              "
            >
              {isCalculating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Calculating…
                </>
              ) : (
                <>
                  <Calculator size={18} />
                  Calculate GST
                </>
              )}
            </button>

            {/* How It Works */}
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">How it works</p>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                  Enter your customer &amp; product details
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                  Enter the base amount and select GST rate
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                  Click Calculate and get instant results
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
                  Download your professional PDF invoice
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Right Panel: Results + Invoice ───────────────────── */}
        <section aria-label="GST Results and Invoice">
          {result ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-1">
              <ResultCard result={result} />
              <InvoicePreview
                invoiceData={invoiceData}
                onDownload={handleDownloadPDF}
                isDownloading={isDownloading}
              />
            </div>
          ) : (
            /* Placeholder when no result yet */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                <Calculator size={28} className="text-indigo-400" />
              </div>
              <h3 className="text-slate-700 font-semibold text-lg mb-2">Results will appear here</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Fill in the form on the left and click{" "}
                <span className="text-indigo-500 font-medium">Calculate GST</span> to see your invoice preview.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* GST Info Section */}
      <section aria-label="GST Rate Information" className="mt-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500 inline-block" />
            GST Rate Reference
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { rate: "5%", desc: "Essential goods — food grains, some transport services", color: "emerald" },
              { rate: "12%", desc: "Standard goods — processed food, business class tickets", color: "blue" },
              { rate: "18%", desc: "Most services — restaurants, IT, telecom, banking", color: "indigo" },
              { rate: "28%", desc: "Luxury goods — automobiles, tobacco, premium electronics", color: "purple" },
            ].map(({ rate, desc, color }) => (
              <div
                key={rate}
                className={`rounded-xl p-4 border border-${color}-100 bg-${color}-50`}
              >
                <p className={`text-2xl font-extrabold text-${color}-600 mb-1`}>{rate}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
