import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const alt = SITE.name;
// 2x resolution (120:63 ratio) — vector-sourced, stays crisp when scaled up.
export const size = { width: 2400, height: 1260 };
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
            "radial-gradient(circle at 80% 28%, rgba(37,99,235,0.55), transparent 52%), radial-gradient(circle at 12% 96%, rgba(59,130,246,0.20), transparent 46%)",
          overflow: "hidden",
        }}
      >
        {/* depth decoration — glowing orbs & ring on the negative-space side */}
        <div
          style={{
            position: "absolute",
            top: 150,
            right: 130,
            width: 620,
            height: 620,
            borderRadius: 620,
            background:
              "radial-gradient(circle at 38% 34%, rgba(96,165,250,0.55), rgba(37,99,235,0.05) 62%, transparent 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 250,
            right: 250,
            width: 420,
            height: 420,
            borderRadius: 420,
            border: "3px solid rgba(148,197,253,0.28)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 520,
            background:
              "radial-gradient(circle, rgba(37,99,235,0.28), transparent 68%)",
          }}
        />

        {/* icon tile */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: 184,
            height: 184,
            borderRadius: 44,
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(150deg, #3b82f6 0%, #1d4ed8 100%)",
            boxShadow:
              "0 48px 90px rgba(37,99,235,0.55), inset 0 3px 0 rgba(255,255,255,0.45)",
            marginBottom: 60,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "52%",
              borderRadius: "44px 44px 60px 60px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.35), transparent)",
            }}
          />
          <svg
            width="104"
            height="104"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={2.1}
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
            alignItems: "center",
            padding: "14px 30px",
            marginBottom: 34,
            borderRadius: 999,
            background: "rgba(37,99,235,0.16)",
            border: "1px solid rgba(96,165,250,0.35)",
            color: "#93C5FD",
            fontFamily: "Pretendard",
            fontWeight: 500,
            fontSize: 40,
          }}
        >
          은행 · 증권사 · 저축은행 공식 바로가기
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 200,
            fontFamily: "Pretendard",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -6,
            lineHeight: 1,
          }}
        >
          {SITE.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            maxWidth: 1500,
            fontSize: 62,
            fontFamily: "Pretendard",
            fontWeight: 500,
            color: "#94A3B8",
            lineHeight: 1.35,
            wordBreak: "keep-all",
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
