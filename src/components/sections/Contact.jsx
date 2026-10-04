import React from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, Code2 } from "lucide-react";
import { SectionHeader } from "../layout/SectionHeader";
import { BorderContainer } from "../layout/BorderContainer";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export function Contact() {
  const contactLinks = [
    {
      label: "GitHub",
      href: PORTFOLIO_DATA.socials.github,
      Icon: Github,
    },
    {
      label: "LinkedIn",
      href: PORTFOLIO_DATA.socials.linkedin,
      Icon: Linkedin,
    },
    {
      label: "LeetCode",
      href: PORTFOLIO_DATA.socials.leetcode,
      Icon: Code2,
    },
    {
      label: "Mail",
      href: PORTFOLIO_DATA.socials.email,
      Icon: Mail,
    },
    {
      label: "Phone",
      href: PORTFOLIO_DATA.socials.phone,
      Icon: Phone,
    },
  ];

  return (
    <div id="contact" className="scroll-mt-20">
      <SectionHeader title="Contact" />
      <BorderContainer>
        <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-[var(--line)] sm:border-b-0">
          {contactLinks.map((link, index) => {
            const Icon = link.Icon;
            const isExternal = !link.href.startsWith("mailto:") && !link.href.startsWith("tel:");
            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={`group flex items-center justify-center gap-2.5 border-b border-r border-[var(--line)] px-4 py-4 text-[13px] font-medium transition-colors duration-200 hover:bg-[var(--hover)] ${
                  index % 2 === 1 ? "border-r-0 sm:border-r" : ""
                } ${index >= 4 ? "border-b-0" : ""} sm:border-b-0 sm:last:border-r-0 ${
                  index === 4 ? "col-span-2 border-r-0 sm:col-span-1 sm:border-r" : ""
                }`}
              >
                <span className="grid size-8 place-items-center rounded-lg border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                  <Icon className="size-4" />
                </span>
                <span className="text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                  {link.label}
                </span>
                <ArrowUpRight className="size-3.5 text-[var(--soft)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]" />
              </a>
            );
          })}
        </div>
      </BorderContainer>
    </div>
  );
}
