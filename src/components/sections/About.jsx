import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../layout/SectionHeader";
import { BorderContainer } from "../layout/BorderContainer";
import { Turntable } from "../turntable/Turntable";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export function About() {
  return (
    <div id="about-section" className="scroll-mt-20">
      <SectionHeader title="About" />
      <BorderContainer className="px-6 py-7 sm:px-8 space-y-6">
        {/* Bullet Points */}
        <div className="space-y-3">
          {PORTFOLIO_DATA.about.map((bullet, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex gap-2.5 text-[14.5px] leading-relaxed text-[var(--muted)]"
            >
              <span className="text-[var(--soft)] font-mono mt-0.5">•</span>
              <p>{bullet}</p>
            </motion.div>
          ))}
        </div>

        {/* Now Playing Turntable Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Turntable />
        </motion.div>
      </BorderContainer>
    </div>
  );
}
