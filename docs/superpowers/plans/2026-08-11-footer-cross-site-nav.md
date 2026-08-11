# Footer Cross-Site Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a two-column footer navigation to `components/SiteFooter.tsx` that links to this site's own category pages and to real anchors on the sibling site `claim.zucca100.com` (청구친구), using keyword-rich anchor text instead of generic labels, and fix the stale "청구창구" brand name to "청구친구".

**Architecture:** Single-file change. No new components, no new routes, no new dependencies. `SiteFooter.tsx` gains a `<nav>` block (two `<div>` columns in a responsive grid) placed above the existing disclaimer/copyright paragraphs; the redundant one-line cross-link sentence is removed since the new nav supersedes it.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (utility classes only, no new CSS files). No test runner in this repo (`package.json` has no test script) — verification is `npm run build`, `npm run lint`, and a manual dev-server check.

## Global Constraints

- Design tokens only from `app/globals.css` (`text-muted`, `text-accent`, `text-foreground`, `border-border`, etc.) — no new colors.
- Links open in the same tab (no `target="_blank"`), matching the existing claim-hub link's current behavior.
- Do not modify anything outside `finance-zucca100` (the `claim-zucca100` repo is a separate project and is out of scope).
- No sticky/fixed bottom nav — this is a normal in-flow footer section (per `design-system/finance-hub/MASTER.md` anti-pattern: "No content hidden behind fixed navbars").
- Exact link targets (from `docs/superpowers/specs/2026-08-11-footer-cross-site-nav-design.md`):
  - `은행 홈페이지·앱 바로가기` → `/?type=bank#explorer`
  - `증권사 MTS 다운로드` → `/?type=securities#explorer`
  - `저축은행 고객센터·앱 바로가기` → `/?type=savings#explorer`
  - `생명보험금 청구 바로가기` → `https://claim.zucca100.com/#life`
  - `손해보험금 청구 바로가기` → `https://claim.zucca100.com/#nonlife`
  - `실손24 간편청구 안내` → `https://claim.zucca100.com/silson24.html`

---

### Task 1: Add footer nav grid, fix brand name, remove redundant line

**Files:**
- Modify: `components/SiteFooter.tsx` (currently 34 lines, shown below in full)

**Interfaces:**
- Consumes: `SITE` from `@/lib/site` (already imported), `Landmark` icon from `lucide-react` (already imported). No new imports needed — plain `<a>` tags, consistent with the file's existing external link (`<a href="https://claim.zucca100.com/">`).
- Produces: nothing consumed by other files — `SiteFooter` is a leaf component rendered once in `app/layout.tsx`... actually check: confirm where it's rendered before assuming — see Step 1.

Current file content for reference:

```tsx
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
        <p className="text-[12.5px] text-muted">
          은행·증권사·저축은행 공식 페이지·공식 앱으로만 연결하는 링크 모음 서비스입니다. 금융상품 판매·중개·상담을
          하지 않으며, 어떤 금융기관과도 제휴 관계가 없습니다.
        </p>
        <p className="mt-2 text-[12.5px] text-muted">
          보험금 청구 관련 바로가기는{" "}
          <a
            href="https://claim.zucca100.com/"
            className="font-semibold text-accent hover:underline"
          >
청구창구
          </a>
          에서 확인하세요.
        </p>
        <p className="mt-2 text-[12.5px] text-muted">
          © {new Date().getFullYear()} {SITE.name} · 최신 정보는 각 기관의 공식 안내를 기준으로 확인하세요.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 1: Confirm `SiteFooter` is only rendered from `app/layout.tsx`, not per-page**

Run: `grep -rn "SiteFooter" app/ components/`

Expected: one import + one usage in `app/page.tsx` (hub page) — confirm there's no per-spoke usage that would need separate treatment. If `app/[type]/[slug]/page.tsx` also renders it, no plan change is needed either way since we're editing the shared component, but note it for the manual check in Step 5.

- [ ] **Step 2: Replace the file contents**

Write the full new contents of `components/SiteFooter.tsx`:

```tsx
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
```

Notes on this diff versus the original:
- Added `Link` import from `next/link` for the internal links (matches `SiteHeader.tsx`'s existing pattern of using `Link` for `/?type=...#explorer` routes).
- Removed the old "보험금 청구 관련 바로가기는 청구창구에서 확인하세요" paragraph entirely — replaced by the `CLAIM_HUB_LINKS` column (also fixes the stale "청구창구" brand name by removing it, since the new column uses keyword anchor text instead of the brand name as link text).
- Kept the disclaimer sentence and copyright line unchanged, just reflowed with `mt-6`/`mt-2` spacing after the new nav.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: no errors (no unused imports, no JSX issues).

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: build succeeds with the same page count as before this change (1 hub + 95 spoke pages + 95 OG images — this task doesn't add or remove routes, only edits a shared component).

- [ ] **Step 5: Manual browser check**

Run: `npm run dev`, open `http://localhost:3000/` in a browser.
Check:
- Footer shows two columns ("이 사이트" / "청구친구 · 보험금청구 허브") side by side on desktop width, stacked on narrow/mobile width.
- All 6 links are present with the exact anchor text from the Global Constraints table.
- Hovering a link changes its color (text-muted → text-accent).
- No "청구창구" text remains anywhere in the rendered footer.
- Clicking each of the 3 "이 사이트" links scrolls to/filters the explorer section correctly (existing `/?type=X#explorer` behavior, unchanged from header nav).
- The 3 청구친구 links point to `https://claim.zucca100.com/#life`, `#nonlife`, and `/silson24.html` (verify via hovering — actual navigation to those URLs isn't testable until `claim.zucca100.com` is deployed, per README's "실제 배포... 아직" status; visually confirming the `href` in devtools/hover is sufficient).

- [ ] **Step 6: Commit**

```bash
git add components/SiteFooter.tsx
git commit -m "$(cat <<'EOF'
Add footer cross-site navigation and fix stale brand name

Adds keyword-rich footer links to this site's own category pages and
to claim.zucca100.com's real sections, replacing the generic one-line
cross-link sentence. Also fixes "청구창구" -> "청구친구" (the sibling
site's confirmed brand name).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01DMYts4P3U15tAvGtNwDdL4
EOF
)"
```
