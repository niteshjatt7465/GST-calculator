/**
 * InputField Component
 * Reusable form input with label, error message, and icon support
 */
import React from "react";

export default function InputField({
  id,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  prefix,
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
        {/* Left icon or prefix */}
        {(Icon || prefix) && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none select-none flex items-center">
            {Icon ? <Icon size={16} /> : <span className="text-sm font-medium">{prefix}</span>}
          </span>
        )}

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={`
            w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800
            placeholder:text-slate-400 outline-none transition-all duration-200
            focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
            hover:border-indigo-300
            ${Icon || prefix ? "pl-10" : ""}
            ${error
              ? "border-red-400 focus:ring-red-300 focus:border-red-400 bg-red-50"
              : "border-slate-200"
            }
          `}
        />
      </div>

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-red-500 flex items-center gap-1 animate-fadeIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
