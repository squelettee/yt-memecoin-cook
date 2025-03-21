"use client";

import Image from "next/image";
import { ComponentProps } from "react";

type ShadowButtonProps = {
  icon?: string;
  iconAlt?: string;
  variant?: "icon" | "text";
  size?: "sm" | "md" | "lg" | "2xl";
  className?: string;
} & ComponentProps<"button">;

export const ShadowButton = ({
  icon,
  iconAlt,
  variant = "icon",
  size = "md",
  className = "",
  children,
  ...props
}: ShadowButtonProps) => {
  const baseButtonStyles =
    "border overflow-hidden border-black border-solid bg-white relative z-10 transition-all group-hover:translate-x-[1px] group-hover:translate-y-[1px]";

  const iconSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    "2xl": "h-16 w-16",
  };

  const textSizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
    "2xl": "px-10 py-4 text-2xl",
  };

  const buttonStyles = {
    icon: `${iconSizes[size]} rounded-full flex items-center justify-center hover:bg-gray-100`,
    text: `${textSizes[size]} rounded-full hover:bg-gray-50 font-bold`,
  };

  return (
    <div className="relative group">
      <div className="absolute bg-black rounded-full w-full h-full top-[2px] right-[-2px] transition-all group-hover:top-[1px] group-hover:right-[-1px]" />
      <button
        className={`${baseButtonStyles} ${buttonStyles[variant]} ${className}`}
        {...props}
      >
        {variant === "icon" && icon ? (
          <div className="relative w-full h-full">
            <Image
              src={icon}
              alt={iconAlt || "Icon"}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          children
        )}
      </button>
    </div>
  );
};
