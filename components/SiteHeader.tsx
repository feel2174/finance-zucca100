import Link from "next/link";
import { Landmark } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
      <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary">
          <Landmark size={16} strokeWidth={2.5} />
        </span>
        {SITE.name}
      </Link>
      <nav className="hidden gap-7 text-sm font-semibold text-muted sm:flex">
        <Link href="/#bank" className="hover:text-foreground">
          은행
        </Link>
        <Link href="/#securities" className="hover:text-foreground">
          증권사
        </Link>
        <Link href="/#disclaimer" className="hover:text-foreground">
          안내
        </Link>
      </nav>
    </header>
  );
}
