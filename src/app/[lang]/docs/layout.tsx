import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/app/layout.config";
import { FaLinux, FaDocker, FaNetworkWired } from "react-icons/fa";
import { GrVmware } from "react-icons/gr";
import { IoFolder } from "react-icons/io5";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <DocsLayout
      {...baseOptions(lang)}
      tree={source.pageTree[lang]}
      links={[]}
      sidebar={{
        tabs: {
          transform(option, node) {
            const meta = source.getNodeMeta(node);
            if (!meta) return option;

            const dirname = meta.file?.dirname || "";
            let icon;

            const dirType = (() => {
              if (dirname.includes("linux")) return "linux";
              if (dirname.includes("docker")) return "docker";
              if (dirname.includes("vmware")) return "vmware";
              if (dirname.includes("network")) return "network";
              return "default";
            })();

            switch (dirType) {
              case "linux":
                icon = <FaLinux size={22} />;
                break;
              case "docker":
                icon = <FaDocker size={22} />;
                break;
              case "vmware":
                icon = <GrVmware size={22} />;
                break;
              case "network":
                icon = <FaNetworkWired size={22} />;
                break;
              default:
                icon = <IoFolder size={22} />;
                break;
            }

            return {
              ...option,
              icon: <div className="rounded-md p-1.5 bg-muted/30">{icon}</div>,
            };
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
