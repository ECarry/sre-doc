import { i18n } from "@/lib/i18n";
import { defineI18nUI } from "fumadocs-ui/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const i18nUI = defineI18nUI(i18n, {
  en: {
    displayName: "English",
  },
  cn: {
    displayName: "Chinese",
    search: "搜尋文檔",
  },
});

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    // different props based on `locale`
  };
}
