import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getAllInstitutions, getInstitution } from "@/lib/institutions";
import { institutionTypeColor, institutionTypeLabel, type InstitutionType } from "@/lib/types";
import { SITE } from "@/lib/site";

// 2x resolution (120:63 ratio) — vector-sourced, stays crisp when scaled up.
export const size = { width: 2400, height: 1260 };
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
  const badgeColor = institution ? institutionTypeColor[institution.type].textOnDark : "#93C5FD";
  const markColor = institution ? institutionTypeColor[institution.type].text : "#2563EB";

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 200px",
          background: "#0B1120",
          backgroundImage:
            "radial-gradient(circle at 80% 28%, rgba(37,99,235,0.50), transparent 52%), radial-gradient(circle at 12% 96%, rgba(59,130,246,0.18), transparent 46%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 170,
            right: 150,
            width: 560,
            height: 560,
            borderRadius: 560,
            background:
              "radial-gradient(circle at 38% 34%, rgba(96,165,250,0.45), rgba(37,99,235,0.04) 62%, transparent 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 260,
            right: 260,
            width: 380,
            height: 380,
            borderRadius: 380,
            border: "3px solid rgba(148,197,253,0.24)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            width: 168,
            height: 168,
            borderRadius: 40,
            background: markColor,
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 44px 84px rgba(37,99,235,0.45), inset 0 3px 0 rgba(255,255,255,0.4)",
            marginBottom: 52,
          }}
        >
          <svg
            width="96"
            height="96"
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
              alignItems: "center",
              padding: "12px 28px",
              marginBottom: 30,
              borderRadius: 999,
              background: "rgba(37,99,235,0.16)",
              border: "1px solid rgba(96,165,250,0.35)",
              fontSize: 40,
              fontFamily: "Pretendard",
              fontWeight: 800,
              color: badgeColor,
            }}
          >
            {badge}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            fontSize: 118,
            fontFamily: "Pretendard",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -3,
            lineHeight: 1.12,
            maxWidth: 1720,
            wordBreak: "keep-all",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 56,
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
