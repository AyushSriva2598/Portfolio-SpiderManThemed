import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "../layout/SectionHeader";
import { BorderContainer } from "../layout/BorderContainer";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export function Experience() {
  const exp = PORTFOLIO_DATA.experience[0];

  return (
    <div id="experience" className="scroll-mt-20">
      <SectionHeader title="Experience & Journey" />
      <BorderContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45 }}
          className="px-6 py-6 sm:px-8"
        >
          {/* Header Row */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-[15.5px] font-semibold text-[var(--fg)] flex items-center gap-2">
              <span>{exp.role}</span>
              <span className="text-[var(--soft)]">·</span>
              <span className="text-[var(--muted)]">{exp.company}</span>
            </h3>
            <span className="font-mono text-[11px] text-[var(--soft)]">
              {exp.period}
            </span>
          </div>

          {/* Blurb */}
          <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--muted)]">
            {exp.blurb}
          </p>

          {/* Timeline Phases */}
          <div className="mt-5 space-y-0">
            {exp.phases.map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 + idx * 0.07 }}
                className="relative flex gap-4"
              >
                {/* Node Dot & Vertical Connector Line */}
                <div className="flex flex-col items-center">
                  <span className="mt-[5px] h-2 w-2 rounded-full bg-zinc-500 flex-none shrink-0 ring-2 ring-zinc-500/20" />
                  {idx < exp.phases.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-[var(--line)]" />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-5 ${idx === exp.phases.length - 1 ? "pb-0" : ""}`}>
                  <p className="text-[13px] font-semibold text-[var(--muted)] leading-snug">
                    {phase.label}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 4-Column Stats Box */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 rounded-lg border border-[var(--line)] bg-[var(--chip)]/60 p-3 text-center divide-x divide-[var(--line)]">
            {exp.stats.map((stat, idx) => (
              <div key={idx} className={idx > 0 && idx % 2 === 0 ? "border-l sm:border-l-0" : ""}>
                <p className="font-bold text-[15px] text-[var(--fg)]">
                  {stat.value}
                </p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5 tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Verified Certifications Sub-section */}
          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <h4 className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--soft)] mb-3">
              Verified Certifications & Accreditations
            </h4>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {PORTFOLIO_DATA.certifications.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-3 text-left transition-all duration-200 hover:border-[var(--soft)] hover:bg-[var(--hover)]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon icon={cert.icon} className="size-4 shrink-0" />
                    <div className="truncate">
                      <p className="text-[12.5px] font-medium text-[var(--fg)] group-hover:text-white truncate">
                        {cert.title}
                      </p>
                      <p className="font-mono text-[10px] text-[var(--soft)]">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="size-3.5 text-[var(--soft)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </BorderContainer>
    </div>
  );
}
