"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { InstitutionCard } from "@/components/InstitutionCard";
import type { Institution, InstitutionType } from "@/lib/types";

type Segment = "all" | InstitutionType;

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
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow-sm sm:max-w-[360px] sm:flex-1">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="은행·증권사·저축은행명을 입력하세요 (예: 국민은행, 미래에셋, SBI저축은행)"
            className="w-full border-none bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted"
          />
        </div>
        <div className="inline-flex gap-1 rounded-[10px] bg-band p-[3px]">
          {segments.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setSegment(item.key)}
              className={
                "rounded-[7px] px-3.5 py-1.5 text-[12.5px] font-bold transition-colors duration-150 " +
                (segment === item.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted hover:text-foreground")
              }
            >
              {item.label} <span className="ml-1 font-semibold text-muted">{item.count}</span>
            </button>
          ))}
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
