/**
 * SelectField Component
 * Reusable select/dropdown with label and error support
 */
import React from "react";
import { ChevronDown } from "lucide-react";

export default function SelectField({
  id,
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-slate-700 flex items-center gap-1"
      >
        {label}
        {required && <span className="text-indigo-500">*</span>}
      </label>

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          className={`
            w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10
            text-sm text-slate-800 outline-none transition-all duration-200
            focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
            hover:border-indigo-300 cursor-pointer
            ${error ? "border-red-400 bg-red-50" : "border-slate-200"}
          `}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <ChevronDown size={16} />
        </span>
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-500 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
}
