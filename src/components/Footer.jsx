/**
 * Footer Component
 * Project footer with copyright, creator info, and GitHub placeholder icon
 */
import React from "react";
import { GitBranch, Mail, Zap } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      {/* Top gradient line */}
      <div className="h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                <Zap size={13} className="text-white" />
              </div>
              <span className="text-white font-bold text-sm">
                GST Calculator &amp; Invoice Generator
              </span>
            </div>
            <p className="text-xs text-slate-500">
              &copy; {year} All rights reserved. Built with ❤️ in India.
            </p>
          </div>

          {/* Creator info */}
          <div className="flex flex-col sm:items-end gap-1.5">
            <p className="text-sm">
              Created by{" "}
              <span className="text-white font-semibold">Nitesh Jatt</span>
            </p>

            <div className="flex items-center gap-3">
              {/* Email */}
              <a
                href="mailto:niteshsagar58@gmail.com"
                className="flex items-center gap-1.5 text-xs hover:text-indigo-400 transition-colors"
                aria-label="Email Nitesh Jatt"
              >
                <Mail size={13} />
                niteshsagar58@gmail.com
              </a>

              {/* GitHub placeholder */}
              <a
                href="https://github.com/niteshjatt7465/GST-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs hover:text-indigo-400 transition-colors"
                aria-label="View source code on GitHub"
              >
                <GitBranch size={13} />
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-600">
          Free to use · No data stored · GST rates as per Government of India guidelines
        </div>
      </div>
    </footer>
  );
}
