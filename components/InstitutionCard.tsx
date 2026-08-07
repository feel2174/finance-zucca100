import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Institution } from "@/lib/types";
import { institutionTypeColor, institutionTypeLabel } from "@/lib/types";

export function InstitutionCard({ institution }: { institution: Institution }) {
  const color = institutionTypeColor[institution.type];

  return (
    <Link
      href={`/${institution.type}/${institution.id}`}
      data-name={institution.name}
      data-type={institution.type}
      className="co-card flex items-center gap-3 rounded-[10px] border border-border bg-background px-3 py-2.5 transition-colors duration-150 hover:border-accent hover:shadow-sm"
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11.5px] font-extrabold"
        style={{ backgroundColor: color.bg, color: color.text }}
      >
        {institution.name.slice(0, 1)}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[13.5px] font-extrabold">{institution.name}</span>
        <span className="text-[10.5px] font-semibold" style={{ color: color.text }}>
          {institutionTypeLabel[institution.type]}
        </span>
      </span>
      <ChevronRight size={16} className="shrink-0 text-accent" />
    </Link>
  );
}
