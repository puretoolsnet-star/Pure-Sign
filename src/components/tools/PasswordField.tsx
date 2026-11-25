"use client";

import { Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggleVisible: () => void;
  showLabel: string;
  hideLabel: string;
  autoComplete: string;
  placeholder?: string;
  hint?: string;
};

export function PasswordField({
  id,
  label,
  value,
  onChange,
  visible,
  onToggleVisible,
  showLabel,
  hideLabel,
  autoComplete,
  placeholder,
  hint,
}: PasswordFieldProps) {
  return (
    <label className="block min-w-0 text-sm text-gray-400" htmlFor={id}>
      <span className="mb-2 block">{label}</span>
      <div className="relative min-w-0">
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="input-field min-w-0 pr-12"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center text-gray-400 hover:text-gray-200"
          aria-label={visible ? hideLabel : showLabel}
          onClick={onToggleVisible}
        >
          {visible ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
        </button>
      </div>
      {hint ? <p className="mt-1.5 text-xs text-gray-500">{hint}</p> : null}
    </label>
  );
}