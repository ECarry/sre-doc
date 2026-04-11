import Link from "next/link";
import { Server, Network, Container, Database, Terminal } from "lucide-react";

export default function HomePage() {
  const categories = [
    {
      title: "Linux",
      description: "Master Linux from fundamentals to RHCA-level expertise",
      href: "/docs/linux",
      icon: Terminal,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "VMware",
      description: "Virtualization and cloud infrastructure management",
      href: "/docs/vmware",
      icon: Server,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Network",
      description: "Networking fundamentals and advanced configurations",
      href: "/docs/network",
      icon: Network,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "Docker",
      description: "Container technology and orchestration",
      href: "/docs/docker",
      icon: Container,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
    },
    {
      title: "KingBase",
      description: "Database management and optimization",
      href: "/docs/kingbase",
      icon: Database,
      gradient: "from-indigo-500 to-violet-500",
      bgGradient: "from-indigo-500/10 to-violet-500/10",
    },
  ];

  return (
    <div className="flex flex-col flex-1 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <div className="max-w-6xl w-full space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                SRE Documentation
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive technical documentation for Site Reliability
              Engineering
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>System Operational</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <div className="relative space-y-4">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.gradient}`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="space-y-2">
                      <h3
                        className={`text-2xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                      >
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex items-center text-sm font-medium">
                      <span
                        className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                      >
                        Explore docs
                      </span>
                      <svg
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-700"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
