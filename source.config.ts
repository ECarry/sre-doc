import { defineDocs, defineConfig } from "fumadocs-mdx/config";

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    // Disable remark-image plugin to avoid external image fetch errors
    remarkPlugins: (v) =>
      v.filter((plugin) => {
        if (Array.isArray(plugin) && plugin[0]?.name === "remarkImage") {
          return false;
        }
        return true;
      }),
  },
});
