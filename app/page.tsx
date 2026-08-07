import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InstitutionExplorer } from "@/components/InstitutionExplorer";
import { getAllInstitutions } from "@/lib/institutions";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE.tagline },
  description: SITE.description,
};

export default function HomePage() {
  const institutions = getAllInstitutions();

  return (
    <>
      <SiteHeader />

      <div className="bg-band">
        <div className="mx-auto max-w-5xl px-6 pb-7 pt-9">
          <span className="mb-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-bold text-accent">
            ✦ 공식 페이지·공식 앱으로만 연결
          </span>
          <h1 className="mb-1.5 max-w-[22ch] text-[27px] font-extrabold leading-[1.3] tracking-tight text-primary sm:text-[32px]">
            은행·증권사·저축은행 이름만 알면,
            <br />
            <span className="text-accent">{SITE.name}</span>에서 바로.
          </h1>
          <p className="max-w-[50ch] text-[14px] text-muted">{SITE.description}</p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-9">
        <section id="explorer" className="mb-10">
          <InstitutionExplorer institutions={institutions} />
        </section>

        <section id="faq" className="mb-10">
          <h2 className="mb-4 text-[18px] font-extrabold tracking-tight">
            왜 매번 앱스토어에서 이름을 검색하게 될까요?
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <details className="border-t border-border first:border-t-0 open:bg-band/40" open>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 text-[14px] font-bold">
                은행·증권사·저축은행 앱은 왜 이렇게 이름이 자주 바뀌나요?
              </summary>
              <p className="px-5 pb-4 text-[13.5px] leading-[1.7] text-muted">
                리브랜딩·통합 앱 출시가 잦아서예요. 검색만으로는 구버전 앱이나 다른 회사 앱이 먼저 뜨는
                경우가 있어, 매번 정확한 공식 앱을 찾는 게 번거로울 수 있어요.
              </p>
            </details>
            <details className="border-t border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 text-[14px] font-bold">
                홈페이지 대신 앱을 써야 하는 경우도 있나요?
              </summary>
              <p className="px-5 pb-4 text-[13.5px] leading-[1.7] text-muted">
                네. 일부 인터넷전문은행·증권사는 PC 인터넷뱅킹 없이 앱으로만 서비스를 제공해요. 이런
                경우 홈페이지는 안내용이고, 실제 이용은 앱 설치가 먼저입니다.
              </p>
            </details>
            <details className="border-t border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 text-[14px] font-bold">
                안드로이드/아이폰 앱 다운로드 링크가 다른 이유는요?
              </summary>
              <p className="px-5 pb-4 text-[13.5px] leading-[1.7] text-muted">
                같은 회사라도 Google Play와 App Store에 각각 별도로 등록되어 있고, 패키지명·앱 ID가
                운영체제마다 달라서예요. {SITE.name}은 두 스토어 링크를 모두 확인해 제공해요.
              </p>
            </details>
          </div>
        </section>

        <section id="disclaimer" className="mb-2">
          <h2 className="mb-4 text-[18px] font-extrabold tracking-tight">안내</h2>
          <div className="rounded-2xl bg-band px-5 py-4.5 text-[13px] leading-[1.7] text-muted">
            <ul className="list-disc space-y-2 pl-4">
              <li>
                각 은행·증권사·저축은행의 공식 홈페이지·Google Play·App Store 페이지로 연결하는{" "}
                <b className="text-foreground">링크 모음 서비스</b>이며, 금융상품의 판매·중개·비교·상담을
                하지 않습니다.
              </li>
              <li>
                표시된 기관명·로고·상표는 각 기관에 귀속되며, 어떤 기관과도{" "}
                <b className="text-foreground">제휴·협찬·위탁 관계가 없습니다.</b>
              </li>
              <li>
                연결된 외부 페이지의 주소와 내용은 각 기관 사정에 따라 사전 고지 없이 변경될 수 있으며,
                정확성·최신성을 보증하지 않습니다.
              </li>
              <li>
                제공하는 정보는 참고용이며, 이를 이용해 발생한 손해에 대해 운영자는 법적 책임을 지지
                않습니다.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
