import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getAllInstitutions, getInstitution } from "@/lib/institutions";
import { institutionTypeLabel, type InstitutionType } from "@/lib/types";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function isInstitutionType(value: string): value is InstitutionType {
  return value === "bank" || value === "securities" || value === "savings";
}

export function generateStaticParams() {
  return getAllInstitutions().map((item) => ({
    type: item.type,
    slug: item.id,
  }));
}

const landmarkPaths = [
  "M10 18v-7",
  "M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z",
  "M14 18v-7",
  "M18 18v-7",
  "M3 22h18",
  "M6 18v-7",
];

export default async function Image({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;
  const institution = isInstitutionType(type) ? getInstitution(type, slug) : undefined;

  const [extrabold, medium] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/pt-extrabold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/pt-medium.ttf")),
  ]);

  const title = institution ? `${institution.name} 홈페이지·앱 바로가기` : SITE.name;
  const badge = institution ? institutionTypeLabel[institution.type] : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 24,
          padding: "0 96px",
          background: "#0F172A",
          backgroundImage:
            "radial-gradient(circle at 82% 22%, rgba(37,99,235,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 76,
            height: 76,
            borderRadius: 18,
            background: "#2563EB",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {landmarkPaths.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>
        </div>

        {badge ? (
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontFamily: "Pretendard",
              fontWeight: 800,
              color: "#60A5FA",
            }}
          >
            {badge}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontFamily: "Pretendard",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -1.5,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontFamily: "Pretendard",
            fontWeight: 500,
            color: "#94A3B8",
          }}
        >
          {SITE.name}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: extrabold, weight: 800, style: "normal" },
        { name: "Pretendard", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
