/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent } from "react";

type SelectOption = {
  label: string;
  value: any;
};

type SelectProps = {
  label?: string;
  value: any;
  errorMessage?: string;
  disabled?: boolean;
  options?: SelectOption[];
  onChange: (value: any) => void;
  onBlur?: () => void;
};

const Select = ({
  label,
  value,
  options,
  onChange,
  onBlur,
  disabled = false,
  errorMessage = "",
}: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      <label className="block mb-1">{label}</label>
      <select
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`border ${
          errorMessage === "" ? "border-gray-400" : "border-red-500"
        }  bg-white rounded-lg h-[42px] p-2 w-full disabled:cursor-not-allowed disabled:opacity-35`}
      >
        <option value="">-- Select --</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default Select;
