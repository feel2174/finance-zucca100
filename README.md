# finance-hub — 금융기관 홈페이지/앱 바로가기 니치사이트

`claim-hub`(청구창구) 리포트의 신규 사이트 확장 후보 3순위("금융기관 홈페이지/앱 바로가기", RPM
$43.1)를 실제 사이트로 만드는 작업. 은행·증권사 기관마다 **홈페이지 바로가기 / 안드로이드 앱
다운로드 / 아이폰 앱 다운로드** 3-way CTA를 제공하는 hub-and-spoke 구조의 pSEO 사이트.

가칭 브랜드명 "금융바로", 배포 도메인은 `zucca100.com`의 서브도메인
(`finance.zucca100.com` 예정 — 실제 DNS 연결은 아직 안 함).

## 기술 스택

Next.js 16(App Router) + React 19 + TypeScript + Tailwind CSS v4. claim-hub와 달리 페이지 수가
많고(허브 1 + 스포크 48개) SEO가 핵심이라 Python이 생성하는 단일 정적 HTML 대신 Next.js로
새로 빌드함(`generateStaticParams`로 전 기관 SSG, `generateMetadata`로 기관별 유니크 메타데이터,
`sitemap.ts`/`robots.ts` 자동 생성).

## 폴더 구성

- `app/page.tsx` — 허브(검색 + 은행/증권사 세그먼트 필터)
- `app/[type]/[slug]/page.tsx` — 스포크(기관별 상세, `type`은 `bank`|`securities`)
- `app/sitemap.ts`, `app/robots.ts`
- `app/fonts.ts` — Pretendard `next/font/local` 설정(claim-hub와 동일 폰트, base64 임베드 없이 로드)
- `components/` — `SiteHeader`, `SiteFooter`, `InstitutionExplorer`(검색/필터, client), `InstitutionCard`,
  `CtaGroup`, `CtaButton`
- `lib/types.ts`, `lib/institutions.ts`, `lib/site.ts`
- `data/institutions.json` — 은행 18개 + 증권사 30개, 총 48개 기관 데이터
- `assets/fonts/` — claim-hub에서 복사한 Pretendard woff2(pt-regular/medium/semibold/bold/extrabold)
- `design-system/finance-hub/MASTER.md` — ui-ux-pro-max 스킬로 생성 후 수동 오버라이드한 디자인 토큰

## 데이터 리서치 방법

병렬 백그라운드 에이전트 3개(은행, 대형 증권사, 중소형 증권사)로 홈페이지·Play스토어·App스토어·
고객센터 번호를 웹서치로 검증. 확인 안 된 링크는 절대 추측하지 않고 `미확인`/`null`로 남기도록
지시함. 결과 병합 후 Play/App스토어·홈페이지 URL 10개 표본을 curl로 재검증(전부 200 확인).

**제외한 기관**:
- **한국씨티은행**: 2022년 리테일 뱅킹 완전 철수, 신규 고객 유입 경로가 없어 소비자용 CTA가
  의미 없다고 판단해 제외.
- **외국계 기관전용 증권사 지점 23곳**(골드만삭스증권 서울지점 등): 기관 대상 영업만 하고 일반
  소비자용 홈페이지·앱이 없어 애초에 리서치 대상에서 제외.
- **흥국증권, 유화증권, 코리아에셋투자증권, DS투자증권, 리딩투자증권, KR투자증권**: IB·채권·기관
  영업 중심이라 소비자용 MTS 앱이 확인되지 않음(App Store 검색 결과 0건 등으로 확인) — claim-hub가
  MG손해보험·재보험사를 제외한 것과 같은 기준으로 제외.
- **넥스트증권**: 아직 개인 리테일 증권업 라이선스가 없고 소비자용 MTS도 미출시(선물 전용 앱만
  존재) — 추후 정식 출시되면 재검토.

**부분적으로 확인 안 된 항목**:
- 부국증권 iOS 앱스토어 링크 — Android만 확인됨, iOS는 `null` + 안내 문구로 표시.

## 디자인 시스템

`ui-ux-pro-max` 스킬의 `--design-system` 조회 결과(green marketplace 팔레트)를 그대로 쓰지 않고,
"밝고 모던한 금융기관" 톤에 맞게 수동으로 오버라이드함 — 배경은 거의 흰색(#FFFFFF), Primary는
신뢰감 있는 네이비(#0F172A), CTA는 선명한 블루(#2563EB). 자세한 근거는
`design-system/finance-hub/MASTER.md` 상단 "OVERRIDE" 메모 참고. 타이포그래피는 자동 제안된
Noto Sans KR 대신 청구창구와 동일한 Pretendard 유지(포트폴리오 브랜드 일관성).

## 현재 상태 / 다음 할 일

2026-08-07: 최초 빌드 완료. `npm run build` 기준 허브 1개 + 스포크 48개 전부 정적 생성 확인,
sitemap.xml에 49개 URL 포함 확인. 로컬 브라우저에서 허브 카드 그리드·검색/필터 카운트·스포크
페이지의 3-way CTA·비활성 상태(부국증권 iOS, 카카오뱅크 임시 데이터 시절 등) 렌더링 확인.

다음 할 일:
1. **부국증권 iOS 링크 확인** — 미확인 상태로 남아있음.
2. **하나은행 앱 전환 확인** — 신·구 앱(하나원큐 구버전 vs 신규 com.hanabank.oqf)이 병행 운영
   중이라 조만간 링크가 바뀔 수 있음. 배포 전 재확인 권장.
3. **실제 배포**: GitHub 리포 생성/push, Vercel 프로젝트 연결, `finance.zucca100.com` 서브도메인
   DNS 연결, 애드센스 계정 분리 여부 최종 결정 — 전부 외부 서비스 조작이 필요해 사용자 확인 후 진행.
4. **로드맵(claim-hub 리포트 §6 기준)**: 카드사·저축은행 확장(2차), 가전/서비스 고객센터·AS센터
   바로가기(리포트 4순위), 정부·지자체 지원금 신청·조회 바로가기(리포트 2순위, 아직 미착수) 순으로
   검토.
