# 🧾 GST Calculator & Invoice Generator

> **Free online GST Calculator and Invoice Generator** — Calculate GST instantly for all Indian GST slab rates and download a professional PDF invoice. No sign-up required.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## ✨ Features

- ⚡ **Instant GST Calculation** — Supports 5%, 12%, 18%, and 28% GST slabs
- 📄 **Professional PDF Invoice** — Download a beautifully designed invoice with one click
- 🔢 **Auto Invoice Number** — Unique invoice numbers generated automatically
- ✅ **Form Validation** — User-friendly error messages for all inputs
- 📱 **Fully Responsive** — Works perfectly on mobile, tablet, and desktop
- 🔒 **No Data Stored** — Everything runs in the browser, nothing is sent to a server
- 🚀 **Vercel Ready** — Deploy in under 2 minutes

---

## 🖥️ Screenshots

| Calculator Form | Results & Invoice Preview |
|---|---|
| Fill in customer name, product, amount, and GST rate | Instantly see GST breakdown and a PDF-ready invoice card |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI framework |
| **Vite** | 8 | Build tool & dev server |
| **Tailwind CSS** | 4 | Utility-first styling |
| **jsPDF** | 4 | PDF generation |
| **Lucide React** | latest | Icon library |

---

## 📁 Project Structure

```
gst-calculator-invoice-generator/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Hero section with gradient + Digital Heroes button
│   │   ├── Footer.jsx          # Footer with copyright & creator info
│   │   ├── InputField.jsx      # Reusable input with validation
│   │   ├── SelectField.jsx     # Reusable dropdown
│   │   ├── ResultCard.jsx      # GST result stat cards
│   │   └── InvoicePreview.jsx  # Invoice card + Download button
│   ├── hooks/
│   │   └── useGSTCalculator.js # All calculator state & logic
│   ├── pages/
│   │   └── CalculatorPage.jsx  # Main page layout
│   ├── utils/
│   │   ├── gstCalculator.js    # GST math, formatting, validation
│   │   └── pdfGenerator.js     # jsPDF invoice generation
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/gst-calculator-invoice-generator.git

# 2. Navigate into the project directory
cd gst-calculator-invoice-generator

# 3. Install all dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
# Create an optimised production build
npm run build

# Preview the production build locally
npm run preview
```

The production build output is in the `dist/` folder.

---

## ☁️ Deploy to Vercel

### Option A — Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy (follow the prompts — choose defaults)
vercel

# 4. For production deployment
vercel --prod
```

### Option B — Vercel Dashboard (GitHub Integration)

1. Push your code to GitHub (see commands below)
2. Go to **[vercel.com/new](https://vercel.com/new)**
3. Import your `gst-calculator-invoice-generator` repository
4. Vercel auto-detects Vite — click **Deploy**
5. Your app is live at `https://gst-calculator-invoice-generator.vercel.app` 🎉

> **Note:** The `vercel.json` file is already configured — no extra settings needed.

---

## 📦 Push to GitHub

```bash
# 1. Initialize a git repository (if not done already)
git init

# 2. Add all files
git add .

# 3. Make the first commit
git commit -m "feat: initial commit — GST Calculator & Invoice Generator"

# 4. Create the main branch
git branch -M main

# 5. Add your GitHub remote (replace YOUR-USERNAME with your GitHub handle)
git remote add origin https://github.com/YOUR-USERNAME/gst-calculator-invoice-generator.git

# 6. Push to GitHub
git push -u origin main
```

### Suggested Repository Name
```
gst-calculator-invoice-generator
```

---

## 🧮 GST Calculation Formula

```
GST Amount  = Base Amount × (GST Rate / 100)
Total Amount = Base Amount + GST Amount
```

### GST Slab Reference

| Rate | Category |
|------|----------|
| **5%** | Essential goods — food grains, some transport |
| **12%** | Standard goods — processed food, business air travel |
| **18%** | Most services — IT, telecom, restaurants, banking |
| **28%** | Luxury goods — automobiles, tobacco, premium electronics |

---

## 👨‍💻 Created By

**Nitesh Jatt**
📧 [niteshsagar58@gmail.com](mailto:niteshsagar58@gmail.com)
🌐 Built for [Digital Heroes Co.](https://digitalheroesco.com)

---

## 📄 License

MIT License — free for personal and commercial use.

---

> *"Built for Digital Heroes"* — Making professional tools accessible to everyone.
