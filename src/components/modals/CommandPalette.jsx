import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  FolderGit2,
  Briefcase,
  Layers,
  Mail,
  FileText,
  Star,
  Sun,
  Moon,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { playTactileClick } from "../../lib/audio";

export function CommandPalette({
  isOpen,
  onClose,
  onNavigateSection,
  onToggleTheme,
  isDark,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const actions = [
    {
      id: "nav-about",
      category: "Navigation",
      title: "Go to About",
      subtitle: "Bio and turntable vinyl player",
      icon: User,
      perform: () => onNavigateSection("about"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Go to Projects",
      subtitle: "Featured production systems and repositories",
      icon: FolderGit2,
      perform: () => onNavigateSection("projects"),
    },
    {
      id: "nav-experience",
      category: "Navigation",
      title: "Go to Experience",
      subtitle: "Engineering journey, phases, and metrics",
      icon: Briefcase,
      perform: () => onNavigateSection("experience"),
    },
    {
      id: "nav-skills",
      category: "Navigation",
      title: "Go to Tech Stack",
      subtitle: "Languages, backend, databases, cloud, and DevOps",
      icon: Layers,
      perform: () => onNavigateSection("skills"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Go to Contact",
      subtitle: "Get in touch or connect on social platforms",
      icon: Mail,
      perform: () => onNavigateSection("contact"),
    },
    {
      id: "action-resume",
      category: "Actions",
      title: "Download Resume",
      subtitle: "View or save Ayush's complete PDF resume",
      icon: FileText,
      perform: () => {
        window.open(PORTFOLIO_DATA.resumeUrl, "_blank");
      },
    },
    {
      id: "action-copy-email",
      category: "Actions",
      title: "Copy Email Address",
      subtitle: PORTFOLIO_DATA.email,
      icon: copied ? Check : Copy,
      perform: () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "action-star",
      category: "Actions",
      title: "Star this Portfolio",
      subtitle: "Open repository on GitHub",
      icon: Star,
      perform: () => {
        window.open(PORTFOLIO_DATA.socials.repo, "_blank");
      },
    },
    {
      id: "action-theme",
      category: "Actions",
      title: isDark ? "Switch to Light Theme" : "Switch to Dark Theme",
      subtitle: "Toggle visual contrast appearance",
      icon: isDark ? Sun : Moon,
      perform: () => {
        playTactileClick();
        onToggleTheme();
      },
    },
  ];

  const filteredActions = actions.filter((act) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      act.title.toLowerCase().includes(q) ||
      act.subtitle.toLowerCase().includes(q) ||
      act.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or window listener
        }
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredActions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredActions.length - 1
        );
      } else if (e.key === "Enter" && filteredActions[selectedIndex]) {
        e.preventDefault();
        filteredActions[selectedIndex].perform();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredActions, selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-xl rounded-xl border border-[var(--line)] bg-[var(--bg)] shadow-2xl overflow-hidden z-10"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
            <Search className="size-4 text-[var(--soft)] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-[13.5px] text-[var(--fg)] placeholder-[var(--soft)] outline-none"
            />
            <kbd className="hidden sm:inline-block rounded border border-[var(--line)] bg-[var(--chip)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--soft)]">
              ESC
            </kbd>
          </div>

          {/* Action List */}
          <div className="max-h-[340px] overflow-y-auto p-2 hide-scrollbar space-y-1">
            {filteredActions.length === 0 ? (
              <div className="py-8 text-center font-mono text-[12.5px] text-[var(--soft)]">
                No matching commands found.
              </div>
            ) : (
              filteredActions.map((act, idx) => {
                const Icon = act.icon;
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => {
                      act.perform();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[var(--chip)] text-[var(--fg)]"
                        : "text-[var(--muted)] hover:bg-[var(--chip)]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`grid size-7 place-items-center rounded-md border transition-colors ${
                          isSelected
                            ? "border-[var(--soft)] bg-[var(--bg)] text-[var(--fg)]"
                            : "border-[var(--line)] bg-[var(--chip)] text-[var(--soft)]"
                        }`}
                      >
                        <Icon className="size-3.5" />
                      </span>
                      <div className="truncate">
                        <p className="text-[13px] font-medium leading-snug">
                          {act.title}
                        </p>
                        <p className="text-[11px] font-mono text-[var(--soft)] truncate">
                          {act.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-[10px] text-[var(--soft)] shrink-0">
                      {act.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
