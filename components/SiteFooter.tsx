import { Landmark } from "lucide-react";
import { SITE } from "@/lib/site";

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
        <p className="max-w-[62ch] text-[12.5px] text-muted">
          은행·증권사·저축은행 공식 페이지·공식 앱으로만 연결하는 링크 모음 서비스입니다. 금융상품 판매·중개·상담을
          하지 않으며, 어떤 금융기관과도 제휴 관계가 없습니다.
        </p>
        <p className="mt-1 text-[12.5px] text-muted">
          © {new Date().getFullYear()} {SITE.name} · 최신 정보는 각 기관의 공식 안내를 기준으로 확인하세요.
        </p>
      </div>
    </footer>
  );
}
