import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { SectionHeader } from "../layout/SectionHeader";
import { BorderContainer } from "../layout/BorderContainer";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { Layers, Code2, Server, Database, Cloud, Wrench } from "lucide-react";

const CATEGORY_TABS = [
  { id: "All", label: "All", Icon: Layers },
  { id: "Languages", label: "Languages", Icon: Code2 },
  { id: "Frameworks", label: "Frameworks", Icon: Server },
  { id: "Databases", label: "Databases", Icon: Database },
  { id: "Cloud & DevOps", label: "Cloud & DevOps", Icon: Cloud },
  { id: "Tools", label: "Tools", Icon: Wrench },
];

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills =
    selectedCategory === "All"
      ? PORTFOLIO_DATA.skillsList
      : PORTFOLIO_DATA.skillsList.filter(
          (skill) => skill.category === selectedCategory
        );

  return (
    <div id="skills" className="scroll-mt-20">
      <SectionHeader
        title="Tech Stack"
        aside={
          <span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">
            ( select tab to filter )
          </span>
        }
      />

      {/* Filter Tabs Header */}
      <div className="border-b border-[var(--line)]">
        <BorderContainer className="px-3 py-1.5 sm:px-4">
          <div className="flex w-full flex-wrap gap-1 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1 sm:flex-nowrap">
            {CATEGORY_TABS.map(({ id, label, Icon: TabIcon }) => {
              const isSelected = selectedCategory === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedCategory(id)}
                  className={`flex flex-1 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--hover)]"
                  }`}
                >
                  <TabIcon className="size-3.5 shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </BorderContainer>
      </div>

      {/* Skill Pills Matrix matching animeshh.me monochrome editorial style */}
      <BorderContainer className="px-6 py-6 sm:px-8">
        <motion.div layout className="flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="group flex cursor-default items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[12px] text-[var(--muted)] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
              >
                {/* Monochrome icon in resting state; subtle brand reveal on hover */}
                <div className="relative size-4 shrink-0 flex items-center justify-center">
                  <Icon
                    icon={skill.icon}
                    className="size-4 shrink-0 transition-all duration-300 grayscale brightness-150 opacity-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100"
                  />
                </div>
                <span className="tracking-wide">{skill.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </BorderContainer>
    </div>
  );
}
