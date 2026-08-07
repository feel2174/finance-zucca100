import { Globe, SquarePlay, Apple } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import type { Institution } from "@/lib/types";

export function CtaGroup({ institution }: { institution: Institution }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <CtaButton
        href={institution.homepageUrl}
        label="홈페이지 바로가기"
        sublabel="공식 홈페이지로 이동"
        icon={<Globe size={18} strokeWidth={2.2} />}
        variant="primary"
      />
      <CtaButton
        href={institution.appAvailable ? institution.androidUrl : null}
        label="안드로이드 앱 다운로드"
        sublabel={institution.appAvailable ? "Google Play" : undefined}
        icon={<SquarePlay size={18} strokeWidth={2.2} />}
        variant={institution.appAvailable && institution.androidUrl ? "secondary" : "disabled"}
        disabledReason={institution.appNote}
      />
      <CtaButton
        href={institution.appAvailable ? institution.iosUrl : null}
        label="아이폰 앱 다운로드"
        sublabel={institution.appAvailable ? "App Store" : undefined}
        icon={<Apple size={18} strokeWidth={2.2} />}
        variant={institution.appAvailable && institution.iosUrl ? "secondary" : "disabled"}
        disabledReason={institution.appNote}
      />
    </div>
  );
}
