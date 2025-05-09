import { i18n } from "@/lib/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: (
        <>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Logo"
          >
            <circle cx={12} cy={12} r={12} fill="currentColor" />
          </svg>
          SRE Doc
        </>
      ),
    },
    links: [
      {
        text: locale === "cn" ? "文檔" : "Documentation",
        url: "/docs/linux",
        active: "nested-url",
      },
    ],
  };
}
