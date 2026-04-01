import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";
import { i18n } from "./i18n";
import { FaLinux, FaDocker, FaNetworkWired } from "react-icons/fa";
import { GrVmware } from "react-icons/gr";
import { createElement } from "react";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  i18n,
  // it assigns a URL to your pages
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (icon === "linux") {
      return createElement(FaLinux);
    }
    if (icon === "docker") {
      return createElement(FaDocker);
    }
    if (icon === "vmware") {
      return createElement(GrVmware);
    }
    if (icon === "network") {
      return createElement(FaNetworkWired);
    }
  },
});
