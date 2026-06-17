/**
 * InvoicePreview Component
 * Shows a styled invoice card preview and the Download PDF button
 */
import React from "react";
import { formatCurrency } from "../utils/gstCalculator";
import { Download, Loader2, FileText, User, Package, Calendar, Hash } from "lucide-react";

export default function InvoicePreview({ invoiceData, onDownload, isDownloading }) {
  if (!invoiceData) return null;

  const {
    invoiceNumber,
    date,
    customerName,
    productName,
    baseAmount,
    gstRate,
    gstAmount,
    totalAmount,
  } = invoiceData;

  return (
    <div className="animate-slideUp mt-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500 inline-block" />
        Invoice Preview
      </h2>

      {/* Invoice Card */}
      <div
        id="invoice-preview-card"
        className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
      >
        {/* Invoice Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText size={20} className="text-indigo-200" />
                <h3 className="text-xl font-bold tracking-tight">GST Invoice</h3>
              </div>
              <p className="text-indigo-200 text-sm">Professional Tax Document</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-indigo-300 uppercase tracking-widest font-semibold">Invoice No.</p>
              <p className="text-white font-bold text-sm mt-0.5">{invoiceNumber}</p>
            </div>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-6 space-y-5">
          {/* Meta row */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar size={14} className="text-indigo-500" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Date</p>
                <p className="text-slate-800 font-semibold">{date}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                <Hash size={14} className="text-indigo-500" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Invoice ID</p>
                <p className="text-slate-800 font-semibold text-xs break-all">{invoiceNumber}</p>
              </div>
            </div>
          </div>

          {/* Customer & Product */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                <User size={14} className="text-purple-500" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Bill To</p>
                <p className="text-slate-800 font-semibold">{customerName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                <Package size={14} className="text-purple-500" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Item</p>
                <p className="text-slate-800 font-semibold">{productName}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-slate-200" />

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                  <th className="text-left pb-2 font-semibold">Description</th>
                  <th className="text-right pb-2 font-semibold">GST %</th>
                  <th className="text-right pb-2 font-semibold">GST Amt</th>
                  <th className="text-right pb-2 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="py-3 text-slate-700 font-medium">{productName}</td>
                  <td className="py-3 text-right text-slate-600">{gstRate}%</td>
                  <td className="py-3 text-right text-emerald-600 font-medium">{formatCurrency(gstAmount)}</td>
                  <td className="py-3 text-right text-slate-800 font-semibold">{formatCurrency(baseAmount)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Sub Total</span>
              <span className="font-medium">{formatCurrency(baseAmount)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>GST ({gstRate}%)</span>
              <span className="font-medium text-emerald-600">+{formatCurrency(gstAmount)}</span>
            </div>
            <div className="flex justify-between items-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-white mt-3">
              <span className="font-bold text-base">Total Payable</span>
              <span className="font-bold text-xl">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-xs text-slate-400 text-center">
            This is a computer-generated invoice. No signature required.
          </p>
        </div>
      </div>

      {/* Download Button */}
      <button
        id="download-invoice-pdf-btn"
        onClick={onDownload}
        disabled={isDownloading}
        className="
          mt-4 w-full flex items-center justify-center gap-2.5
          bg-gradient-to-r from-emerald-500 to-teal-500
          hover:from-emerald-600 hover:to-teal-600
          active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl
          shadow-md shadow-emerald-200 transition-all duration-200
          disabled:opacity-70 disabled:cursor-not-allowed
        "
        aria-label="Download Invoice PDF"
      >
        {isDownloading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Generating PDF…
          </>
        ) : (
          <>
            <Download size={18} />
            Download Invoice PDF
          </>
        )}
      </button>
    </div>
  );
}
