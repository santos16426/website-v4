"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { trackLinkClick } from "../../utils/events";

interface BackLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function BackLink({ href, label, className = "inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-300" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackLinkClick(href, label)}
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
