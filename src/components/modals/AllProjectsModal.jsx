import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Globe, Github } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export function AllProjectsModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (
      selectedCategory !== "All" &&
      !p.categories?.includes(selectedCategory)
    ) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.stack.some((tech) => tech.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-[var(--bg)] border border-[var(--line)] rounded-2xl max-w-[760px] w-full h-[85vh] p-6 sm:p-8 flex flex-col overflow-hidden shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--soft)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>

          {/* Header */}
          <div className="pt-1">
            <h2 className="text-[var(--fg)] text-xl font-medium">All Projects</h2>
            <p className="font-mono text-[11px] text-[var(--soft)] mt-0.5">
              Production systems, distributed infrastructure, and open-source tooling
            </p>
          </div>

          {/* Search & Categories */}
          <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--line)] pb-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--soft)]" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--chip)] py-2 pl-9 pr-4 text-[12.5px] text-[var(--fg)] placeholder-[var(--soft)] outline-none transition-all focus:border-[var(--soft)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--soft)] hover:text-[var(--fg)] cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="flex gap-1 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-0.5">
              {["All", "Backend", "DevOps", "Fullstack"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-center rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project List */}
          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 pr-1">
            {filteredProjects.length === 0 ? (
              <div className="py-16 text-center font-mono text-[13px] text-[var(--muted)]">
                No projects match your search criteria.
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 text-left transition-colors hover:border-[var(--soft)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[16px] font-semibold tracking-wide text-[var(--fg)]">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-[var(--soft)] shrink-0">
                      {project.year}
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                    {project.blurb}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)] border border-[var(--line)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5 text-[var(--soft)]">
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="transition-colors hover:text-[var(--fg)]"
                        >
                          <Globe className="size-4" />
                        </a>
                      )}
                      {project.links?.source && (
                        <a
                          href={project.links.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} source code repository`}
                          className="transition-colors hover:text-[var(--fg)]"
                        >
                          <Github className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
