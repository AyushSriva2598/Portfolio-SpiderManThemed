import React from "react";
import { BorderContainer } from "./BorderContainer";

export function StripeSpacer({ h = "h-7", className = "" }) {
  return (
    <div className={`relative w-full bg-stripes ${h} ${className}`}>
      <BorderContainer className="h-full" />
    </div>
  );
}
