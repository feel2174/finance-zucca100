export type InstitutionType = "bank" | "securities" | "savings";

export const institutionTypeLabel: Record<InstitutionType, string> = {
  bank: "은행",
  securities: "증권사",
  savings: "저축은행",
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
