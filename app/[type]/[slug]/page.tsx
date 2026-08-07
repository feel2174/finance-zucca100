import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Phone, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaGroup } from "@/components/CtaGroup";
import { InstitutionCard } from "@/components/InstitutionCard";
import {
  getAllInstitutions,
  getInstitution,
  getRelatedInstitutions,
} from "@/lib/institutions";
import { SITE } from "@/lib/site";
import type { InstitutionType } from "@/lib/types";

function isInstitutionType(value: string): value is InstitutionType {
  return value === "bank" || value === "securities";
}

const typeLabel: Record<InstitutionType, string> = {
  bank: "은행",
  securities: "증권사",
};

export function generateStaticParams() {
  return getAllInstitutions().map((item) => ({
    type: item.type,
    slug: item.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[type]/[slug]">): Promise<Metadata> {
  const { type, slug } = await params;
  if (!isInstitutionType(type)) return {};
  const institution = getInstitution(type, slug);
  if (!institution) return {};

  const title = `${institution.name} 홈페이지·앱 바로가기`;
  const description = `${institution.name} 공식 홈페이지, 안드로이드 앱, 아이폰 앱 다운로드 링크를 한번에 확인하세요.${
    institution.customerCenterTel ? ` 고객센터: ${institution.customerCenterTel}` : ""
  }`;

  return {
    title,
    description,
    alternates: { canonical: `/${type}/${slug}` },
    openGraph: { title: `${title} | ${SITE.name}`, description },
  };
}

export default async function InstitutionPage({
  params,
}: PageProps<"/[type]/[slug]">) {
  const { type, slug } = await params;
  if (!isInstitutionType(type)) notFound();

  const institution = getInstitution(type, slug);
  if (!institution) notFound();

  const related = getRelatedInstitutions(institution);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: institution.name,
    url: institution.homepageUrl,
    ...(institution.customerCenterTel
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            telephone: institution.customerCenterTel,
            contactType: "customer service",
          },
        }
      : {}),
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-1 text-[13px] font-semibold text-muted hover:text-foreground"
        >
          <ChevronLeft size={15} />
          전체 목록으로
        </Link>

        <div className="mb-6 flex items-start gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-band text-[17px] font-extrabold text-primary">
            {institution.name.slice(0, 1)}
          </span>
          <div>
            <p className="mb-1 text-[12px] font-bold text-accent">
              {typeLabel[institution.type]}
            </p>
            <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-primary sm:text-[28px]">
              {institution.name} 홈페이지·앱 바로가기
            </h1>
          </div>
        </div>

        {institution.blurb ? (
          <p className="mb-6 max-w-[60ch] text-[14.5px] leading-[1.7] text-muted">
            {institution.blurb}
          </p>
        ) : null}

        <section className="mb-7">
          <CtaGroup institution={institution} />
        </section>

        {institution.customerCenterTel || institution.extraCta ? (
          <section className="mb-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {institution.customerCenterTel ? (
              <a
                href={`tel:${institution.customerCenterTel.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-colors duration-150 hover:border-accent hover:bg-band"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-band text-primary">
                  <Phone size={16} strokeWidth={2.2} />
                </span>
                <span className="flex flex-col">
                  <span className="text-[13px] font-bold">고객센터</span>
                  <span className="text-[12.5px] text-muted">{institution.customerCenterTel}</span>
                </span>
              </a>
            ) : null}
            {institution.extraCta ? (
              <a
                href={institution.extraCta.url}
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-colors duration-150 hover:border-accent hover:bg-band"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-band text-primary">
                  <ExternalLink size={16} strokeWidth={2.2} />
                </span>
                <span className="flex flex-col">
                  <span className="text-[13px] font-bold">{institution.extraCta.label}</span>
                  <span className="text-[12.5px] text-muted">바로 이동</span>
                </span>
              </a>
            ) : null}
          </section>
        ) : null}

        {related.length > 0 ? (
          <section>
            <h2 className="mb-3 text-[15px] font-extrabold tracking-tight">
              다른 {typeLabel[institution.type]} 바로가기
            </h2>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {related.map((item) => (
                <InstitutionCard key={item.id} institution={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
