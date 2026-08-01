import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
  children,
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`
        bg-[#C2185B]
        hover:bg-[#8E0E46]
        text-white
        px-6
        py-3
        rounded-xl
        font-semibold
        shadow-md
        transition-all
        duration-300
        hover:scale-105
        ${className}
      `}
    >
      {children}
    </button>
  );
}