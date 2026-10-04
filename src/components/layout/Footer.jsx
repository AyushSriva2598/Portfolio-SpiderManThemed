import React, { useState, useEffect } from "react";
import { BorderContainer } from "./BorderContainer";
import { StripeSpacer } from "./StripeSpacer";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export function Footer() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: PORTFOLIO_DATA.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full">
      <StripeSpacer h="h-5" />
      <div className="w-full border-t border-[var(--line)]">
        <BorderContainer className="border-b-0 px-6 py-8 text-center sm:px-8">
          <p className="text-[14.5px] text-[var(--muted)]">
            Designed & Developed by{" "}
            <span className="font-semibold text-[var(--fg)]">
              {PORTFOLIO_DATA.name}
            </span>
          </p>
          <p className="mt-1.5 font-mono text-[12px] text-[var(--soft)]">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="mt-2.5 flex items-center justify-center gap-2 font-mono text-[12px] text-[var(--soft)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--fg)] opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--fg)] opacity-90" />
            </span>
            {PORTFOLIO_DATA.location} · {timeString || "IST"}
          </p>
        </BorderContainer>
      </div>
    </footer>
  );
}
