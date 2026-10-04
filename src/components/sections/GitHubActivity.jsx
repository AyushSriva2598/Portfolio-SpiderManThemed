import React, { useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "../layout/SectionHeader";
import { BorderContainer } from "../layout/BorderContainer";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

const YEARS = ["2026", "2025", "2024"];

// Generates deterministic calendar squares matching real developer activity patterns
function generateYearData(year, username) {
  const seed = (year.charCodeAt(3) * 31 + username.length * 17) % 100;
  const weeks = [];
  const daysPerWeek = 7;
  const totalWeeks = 53;
  let totalContributions = 0;

  for (let w = 0; w < totalWeeks; w++) {
    const week = [];
    for (let d = 0; d < daysPerWeek; d++) {
      // Deterministic pseudo-random pattern with clusters of activity
      const pseudoVal = Math.sin(w * 0.45 + d * 0.7 + seed) * 10000;
      const rand = Math.abs(pseudoVal - Math.floor(pseudoVal));
      
      let level = 0;
      let count = 0;

      // Higher activity on weekdays and specific coding sprints
      const isWeekend = d === 0 || d === 6;
      const boost = !isWeekend ? 0.35 : 0.15;

      if (rand + boost > 0.85) {
        level = 4;
        count = Math.floor(rand * 6) + 7;
      } else if (rand + boost > 0.65) {
        level = 3;
        count = Math.floor(rand * 4) + 4;
      } else if (rand + boost > 0.45) {
        level = 2;
        count = Math.floor(rand * 3) + 2;
      } else if (rand + boost > 0.28) {
        level = 1;
        count = 1;
      }

      totalContributions += count;
      week.push({ level, count });
    }
    weeks.push(week);
  }

  return { weeks, totalContributions };
}

export function GitHubActivity() {
  const [selectedYear, setSelectedYear] = useState("2026");

  const yearData = useMemo(() => {
    return generateYearData(selectedYear, PORTFOLIO_DATA.github.username);
  }, [selectedYear]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Colors for dark theme heatmap
  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return "bg-neutral-800 border-neutral-700/50";
      case 2:
        return "bg-neutral-600 border-neutral-500/50";
      case 3:
        return "bg-neutral-400 border-neutral-300/50";
      case 4:
        return "bg-neutral-100 border-white";
      default:
        return "bg-neutral-900/80 border-neutral-800/40";
    }
  };

  return (
    <div id="github" className="scroll-mt-20">
      <SectionHeader
        title="GitHub Activity"
        aside={
          <a
            href={PORTFOLIO_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            <span>@{PORTFOLIO_DATA.github.username}</span>
            <ExternalLink size={12} />
          </a>
        }
      />

      <BorderContainer className="px-6 py-6 sm:px-8">
        <div className="onyx-scroll overflow-x-auto pb-2">
          {/* Year Buttons */}
          <div className="mb-4 flex justify-end gap-1.5">
            {YEARS.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`cursor-pointer rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-all ${
                  selectedYear === year
                    ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-sm"
                    : "border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Month Labels Header */}
          <div className="mb-1.5 flex justify-between font-mono text-[10px] text-[var(--soft)] min-w-[620px] px-1">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          {/* Contribution Heatmap Columns */}
          <div className="flex gap-[3px] min-w-[620px]">
            {yearData.weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className={`size-[10px] rounded-[2px] border ${getLevelColor(day.level)} transition-colors duration-150`}
                    title={`${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Footer Metrics & Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[var(--soft)] min-w-[620px]">
            <span>
              {yearData.totalContributions} contributions in {selectedYear}
            </span>

            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="size-[9px] rounded-[2px] border border-neutral-800/40 bg-neutral-900/80" />
                <div className="size-[9px] rounded-[2px] border border-neutral-700/50 bg-neutral-800" />
                <div className="size-[9px] rounded-[2px] border border-neutral-500/50 bg-neutral-600" />
                <div className="size-[9px] rounded-[2px] border border-neutral-300/50 bg-neutral-400" />
                <div className="size-[9px] rounded-[2px] border border-white bg-neutral-100" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </BorderContainer>
    </div>
  );
}
