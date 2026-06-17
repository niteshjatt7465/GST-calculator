/**
 * PDF Generation Utility
 * Uses jsPDF to generate a professional invoice PDF
 */
import jsPDF from "jspdf";
import { formatCurrency } from "./gstCalculator";

/**
 * Generate and download a PDF invoice
 * @param {object} invoiceData - Invoice details
 */
export async function downloadInvoicePDF(invoiceData) {
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

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // ── Background ──────────────────────────────────────────────
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // ── Header gradient simulation ───────────────────────────────
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.rect(0, 0, pageWidth, 55, "F");

  // Accent stripe
  doc.setFillColor(99, 102, 241); // indigo-500
  doc.rect(0, 50, pageWidth, 8, "F");

  // ── Logo / Company Name ──────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text("GST Invoice", margin, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(199, 210, 254); // indigo-200
  doc.text("Professional Tax Invoice Document", margin, 38);

  // Created by text in header
  doc.setFontSize(9);
  doc.setTextColor(167, 139, 250);
  doc.text("Created by Nitesh Jatt", pageWidth - margin, 28, { align: "right" });

  // ── Invoice Meta Block ───────────────────────────────────────
  let y = 72;

  // Invoice number chip
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(margin, y - 6, 80, 14, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(79, 70, 229);
  doc.text(`# ${invoiceNumber}`, margin + 4, y + 3);

  // Date on right
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(pageWidth - margin - 70, y - 6, 70, 14, 3, 3, "F");
  doc.setTextColor(79, 70, 229);
  doc.text(`Date: ${date}`, pageWidth - margin - 4, y + 3, { align: "right" });

  y += 24;

  // ── Bill To Section ──────────────────────────────────────────
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 32, 4, 4, "F");
  // Left border accent
  doc.setFillColor(79, 70, 229);
  doc.rect(margin, y, 4, 32, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text("BILL TO", margin + 10, y + 10);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(17, 24, 39);
  doc.text(customerName, margin + 10, y + 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text(productName, margin + 10, y + 30);

  y += 46;

  // ── Divider ──────────────────────────────────────────────────
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 12;

  // ── Itemized Table ───────────────────────────────────────────
  // Table header
  doc.setFillColor(79, 70, 229);
  doc.roundedRect(margin, y, contentWidth, 12, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);

  const col1 = margin + 4;
  const col2 = margin + contentWidth * 0.45;
  const col3 = margin + contentWidth * 0.65;
  const col4 = pageWidth - margin - 4;

  doc.text("Description", col1, y + 8);
  doc.text("GST Rate", col2, y + 8);
  doc.text("GST Amount", col3, y + 8);
  doc.text("Amount", col4, y + 8, { align: "right" });

  y += 16;

  // Table row - Base Amount
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, y, contentWidth, 12, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(17, 24, 39);
  doc.text(productName.length > 28 ? productName.substring(0, 28) + "…" : productName, col1, y + 8);
  doc.text(`${gstRate}%`, col2, y + 8);
  doc.text(formatCurrency(gstAmount), col3, y + 8);
  doc.text(formatCurrency(baseAmount), col4, y + 8, { align: "right" });

  y += 12;

  // Zebra stripe
  doc.setFillColor(249, 250, 251);
  doc.rect(margin, y, contentWidth, 12, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text("GST Tax", col1, y + 8);
  doc.text(`@ ${gstRate}%`, col2, y + 8);
  doc.text("—", col3, y + 8);
  doc.text(formatCurrency(gstAmount), col4, y + 8, { align: "right" });

  y += 20;

  // ── Totals Block ─────────────────────────────────────────────
  const totalsX = pageWidth - margin - 90;
  const totalsWidth = 90;

  // Subtotal row
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(totalsX, y, totalsWidth, 10, 2, 2, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text("Sub Total:", totalsX + 4, y + 7);
  doc.setTextColor(17, 24, 39);
  doc.text(formatCurrency(baseAmount), totalsX + totalsWidth - 4, y + 7, { align: "right" });
  y += 12;

  // GST row
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(totalsX, y, totalsWidth, 10, 2, 2, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text(`GST (${gstRate}%):`, totalsX + 4, y + 7);
  doc.setTextColor(16, 185, 129); // green
  doc.text(formatCurrency(gstAmount), totalsX + totalsWidth - 4, y + 7, { align: "right" });
  y += 14;

  // Total highlight box
  doc.setFillColor(79, 70, 229);
  doc.roundedRect(totalsX, y, totalsWidth, 16, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("TOTAL:", totalsX + 4, y + 11);
  doc.text(formatCurrency(totalAmount), totalsX + totalsWidth - 4, y + 11, { align: "right" });

  y += 32;

  // ── Amount in Words ──────────────────────────────────────────
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(margin, y, contentWidth, 16, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(79, 70, 229);
  doc.text("Amount in Words:", margin + 6, y + 7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(17, 24, 39);
  doc.text(`INR ${totalAmount.toFixed(2)} Only`, margin + 6, y + 13);

  y += 28;

  // ── Terms & Footer ───────────────────────────────────────────
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text("Terms & Conditions", margin + 6, y + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("1. This is a computer-generated invoice.", margin + 6, y + 14);
  doc.text("2. GST is calculated as per Government of India guidelines.", margin + 6, y + 20);

  // ── Bottom Footer ─────────────────────────────────────────────
  doc.setFillColor(79, 70, 229);
  doc.rect(0, pageHeight - 20, pageWidth, 20, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("GST Calculator & Invoice Generator", margin, pageHeight - 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(199, 210, 254);
  doc.text("Created by Nitesh Jatt", pageWidth / 2, pageHeight - 8, { align: "center" });
  doc.text("digitalheroesco.com", pageWidth - margin, pageHeight - 8, { align: "right" });

  // ── Download ──────────────────────────────────────────────────
  doc.save(`Invoice-${invoiceNumber}.pdf`);
}
