import React, { useState, useEffect, useRef } from "react";

const INDEX_ITEMS = [
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "github", label: "GitHub" },
];

export function IndexSidebar({ activeId, onSectionClick }) {
  const [currentId, setCurrentId] = useState(activeId || "about");
  const visibleSections = useRef(new Set());

  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.current.add(entry.target.id);
        } else {
          visibleSections.current.delete(entry.target.id);
        }
      });

      const visible = [...visibleSections.current];
      if (visible.length === 0) return;

      let closestId = visible[0];
      let minDistance = Math.abs(
        document.getElementById(closestId)?.getBoundingClientRect().top ?? 0
      );

      for (const id of visible.slice(1)) {
        const top = Math.abs(
          document.getElementById(id)?.getBoundingClientRect().top ?? 0
        );
        if (top < minDistance) {
          closestId = id;
          minDistance = top;
        }
      }
      setCurrentId(closestId);
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    });

    INDEX_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight
      ) {
        setCurrentId(INDEX_ITEMS[INDEX_ITEMS.length - 1].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside className="fixed top-[26vh] left-[calc(50%+410px)] pointer-events-auto hidden xl:flex flex-col gap-3.5 z-30 select-none">
      <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--soft)] uppercase mb-1">
        INDEX
      </h3>
      {INDEX_ITEMS.map((item) => {
        const isActive = currentId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSectionClick(item.id)}
            className={`group flex items-center gap-2.5 font-mono text-[12px] font-medium tracking-[0.05em] transition-all duration-300 text-left cursor-pointer ${
              isActive
                ? "text-[var(--fg)] font-semibold"
                : "text-[var(--soft)] hover:text-[var(--muted)]"
            }`}
          >
            <span
              className={`h-[1px] bg-current transition-all duration-300 ${
                isActive ? "w-4" : "w-0 group-hover:w-2"
              }`}
            />
            {item.label}
          </button>
        );
      })}
    </aside>
  );
}
