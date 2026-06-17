/**
 * GST Calculator Utility Functions
 * Handles all GST computation logic
 */

/**
 * Calculate GST breakdown from base amount and GST rate
 * @param {number} baseAmount - The base amount before GST
 * @param {number} gstRate - The GST percentage (e.g., 5, 12, 18, 28)
 * @returns {{ baseAmount, gstRate, gstAmount, totalAmount }}
 */
export function calculateGST(baseAmount, gstRate) {
  const base = parseFloat(baseAmount);
  const rate = parseFloat(gstRate);

  if (isNaN(base) || isNaN(rate)) {
    throw new Error("Invalid amount or GST rate");
  }

  const gstAmount = parseFloat(((base * rate) / 100).toFixed(2));
  const totalAmount = parseFloat((base + gstAmount).toFixed(2));

  return {
    baseAmount: parseFloat(base.toFixed(2)),
    gstRate: rate,
    gstAmount,
    totalAmount,
  };
}

/**
 * Format a number as Indian Rupee currency string
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Generate a unique invoice number based on timestamp
 * @returns {string}
 */
export function generateInvoiceNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `INV-${year}${month}${day}-${random}`;
}

/**
 * Get today's date formatted as DD/MM/YYYY
 * @returns {string}
 */
export function getFormattedDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Validate form inputs before calculation
 * @param {{ customerName, productName, baseAmount }} fields
 * @returns {{ isValid: boolean, errors: object }}
 */
export function validateInputs({ customerName, productName, baseAmount }) {
  const errors = {};

  if (!customerName || customerName.trim() === "") {
    errors.customerName = "Customer name is required.";
  }

  if (!productName || productName.trim() === "") {
    errors.productName = "Product / Service name is required.";
  }

  if (baseAmount === "" || baseAmount === null || baseAmount === undefined) {
    errors.baseAmount = "Base amount is required.";
  } else if (isNaN(Number(baseAmount))) {
    errors.baseAmount = "Base amount must be a valid number.";
  } else if (Number(baseAmount) <= 0) {
    errors.baseAmount = "Base amount must be greater than zero.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
