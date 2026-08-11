import Link from "next/link";
import { Landmark } from "lucide-react";
import { SITE } from "@/lib/site";

const SITE_LINKS = [
  { label: "은행 홈페이지·앱 바로가기", href: "/?type=bank#explorer" },
  { label: "증권사 MTS 다운로드", href: "/?type=securities#explorer" },
  { label: "저축은행 고객센터·앱 바로가기", href: "/?type=savings#explorer" },
];

const CLAIM_HUB_LINKS = [
  { label: "생명보험금 청구 바로가기", href: "https://claim.zucca100.com/#life" },
  { label: "손해보험금 청구 바로가기", href: "https://claim.zucca100.com/#nonlife" },
  { label: "실손24 간편청구 안내", href: "https://claim.zucca100.com/silson24.html" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-9">
        <div className="mb-2 flex items-center gap-2 text-[15px] font-extrabold">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-on-primary">
            <Landmark size={13} strokeWidth={2.5} />
          </span>
          {SITE.name}
        </div>

        <nav className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-[12.5px] font-bold text-muted">이 사이트</p>
            <ul className="space-y-1.5">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-semibold text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[12.5px] font-bold text-muted">청구친구 · 보험금청구 허브</p>
            <ul className="space-y-1.5">
              {CLAIM_HUB_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] font-semibold text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <p className="mt-6 text-[12.5px] text-muted">
          은행·증권사·저축은행 공식 페이지·공식 앱으로만 연결하는 링크 모음 서비스입니다. 금융상품 판매·중개·상담을
          하지 않으며, 어떤 금융기관과도 제휴 관계가 없습니다.
        </p>
        <p className="mt-2 text-[12.5px] text-muted">
          © {new Date().getFullYear()} {SITE.name} · 최신 정보는 각 기관의 공식 안내를 기준으로 확인하세요.
        </p>
      </div>
    </footer>
  );
}
