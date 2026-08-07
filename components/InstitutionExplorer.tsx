"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { InstitutionCard } from "@/components/InstitutionCard";
import { institutionTypeColor } from "@/lib/types";
import type { Institution, InstitutionType } from "@/lib/types";

type Segment = "all" | InstitutionType;

const segmentColor: Record<Segment, string | null> = {
  all: null,
  bank: institutionTypeColor.bank.text,
  securities: institutionTypeColor.securities.text,
  savings: institutionTypeColor.savings.text,
};

export function InstitutionExplorer({ institutions }: { institutions: Institution[] }) {
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<Segment>("all");

  const bankCount = institutions.filter((item) => item.type === "bank").length;
  const securitiesCount = institutions.filter((item) => item.type === "securities").length;
  const savingsCount = institutions.filter((item) => item.type === "savings").length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return institutions.filter((item) => {
      const typeOk = segment === "all" || item.type === segment;
      const nameOk = item.name.toLowerCase().includes(q);
      return typeOk && nameOk;
    });
  }, [institutions, query, segment]);

  const segments: { key: Segment; label: string; count: number }[] = [
    { key: "all", label: "전체", count: institutions.length },
    { key: "bank", label: "은행", count: bankCount },
    { key: "securities", label: "증권사", count: securitiesCount },
    { key: "savings", label: "저축은행", count: savingsCount },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex items-center gap-2.5 rounded-xl border-2 border-accent/25 bg-background px-4 py-3 shadow-md focus-within:border-accent">
          <Search size={18} className="shrink-0 text-accent" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="은행·증권사·저축은행명을 입력하세요 (예: 국민은행, 미래에셋)"
            className="w-full border-none bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted"
          />
        </div>
        <div className="flex flex-wrap gap-1 rounded-[10px] bg-band p-[3px]">
          {segments.map((item) => {
            const color = segmentColor[item.key];
            const active = segment === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setSegment(item.key)}
                className={
                  "rounded-[7px] px-3.5 py-1.5 text-[12.5px] font-bold transition-colors duration-150 " +
                  (active
                    ? "bg-background shadow-sm"
                    : "text-muted hover:text-foreground")
                }
                style={active && color ? { color } : undefined}
              >
                {item.label} <span className="ml-1 font-semibold text-muted">{item.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border py-10 text-center text-[14px] text-muted">
          검색 결과가 없습니다. 은행·증권사·저축은행명을 다시 확인해주세요.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <InstitutionCard key={`${item.type}-${item.id}`} institution={item} />
          ))}
        </div>
      )}
    </div>
  );
}
