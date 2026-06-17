/**
 * Header Component
 * Gradient hero section with app title, tagline, and Digital Heroes button
 */
import React from "react";
import { ExternalLink, Sparkles } from "lucide-react";

export default function Header() {
  const handleDigitalHeroes = () => {
    window.open("https://digitalheroesco.com", "_blank", "noopener,noreferrer");
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 text-white">
      {/* Decorative circles */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />
      <div className="absolute top-8 right-20 w-24 h-24 rounded-full bg-indigo-400/20 blur-xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase text-indigo-200 mb-5 backdrop-blur-sm">
          <Sparkles size={12} className="text-yellow-300" />
          Free · No Signup · Instant Download
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3">
          GST Calculator &amp;
          <br />
          <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
            Invoice Generator
          </span>
        </h1>

        <p className="text-indigo-200 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
          Calculate GST instantly and generate professional PDF invoices — completely free, no sign-up required.
        </p>

        {/* CTA & Digital Heroes button */}
        <div className="flex flex-wrap gap-3">
          {/* Scroll to calculator */}
          <a
            href="#calculator"
            className="
              inline-flex items-center gap-2 bg-white text-indigo-700
              font-bold px-5 py-2.5 rounded-xl shadow-md
              hover:bg-indigo-50 active:scale-95 transition-all duration-200 text-sm
            "
          >
            Start Calculating →
          </a>

          {/* Mandatory: "Built for Digital Heroes" button */}
          <button
            id="built-for-digital-heroes-btn"
            onClick={handleDigitalHeroes}
            aria-label="Visit Digital Heroes Co."
            className="
              inline-flex items-center gap-2 bg-white/10 border border-white/25
              text-white font-bold px-5 py-2.5 rounded-xl backdrop-blur-sm
              hover:bg-white/20 active:scale-95 transition-all duration-200 text-sm
            "
          >
            <ExternalLink size={14} />
            Built for Digital Heroes
          </button>
        </div>

        {/* Creator tag */}
        <p className="mt-8 text-xs text-indigo-300">
          Created by{" "}
          <span className="text-white font-semibold">Nitesh Sagar</span>
          {" · "}
          <a href="mailto:niteshsagar58@gmail.com" className="hover:text-white underline underline-offset-2 transition-colors">
            niteshsagar58@gmail.com
          </a>
        </p>
      </div>
    </header>
  );
}
