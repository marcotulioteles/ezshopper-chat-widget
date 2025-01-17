import { classNamesSpreader } from "@/utils/classname-spreader";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  additionalClassName?: string;
}

export function Card({ children, additionalClassName }: CardProps) {
  return (
    <div
      className={classNamesSpreader(
        "overflow-hidden rounded-lg bg-white shadow-xl border border-gray-200",
        additionalClassName as string
      )}
    >
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
