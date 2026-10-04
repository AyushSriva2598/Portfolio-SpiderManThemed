import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { SectionHeader } from "../layout/SectionHeader";
import { BorderContainer } from "../layout/BorderContainer";
import { ProjectCard } from "./ProjectCard";
import { AllProjectsModal } from "../modals/AllProjectsModal";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export function Projects() {
  const [modalOpen, setModalOpen] = useState(false);

  const featuredProjects = PORTFOLIO_DATA.projects.filter(
    (p) => p.featured !== false
  );

  return (
    <div id="projects" className="scroll-mt-20">
      <SectionHeader
        title="Projects"
        aside={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 font-mono text-[11px] text-[var(--muted)] cursor-pointer transition-all duration-300 hover:border-[var(--soft)] hover:text-[var(--fg)] shadow-[0_0_15px_rgba(255,255,255,0.06)] hover:shadow-[0_0_25px_rgba(255,255,255,0.18)]"
          >
            <span>View All Projects</span>
            <ChevronRight className="size-3.5" />
          </button>
        }
      />

      <BorderContainer className="px-6 py-6 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </BorderContainer>

      {/* All Projects Modal */}
      <AllProjectsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
