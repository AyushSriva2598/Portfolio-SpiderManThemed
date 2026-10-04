import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../layout/SectionHeader";
import { BorderContainer } from "../layout/BorderContainer";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { 
  Code2, 
  Server, 
  Cloud, 
  Database, 
  Wrench, 
  Layers 
} from "lucide-react";

const CATEGORY_ICONS = {
  All: Layers,
  Languages: Code2,
  Backend: Server,
  "Cloud & DevOps": Cloud,
  Databases: Database,
  Tools: Wrench,
};

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = Object.keys(PORTFOLIO_DATA.skillCategories);
  const currentSkills = PORTFOLIO_DATA.skillCategories[selectedCategory] || [];

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

      {/* Filter Tabs Row */}
      <div className="border-b border-[var(--line)]">
        <BorderContainer className="px-3 py-1.5 sm:px-4">
          <div className="flex w-full flex-wrap gap-1 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1 sm:flex-nowrap">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat] || Layers;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex flex-1 shrink-0 items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </BorderContainer>
      </div>

      {/* Skill Pills Grid */}
      <BorderContainer className="px-6 py-6 sm:px-8">
        <motion.div layout className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {currentSkills.map((skill) => (
              <motion.div
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="group flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 text-[12.5px] font-medium text-[var(--muted)] transition-all duration-200 hover:border-[var(--soft)] hover:text-[var(--fg)] hover:scale-[1.02] cursor-default"
              >
                <span className="size-1.5 rounded-full bg-[var(--soft)] group-hover:bg-[var(--fg)] transition-colors" />
                <span>{skill}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </BorderContainer>
    </div>
  );
}
