import React from "react";

export function BorderContainer({ children, className = "" }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[760px] border-x border-dashed border-[var(--line)] ${className}`}
    >
      {children}
    </div>
  );
}
