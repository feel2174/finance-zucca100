export type InstitutionType = "bank" | "securities";

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
