import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { ExternalLink, Loader2 } from "lucide-react";
import { SectionHeader } from "../layout/SectionHeader";
import { BorderContainer } from "../layout/BorderContainer";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

const CALENDAR_THEME = {
  dark: ["#161616", "#262626", "#404040", "#737373", "#e5e5e5"],
  light: ["#ebedf0", "#cbd5e1", "#94a3b8", "#475569", "#0f172a"],
};

export function GitHubActivity() {
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [totalCount, setTotalCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Transform data to tally total contributions
  const transformData = (data) => {
    const total = data.reduce((sum, day) => sum + (day.count ?? 0), 0);
    setTotalCount(total);
    setIsLoading(false);
    return data;
  };

  useEffect(() => {
    setIsLoading(true);
  }, [selectedYear]);

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
          {/* Year Switcher Buttons */}
          <div className="mb-4 flex justify-end gap-1.5">
            {YEARS.map((year) => {
              const isSelected = selectedYear === year;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => {
                    if (selectedYear !== year) {
                      setTotalCount(null);
                      setSelectedYear(year);
                    }
                  }}
                  className={`cursor-pointer rounded-md px-3 py-1 font-mono text-[11px] font-medium transition-colors ${
                    isSelected
                      ? "border border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-sm"
                      : "border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)] hover:border-[var(--soft)] hover:text-[var(--fg)]"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>

          {/* Live GitHub Calendar Render */}
          <div className="min-w-[660px] flex justify-center py-2 relative">
            <GitHubCalendar
              username={PORTFOLIO_DATA.github.username}
              year={selectedYear}
              colorScheme="dark"
              theme={CALENDAR_THEME}
              transformData={transformData}
              showTotalCount={false}
              blockSize={11}
              blockMargin={3}
              blockRadius={2}
              fontSize={11}
              style={{
                fontFamily: "var(--font-mono, monospace)",
                color: "var(--soft)",
              }}
              errorMessage="Failed to fetch live GitHub contributions."
            />
          </div>

          {/* Real-time Summary Count and Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[var(--soft)] min-w-[660px]">
            <span className="flex items-center gap-2">
              {isLoading && <Loader2 className="size-3 animate-spin text-[var(--soft)]" />}
              <span>
                {totalCount !== null
                  ? `${totalCount} contributions in ${selectedYear}`
                  : `Loading contributions for ${selectedYear}...`}
              </span>
            </span>

            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="size-[9px] rounded-[2px] border border-neutral-800/40 bg-[#161616]" />
                <div className="size-[9px] rounded-[2px] border border-neutral-700/50 bg-[#262626]" />
                <div className="size-[9px] rounded-[2px] border border-neutral-500/50 bg-[#404040]" />
                <div className="size-[9px] rounded-[2px] border border-neutral-300/50 bg-[#737373]" />
                <div className="size-[9px] rounded-[2px] border border-white bg-[#e5e5e5]" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </BorderContainer>
    </div>
  );
}
