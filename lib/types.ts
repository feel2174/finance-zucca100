export type InstitutionType = "bank" | "securities" | "savings";

export const institutionTypeLabel: Record<InstitutionType, string> = {
  bank: "은행",
  securities: "증권사",
  savings: "저축은행",
};

// 카테고리별 구분 컬러 — 전부 흰색 배경 대비 명도 대비 4.5:1 이상(AA 통과), 브랜드 네이비/블루 톤과
// 어울리는 범위 안에서 선택. bgOnDark/textOnDark는 OG 이미지 등 네이비 배경용 밝은 변형.
export const institutionTypeColor: Record<
  InstitutionType,
  { text: string; bg: string; textOnDark: string }
> = {
  bank: { text: "#2563EB", bg: "#EFF6FF", textOnDark: "#60A5FA" },
  securities: { text: "#047857", bg: "#ECFDF5", textOnDark: "#34D399" },
  savings: { text: "#B45309", bg: "#FFFBEB", textOnDark: "#FBBF24" },
};

export interface ExtraCta {
  label: string;
  url: string;
}

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  homepageUrl: string;
  appAvailable: boolean;
  androidUrl: string | null;
  iosUrl: string | null;
  appName?: string;
  appNote?: string;
  customerCenterTel?: string;
  extraCta?: ExtraCta;
  blurb?: string;
}
