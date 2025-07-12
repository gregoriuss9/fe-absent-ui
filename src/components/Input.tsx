import { useState } from "react";

type InputProps = {
  label?: string;
  value?: number | string;
  placeholder?: string;
  type?: "text" | "email" | "number";
  isPassword?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = ({
  label,
  placeholder,
  type = "text",
  isPassword = false,
  value,
  onChange,
  disabled = false,
  onBlur,
  errorMessage = "",
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full">
      <label className="mb-1 block">{label}</label>
      {isPassword ? (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            value={value}
            className={`border ${
              errorMessage === "" ? "border-gray-400" : "border-red-500"
            }  bg-white rounded-lg p-2 w-full h-[42px]`}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className={`fill-gray-500 absolute ${
              errorMessage === "" ? "top-1/2" : "top-1/3"
            } right-3 -translate-y-1/2 cursor-pointer h-[24px]`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
            ) : (
              <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
            )}
          </svg>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      ) : (
        <>
          <input
            type={type}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            className={`border ${
              errorMessage === "" ? "border-gray-400" : "border-red-500"
            }  bg-white rounded-lg p-2 w-full h-[42px] disabled:cursor-not-allowed disabled:opacity-35`}
          />
          <p className="text-red-500">{errorMessage}</p>
        </>
      )}
    </div>
  );
};

export default Input;
