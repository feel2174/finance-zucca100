import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const landmarkPaths = [
  "M10 18v-7",
  "M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z",
  "M14 18v-7",
  "M18 18v-7",
  "M3 22h18",
  "M6 18v-7",
];

export default async function Image() {
  const [extrabold, medium] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/pt-extrabold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/pt-medium.ttf")),
  ]);

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
          gap: 28,
          padding: "0 96px",
          background: "#0F172A",
          backgroundImage:
            "radial-gradient(circle at 82% 22%, rgba(37,99,235,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            borderRadius: 20,
            background: "#2563EB",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="52"
            height="52"
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
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontFamily: "Pretendard",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -2,
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontFamily: "Pretendard",
            fontWeight: 500,
            color: "#94A3B8",
          }}
        >
          {SITE.tagline}
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
