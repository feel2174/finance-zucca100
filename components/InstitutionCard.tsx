import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Institution } from "@/lib/types";
import { institutionTypeLabel } from "@/lib/types";

export function InstitutionCard({ institution }: { institution: Institution }) {
  return (
    <Link
      href={`/${institution.type}/${institution.id}`}
      data-name={institution.name}
      data-type={institution.type}
      className="co-card flex items-center gap-3 rounded-[10px] border border-border bg-background px-3 py-2.5 transition-colors duration-150 hover:border-accent hover:shadow-sm"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-band text-[11.5px] font-extrabold text-primary">
        {institution.name.slice(0, 1)}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[13.5px] font-extrabold">{institution.name}</span>
        <span className="text-[10.5px] font-semibold text-muted">
          {institutionTypeLabel[institution.type]}
        </span>
      </span>
      <ChevronRight size={16} className="shrink-0 text-accent" />
    </Link>
  );
}
