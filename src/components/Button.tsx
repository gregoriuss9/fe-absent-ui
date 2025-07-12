import type { ReactNode } from "react";

type ButtonProps = {
  label: string | null | ReactNode;
  type?:
    | "primarySolid"
    | "secondarySolid"
    | "dangerSolid"
    | "successSolid"
    | "warningSolid"
    | "primaryOutline"
    | "secondaryOutline"
    | "dangerOutline"
    | "successOutline"
    | "warningOutline";
  loading?: boolean;
  disabled?: boolean;
  width?: string;
  onClick?: () => void;
};
const mappedType = {
  primarySolid: "bg-blue-500 hover:bg-blue-600 text-white",
  secondarySolid: "bg-white hover:bg-gray-100 border text-black",
  dangerSolid: "bg-red-500 hover:bg-red-600 text-white",
  successSolid: "bg-green-500 hover:bg-green-600 text-white",
  warningSolid: "bg-yellow-500 hover:bg-yellow-600 text-white",
  primaryOutline:
    "bg-white hover:bg-gray-100 border border-blue-500 text-blue-500",
  secondaryOutline:
    "bg-white hover:bg-gray-100 border border-gray-500 text-gray-500",
  dangerOutline:
    "bg-white hover:bg-gray-100 border border-red-500 text-red-500",
  successOutline:
    "bg-white hover:bg-gray-100 border border-green-500 text-green-500",
  warningOutline:
    "bg-white hover:bg-gray-100 border border-yellow-500 text-yellow-500",
};
const Button = ({
  label,
  type = "primarySolid",
  loading,
  onClick,
  disabled = false,
  width = "w-full",
}: ButtonProps) => {
  return (
    <button
      className={`py-2 px-4 ${mappedType[type]} h-[42px] rounded-lg ${width} cursor-pointer flex justify-center disabled:opacity-35 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default Button;
