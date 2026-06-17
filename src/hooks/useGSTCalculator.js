/**
 * useGSTCalculator Hook
 * Manages all state and logic for the GST Calculator feature
 */
import { useState, useCallback } from "react";
import {
  calculateGST,
  validateInputs,
  generateInvoiceNumber,
  getFormattedDate,
} from "../utils/gstCalculator";
import { downloadInvoicePDF } from "../utils/pdfGenerator";

const INITIAL_FORM = {
  customerName: "",
  productName: "",
  baseAmount: "",
  gstRate: "18",
};

export function useGSTCalculator() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  /** Handle any input change */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  /** Calculate GST and generate invoice */
  const handleCalculate = useCallback(() => {
    setIsCalculating(true);

    const { isValid, errors: validationErrors } = validateInputs(form);

    if (!isValid) {
      setErrors(validationErrors);
      setIsCalculating(false);
      return;
    }

    try {
      const gstResult = calculateGST(form.baseAmount, form.gstRate);
      const invoice = {
        invoiceNumber: generateInvoiceNumber(),
        date: getFormattedDate(),
        customerName: form.customerName.trim(),
        productName: form.productName.trim(),
        ...gstResult,
      };

      setResult(gstResult);
      setInvoiceData(invoice);
      setErrors({});
    } catch {
      setErrors({ general: "Calculation failed. Please check your inputs." });
    } finally {
      // Simulate brief loading for UX
      setTimeout(() => setIsCalculating(false), 400);
    }
  }, [form]);

  /** Download PDF invoice */
  const handleDownloadPDF = useCallback(async () => {
    if (!invoiceData) return;
    setIsDownloading(true);
    try {
      await downloadInvoicePDF(invoiceData);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  }, [invoiceData]);

  /** Reset everything */
  const handleReset = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors({});
    setResult(null);
    setInvoiceData(null);
  }, []);

  return {
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
  };
}
